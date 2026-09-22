'use client'

import { useState } from 'react'
import { ReactNode } from 'react'
import { 
  Copy, CheckCircle, AlertCircle, Code, Terminal, Image, FileText, 
  Expand, ChevronDown, ChevronUp, Bot, User, Sparkles 
} from './icons'
import { Button } from './Button'
import { Dropdown, Menu, MenuItem, MenuSeparator, MenuGroup } from './Dropdown'

export interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: ReactNode
  timestamp?: string
  status?: 'sending' | 'sent' | 'error' | 'streaming'
  metadata?: {
    model?: string
    tokens?: number
    duration?: string
  }
  actions?: Array<{
    label: string
    onClick: () => void
    icon?: ReactNode
  }>
  children?: ReactNode
}

export function ChatMessage({ 
  role, 
  content, 
  timestamp, 
  status = 'sent', 
  metadata, 
  actions = [],
  children
}: ChatMessageProps) {
  const isUser = role === 'user'
  const isAssistant = role === 'assistant'
  const isTool = role === 'tool'
  const isSystem = role === 'system'

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} mb-4`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-primary text-on-primary' :
        isAssistant ? 'bg-primary-container text-on-primary-container' :
        isTool ? 'bg-tertiary-container text-on-tertiary-container' :
        'bg-surface-container-high text-on-surface'
      }`}>
        {isUser ? (
          <User size={18} />
        ) : isAssistant ? (
          <Sparkles size={16} />
        ) : isTool ? (
          <Terminal size={16} />
        ) : (
          <Bot size={16} />
        )}
      </div>
      <div className={`flex-1 min-w-0 ${isUser ? 'text-right' : ''}`}>
        <div className={`message-bubble ${isUser ? 'message-user' : isAssistant ? 'message-assistant' : 'message-tool'}`}>
          {typeof content === 'string' ? (
            <div className="whitespace-pre-wrap break-words">{content}</div>
          ) : (
            <>{content}</>
          )}
          {children}
        </div>
        <div className="flex items-center justify-between mt-1.5 gap-2">
          <div className="flex items-center gap-1.5">
            {timestamp && (
              <span className="text-label-sm text-on-surface-variant/70">{timestamp}</span>
            )}
            {metadata?.model && (
              <span className="px-1.5 py-0.5 text-label-sm bg-surface-container-high text-on-surface-variant rounded">
                {metadata.model}
              </span>
            )}
            {metadata?.tokens && (
              <span className="text-label-sm text-on-surface-variant/70">{metadata.tokens} tokens</span>
            )}
            {metadata?.duration && (
              <span className="text-label-sm text-on-surface-variant/70">{metadata.duration}</span>
            )}
            {status === 'streaming' && (
              <span className="flex items-center gap-1 text-label-sm text-primary">
                <span className="animate-pulse">●</span>
                Streaming...
              </span>
            )}
            {status === 'error' && (
              <span className="flex items-center gap-1 text-label-sm text-error">
                <AlertCircle size={12} /> Error
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {actions.map((action, index) => (
              <Button key={index} variant="ghost" size="sm" onClick={action.onClick}>
                {action.icon}
                {action.label && <span className="hidden sm:inline">{action.label}</span>}
              </Button>
            ))}
            <Dropdown
              trigger={
                <Button variant="ghost" size="sm" aria-label="More options">
                  <ChevronDown size={16} />
                </Button>
              }
              items={[
                { label: 'Copy', value: 'copy', icon: <Copy size={16} />, shortcut: '⌘C' },
                { label: 'Edit', value: 'edit', icon: <ChevronDown size={16} /> },
                { type: 'separator' },
                { label: 'Delete', value: 'delete', icon: <AlertCircle size={16} />, destructive: true },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  onCopy?: () => void
}

export function CodeBlock({ code, language = '', filename, onCopy }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    onCopy?.()
  }

  return (
    <div className="code-block relative group my-3">
      <div className="flex items-center justify-between px-4 py-2 border-b border-outline-variant bg-surface-container-high">
        <div className="flex items-center gap-2">
          {filename && <span className="text-label-sm text-on-surface font-mono">{filename}</span>}
          {language && <span className="px-2 py-0.5 text-label-sm bg-surface-container text-on-surface-variant rounded">{language}</span>}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleCopy}
          leftIcon={copied ? <CheckCircle size={16} className="text-tertiary" /> : <Copy size={16} />}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto"><code className={`language-${language} text-sm`}>{code}</code></pre>
    </div>
  )
}

export interface ToolOutputProps {
  title: string
  status: 'running' | 'completed' | 'error'
  content: ReactNode
  duration?: string
  expandable?: boolean
  onExpand?: () => void
  expanded?: boolean
}

export function ToolOutput({ title, status, content, duration, expandable = true, onExpand, expanded = false }: ToolOutputProps) {
  return (
    <div className="card-base p-0 overflow-hidden my-3">
      <div 
        className="flex items-center justify-between p-3 bg-surface-container-high cursor-pointer"
        onClick={onExpand}
      >
        <div className="flex items-center gap-3">
          <span className={`w-2 h-2 rounded-full ${
            status === 'running' ? 'bg-primary animate-pulse' :
            status === 'completed' ? 'bg-tertiary' :
            'bg-error'
          }`} />
          <span className="text-label-md font-medium text-on-surface">{title}</span>
          {status === 'running' && (
            <span className="px-2 py-0.5 text-label-sm bg-primary-container text-on-primary-container rounded-full">
              Working...
            </span>
          )}
          {status === 'completed' && (
            <span className="px-2 py-0.5 text-label-sm bg-tertiary-container text-on-tertiary-container rounded-full">
              Completed
            </span>
          )}
          {status === 'error' && (
            <span className="px-2 py-0.5 text-label-sm bg-error-container text-on-error-container rounded-full">
              Error
            </span>
          )}
          {duration && <span className="text-label-sm text-on-surface-variant">{duration}</span>}
        </div>
        {expandable && (
          <ChevronDown size={18} className={`text-on-surface-variant transition-transform ${expanded ? 'rotate-180' : ''}`} />
        )}
      </div>
      {expanded && (
        <div className="p-3 border-t border-outline-variant bg-surface">
          {content}
        </div>
      )}
    </div>
  )
}

export interface ActivityItemProps {
  icon: ReactNode
  label: string
  timestamp?: string
  status?: 'running' | 'completed' | 'error'
  expandable?: boolean
  onClick?: () => void
  expanded?: boolean
  children?: ReactNode
}

export function ActivityItem({ 
  icon, 
  label, 
  timestamp, 
  status = 'completed', 
  expandable = false, 
  onClick, 
  expanded = false,
  children 
}: ActivityItemProps) {
  return (
    <button
      onClick={onClick}
      className={`activity-item w-full ${expandable ? 'cursor-pointer' : ''}`}
      aria-expanded={expandable ? expanded : undefined}
    >
      <span className="flex-shrink-0 text-primary">{icon}</span>
      <span className="flex-1 text-left font-medium">{label}</span>
      {status === 'running' && (
        <span className="flex items-center gap-1 text-label-sm text-primary">
          <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-current" />
          <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-current" style={{ animationDelay: '150ms' }} />
          <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-current" style={{ animationDelay: '300ms' }} />
        </span>
      )}
      {timestamp && <span className="text-label-sm text-on-surface-variant flex-shrink-0">{timestamp}</span>}
      {expandable && <ChevronDown size={18} className={`text-on-surface-variant transition-transform ${expanded ? 'rotate-180' : ''}`} />}
    </button>
  )
}