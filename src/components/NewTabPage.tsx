'use client'

import { useState } from 'react'
import { 
  Search, ChevronDown, Plus, MessageSquare, Layers, 
  Sparkles, Clock, Globe, Folder, FileText, Image, Code,
  Settings, Bell, User, Menu, X, Sparkles as SparklesIcon
} from './icons'
import { Button } from './Button'
import { Input } from './Input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'
import { Dropdown, DropdownItem } from './Dropdown'

interface ChatSession {
  id: string
  title: string
  preview: string
  timestamp: string
  status?: 'running' | 'completed' | 'error'
  thumbnail?: string
}

interface Routine {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'completed'
  lastRun: string
}

export function NewTabPage({ 
  sessions = mockSessions, 
  routines = mockRoutines,
  onSearch,
  onNewChat,
  onNewSession
}: { 
  sessions?: ChatSession[]
  routines?: Routine[]
  onSearch?: (query: string) => void
  onNewChat?: () => void
  onNewSession?: () => void
}) {
  const [activeTab, setActiveTab] = useState<'search' | 'ask'>('search')
  const [subTab, setSubTab] = useState<'chats' | 'routines'>('chats')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-outline-variant bg-surface flex-shrink-0">
        <div className="max-w-[1320px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search or type a URL"
                className="input-base pl-10 pr-12 h-10 text-body-md"
                placeholder="Tab to switch"
              />
            </form>
            <div className="flex items-center gap-1 border border-outline-variant rounded-lg p-1 bg-surface-container-low">
              <button
                className={`px-4 py-2 rounded-default text-label-md font-medium transition-colors ${
                  activeTab === 'search' 
                    ? 'bg-surface text-on-surface shadow-level-1' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                onClick={() => setActiveTab('search')}
              >
                Search
              </button>
              <button
                className={`px-4 py-2 rounded-default text-label-md font-medium transition-colors ${
                  activeTab === 'ask' 
                    ? 'bg-surface text-on-surface shadow-level-1' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                onClick={() => setActiveTab('ask')}
              >
                Ask
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" aria-label="Open profile menu">
              <User size={18} />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden max-w-[1320px] mx-auto w-full px-6 py-6">
        <div className="h-full flex flex-col gap-4">
          {/* Sub-tabs */}
          <div className="flex gap-1 border-b border-outline-variant">
            <button
              className={`px-4 py-2 text-label-md font-medium border-b-2 transition-colors ${
                subTab === 'chats' 
                  ? 'border-primary text-on-surface' 
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
              onClick={() => setSubTab('chats')}
            >
              Chats
              <span className="ml-2 px-2 py-0.5 text-label-sm bg-primary-container text-on-primary-container rounded-full">
                {sessions.length}
              </span>
            </button>
            <button
              className={`px-4 py-2 text-label-md font-medium border-b-2 transition-colors ${
                subTab === 'routines' 
                  ? 'border-primary text-on-surface' 
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
              onClick={() => setSubTab('routines')}
            >
              Routines
              <span className="ml-2 px-2 py-0.5 text-label-sm bg-primary-container text-on-primary-container rounded-full">
                {routines.filter(r => r.status === 'active').length}
              </span>
            </button>
            <div className="flex-1" />
            <Button variant="ghost" size="sm" onClick={onNewChat} leftIcon={<Plus size={16} />}>
              New chat
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {subTab === 'chats' ? (
              <ChatList sessions={sessions} />
            ) : (
              <RoutineList routines={routines} />
            )}
          </div>

          {/* Suggested tasks */}
          <div className="border-t border-outline-variant pt-4">
            <Button variant="ghost" onClick={() => {}} className="w-full justify-start gap-3">
              <SparklesIcon size={20} />
              <span className="text-label-md">Show suggested tasks</span>
            </Button>
          </div>
        </div>
      </main>

      {/* Notifications region */}
      <div className="fixed bottom-4 right-4 z-50" role="region" aria-label="Notifications">
        <Button variant="secondary" size="sm" leftIcon={<Bell size={16} />}>
          Notifications
        </Button>
      </div>
    </div>
  )
}

function ChatList({ sessions }: { sessions: ChatSession[] }) {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <MessageSquare size={64} className="text-on-surface-variant/30 mb-4" />
        <h3 className="text-headline-md text-on-surface mb-2">No chats yet</h3>
        <p className="text-body-md text-on-surface-variant max-w-md">
          Start a new conversation with Aside. Ask it to research, write code, analyze data, or automate tasks across your logged-in websites.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <Button variant="primary" leftIcon={<Plus size={18} />} onClick={() => {}}>
            New chat
          </Button>
          <Button variant="secondary" leftIcon={<MessageSquare size={18} />} onClick={() => {}}>
            New session
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full overflow-y-auto p-2">
      {sessions.map(session => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  )
}

function SessionCard({ session }: { session: ChatSession }) {
  return (
    <Card className="h-full flex flex-col hover:shadow-level-3 transition-shadow">
      <CardContent className="flex-1 flex flex-col p-0">
        {session.thumbnail && (
          <div className="relative h-40 bg-surface-container overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex justify-end gap-2">
              <Button variant="ghost" size="sm" aria-label="Expand image">
                <Expand size={16} />
              </Button>
            </div>
          </div>
        )}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="text-title-lg font-medium text-on-surface truncate">{session.title}</h4>
            {session.status && (
              <span className={`px-2 py-0.5 text-label-sm rounded-full flex-shrink-0 ${
                session.status === 'running' ? 'bg-primary-container text-on-primary-container' :
                session.status === 'completed' ? 'bg-tertiary-container text-on-tertiary-container' :
                'bg-error-container text-on-error-container'
              }`}>
                {session.status}
              </span>
            )}
          </div>
          <p className="text-body-md text-on-surface-variant flex-1 mb-3 line-clamp-3">{session.preview}</p>
          <div className="flex items-center justify-between pt-2 border-t border-outline-variant">
            <span className="text-label-sm text-on-surface-variant/70">{session.timestamp}</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" aria-label="Continue chat">
                <MessageSquare size={16} />
              </Button>
              <Button variant="ghost" size="sm" aria-label="Open in new tab">
                <Globe size={16} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RoutineList({ routines }: { routines: Routine[] }) {
  if (routines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Layers size={64} className="text-on-surface-variant/30 mb-4" />
        <h3 className="text-headline-md text-on-surface mb-2">No active routines</h3>
        <p className="text-body-md text-on-surface-variant max-w-md">
          Let Aside handle the tasks you do on repeat. Create routines for daily briefings, report generation, data syncing, and more.
        </p>
        <Button variant="primary" leftIcon={<Plus size={18} />} onClick={() => {}} className="mt-4">
          Create routine
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3 h-full overflow-y-auto p-2">
      {routines.map(routine => (
        <RoutineCard key={routine.id} routine={routine} />
      ))}
    </div>
  )
}

function RoutineCard({ routine }: { routine: Routine }) {
  return (
    <Card hover onClick={() => {}} className="p-0">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-label-md font-medium text-on-surface">{routine.name}</h4>
              <span className={`px-2 py-0.5 text-label-sm rounded-full ${
                routine.status === 'active' ? 'bg-tertiary-container text-on-tertiary-container' :
                routine.status === 'paused' ? 'bg-secondary-container text-on-secondary-container' :
                'bg-surface-container-high text-on-surface'
              }`}>
                {routine.status}
              </span>
            </div>
            <p className="text-label-sm text-on-surface-variant">{routine.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span className="text-label-sm text-on-surface-variant">Last run: {routine.lastRun}</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">Edit</Button>
              <Button variant="secondary" size="sm">Run</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Mock data
const mockSessions: ChatSession[] = [
  {
    id: '1',
    title: 'How good is the Helium browser better than Chrome?',
    preview: 'Working for 1m 25s - Researching Helium browser features, privacy comparison with Chrome, memory usage benchmarks...',
    timestamp: '1m ago',
    status: 'running',
    thumbnail: 'https://picsum.photos/seed/helium/400/200',
  },
  {
    id: '2',
    title: 'What is the latest version of Zod?',
    preview: 'The latest version of Zod is 4.6.5. Released with improved type inference and performance...',
    timestamp: '3 minutes ago',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Is it possible to replace the Copilot model?',
    preview: 'GitHub App installation explained. For apps owned by personal accounts: can install on this account or any account you control...',
    timestamp: '20 hours ago',
    status: 'completed',
  },
  {
    id: '4',
    title: 'Design system for my new project',
    preview: 'Creating a comprehensive design system with tokens, components, and documentation...',
    timestamp: '2 days ago',
    status: 'completed',
  },
  {
    id: '5',
    title: 'React performance optimization',
    preview: 'Analyzing bundle size, implementing code splitting, and optimizing re-renders...',
    timestamp: '5 days ago',
    status: 'completed',
  },
  {
    id: '6',
    title: 'TypeScript strict mode migration',
    preview: 'Enabling strict mode across the codebase and fixing type errors...',
    timestamp: '1 week ago',
    status: 'completed',
  },
]

const mockRoutines: Routine[] = [
  {
    id: 'r1',
    name: 'Daily briefing',
    description: 'Morning summary of emails, calendar, and news',
    status: 'active',
    lastRun: 'Today 8:00 AM',
  },
  {
    id: 'r2',
    name: 'Weekly report',
    description: 'Generate analytics report every Monday',
    status: 'active',
    lastRun: 'Yesterday 9:00 AM',
  },
  {
    id: 'r3',
    name: 'Code review automation',
    description: 'Auto-assign reviewers and run checks',
    status: 'paused',
    lastRun: '3 days ago',
  },
]