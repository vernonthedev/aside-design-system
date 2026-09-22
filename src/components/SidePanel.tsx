'use client'

import { useState, ReactNode, useRef, useEffect } from 'react'
import { 
  ChevronDown, ChevronLeft, ChevronRight, Plus, MessageSquare, 
  Layers, X, Sparkles, Settings, Search, Expand 
} from './icons'
import { Button } from './Button'
import { Input } from './Input'
import { Dropdown, DropdownItem, Menu, MenuItem, MenuSeparator, MenuGroup } from './Dropdown'

export interface ChatSession {
  id: string
  title: string
  preview: string
  timestamp: string
  status?: 'running' | 'completed' | 'error'
  thumbnail?: string
}

export interface Routine {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'completed'
  lastRun: string
}

interface SidePanelProps {
  sessions: ChatSession[]
  routines: Routine[]
  activeSessionId?: string
  onNewChat: () => void
  onNewSession: () => void
  onSessionSelect: (id: string) => void
  onClose: () => void
  theme?: 'light' | 'dark' | 'system'
}

export function SidePanel({ 
  sessions, 
  routines, 
  activeSessionId, 
  onNewChat, 
  onNewSession, 
  onSessionSelect, 
  onClose,
  theme = 'system'
}: SidePanelProps) {
  const [activeTab, setActiveTab] = useState<'chats' | 'routines'>('chats')
  const [composerValue, setComposerValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(400)

  const handleResize = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = width

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(300, Math.min(600, startWidth + (startX - moveEvent.clientX)))
      setWidth(newWidth)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const modelOptions: DropdownItem[] = [
    { label: 'Nemotron 3 Ultra 550B', value: 'nemotron-3-ultra', icon: <Sparkles size={18} /> },
    { label: 'GPT-4 Turbo', value: 'gpt-4-turbo', icon: <Sparkles size={18} /> },
    { label: 'Claude 3 Opus', value: 'claude-3-opus', icon: <Sparkles size={18} /> },
    { label: 'Settings', value: 'settings', icon: <Settings size={18} /> },
  ]

  const reasoningOptions: DropdownItem[] = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Ultrabrowse', value: 'ultrabrowse', disabled: true },
  ]

  const permissionOptions: DropdownItem[] = [
    { label: 'Read only', value: 'read-only' },
    { label: 'Guard', value: 'guard' },
    { label: 'Full access', value: 'full-access' },
  ]

  const projectOptions: DropdownItem[] = [
    { label: 'Default Project', value: 'default' },
    { label: 'Work', value: 'work' },
    { label: 'Personal', value: 'personal' },
    { label: 'New Project...', value: 'new' },
  ]

  return (
    <div 
      ref={panelRef}
      className="side-panel flex flex-col"
      style={{ width: `${width}px` }}
      data-theme={theme}
    >
      {/* Resize handle */}
      <div 
        className="w-1 cursor-col-resize hover:bg-primary/20 transition-colors"
        onMouseDown={handleResize}
        aria-label="Resize panel"
      />

      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-outline-variant flex-shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare size={20} className="text-primary" />
          <span className="text-title-lg font-medium text-on-surface">Aside</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onNewChat} aria-label="New chat">
            <Plus size={18} />
          </Button>
          <Button variant="ghost" size="sm" onClick={onNewSession} aria-label="New session">
            <MessageSquare size={18} />
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close side panel">
            <X size={18} />
          </Button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="flex border-b border-outline-variant flex-shrink-0">
        <button
          className={`tab-vertical ${activeTab === 'chats' ? 'active' : ''}`}
          onClick={() => setActiveTab('chats')}
        >
          <MessageSquare size={18} />
          <span>Chats</span>
          <span className="ml-auto px-2 py-0.5 text-label-sm bg-primary-container text-on-primary-container rounded-full">
            {sessions.length}
          </span>
        </button>
        <button
          className={`tab-vertical ${activeTab === 'routines' ? 'active' : ''}`}
          onClick={() => setActiveTab('routines')}
        >
          <Layers size={18} />
          <span>Routines</span>
          <span className="ml-auto px-2 py-0.5 text-label-sm bg-primary-container text-on-primary-container rounded-full">
            {routines.filter(r => r.status === 'active').length}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chats' ? (
          <ChatList 
            sessions={sessions} 
            activeSessionId={activeSessionId} 
            onSelect={onSessionSelect}
          />
        ) : (
          <RoutineList routines={routines} />
        )}
      </div>

      {/* Composer */}
      <Composer
        value={composerValue}
        onChange={setComposerValue}
        onSubmit={() => {}}
        modelOptions={modelOptions}
        reasoningOptions={reasoningOptions}
        permissionOptions={permissionOptions}
        projectOptions={projectOptions}
        showSuggestions={showSuggestions}
        onToggleSuggestions={() => setShowSuggestions(!showSuggestions)}
      />
    </div>
  )
}

