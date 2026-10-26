import React, { useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CeerasHeader } from './CeerasHeader';
import { CeerasFooter } from './CeerasFooter';
import { RightPanel } from './RightPanel';
import { LessonDefinition } from '../../types/lesson';

export interface AppShellProps {
  children: ReactNode;
  activeLesson?: LessonDefinition;
  activeExerciseIndex?: number;
  solvedExerciseIds?: Set<string>;
  showRightPanelByDefault?: boolean;
}

export function AppShell({
  children,
  activeLesson,
  activeExerciseIndex = 0,
  solvedExerciseIds = new Set(),
  showRightPanelByDefault = false,
}: AppShellProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(showRightPanelByDefault);

  return (
    <div className="min-h-screen bg-app text-text-main flex flex-col antialiased">
      {/* If Home page: Show full-width Ceeras Header matching screenshot */}
      {isHome ? (
        <>
          <CeerasHeader />
          <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full pb-8 sm:pb-12">
            {children}
          </main>
          <CeerasFooter />
        </>
      ) : (
        /* Inside Course / Lessons / Sandbox: Show learning app shell with sidebar */
        <div className="flex flex-1">
          {/* Left Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Center Area */}
          <div className="flex-1 flex flex-col min-w-0">
            <Header
              onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
              onToggleRightPanel={() => setRightPanelOpen((prev) => !prev)}
              showRightPanelToggle={!!activeLesson}
              rightPanelOpen={rightPanelOpen}
            />

            <div className="flex-1 flex min-w-0">
              {/* Main Content View */}
              <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-3 sm:p-5 md:p-6 lg:p-8 max-w-6xl mx-auto w-full overflow-y-auto pb-8 sm:pb-12">
                  {children}
                </main>
              </div>

              {/* Optional Collapsible Right Companion Panel */}
              {activeLesson && (
                <RightPanel
                  lesson={activeLesson}
                  activeExerciseIndex={activeExerciseIndex}
                  solvedExerciseIds={solvedExerciseIds}
                  isOpen={rightPanelOpen}
                  onClose={() => setRightPanelOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
