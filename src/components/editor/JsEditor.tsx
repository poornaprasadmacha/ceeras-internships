import React, { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import { cn } from '../../lib/utils';

export interface JsEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun?: () => void;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: string;
  className?: string;
}

export function JsEditor({
  value,
  onChange,
  onRun,
  placeholder = '// Write your JavaScript code here...',
  disabled = false,
  minHeight = '180px',
  className,
}: JsEditorProps) {
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
        borderColor: '#F7DF1E',
        boxShadow: '0 0 0 1px #F7DF1E',
      },
      '.cm-content': {
        padding: '12px',
        caretColor: '#F7DF1E',
      },
      '.cm-gutters': {
        backgroundColor: 'var(--bg-subtle)',
        color: 'var(--text-secondary)',
        borderRight: '1px solid var(--border-color)',
        paddingRight: '6px',
        fontSize: '12px',
      },
      '.cm-activeLine': {
        backgroundColor: 'rgba(247, 223, 30, 0.05)',
      },
      '.cm-activeLineGutter': {
        backgroundColor: 'rgba(247, 223, 30, 0.1)',
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
    return [javascript(), customTheme, runKeymapExtension];
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
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
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
