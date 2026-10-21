import React, { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { EditorView } from '@codemirror/view';
import { cn } from '../../lib/utils';

export interface CssEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun?: () => void;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: string;
  className?: string;
}

export function CssEditor({
  value,
  onChange,
  onRun,
  placeholder = '/* Write your CSS styles here */',
  disabled = false,
  minHeight = '180px',
  className,
}: CssEditorProps) {
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
        borderColor: '#1572B6',
        boxShadow: '0 0 0 1px #1572B6',
      },
      '.cm-content': {
        padding: '12px',
        caretColor: '#1572B6',
      },
      '.cm-gutters': {
        backgroundColor: 'var(--bg-subtle)',
        color: 'var(--text-secondary)',
        borderRight: '1px solid var(--border-color)',
        paddingRight: '6px',
        fontSize: '12px',
      },
      '.cm-activeLine': {
        backgroundColor: 'rgba(21, 114, 182, 0.04)',
      },
      '.cm-activeLineGutter': {
        backgroundColor: 'rgba(21, 114, 182, 0.08)',
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
    return [css(), customTheme, runKeymapExtension];
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
