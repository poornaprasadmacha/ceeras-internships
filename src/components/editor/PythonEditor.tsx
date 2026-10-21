import React, { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { EditorView } from '@codemirror/view';
import { cn } from '../../lib/utils';

export interface PythonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun?: () => void;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: string;
  className?: string;
}

export function PythonEditor({
  value,
  onChange,
  onRun,
  placeholder = 'Write your Python code here...',
  disabled = false,
  minHeight = '140px',
  className,
}: PythonEditorProps) {
  const customTheme = useMemo(() => {
    return EditorView.theme({
      '&': {
        backgroundColor: 'var(--editor-bg)',
        color: 'var(--editor-text)',
        fontSize: '14px',
        fontFamily: '"JetBrains Mono", monospace',
        borderRadius: '6px',
        border: '1px solid var(--border-color)',
      },
      '&.cm-focused': {
        outline: 'none',
        borderColor: 'var(--accent-primary)',
        boxShadow: '0 0 0 1px var(--accent-primary)',
      },
      '.cm-content': {
        padding: '12px',
        caretColor: 'var(--accent-primary)',
      },
      '.cm-gutters': {
        backgroundColor: 'var(--bg-subtle)',
        color: 'var(--text-secondary)',
        borderRight: '1px solid var(--border-color)',
        paddingRight: '6px',
        fontSize: '12px',
      },
      '.cm-activeLine': {
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
      },
      '.cm-activeLineGutter': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        color: 'var(--text-primary)',
      },
    });
  }, []);

  const runKeymapExtension = useMemo(() => {
    if (!onRun) return [];
    return EditorView.domEventHandlers({
      keydown: (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
          event.preventDefault();
          onRun();
          return true;
        }
        return false;
      },
    });
  }, [onRun]);

  const extensions = useMemo(() => {
    return [python(), customTheme, runKeymapExtension];
  }, [customTheme, runKeymapExtension]);

  return (
    <div
      className={cn(
        'relative font-mono text-sm border border-border rounded-lg overflow-hidden bg-editor-bg',
        className
      )}
    >
      <CodeMirror
        value={value}
        height={minHeight}
        minHeight={minHeight}
        theme="none"
        extensions={extensions}
        onChange={onChange}
        editable={!disabled}
        placeholder={placeholder}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: false,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: false,
          crosshairCursor: false,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </div>
  );
}
