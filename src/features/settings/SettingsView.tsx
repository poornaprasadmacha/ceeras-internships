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
      <div className="border-b border-border pb-6 space-y-2">
        <Badge variant="accent" size="sm">
          Preferences
        </Badge>
        <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main flex items-center gap-3">
          <Settings className="w-7 h-7 text-primary" />
          <span>Platform Settings</span>
        </h1>
        <p className="text-sm text-text-muted max-w-2xl leading-relaxed">
          Customize your study experience. All preferences and themes are saved locally on this browser.
        </p>
      </div>

      {/* Visual Themes */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-text-main">Visual Reading Themes</h2>
        </div>
        <p className="text-xs text-text-muted">
          Choose an eye-soothing theme optimized for long study sessions. The interface updates instantly without refreshing.
        </p>

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
                      backgroundColor:
                        t.id === 'soft-light'
                          ? '#F6F8F6'
                          : t.id === 'warm-paper'
                          ? '#FAF7F2'
                          : '#151B18',
                    }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-border"
                    style={{
                      backgroundColor:
                        t.id === 'soft-light'
                          ? '#356859'
                          : t.id === 'warm-paper'
                          ? '#6E5034'
                          : '#5E9882',
                    }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-border"
                    style={{
                      backgroundColor:
                        t.id === 'soft-light'
                          ? '#FFFFFF'
                          : t.id === 'warm-paper'
                          ? '#FFFFFF'
                          : '#1B231F',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Local Storage & Privacy Guarantee */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-text-main">Zero-Tracking Privacy Guarantee</h2>
        </div>
        <Card variant="subtle" className="p-5 space-y-2 text-xs leading-relaxed text-text-main">
          <p>
            QueryPath was designed according to strict privacy-first principles. Your SQL statements, exercise attempts, quiz answers, notes, and study bookmarks are executed and persisted exclusively in your browser using WebAssembly SQLite and IndexedDB.
          </p>
          <p className="text-text-muted pt-1">
            No telemetry, tracking pixels, or remote database synchronizations are active. To back up your data across computers or profiles, use the JSON Export feature on the Progress page.
          </p>
        </Card>
      </div>

      {/* Offline Operation Info */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-text-main">Offline Caching & Service Worker</h2>
        </div>
        <Card className="p-5 space-y-2 text-xs text-text-muted leading-relaxed">
          <p className="font-semibold text-text-main">
            Status: Offline-ready via Service Worker
          </p>
          <p>
            After your initial visit, all core application assets, fonts, lesson definitions, and the WebAssembly SQLite binary are cached in your browser. You can disconnect your network and continue reading lessons, writing queries, and taking quizzes without interruption.
          </p>
        </Card>
      </div>
    </div>
  );
}
