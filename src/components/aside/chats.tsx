'use client'

import { AsideIcon } from './icons'
import { CoverArt } from './icons'
import { Badge, UnreadDot, RowButton } from './controls'

export function Composer() {
  return (
    <div className="rounded-2xl border border-[var(--as-border-strong)] bg-[var(--as-surface)] px-4 pb-2.5 pt-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
      <input
        placeholder="Ask AI a task, @ for context"
        className="w-full bg-transparent text-sm text-[var(--as-ink)] outline-none placeholder:text-[var(--as-ink-3)]"
      />
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          aria-label="Add"
          className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--as-border-strong)] text-[var(--as-ink-2)]"
        >
          <AsideIcon name="plus" size={13} />
        </button>
        <button type="button" className="flex items-center gap-1 text-[13px] font-medium text-[var(--as-ink-2)]">
          <AsideIcon name="projects" size={14} />
          Project
          <AsideIcon name="chevronDown" size={12} className="text-[var(--as-ink-3)]" />
        </button>
        <button
          type="button"
          className="flex items-center gap-1 text-[13px] font-medium"
          style={{ color: 'var(--as-permission)' }}
        >
          <AsideIcon name="shield" size={14} />
          Full access
          <AsideIcon name="chevronDown" size={12} />
        </button>
        <span className="ml-auto flex items-center gap-2">
          <button type="button" className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--as-ink-2)]">
            <AsideIcon name="agents" size={14} />
            Nemotron 3 Super...
            <span className="text-[var(--as-ink-3)]">High</span>
            <AsideIcon name="chevronDown" size={12} className="text-[var(--as-ink-3)]" />
          </button>
          <AsideIcon name="mic" size={15} className="text-[var(--as-ink-2)]" />
          <button
            type="button"
            aria-label="Send"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6f6f6a] text-white"
          >
            <AsideIcon name="arrowUp" size={15} />
          </button>
        </span>
      </div>
    </div>
  )
}

export function SegmentedControl<T extends string>({ options, value, onChange }: {
  options: { value: T; label: string; icon: 'list' | 'card' }[]
  value: T
  onChange: (next: T) => void
}) {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full bg-[var(--as-sunken)] p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium transition-colors duration-150 ${
            value === o.value
              ? 'bg-[var(--as-surface)] text-[var(--as-ink)] shadow-sm'
              : 'text-[var(--as-ink-2)] hover:text-[var(--as-ink)]'
          }`}
        >
          <AsideIcon name={o.icon} size={13} />
          {o.label}
        </button>
      ))}
    </span>
  )
}

export interface ChatItem {
  id: string
  title: string
  preview: string
  time: string
  status?: 'running' | 'unread'
  thumb?: boolean
}

export function ChatRow({ chat }: { chat: ChatItem }) {
  return (
    <div className="flex cursor-pointer items-baseline gap-3 border-b border-[var(--as-border)] py-3 last:border-0">
      <p className="min-w-0 flex-1 truncate text-sm">
        <span className="font-semibold text-[var(--as-ink)]">{chat.title}</span>
        <span className="text-[var(--as-ink-2)]"> {chat.preview}</span>
      </p>
      <span className="flex shrink-0 items-center gap-2 text-xs text-[var(--as-ink-3)]">
        {chat.status === 'running' && <Badge tone="running">Running</Badge>}
        {chat.status === 'unread' && <UnreadDot />}
        {chat.time}
      </span>
    </div>
  )
}

export function ChatCard({ chat }: { chat: ChatItem }) {
  return (
    <div className="flex cursor-pointer flex-col rounded-[12px] border border-[var(--as-border)] bg-[var(--as-surface)] p-4">
      <p className="text-xs text-[var(--as-ink-3)]">{chat.time}</p>
      <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-[var(--as-ink)]">{chat.title}</p>
      <p className="mt-1 line-clamp-3 text-[13px] leading-snug text-[var(--as-ink-2)]">{chat.preview}</p>
      {chat.thumb && (
        <span className="mt-3 block overflow-hidden rounded-lg border border-[var(--as-border)] bg-[var(--as-sunken)]">
          <span className="flex h-24 items-center justify-center text-xs text-[var(--as-ink-3)]">preview thumbnail</span>
        </span>
      )}
      {chat.status === 'running' && (
        <span className="mt-3">
          <Badge tone="running">Running</Badge>
        </span>
      )}
    </div>
  )
}

const SUGGESTED = [
  { title: 'Set up Aside\u2019s memory', desc: 'Ask Aside to learn from your context so it can work proactively with less input.', action: 'Use this prompt', glyph: 'check' as const },
  { title: 'Automate my routines', desc: 'Ask Aside to look through your recent work and suggest tasks it can automate.', action: 'Use this prompt', glyph: 'zap' as const },
  { title: 'Customize Aside', desc: 'Make Aside yours with custom skills, memory, shortcuts, and preferences.', action: 'Open Settings', glyph: 'palette' as const },
]

export function SuggestedTasks() {
  return (
    <div>
      <h2 className="mb-3 text-[15px] font-semibold text-[var(--as-ink)]">Suggested tasks</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SUGGESTED.map((s, i) => (
          <div key={s.title} className="overflow-hidden rounded-[12px] border border-[var(--as-border)] bg-[var(--as-surface)]">
            <CoverArt index={i} glyph={s.glyph} />
            <div className="p-4">
              <p className="text-sm font-semibold text-[var(--as-ink)]">{s.title}</p>
              <p className="mt-1 text-[13px] leading-snug text-[var(--as-ink-2)]">{s.desc}</p>
              <p className="mt-3">
                <RowButton>
                  {s.action}
                  <AsideIcon name="external" size={13} />
                </RowButton>
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center">
        <RowButton>
          <AsideIcon name="close" size={13} />
          Close
        </RowButton>
      </p>
    </div>
  )
}
