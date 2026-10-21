/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="soft-dark"]'],
  theme: {
    extend: {
      colors: {
        app: 'var(--bg-app)',
        surface: 'var(--bg-surface)',
        subtle: 'var(--bg-subtle)',
        'text-main': 'var(--text-primary)',
        'text-muted': 'var(--text-secondary)',
        primary: {
          DEFAULT: 'var(--accent-primary)',
          hover: 'var(--accent-primary-hover)',
        },
        secondary: {
          DEFAULT: 'var(--accent-secondary)',
        },
        border: 'var(--border-color)',
        success: {
          DEFAULT: 'var(--status-success)',
          subtle: 'var(--status-success-subtle)',
        },
        warning: {
          DEFAULT: 'var(--status-warning)',
          subtle: 'var(--status-warning-subtle)',
        },
        error: {
          DEFAULT: 'var(--status-error)',
          subtle: 'var(--status-error-subtle)',
        },
        editor: {
          bg: 'var(--editor-bg)',
          text: 'var(--editor-text)',
        },
      },
      fontFamily: {
        raleway: ['Raleway', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        aboreto: ['Aboreto', 'cursive', 'sans-serif'],
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        card: '0 2px 8px -2px rgba(0, 0, 0, 0.06), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
