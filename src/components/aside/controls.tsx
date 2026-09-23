'use client'

import { AsideIcon, type AsideIconName } from './icons'

export function Toggle({ checked, onChange, disabled = false, label }: {
  checked: boolean
  onChange?: (next: boolean) => void
  disabled?: boolean
  label?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className="relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 disabled:opacity-40"
      style={{ background: checked ? 'var(--as-toggle-on)' : 'var(--as-toggle-off)' }}
    >
      <span
        className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200"
        style={{ left: checked ? '22px' : '2px' }}
      />
    </button>
  )
}

type BadgeTone = 'new' | 'pro' | 'default' | 'running'

export function Badge({ tone, children }: { tone: BadgeTone; children: React.ReactNode }) {
  if (tone === 'running') {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--as-sunken)] px-2.5 py-1 text-xs font-medium text-[var(--as-ink)]">
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-[var(--as-ink-3)] border-t-[var(--as-ink)]" />
        {children}
      </span>
    )
  }
  if (tone === 'default') {
    return (
      <span className="inline-flex shrink-0 items-center rounded-full bg-[var(--as-sunken)] px-2.5 py-1 text-xs font-medium text-[var(--as-ink-2)]">
        {children}
      </span>
    )
  }
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-semibold"
      style={{ background: 'var(--as-badge-bg)', color: 'var(--as-badge-ink)' }}
    >
      {children}
    </span>
  )
}

export function UnreadDot() {
  return (
    <span
      className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
      style={{ background: 'var(--as-unread)' }}
      aria-label="Unread"
    />
  )
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-md bg-[var(--as-sunken)] px-2 py-1 font-mono text-xs font-semibold text-[var(--as-ink-2)]">
      {children}
    </span>
  )
}

export function HotkeyPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[var(--as-border-strong)] bg-[var(--as-surface)] px-3 py-1.5 text-[13px] font-medium text-[var(--as-ink)]">
      {children}
      <AsideIcon name="arrowSort" size={13} className="text-[var(--as-ink-3)]" />
    </span>
  )
}

export function PillTrigger({ icon, children, onClick }: {
  icon?: AsideIconName
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--as-border-strong)] bg-[var(--as-surface)] px-3 py-1.5 text-[13px] font-medium text-[var(--as-ink)] transition-colors duration-200 hover:bg-[var(--as-sunken)]"
    >
      {icon && <AsideIcon name={icon} size={14} className="text-[var(--as-ink-2)]" />}
      {children}
      <AsideIcon name="chevronDown" size={13} className="text-[var(--as-ink-3)]" />
    </button>
  )
}

export function RowButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--as-border-strong)] bg-[var(--as-surface)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--as-ink)] transition-colors duration-200 hover:bg-[var(--as-sunken)]"
    >
      {children}
    </button>
  )
}

export function DarkButton({ children, onClick, split = false }: {
  children: React.ReactNode
  onClick?: () => void
  split?: boolean
}) {
  if (!split) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex shrink-0 items-center rounded-full bg-[#1a1a1a] px-4 py-1.5 text-[13px] font-semibold text-white transition-opacity duration-200 hover:opacity-85 dark:bg-white dark:text-black"
      >
        {children}
      </button>
    )
  }
  return (
    <span className="inline-flex shrink-0 items-stretch overflow-hidden rounded-full bg-[#1a1a1a] text-white dark:bg-white dark:text-black">
      <button type="button" onClick={onClick} className="px-4 py-1.5 text-[13px] font-semibold transition-opacity duration-200 hover:opacity-85">
        {children}
      </button>
      <span className="w-px bg-white/20 dark:bg-black/15" />
      <button type="button" aria-label="More options" className="px-2.5 transition-opacity duration-200 hover:opacity-85">
        <AsideIcon name="chevronDown" size={14} />
      </button>
    </span>
  )
}
