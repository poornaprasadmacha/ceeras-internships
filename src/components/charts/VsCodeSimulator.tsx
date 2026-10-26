import React, { useState } from 'react';
import { VsCodeIdeState } from '../../types/vscodeLesson';
import {
  Folder,
  Search,
  GitBranch,
  Play,
  Settings,
  Terminal,
  FileCode,
  X,
  ChevronRight,
  ChevronDown,
  Check,
  AlertTriangle,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Command,
} from 'lucide-react';

interface VsCodeSimulatorProps {
  state: VsCodeIdeState;
  onOpenFile?: (path: string) => void;
  onCloseTab?: (path: string) => void;
  onSwitchSidebar?: (sidebar: VsCodeIdeState['activeSidebar']) => void;
  onUpdateContent?: (path: string, content: string) => void;
  onRunCommand?: (command: string) => void;
  className?: string;
}

export function VsCodeSimulator({
  state,
  onOpenFile,
  onCloseTab,
  onSwitchSidebar,
  onUpdateContent,
  onRunCommand,
  className = '',
}: VsCodeSimulatorProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    src: true,
    '.vscode': true,
  });
  const [activeBottomTab, setActiveBottomTab] = useState<'terminal' | 'problems' | 'output'>('terminal');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandInput, setCommandInput] = useState('');

  const toggleFolder = (folder: string) => {
    setExpandedFolders((prev) => ({ ...prev, [folder]: !prev[folder] }));
  };

  const handleCommandSelect = (cmd: string) => {
    if (onRunCommand) onRunCommand(cmd);
    setCommandPaletteOpen(false);
    setCommandInput('');
  };

  const currentContent = state.files[state.activeFile] || '';
  const lines = currentContent.split('\n');

  return (
    <div
      className={`flex flex-col bg-[#1E1E1E] text-neutral-300 rounded-xl border border-[#333333] overflow-hidden shadow-md font-sans text-xs ${className}`}
    >
      {/* Top Titlebar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#323233] border-b border-[#252526] text-[11px] text-neutral-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-neutral-300 ml-2 font-medium">
            {state.activeFile ? `${state.activeFile} — Ceeras Studio` : 'Visual Studio Code'}
          </span>
        </div>

        {/* Global Command Palette trigger button */}
        <button
          type="button"
          onClick={() => setCommandPaletteOpen(!commandPaletteOpen)}
          className="px-3 py-0.5 rounded bg-[#252526] hover:bg-[#3c3c3c] text-neutral-300 border border-[#444] transition-colors flex items-center gap-1.5 cursor-pointer text-[11px]"
        >
          <Search className="w-3 h-3 text-neutral-400" />
          <span>Search or type a command (Ctrl+Shift+P)</span>
        </button>

        <div className="text-[10px] text-neutral-500 font-mono">VS Code v1.93</div>
      </div>

      {/* Main Workbench Body */}
      <div className="flex flex-1 min-h-[380px] max-h-[500px]">
        {/* 1. Left Vertical Activity Bar */}
        <div className="w-12 bg-[#333333] border-r border-[#252526] flex flex-col items-center justify-between py-2 shrink-0">
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => onSwitchSidebar?.('explorer')}
              title="Explorer (Ctrl+Shift+E)"
              className={`p-2 rounded hover:text-white transition-colors cursor-pointer relative ${
                state.activeSidebar === 'explorer' ? 'text-white' : 'text-neutral-400'
              }`}
            >
              {state.activeSidebar === 'explorer' && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
              )}
              <Folder className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => onSwitchSidebar?.('search')}
              title="Search (Ctrl+Shift+F)"
              className={`p-2 rounded hover:text-white transition-colors cursor-pointer relative ${
                state.activeSidebar === 'search' ? 'text-white' : 'text-neutral-400'
              }`}
            >
              {state.activeSidebar === 'search' && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
              )}
              <Search className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => onSwitchSidebar?.('git')}
              title="Source Control (Ctrl+Shift+G)"
              className={`p-2 rounded hover:text-white transition-colors cursor-pointer relative ${
                state.activeSidebar === 'git' ? 'text-white' : 'text-neutral-400'
              }`}
            >
              {state.activeSidebar === 'git' && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
              )}
              <GitBranch className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => onSwitchSidebar?.('debug')}
              title="Run & Debug (Ctrl+Shift+D)"
              className={`p-2 rounded hover:text-white transition-colors cursor-pointer relative ${
                state.activeSidebar === 'debug' ? 'text-white' : 'text-neutral-400'
              }`}
            >
              {state.activeSidebar === 'debug' && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
              )}
              <Play className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => onSwitchSidebar?.('extensions')}
              title="Extensions (Ctrl+Shift+X)"
              className={`p-2 rounded hover:text-white transition-colors cursor-pointer relative ${
                state.activeSidebar === 'extensions' ? 'text-white' : 'text-neutral-400'
              }`}
            >
              {state.activeSidebar === 'extensions' && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
              )}
              <Cpu className="w-5 h-5" />
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={() => onSwitchSidebar?.('settings')}
              title="Settings (Ctrl+,)"
              className={`p-2 rounded hover:text-white transition-colors cursor-pointer ${
                state.activeSidebar === 'settings' ? 'text-white' : 'text-neutral-400'
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Primary Side Bar */}
        <div className="w-48 sm:w-56 bg-[#252526] border-r border-[#1E1E1E] flex flex-col shrink-0 overflow-y-auto">
          {state.activeSidebar === 'explorer' && (
            <div className="p-2 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-1 flex items-center justify-between">
                <span>Explorer: Project</span>
              </div>

              {/* Folder: src */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleFolder('src')}
                  className="w-full flex items-center gap-1.5 px-2 py-1 rounded hover:bg-[#2a2d2e] text-left text-neutral-300 font-medium cursor-pointer"
                >
                  {expandedFolders.src ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                  <span>src</span>
                </button>

                {expandedFolders.src && (
                  <div className="pl-4 space-y-0.5">
                    {['src/index.ts', 'src/App.tsx', 'src/utils/math.ts'].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => onOpenFile?.(f)}
                        className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-left text-[11px] cursor-pointer ${
                          state.activeFile === f
                            ? 'bg-[#37373d] text-white font-medium'
                            : 'hover:bg-[#2a2d2e] text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <FileCode className="w-3.5 h-3.5 text-blue-400" />
                        <span className="truncate">{f.replace('src/', '')}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Folder: .vscode */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleFolder('.vscode')}
                  className="w-full flex items-center gap-1.5 px-2 py-1 rounded hover:bg-[#2a2d2e] text-left text-neutral-300 font-medium cursor-pointer"
                >
                  {expandedFolders['.vscode'] ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                  <span>.vscode</span>
                </button>

                {expandedFolders['.vscode'] && (
                  <div className="pl-4 space-y-0.5">
                    {['.vscode/settings.json', '.vscode/launch.json', '.vscode/tasks.json'].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => onOpenFile?.(f)}
                        className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-left text-[11px] cursor-pointer ${
                          state.activeFile === f
                            ? 'bg-[#37373d] text-white font-medium'
                            : 'hover:bg-[#2a2d2e] text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <FileCode className="w-3.5 h-3.5 text-amber-400" />
                        <span className="truncate">{f.replace('.vscode/', '')}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Root Files */}
              <button
                type="button"
                onClick={() => onOpenFile?.('package.json')}
                className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-left text-[11px] cursor-pointer ${
                  state.activeFile === 'package.json'
                    ? 'bg-[#37373d] text-white font-medium'
                    : 'hover:bg-[#2a2d2e] text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-rose-400" />
                <span>package.json</span>
              </button>
            </div>
          )}

          {state.activeSidebar === 'search' && (
            <div className="p-3 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Search Files
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-2 py-1 rounded bg-[#3c3c3c] border border-[#555] text-xs text-white focus:outline-hidden"
              />
              <div className="text-[11px] text-neutral-500 pt-2">
                Type text to find occurrences across project files.
              </div>
            </div>
          )}

          {state.activeSidebar === 'git' && (
            <div className="p-3 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Source Control: Git
              </span>
              <div className="p-2 rounded bg-[#1E1E1E] border border-[#333] space-y-2">
                <input
                  type="text"
                  placeholder="Message (Ctrl+Enter to commit)"
                  className="w-full bg-transparent text-xs text-white focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => onRunCommand?.('git commit')}
                  className="w-full py-1 rounded bg-primary text-white text-xs font-medium cursor-pointer"
                >
                  Commit
                </button>
              </div>
              <div className="text-[11px] text-neutral-400">
                <span>Working tree synchronized with main.</span>
              </div>
            </div>
          )}

          {state.activeSidebar === 'debug' && (
            <div className="p-3 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Run and Debug
              </span>
              <div className="p-2 rounded bg-primary/10 border border-primary/20 text-xs text-primary flex items-center gap-2">
                <Play className="w-3.5 h-3.5" />
                <span>Debug Current File</span>
              </div>
              <div className="text-[11px] text-neutral-500 pt-1">
                Active launch configuration from .vscode/launch.json.
              </div>
            </div>
          )}

          {state.activeSidebar === 'extensions' && (
            <div className="p-3 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Extensions
              </span>
              {[
                { name: 'Prettier - Code formatter', author: 'esbenp', installed: true },
                { name: 'ESLint', author: 'Microsoft', installed: true },
                { name: 'GitLens — Git supercharged', author: 'GitKraken', installed: true },
                { name: 'Python', author: 'Microsoft', installed: true },
              ].map((ext) => (
                <div key={ext.name} className="p-2 rounded bg-[#1E1E1E] border border-[#333] space-y-1">
                  <div className="font-semibold text-white text-[11px] flex items-center justify-between">
                    <span>{ext.name}</span>
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div className="text-[10px] text-neutral-500">{ext.author} • Installed</div>
                </div>
              ))}
            </div>
          )}

          {state.activeSidebar === 'settings' && (
            <div className="p-3 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Settings Editor
              </span>
              <button
                type="button"
                onClick={() => onOpenFile?.('.vscode/settings.json')}
                className="w-full py-1.5 px-2 rounded bg-primary text-white text-xs font-medium cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Edit settings.json</span>
              </button>
            </div>
          )}
        </div>

        {/* 3. Editor & Terminal Workspace */}
        <div className="flex-1 flex flex-col bg-[#1E1E1E] overflow-hidden">
          {/* Tab Bar */}
          <div className="flex items-center bg-[#252526] border-b border-[#1E1E1E] overflow-x-auto">
            {state.openTabs.map((tab) => {
              const isActive = state.activeFile === tab;
              const fileName = tab.split('/').pop() || tab;
              return (
                <div
                  key={tab}
                  onClick={() => onOpenFile?.(tab)}
                  className={`flex items-center gap-2 px-3 py-1.5 border-r border-[#1E1E1E] cursor-pointer text-[11px] transition-colors shrink-0 ${
                    isActive
                      ? 'bg-[#1E1E1E] text-white border-t-2 border-t-primary font-medium'
                      : 'bg-[#2D2D2D] text-neutral-400 hover:bg-[#252526]'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-blue-400" />
                  <span>{fileName}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseTab?.(tab);
                    }}
                    className="p-0.5 rounded hover:bg-white/10 text-neutral-500 hover:text-white cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Editor Body */}
          <div className="flex-1 flex overflow-hidden">
            {/* Line Number Gutter */}
            <div className="w-10 bg-[#1E1E1E] border-r border-[#2d2d2d] py-3 text-right pr-2 text-neutral-600 font-mono text-xs select-none space-y-0.5">
              {lines.map((_, i) => (
                <div key={i} className="hover:text-neutral-300 cursor-pointer">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Editable Code Canvas */}
            <textarea
              value={currentContent}
              onChange={(e) => onUpdateContent?.(state.activeFile, e.target.value)}
              className="flex-1 bg-[#1E1E1E] text-neutral-200 font-mono text-xs p-3 focus:outline-hidden resize-none leading-relaxed overflow-y-auto selection:bg-[#264F78]"
              spellCheck={false}
            />
          </div>

          {/* Bottom Panel (Terminal / Problems) */}
          <div className="h-32 bg-[#181818] border-t border-[#2d2d2d] flex flex-col shrink-0">
            <div className="flex items-center gap-3 px-3 py-1 bg-[#252526] border-b border-[#181818] text-[11px]">
              <button
                type="button"
                onClick={() => setActiveBottomTab('terminal')}
                className={`flex items-center gap-1.5 cursor-pointer pb-0.5 ${
                  activeBottomTab === 'terminal'
                    ? 'text-white border-b-2 border-primary font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3 h-3" />
                <span>TERMINAL</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveBottomTab('problems')}
                className={`flex items-center gap-1.5 cursor-pointer pb-0.5 ${
                  activeBottomTab === 'problems'
                    ? 'text-white border-b-2 border-primary font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                <span>PROBLEMS (0)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveBottomTab('output')}
                className={`flex items-center gap-1.5 cursor-pointer pb-0.5 ${
                  activeBottomTab === 'output'
                    ? 'text-white border-b-2 border-primary font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>OUTPUT</span>
              </button>
            </div>

            <div className="flex-1 p-2 font-mono text-xs text-neutral-300 overflow-y-auto whitespace-pre-wrap">
              {activeBottomTab === 'terminal' ? (
                state.terminalOutput
              ) : activeBottomTab === 'problems' ? (
                <span className="text-neutral-500">No problems have been detected in the workspace.</span>
              ) : (
                <span className="text-neutral-500">[Prettier] Formatted successfully.</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#007ACC] text-white text-[11px] font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <GitBranch className="w-3 h-3" />
            <span>{state.statusInfo.branch}</span>
          </div>

          <div className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span>{state.statusInfo.errors}</span>
            <span>{state.statusInfo.warnings}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span>
            Ln {state.statusInfo.line}, Col {state.statusInfo.col}
          </span>
          <span>Spaces: {state.statusInfo.spaces}</span>
          <span>UTF-8</span>
          <span>{state.statusInfo.language}</span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3" />
            Prettier
          </span>
        </div>
      </div>

      {/* Command Palette Modal */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 animate-fadeIn">
          <div className="w-[520px] bg-[#252526] rounded-lg border border-[#454545] shadow-2xl overflow-hidden text-neutral-200">
            <div className="p-2 border-b border-[#3c3c3c]">
              <input
                type="text"
                autoFocus
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="> Type a command to run..."
                className="w-full bg-[#3c3c3c] text-white text-xs px-3 py-2 rounded focus:outline-hidden"
              />
            </div>

            <div className="max-h-60 overflow-y-auto divide-y divide-[#333]">
              {[
                { label: 'View: Toggle Terminal', id: 'workbench.action.terminal.toggleTerminal' },
                { label: 'Format Document (Prettier)', id: 'editor.action.formatDocument' },
                { label: 'Preferences: Open User Settings (JSON)', id: 'workbench.action.openSettingsJson' },
                { label: 'View: Show Explorer', id: 'workbench.view.explorer' },
                { label: 'View: Show Source Control', id: 'workbench.view.scm' },
                { label: 'View: Show Run and Debug', id: 'workbench.view.debug' },
                { label: 'View: Show Extensions', id: 'workbench.view.extensions' },
              ].map((cmd) => (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => handleCommandSelect(cmd.id)}
                  className="w-full px-3 py-2 text-left text-xs hover:bg-[#094771] hover:text-white flex items-center justify-between cursor-pointer"
                >
                  <span>{cmd.label}</span>
                  <span className="text-[10px] text-neutral-500 font-mono">{cmd.id}</span>
                </button>
              ))}
            </div>

            <div className="p-2 bg-[#1E1E1E] border-t border-[#333] flex justify-end">
              <button
                type="button"
                onClick={() => setCommandPaletteOpen(false)}
                className="px-3 py-1 rounded text-xs bg-[#3c3c3c] hover:bg-[#4c4c4c] text-white cursor-pointer"
              >
                Close (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
