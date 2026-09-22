'use client'

import { useState } from 'react'
import { AsideIcon, type AsideIconName } from './icons'
import { Badge } from './controls'

export interface NavItem {
  key: string
  label: string
  icon: AsideIconName
  badge?: 'New'
  external?: boolean
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Personal',
    items: [
      { key: 'general', label: 'General', icon: 'general' },
      { key: 'appearance', label: 'Appearance', icon: 'appearance' },
      { key: 'account', label: 'Account', icon: 'account' },
      { key: 'plan', label: 'Plan & Usage', icon: 'plan' },
      { key: 'security', label: 'Security & Privacy', icon: 'security', badge: 'New' },
    ],
  },
  {
    label: 'Agent',
    items: [
      { key: 'agents', label: 'Agents', icon: 'agents' },
      { key: 'projects', label: 'Projects', icon: 'projects' },
      { key: 'models', label: 'Models', icon: 'models' },
      { key: 'plugins', label: 'Plugins & MCPs', icon: 'plugins' },
      { key: 'memory', label: 'Memory', icon: 'memory' },
      { key: 'context', label: 'Context Awareness', icon: 'context', badge: 'New' },
    ],
  },
  {
    label: 'Features',
    items: [
      { key: 'passwords', label: 'Passwords', icon: 'passwords' },
      { key: 'routines', label: 'Routines', icon: 'routines' },
      { key: 'channels', label: 'Channels', icon: 'channels' },
      { key: 'developers', label: 'Developers', icon: 'developers' },
      { key: 'minipopup', label: 'Mini popup', icon: 'minipopup' },
      { key: 'lasso', label: 'Lasso', icon: 'lasso' },
    ],
  },
  {
    label: 'Archived',
    items: [{ key: 'archived', label: 'Archived chats', icon: 'archived' }],
  },
]

export const NAV_FOOTER: NavItem[] = [
  { key: 'feedback', label: 'Send feedback', icon: 'feedback' },
  { key: 'extensions', label: 'Extensions', icon: 'external', external: true },
  { key: 'docs', label: 'Docs', icon: 'external', external: true },
  { key: 'community', label: 'Community', icon: 'external', external: true },
]

function RailItem({ item, active, onSelect }: { item: NavItem; active: boolean; onSelect: (key: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.key)}
      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-[7px] text-[13px] font-medium transition-colors duration-150 ${
        active
          ? 'bg-[var(--as-sunken)] text-[var(--as-ink)]'
          : 'text-[var(--as-ink-2)] hover:bg-[var(--as-sunken)] hover:text-[var(--as-ink)]'
      }`}
    >
      <AsideIcon name={item.icon} size={15} className="shrink-0" />
      <span className="truncate">{item.label}</span>
      {item.badge && <Badge tone="new">{item.badge}</Badge>}
      {item.external && <AsideIcon name="external" size={13} className="ml-auto shrink-0 text-[var(--as-ink-3)]" />}
    </button>
  )
}

export function NavRail({ active, onSelect }: { active: string; onSelect: (key: string) => void }) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const groups = NAV_GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((i) => i.label.toLowerCase().includes(q)),
  })).filter((g) => g.items.length > 0)
  const footer = NAV_FOOTER.filter((i) => i.label.toLowerCase().includes(q))

  return (
    <nav className="flex h-full w-[220px] shrink-0 flex-col gap-1 overflow-y-auto px-2 py-3">
      <label className="mb-2 flex items-center gap-2 rounded-lg border border-[var(--as-border)] bg-[var(--as-surface)] px-3 py-[7px]">
        <AsideIcon name="search" size={14} className="shrink-0 text-[var(--as-ink-3)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search.."
          className="w-full bg-transparent text-[13px] text-[var(--as-ink)] outline-none placeholder:text-[var(--as-ink-3)]"
        />
      </label>
      {groups.map((g) => (
        <div key={g.label}>
          <p className="px-3 pb-1 pt-2 text-xs font-medium text-[var(--as-ink-3)]">{g.label}</p>
          {g.items.map((item) => (
            <RailItem key={item.key} item={item} active={active === item.key} onSelect={onSelect} />
          ))}
        </div>
      ))}
      {footer.length > 0 && (
        <div className="mt-auto pt-2">
          {footer.map((item) => (
            <RailItem key={item.key} item={item} active={false} onSelect={onSelect} />
          ))}
        </div>
      )}
    </nav>
  )
}

export function PageTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-[28px] font-semibold tracking-tight text-[var(--as-ink)]">{children}</h1>
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 mt-6 text-[13px] font-medium text-[var(--as-ink-3)] first:mt-0">{children}</p>
}

export function GroupCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="divide-y divide-[var(--as-border)] rounded-[12px] border border-[var(--as-border)] bg-[var(--as-surface)]">
      {children}
    </div>
  )
}

export function SettingsRow({ title, description, control, onClick }: {
  title: React.ReactNode
  description?: React.ReactNode
  control?: React.ReactNode
  onClick?: () => void
}) {
  const Inner = (
    <>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-[var(--as-ink)]">{title}</span>
        {description && (
          <span className="mt-0.5 block text-[13px] leading-snug text-[var(--as-ink-2)]">{description}</span>
        )}
      </span>
      {control && <span className="ml-4 flex shrink-0 items-center gap-2">{control}</span>}
    </>
  )
  const cls = 'flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left'
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${cls} transition-colors duration-150 hover:bg-[var(--as-sunken)]`}>
        {Inner}
      </button>
    )
  }
  return <div className={cls}>{Inner}</div>
}

export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <GroupCard>
      {items.map((item, i) => (
        <div key={item.question}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-medium text-[var(--as-ink)]"
          >
            {item.question}
            <AsideIcon
              name="chevronDown"
              size={15}
              className={`shrink-0 text-[var(--as-ink-3)] transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          {open === i && (
            <p className="px-4 pb-4 text-[13px] leading-relaxed text-[var(--as-ink-2)]">{item.answer}</p>
          )}
        </div>
      ))}
    </GroupCard>
  )
}

export function SkillRow({ icon, name, description }: {
  icon: React.ReactNode
  name: string
  description: string
}) {
  return (
    <div className="flex w-full items-center gap-3 px-4 py-3 text-left">
      {icon}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-[var(--as-ink)]">{name}</span>
        <span className="block truncate text-[13px] text-[var(--as-ink-2)]">{description}</span>
      </span>
      <AsideIcon name="more" size={16} className="shrink-0 text-[var(--as-ink-3)]" />
    </div>
  )
}

export function Modal({ title, description, children, footer, onClose }: {
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full max-w-[640px] rounded-[20px] bg-[var(--as-surface)] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-[var(--as-ink-3)] hover:text-[var(--as-ink)]"
        >
          <AsideIcon name="close" size={16} />
        </button>
        <h2 className="text-lg font-semibold text-[var(--as-ink)]">{title}</h2>
        {description && <p className="mt-1 text-[13px] text-[var(--as-ink-2)]">{description}</p>}
        <div className="mt-4">{children}</div>
        {footer && <div className="mt-4 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  )
}
