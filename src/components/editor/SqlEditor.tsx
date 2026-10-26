import React, { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { EditorView } from '@codemirror/view';
import { syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { cn } from '../../lib/utils';

export interface SqlEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun?: () => void;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: string;
  className?: string;
  themeMode?: 'dark' | 'light';
}

const darkHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: '#38bdf8', fontWeight: 'bold' },
  { tag: tags.operator, color: '#94a3b8' },
  { tag: tags.string, color: '#4ade80' },
  { tag: tags.number, color: '#fb923c' },
  { tag: tags.punctuation, color: '#94a3b8' },
  { tag: tags.variableName, color: '#f8fafc' },
  { tag: tags.comment, color: '#64748b', fontStyle: 'italic' },
]);

export function SqlEditor({
  value,
  onChange,
  onRun,
  placeholder = 'Write your SQL query here...',
  disabled = false,
  minHeight = '140px',
  className,
  themeMode = 'dark',
}: SqlEditorProps) {
  const customTheme = useMemo(() => {
    if (themeMode === 'dark') {
      return EditorView.theme({
        '&': {
          backgroundColor: '#1e293b',
          color: '#f8fafc',
          fontSize: '14px',
          fontFamily: '"JetBrains Mono", monospace',
          borderRadius: '6px',
          border: '1px solid #334155',
        },
        '&.cm-focused': {
          outline: 'none',
          borderColor: '#38bdf8',
          boxShadow: '0 0 0 1px #38bdf8',
        },
        '.cm-content': {
          padding: '12px 14px',
          caretColor: '#38bdf8',
        },
        '.cm-gutters': {
          backgroundColor: '#0f172a',
          color: '#64748b',
          borderRight: '1px solid #334155',
          paddingRight: '6px',
          fontSize: '12px',
        },
        '.cm-activeLine': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        },
        '.cm-activeLineGutter': {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          color: '#f8fafc',
        },
      });
    }

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
  }, [themeMode]);

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
    const list = [sql(), EditorView.lineWrapping, runKeymapExtension];
    if (themeMode === 'dark') {
      list.push(syntaxHighlighting(darkHighlightStyle));
    }
    return list;
  }, [runKeymapExtension, themeMode]);

  return (
    <div className={cn('relative w-full rounded-md overflow-hidden', className)}>
      <CodeMirror
        value={value}
        onChange={onChange}
        theme={customTheme}
        extensions={extensions}
        placeholder={placeholder}
        editable={!disabled}
        minHeight={minHeight}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          foldGutter: false,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: false,
          indentOnInput: true,
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
          foldKeymap: false,
          completionKeymap: true,
          lintKeymap: false,
        }}
      />
    </div>
  );
}
