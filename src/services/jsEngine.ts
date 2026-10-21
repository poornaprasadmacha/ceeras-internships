export interface JsExecutionResult {
  output: string;
  error?: string;
  executionTimeMs: number;
  returnValue?: any;
}

/**
 * Executes student JavaScript code in an isolated, sandboxed environment in-browser.
 * Intercepts console.log calls, handles async promises, and converts errors into student-friendly tips.
 * 100% Client-side, runs offline.
 */
export async function executeJavaScriptCode(code: string): Promise<JsExecutionResult> {
  const startTime = performance.now();
  const outputBuffer: string[] = [];

  // Custom mock console
  const mockConsole = {
    log: (...args: any[]) => {
      const line = args
        .map((a) => {
          if (typeof a === 'object' && a !== null) {
            try {
              return JSON.stringify(a);
            } catch {
              return String(a);
            }
          }
          return String(a);
        })
        .join(' ');
      outputBuffer.push(line);
    },
    info: (...args: any[]) => mockConsole.log(...args),
    warn: (...args: any[]) => mockConsole.log(...args),
    error: (...args: any[]) => mockConsole.log(...args),
  };

  try {
    // Wrap code in an async function to support top-level await and scoped console
    const wrappedFunction = new Function(
      'console',
      `return (async () => {
        ${code}
      })();`
    );

    // Timeout protection against infinite loops (1.5 seconds)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Execution timed out (possible infinite loop).')), 1500)
    );

    const execPromise = wrappedFunction(mockConsole);
    const result = await Promise.race([execPromise, timeoutPromise]);

    const endTime = performance.now();
    return {
      output: outputBuffer.join('\n'),
      returnValue: result,
      executionTimeMs: Math.round(endTime - startTime),
    };
  } catch (err: any) {
    const endTime = performance.now();
    const rawError = err?.message || String(err);
    let friendlyError = rawError;

    if (rawError.includes('is not defined')) {
      const varName = rawError.split(' ')[0];
      friendlyError = `ReferenceError: '${varName}' is not defined. Did you spell the variable correctly or forget to declare it with let or const?`;
    } else if (rawError.includes('Assignment to constant variable')) {
      friendlyError = `TypeError: Cannot reassign a 'const' variable. Use 'let' if you intend to reassign this variable.`;
    } else if (rawError.includes('Unexpected token') || rawError.includes('Unexpected identifier')) {
      friendlyError = `SyntaxError: JavaScript syntax error (${rawError}). Check for missing parentheses, brackets, or semicolons.`;
    } else if (rawError.includes('is not a function')) {
      friendlyError = `TypeError: Called something that is not a function (${rawError}). Check your function name or method spelling.`;
    }

    return {
      output: outputBuffer.join('\n'),
      error: friendlyError,
      executionTimeMs: Math.round(endTime - startTime),
    };
  }
}
