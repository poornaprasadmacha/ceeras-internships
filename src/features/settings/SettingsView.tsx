import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { THEMES } from '../../lib/constants';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Settings, Palette, HardDrive, Shield, Check } from 'lucide-react';

export function SettingsView() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      {/* Header */}
      <div className="border-b border-border pb-5">
        <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main flex items-center gap-3">
          <Settings className="w-7 h-7 text-primary" />
          <span>Platform Settings</span>
        </h1>
      </div>

      {/* Visual Themes */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-text-main">Visual Reading Themes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {THEMES.map((t) => {
            const isSelected = theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'border-primary bg-surface shadow-card'
                    : 'border-border bg-subtle hover:bg-border/60'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-text-main">{t.label}</span>
                    {isSelected && (
                      <Badge variant="success" size="sm">
                        <Check className="w-3 h-3" />
                        <span>Active</span>
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">{t.description}</p>
                </div>

                {/* Theme Palette Swatch Preview */}
                <div className="pt-2 flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full border border-border"
                    style={{
                      backgroundColor: t.id === 'light' ? '#FFFFFF' : '#15202B',
                    }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-border"
                    style={{
                      backgroundColor: t.id === 'light' ? '#0066CC' : '#007BFF',
                    }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-border"
                    style={{
                      backgroundColor: t.id === 'light' ? '#0F172A' : '#FFFFFF',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Local Storage & Privacy Guarantee */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-text-main">Zero-Tracking Privacy Guarantee</h2>
        </div>
        <Card variant="subtle" className="p-4 text-xs leading-relaxed text-text-main">
          <p>
            All exercise attempts, notes, query results, and progress persist exclusively inside your local browser using SQLite WASM and IndexedDB. No external telemetry or tracking is collected.
          </p>
        </Card>
      </div>

      {/* Offline Operation Info */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-text-main">Offline Caching & Service Worker</h2>
        </div>
        <Card className="p-4 text-xs text-text-muted leading-relaxed">
          <p>
            Core application assets, fonts, lesson definitions, and the WebAssembly SQLite binary are cached locally for uninterrupted offline learning.
          </p>
        </Card>
      </div>
    </div>
  );
}