function ChatList({ sessions, activeSessionId, onSelect }: { sessions: ChatSession[], activeSessionId?: string, onSelect: (id: string) => void }) {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <MessageSquare size={48} className="text-on-surface-variant/50 mb-4" />
        <h3 className="text-title-lg text-on-surface mb-2">No chats yet</h3>
        <p className="text-body-md text-on-surface-variant">Start a new conversation to see it here</p>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-3 space-y-2">
      {sessions.map(session => (
        <button
          key={session.id}
          onClick={() => onSelect(session.id)}
          className={`w-full text-left p-3 rounded-lg transition-colors duration-150 ${
            activeSessionId === session.id 
              ? 'bg-primary-container text-on-primary-container' 
              : 'text-on-surface hover:bg-surface-container-low'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-label-md font-medium truncate">{session.title}</h4>
            {session.status && (
              <span className={`px-2 py-0.5 text-label-sm rounded-full ${
                session.status === 'running' ? 'bg-primary-container text-on-primary-container' :
                session.status === 'completed' ? 'bg-tertiary-container text-on-tertiary-container' :
                'bg-error-container text-on-error-container'
              }`}>
                {session.status}
              </span>
            )}
          </div>
          <p className="text-label-sm text-on-surface-variant truncate mb-2">{session.preview}</p>
          <div className="flex items-center justify-between">
            <span className="text-label-sm text-on-surface-variant/70">{session.timestamp}</span>
            {session.thumbnail && (
              <button className="p-1 rounded hover:bg-surface-container transition-colors" aria-label="Expand image">
                <Expand size={14} />
              </button>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}

function RoutineList({ routines }: { routines: Routine[] }) {
  if (routines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <Layers size={48} className="text-on-surface-variant/50 mb-4" />
        <h3 className="text-title-lg text-on-surface mb-2">No active routines</h3>
        <p className="text-body-md text-on-surface-variant">Let Aside handle the tasks you do on repeat</p>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-3 space-y-2">
      {routines.map(routine => (
        <div key={routine.id} className="card-base p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h4 className="text-label-md font-medium text-on-surface">{routine.name}</h4>
              <p className="text-label-sm text-on-surface-variant mt-0.5">{routine.description}</p>
            </div>
            <span className={`px-2 py-0.5 text-label-sm rounded-full ${
              routine.status === 'active' ? 'bg-tertiary-container text-on-tertiary-container' :
              routine.status === 'paused' ? 'bg-secondary-container text-on-secondary-container' :
              'bg-surface-container-high text-on-surface'
            }`}>
              {routine.status}
            </span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-label-sm text-on-surface-variant">Last run: {routine.lastRun}</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">Edit</Button>
              <Button variant="secondary" size="sm">Run</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Composer({ 
  value, 
  onChange, 
  onSubmit,
  modelOptions,
  reasoningOptions,
  permissionOptions,
  projectOptions,
  showSuggestions,
  onToggleSuggestions
}: {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  modelOptions: DropdownItem[]
  reasoningOptions: DropdownItem[]
  permissionOptions: DropdownItem[]
  projectOptions: DropdownItem[]
  showSuggestions: boolean
  onToggleSuggestions: () => void
}) {
  return (
    <div className="border-t border-outline-variant p-4 flex-shrink-0 space-y-3">
      {/* Input area */}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              onSubmit()
            }
          }}
          placeholder="Ask AI a task, @ for context"
          className="input-base min-h-[60px] max-h-[150px] resize-y pr-12"
          rows={2}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-1">
          <Button variant="ghost" size="sm" aria-label="Attach file">
            <Search size={18} />
          </Button>
          <Button variant="primary" size="sm" onClick={onSubmit} disabled={!value.trim()} aria-label="Send">
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-2 flex-wrap">
        <Dropdown
          trigger={<Button variant="secondary" size="sm"><span>Project</span> <ChevronDown size={14} /></Button>}
          items={projectOptions}
          value="default"
          placeholder="Project"
        />
        <Dropdown
          trigger={<Button variant="secondary" size="sm"><span>Full access</span> <ChevronDown size={14} /></Button>}
          items={permissionOptions}
          value="full-access"
          placeholder="Permission"
        />
        <Dropdown
          trigger={<Button variant="secondary" size="sm"><span>Nemotron 3 Ultra 550B</span> <ChevronDown size={14} /></Button>}
          items={modelOptions}
          value="nemotron-3-ultra"
          placeholder="Model"
          searchable
        />
        <Dropdown
          trigger={<Button variant="secondary" size="sm"><span>High</span> <ChevronDown size={14} /></Button>}
          items={reasoningOptions}
          value="high"
          placeholder="Reasoning"
        />
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <div className="pt-2 border-t border-outline-variant">
          <Button variant="ghost" size="sm" onClick={onToggleSuggestions} className="w-full justify-start">
            <ChevronUp size={16} />
            <span>Hide suggested tasks</span>
          </Button>
        </div>
      )}
    </div>
  )
}