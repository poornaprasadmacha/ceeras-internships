declare global {
  interface Window {
    Sk?: any;
  }
}

export interface PythonExecutionResult {
  output: string;
  error?: string;
  executionTimeMs: number;
}

let loadPromise: Promise<void> | null = null;

export function loadPythonEngine(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.Sk && window.Sk.builtinFiles) return Promise.resolve();

  if (!loadPromise) {
    loadPromise = new Promise((resolve, reject) => {
      // 1. Load skulpt.min.js
      const script1 = document.createElement('script');
      script1.src = '/js/skulpt.min.js';
      script1.async = true;

      script1.onload = () => {
        // 2. Load skulpt-stdlib.js
        const script2 = document.createElement('script');
        script2.src = '/js/skulpt-stdlib.js';
        script2.async = true;

        script2.onload = () => {
          resolve();
        };
        script2.onerror = (err) => {
          reject(new Error('Failed to load Python standard library: ' + err));
        };
        document.head.appendChild(script2);
      };

      script1.onerror = (err) => {
        reject(new Error('Failed to load Python core runtime: ' + err));
      };

      document.head.appendChild(script1);
    });
  }

  return loadPromise;
}

export async function executePythonCode(code: string): Promise<PythonExecutionResult> {
  const startTime = performance.now();
  await loadPythonEngine();

  const Sk = window.Sk;
  if (!Sk) {
    return {
      output: '',
      error: 'Python engine failed to initialize.',
      executionTimeMs: 0,
    };
  }

  let outputBuffer = '';

  Sk.configure({
    output: (text: string) => {
      outputBuffer += text;
    },
    read: (x: string) => {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined) {
        throw new Error(`File not found: '${x}'`);
      }
      return Sk.builtinFiles['files'][x];
    },
    __future__: Sk.python3,
  });

  try {
    const promise = Sk.misceval.asyncToPromise(() => {
      return Sk.importMainWithBody('<stdin>', false, code, true);
    });

    await promise;
    const duration = Math.round((performance.now() - startTime) * 100) / 100;

    return {
      output: outputBuffer,
      executionTimeMs: duration,
    };
  } catch (err: any) {
    const duration = Math.round((performance.now() - startTime) * 100) / 100;
    const rawError = err?.toString ? err.toString() : String(err);

    return {
      output: outputBuffer,
      error: cleanPythonError(rawError),
      executionTimeMs: duration,
    };
  }
}

function cleanPythonError(raw: string): string {
  // Format Skulpt stack traces into clean beginner-friendly notices
  if (raw.includes('SyntaxError')) {
    return `SyntaxError: Check your spelling, missing quotation marks, or unclosed parentheses: ${raw.replace(/^.*SyntaxError:/, 'SyntaxError:')}`;
  }
  if (raw.includes('NameError')) {
    return `NameError: A variable or function name was used before being defined: ${raw.replace(/^.*NameError:/, 'NameError:')}`;
  }
  if (raw.includes('TypeError')) {
    return `TypeError: Invalid operation between incompatible data types: ${raw.replace(/^.*TypeError:/, 'TypeError:')}`;
  }
  if (raw.includes('IndentationError')) {
    return `IndentationError: Check your line indentation and spacing: ${raw.replace(/^.*IndentationError:/, 'IndentationError:')}`;
  }
  return raw;
}
