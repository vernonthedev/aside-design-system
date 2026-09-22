'use client'

import { useState } from 'react'
import { 
  Sun, Moon, Monitor, ChevronDown, ChevronRight, 
  Sparkles, Code, Terminal, Image, FileText, Copy, CheckCircle,
  MessageSquare, Bot, User, Layers, Settings, Search, Plus,
  ChevronLeft, X, Expand, Zap, Play, Pause, Stop
} from '@/components/icons'
import { Button } from '@/components/Button'
import { Dropdown } from '@/components/Dropdown'
import { SidePanel } from '@/components/SidePanel'
import { NewTabPage } from '@/components/NewTabPage'
import { ThemeProvider, useTheme } from '@/components/ThemeProvider'
import { 
  Overview, SidePanelDemo, NewTabDemo
} from '@/components/DemoComponents'

const mockSessions = [
  { id: '1', title: 'Helium browser vs Chrome comparison', preview: 'Researching Helium browser features, privacy comparison with Chrome, memory usage benchmarks...', timestamp: '1m ago', status: 'running' as const },
  { id: '2', title: 'Latest Zod version', preview: 'The latest version of Zod is 4.6.5. Released with improved type inference...', timestamp: '3 min ago', status: 'completed' as const },
  { id: '3', title: 'GitHub App installation', preview: 'For apps owned by personal accounts: can install on this account or any account you control...', timestamp: '20h ago', status: 'completed' as const },
]

const mockRoutines = [
  { id: 'r1', name: 'Daily briefing', description: 'Morning summary of emails, calendar, and news', status: 'active' as const, lastRun: 'Today 8:00 AM' },
  { id: 'r2', name: 'Weekly report', description: 'Generate analytics report every Monday', status: 'active' as const, lastRun: 'Yesterday 9:00 AM' },
  { id: 'r3', name: 'Code review automation', description: 'Auto-assign reviewers and run checks', status: 'paused' as const, lastRun: '3 days ago' },
]

function DemoPage() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [sidePanelOpen, setSidePanelOpen] = useState(false)
  const [newTabOpen, setNewTabOpen] = useState(false)
  const [activeView, setActiveView] = useState<'overview' | 'sidepanel' | 'newtab'>('overview')

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b border-outline-variant bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1320px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-title-lg font-medium text-on-surface">Aside Design System</span>
            <nav className="flex items-center gap-1 ml-4 border-l border-outline-variant pl-4">
              {['overview', 'sidepanel', 'newtab'].map(view => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-3 py-1.5 text-label-sm rounded-default transition-colors ${
                    activeView === view 
                      ? 'bg-primary text-on-primary' 
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Dropdown
              trigger={
                <Button variant="ghost" size="sm" leftIcon={
                  theme === 'light' ? <Sun size={18} /> : 
                  theme === 'dark' ? <Moon size={18} /> : 
                  <Monitor size={18} />
                }>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  <ChevronDown size={14} />
                </Button>
              }
              items={[
                { label: 'Light', value: 'light', icon: <Sun size={16} /> },
                { label: 'Dark', value: 'dark', icon: <Moon size={16} /> },
                { label: 'System', value: 'system', icon: <Monitor size={16} /> },
              ]}
              value={theme}
              onChange={setTheme}
              placeholder="Theme"
            />
            <Button variant="ghost" size="sm" onClick={() => setSidePanelOpen(true)} leftIcon={<MessageSquare size={18} />}>
              Side Panel
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setNewTabOpen(true)} leftIcon={<Plus size={18} />}>
              New Tab
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1320px] mx-auto px-6 py-8">
        {activeView === 'overview' && <Overview />}
        {activeView === 'sidepanel' && <SidePanelDemo onOpenSidePanel={() => setSidePanelOpen(true)} />}
        {activeView === 'newtab' && <NewTabDemo onOpenNewTab={() => setNewTabOpen(true)} />}
      </main>

      {/* Side Panel Modal */}
      {sidePanelOpen && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidePanelOpen(false)} />
          <SidePanel
            sessions={mockSessions}
            routines={mockRoutines}
            onNewChat={() => {}}
            onNewSession={() => {}}
            onSessionSelect={() => {}}
            onClose={() => setSidePanelOpen(false)}
            theme={theme}
          />
        </div>
      )}

      {/* New Tab Modal */}
      {newTabOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setNewTabOpen(false)}>
          <div className="w-full max-w-4xl h-[90vh] bg-surface rounded-lg shadow-level-3 overflow-hidden" onClick={e => e.stopPropagation()}>
            <NewTabPage 
              sessions={mockSessions} 
              routines={mockRoutines}
              onNewChat={() => {}}
              onNewSession={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <ThemeProvider defaultTheme="system">
      <DemoPage />
    </ThemeProvider>
  )
}