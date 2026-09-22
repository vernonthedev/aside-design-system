'use client'

import { useState } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { NavRail } from '@/components/aside/settings'
import {
  GeneralPage, AppearancePage, AgentsPage, LassoPage, PluginsPage,
  DevelopersPage, ChatsPage, MemoryPage, CompactPage,
} from '@/components/aside/pages'

const COMPACT_PAGES: Record<string, { title: string; rows: { title: string; description?: string; control?: 'toggle' | 'pill' | 'kbd'; controlText?: string }[] }> = {
  account: {
    title: 'Account',
    rows: [
      { title: 'Profile', description: 'Signed in as demo user', control: 'pill', controlText: 'Manage' },
      { title: 'Sync settings', description: 'Sync preferences across signed-in devices', control: 'toggle' },
    ],
  },
  plan: {
    title: 'Plan & Usage',
    rows: [
      { title: 'Current plan', description: 'Free tier with core agent features', control: 'pill', controlText: 'Upgrade' },
      { title: 'Monthly usage', description: 'Track task runs and model consumption', control: 'pill', controlText: 'Details' },
    ],
  },
  security: {
    title: 'Security & Privacy',
    rows: [
      { title: 'Block trackers', description: 'Block known trackers on every page', control: 'toggle' },
      { title: 'Clear browsing data', description: 'History, cookies, cache, and site settings', control: 'pill', controlText: 'Clear' },
    ],
  },
  projects: {
    title: 'Projects',
    rows: [
      { title: 'Default project', description: 'New chats attach to this project', control: 'pill', controlText: 'Choose' },
      { title: 'Project roots', description: 'Folders agents may view and edit', control: 'pill', controlText: 'Manage' },
    ],
  },
  models: {
    title: 'Models',
    rows: [
      { title: 'Default model', description: 'Used for new chats and routines', control: 'pill', controlText: 'Nemotron 3' },
      { title: 'Custom providers', description: 'Paste a pi-compatible provider config', control: 'pill', controlText: 'Add' },
    ],
  },
  passwords: {
    title: 'Passwords',
    rows: [
      { title: 'Offer to save passwords', description: 'Prompt when you sign in to sites', control: 'toggle' },
      { title: 'Auto sign-in', description: 'Sign in automatically where possible', control: 'toggle' },
    ],
  },
  routines: {
    title: 'Routines',
    rows: [
      { title: 'Enabled routines', description: 'Automations running on a schedule', control: 'pill', controlText: '2 active' },
      { title: 'Routine history', description: 'Review past runs and outputs', control: 'pill', controlText: 'View' },
    ],
  },
  channels: {
    title: 'Channels',
    rows: [
      { title: 'Connected channels', description: 'Where Aside sends updates', control: 'pill', controlText: 'Manage' },
      { title: 'Desktop notifications', description: 'Notify when routines finish', control: 'toggle' },
    ],
  },
  minipopup: {
    title: 'Mini popup',
    rows: [
      { title: 'Show mini popup', description: 'Quick actions over selected text', control: 'toggle' },
      { title: 'Popup position', description: 'Where the popup appears', control: 'pill', controlText: 'Above' },
    ],
  },
  context: {
    title: 'Context Awareness',
    rows: [
      { title: 'Learn from context', description: 'Let Aside work proactively with less input', control: 'toggle' },
      { title: 'Context sources', description: 'Tabs, files, and tools Aside may observe', control: 'pill', controlText: 'Manage' },
    ],
  },
  archived: {
    title: 'Archived chats',
    rows: [
      { title: 'Archived items', description: 'Chats you archived from the sidebar', control: 'pill', controlText: 'Browse' },
      { title: 'Auto-archive', description: 'Archive inactive chats after 90 days', control: 'toggle' },
    ],
  },
  feedback: {
    title: 'Send feedback',
    rows: [{ title: 'Feedback channel', description: 'Opens the Aside feedback form', control: 'pill', controlText: 'Open' }],
  },
  extensions: {
    title: 'Extensions',
    rows: [{ title: 'Web store', description: 'Opens in a new tab in the real browser', control: 'pill', controlText: 'Open' }],
  },
  docs: {
    title: 'Docs',
    rows: [{ title: 'Documentation', description: 'Opens in a new tab in the real browser', control: 'pill', controlText: 'Open' }],
  },
  community: {
    title: 'Community',
    rows: [{ title: 'Community hub', description: 'Opens in a new tab in the real browser', control: 'pill', controlText: 'Open' }],
  },
}

function SettingsView() {
  const [page, setPage] = useState('general')
  const compact = COMPACT_PAGES[page]
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1100px]">
      <div className="sticky top-0 h-screen shrink-0 border-r border-[var(--as-border)]">
        <NavRail active={page} onSelect={setPage} />
      </div>
      <main className="min-w-0 flex-1 px-8 py-8">
        <div className="mx-auto max-w-[640px]">
          {page === 'general' && <GeneralPage />}
          {page === 'appearance' && <AppearancePage />}
          {page === 'agents' && <AgentsPage />}
          {page === 'lasso' && <LassoPage />}
          {page === 'plugins' && <PluginsPage />}
          {page === 'developers' && <DevelopersPage />}
          {page === 'memory' && <MemoryPage />}
          {compact && <CompactPage title={compact.title} rows={compact.rows} />}
        </div>
      </main>
    </div>
  )
}

function Shell() {
  const [view, setView] = useState<'settings' | 'chats'>('settings')
  return (
    <div className="min-h-screen bg-[var(--as-bg)] text-[var(--as-ink)]">
      <div className="border-b border-[var(--as-border)]">
        <div className="mx-auto flex w-full max-w-[1100px] items-center gap-1 px-4 py-2">
          <span className="mr-2 text-[13px] font-semibold">Aside replica</span>
          {(['settings', 'chats'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`rounded-full px-3 py-1 text-[13px] font-medium capitalize transition-colors duration-150 ${
                view === v
                  ? 'bg-[var(--as-sunken)] text-[var(--as-ink)]'
                  : 'text-[var(--as-ink-2)] hover:text-[var(--as-ink)]'
              }`}
            >
              {v === 'chats' ? 'New tab' : v}
            </button>
          ))}
          <span className="ml-auto hidden text-xs text-[var(--as-ink-3)] sm:block">
            Switch theme in Appearance
          </span>
        </div>
      </div>
      {view === 'settings' ? (
        <SettingsView />
      ) : (
        <main className="mx-auto w-full max-w-[900px] px-4 py-6">
          <ChatsPage />
        </main>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <ThemeProvider defaultTheme="system">
      <Shell />
    </ThemeProvider>
  )
}
