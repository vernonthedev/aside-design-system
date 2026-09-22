'use client'

import { useState } from 'react'
import { AsideIcon, BrandIcon } from './icons'
import { Toggle, Badge, Kbd, HotkeyPill, PillTrigger, RowButton, DarkButton } from './controls'
import {
  PageTitle, SectionLabel, GroupCard, SettingsRow, Accordion, SkillRow, Modal,
} from './settings'
import { Composer, SegmentedControl, ChatRow, ChatCard, SuggestedTasks, type ChatItem } from './chats'
import { useTheme } from '../ThemeProvider'

function useToggles(initial: Record<string, boolean>) {
  const [state, setState] = useState(initial)
  const bind = (key: string) => ({
    checked: !!state[key],
    onChange: (next: boolean) => setState((s) => ({ ...s, [key]: next })),
  })
  return bind
}

export function GeneralPage() {
  const t = useToggles({ pip: false, shot: true, spell: true })
  return (
    <div>
      <PageTitle>General</PageTitle>
      <SectionLabel>Preferences</SectionLabel>
      <GroupCard>
        <SettingsRow
          title="Default search engine"
          description="Used for searches from the address bar"
          control={<PillTrigger>Google</PillTrigger>}
        />
        <SettingsRow
          title="New tab mode"
          description="Open new tabs in Search or Ask"
          control={<PillTrigger>Search</PillTrigger>}
        />
      </GroupCard>
      <div className="mt-4">
        <GroupCard>
          <SettingsRow
            title="Auto Picture-in-Picture"
            description="Show floating player when switching from a video tab"
            control={<Toggle label="Auto Picture-in-Picture" {...t('pip')} />}
          />
          <SettingsRow
            title="Screenshot"
            description="Capture the current page from the right-click menu"
            control={<Toggle label="Screenshot" {...t('shot')} />}
          />
        </GroupCard>
      </div>
      <div className="mt-4">
        <GroupCard>
          <SettingsRow
            title="Preferred languages"
            description="English (United States), English"
            control={<RowButton><AsideIcon name="configure" size={14} />Configure</RowButton>}
          />
          <SettingsRow
            title="Spell check"
            description="Check spelling as you type"
            control={<Toggle label="Spell check" {...t('spell')} />}
          />
        </GroupCard>
      </div>
    </div>
  )
}

const THEMES = [
  { value: 'device', label: 'Device' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
] as const

export function AppearancePage() {
  const { theme, setTheme } = useTheme()
  const [tabStyle, setTabStyle] = useState<'sf' | 'ny'>('ny')
  const current = theme === 'system' ? 'device' : theme
  return (
    <div>
      <PageTitle>Appearance</PageTitle>
      <div className="mt-4">
        <GroupCard>
          <SettingsRow
            title="Theme"
            description="Choose how Aside looks"
            control={
              <PillTrigger icon="moon">
                {THEMES.find((t) => t.value === current)?.label}
              </PillTrigger>
            }
          />
          <div className="flex items-center gap-2 px-4 py-3">
            {THEMES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTheme(t.value === 'device' ? 'system' : t.value)}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-150 ${
                  current === t.value
                    ? 'bg-[#1a1a1a] text-white dark:bg-white dark:text-black'
                    : 'text-[var(--as-ink-2)] hover:bg-[var(--as-sunken)]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <SettingsRow title="Zoom level" control={<PillTrigger>90%</PillTrigger>} />
          <div className="px-4 py-3.5">
            <p className="text-sm font-medium text-[var(--as-ink)]">Tab style</p>
            <div className="mt-2 flex gap-3">
              {(
                [
                  { key: 'sf', label: 'San Francisco', bar: '#7aa2ff' },
                  { key: 'ny', label: 'New York', bar: '#e8a13d' },
                ] as const
              ).map((s) => (
                <button key={s.key} type="button" onClick={() => setTabStyle(s.key)} className="text-center">
                  <span
                    className="block h-12 w-20 rounded-lg border-2 p-1"
                    style={{ borderColor: tabStyle === s.key ? s.bar : 'transparent', background: 'var(--as-sunken)' }}
                  >
                    <span className="block h-2 w-full rounded-sm" style={{ background: s.bar }} />
                    <span className="mt-1 block h-1 w-3/4 rounded-sm bg-[var(--as-border-strong)]" />
                    <span className="mt-1 block h-1 w-1/2 rounded-sm bg-[var(--as-border-strong)]" />
                  </span>
                  <span className="mt-1 block text-xs text-[var(--as-ink-2)]">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </GroupCard>
      </div>
      <div className="mt-4">
        <GroupCard>
          <SettingsRow
            title="New tab position"
            description="Choose where new tabs are added in the sidebar."
            control={<PillTrigger>At top</PillTrigger>}
          />
          <SettingsRow
            title="Recent chats in sidebar"
            description="How many recent chats to show in the sidebar."
            control={<PillTrigger>3 chats</PillTrigger>}
          />
          <SettingsRow
            title="Customize sidebar"
            description="Choose which sections appear above your tabs."
            control={<PillTrigger>Chats, Bookmarks</PillTrigger>}
          />
          <SettingsRow
            title="Tab switcher order"
            description="Choose how tabs are ordered when switching."
            control={<PillTrigger>Recently used</PillTrigger>}
          />
          <SettingsRow
            title="Advanced"
            control={<AsideIcon name="external" size={14} className="text-[var(--as-ink-3)]" />}
            onClick={() => {}}
          />
        </GroupCard>
      </div>
      <SectionLabel>Keyboard shortcuts</SectionLabel>
      <GroupCard>
        <SettingsRow title="Toggle Sidebar" description="Show or hide the sidebar." control={<Kbd>Ctrl+S</Kbd>} />
        <SettingsRow title="Ask Aside" description="Start a task from the current tab." control={<Kbd>Ctrl+E</Kbd>} />
        <SettingsRow title="New Task" description="Open a new task." control={<Kbd>Ctrl+Shift+E</Kbd>} />
        <SettingsRow title="Copy URL" description="Copy the current page URL." control={<Kbd>Ctrl+Shift+C</Kbd>} />
        <SettingsRow title="Split tab" description="View two tabs side by side." control={<Kbd>Ctrl+Shift+\</Kbd>} />
      </GroupCard>
    </div>
  )
}

export function AgentsPage() {
  const t = useToggles({ sound: true, sandbox: true })
  return (
    <div>
      <PageTitle>Agents</PageTitle>
      <SectionLabel>Chat</SectionLabel>
      <GroupCard>
        <SettingsRow
          title="Task notifications"
          description="Aside can notify you when tasks finish while unfocused"
          control={<PillTrigger>Everything</PillTrigger>}
        />
        <SettingsRow
          title="Completion sound"
          description="Play a sound when agents finish or need attention"
          control={<Toggle label="Completion sound" {...t('sound')} />}
        />
        <div className="flex gap-2 px-4 py-3">
          <RowButton><AsideIcon name="play" size={13} />Preview</RowButton>
          <RowButton>Change</RowButton>
        </div>
      </GroupCard>
      <div className="mt-4">
        <GroupCard>
          <SettingsRow
            title="Follow-up behavior"
            description="Queue follow-ups while Aside runs or steer the current run."
            control={<PillTrigger>Queue</PillTrigger>}
          />
          <SettingsRow
            title="Ask Aside on tab switch"
            description="When you switch tabs, start a new chat or keep the current chat."
            control={<PillTrigger>New chat per tab</PillTrigger>}
          />
        </GroupCard>
      </div>
      <SectionLabel>Computer Use</SectionLabel>
      <GroupCard>
        <SettingsRow
          title="Clean up agent tabs"
          description="Automatically close tabs Aside used for tasks"
          control={<PillTrigger>After 15 min</PillTrigger>}
        />
      </GroupCard>
      <SectionLabel>Sandbox</SectionLabel>
      <GroupCard>
        <SettingsRow
          title="Enable sandbox"
          description="Aside runs commands in a sandbox, which keeps its work limited to the files and folders you allow."
          control={<Toggle label="Enable sandbox" {...t('sandbox')} />}
        />
      </GroupCard>
      <SectionLabel>File permissions</SectionLabel>
      <GroupCard>
        <div className="px-4 py-3.5">
          <p className="text-sm font-medium text-[var(--as-ink)]">Can view</p>
          <p className="mt-0.5 text-[13px] text-[var(--as-ink-2)]">
            The project can view files in these folders, but cannot edit them unless they are also added below.
          </p>
          <p className="mt-3 flex items-center justify-between gap-3 font-mono text-xs text-[var(--as-ink-2)]">
            <span className="truncate"><span className="font-sans font-medium text-[var(--as-ink)]">Project root</span>&nbsp;&nbsp;C:\Users\baluk\.aside\u\0\skills</span>
            <span className="flex shrink-0 items-center gap-2">
              <Badge tone="default">Default</Badge>
              <RowButton><AsideIcon name="folderAdd" size={14} />Add</RowButton>
            </span>
          </p>
        </div>
        <div className="px-4 py-3.5">
          <p className="text-sm font-medium text-[var(--as-ink)]">Can edit</p>
          <p className="mt-0.5 text-[13px] text-[var(--as-ink-2)]">
            The project can create, edit, and delete files in these folders. Keep this list small.
          </p>
          <p className="mt-3 flex items-center justify-between gap-3 font-mono text-xs text-[var(--as-ink-2)]">
            <span className="truncate"><span className="font-sans font-medium text-[var(--as-ink)]">Project root</span>&nbsp;&nbsp;C:\Users\baluk\.aside\u\0\skills</span>
            <span className="flex shrink-0 items-center gap-2">
              <Badge tone="default">Default</Badge>
              <RowButton><AsideIcon name="folderAdd" size={14} />Add</RowButton>
            </span>
          </p>
        </div>
      </GroupCard>
    </div>
  )
}

export function LassoPage() {
  const t = useToggles({ text: true, lasso: true })
  return (
    <div>
      <PageTitle>Lasso</PageTitle>
      <div className="mt-4 overflow-hidden rounded-[12px] border border-[var(--as-border)] bg-[var(--as-surface)]">
        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
          <div>
            <p className="text-[15px] font-semibold text-[var(--as-ink)]">Select and take action</p>
            <p className="mt-1 text-[13px] leading-snug text-[var(--as-ink-2)]">
              Drag over text or draw a circle to ask a question or run a shortcut in seconds.
            </p>
          </div>
          <div
            className="relative min-h-28 overflow-hidden rounded-lg"
            style={{ background: 'linear-gradient(135deg,#aee3ff 0%,#7cc4ff 60%,#4aa8ff 100%)' }}
          >
            <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#2f7bff]" />
            <span className="absolute bottom-2 right-2 w-44 rounded-xl bg-black/75 p-2 text-[11px] text-white backdrop-blur-sm">
              <span className="block px-1 py-0.5">Search image</span>
              <span className="block px-1 py-0.5">Open Codex and fix this</span>
              <span className="mt-1 flex items-center justify-between rounded-md bg-white/15 px-1.5 py-1 text-white/70">
                What would you like to do?
                <AsideIcon name="arrowUp" size={12} />
              </span>
            </span>
          </div>
        </div>
      </div>
      <SectionLabel>Text selection</SectionLabel>
      <GroupCard>
        <SettingsRow
          title="Enable on text selection"
          description="Drag text click the blue dot."
          control={<Toggle label="Enable on text selection" {...t('text')} />}
        />
      </GroupCard>
      <div className="mt-4">
        <GroupCard>
          <SettingsRow title="Summarize" control={<AsideIcon name="more" size={16} className="text-[var(--as-ink-3)]" />} />
          <SettingsRow title="Translate" control={<AsideIcon name="more" size={16} className="text-[var(--as-ink-3)]" />} />
          <SettingsRow
            title={<span className="text-[var(--as-ink-2)]">+ Add shortcut</span>}
            onClick={() => {}}
          />
        </GroupCard>
      </div>
      <SectionLabel>Lasso selection</SectionLabel>
      <GroupCard>
        <SettingsRow
          title="Enable on lasso selection"
          control={<Toggle label="Enable on lasso selection" {...t('lasso')} />}
        />
        <SettingsRow
          title={<>Hotkey<br /><span className="text-[13px] font-normal text-[var(--as-ink-2)]">Press Shift twice and draw a circle.</span></>}
          control={<HotkeyPill>Shift + Shift</HotkeyPill>}
        />
      </GroupCard>
      <div className="mt-4">
        <GroupCard>
          <SettingsRow title="Copy code" control={<AsideIcon name="more" size={16} className="text-[var(--as-ink-3)]" />} />
          <SettingsRow title="Search image" control={<AsideIcon name="more" size={16} className="text-[var(--as-ink-3)]" />} />
          <SettingsRow
            title={<span className="text-[var(--as-ink-2)]">+ Add shortcut</span>}
            onClick={() => {}}
          />
        </GroupCard>
      </div>
    </div>
  )
}

const BUILT_IN_SKILLS = [
  { slug: 'googlechrome', name: 'Chrome', desc: 'Read this when you need to use Chrome extension APIs: managing bookmarks, tabs, windows, tab groups.' },
  { slug: 'DOCX', name: 'DOCX', desc: 'Use this skill whenever a Word .docx file must be read, created, inspected, or edited, including its tables.' },
  { slug: 'google', name: 'Google Accounts', desc: 'IMPORTANT: Read this skill before interacting with any Google apps!' },
  { slug: 'googledocs', name: 'Google Docs', desc: 'Read this skill when you need to read or write Google Docs. Reading works without opening a browser.' },
  { slug: 'gmail', name: 'Google Gmail', desc: "Read this skill when you need to use the user's Gmail. No need to open a browser tab." },
  { slug: 'google', name: 'Google Search', desc: 'Use this when you need to search the web on Google and the websearch tool is not enough.' },
  { slug: 'googlesheets', name: 'Google Sheets', desc: 'Read this skill when you need to read or write Google Sheets. Works without opening a browser tab.' },
  { slug: 'notion', name: 'Notion', desc: "Read this skill when you need to use Notion. No need to open a browser tab." },
  { slug: 'PDF', name: 'PDF', desc: 'Use this skill to read, render, merge, split, rotate, or fill PDFs.' },
  { slug: 'PPTX', name: 'PPTX', desc: 'Use this skill whenever a PowerPoint .pptx file must be read, created, inspected, or edited.' },
  { slug: 'slack', name: 'Slack', desc: 'Read this when you need to use Slack.' },
  { slug: 'XLSX', name: 'XLSX', desc: 'Use this skill whenever a spreadsheet file must be read, created, or edited.' },
]

export function PluginsPage() {
  const [tab, setTab] = useState<'skills' | 'mcps'>('skills')
  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle>Plugins & MCPs</PageTitle>
        <DarkButton split>Import</DarkButton>
      </div>
      <div className="mt-3 flex gap-4 border-b border-[var(--as-border)] text-sm font-medium">
        {(['skills', 'mcps'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setTab(v)}
            className={`pb-2 capitalize transition-colors duration-150 ${
              tab === v ? 'border-b-2 border-[var(--as-ink)] text-[var(--as-ink)]' : 'text-[var(--as-ink-3)] hover:text-[var(--as-ink-2)]'
            }`}
          >
            {v === 'mcps' ? 'MCPs' : 'Skills'}
          </button>
        ))}
      </div>
      {tab === 'skills' ? (
        <div>
          <SectionLabel>My Skills&nbsp;&nbsp;1</SectionLabel>
          <GroupCard>
            <SkillRow
              icon={<BrandIcon slug="n/a" label="No Em Dashes" />}
              name="No Em Dashes"
              description="Enforce em-dash-free writing. Use this skill whenever you write or edit prose for the user, including drafts."
            />
          </GroupCard>
          <SectionLabel>Built-in Skills&nbsp;&nbsp;13</SectionLabel>
          <GroupCard>
            {BUILT_IN_SKILLS.map((s) => (
              <SkillRow key={s.name} icon={<BrandIcon slug={s.slug} label={s.name} />} name={s.name} description={s.desc} />
            ))}
          </GroupCard>
        </div>
      ) : (
        <div>
          <SectionLabel>My MCPs&nbsp;&nbsp;0</SectionLabel>
          <GroupCard>
            <SettingsRow
              title={<span className="text-[var(--as-ink-2)]">No custom MCP servers yet. Import one to get started.</span>}
            />
          </GroupCard>
        </div>
      )}
    </div>
  )
}

const FAQS = [
  { question: 'How can I use Aside CLI?', answer: 'Install the CLI, sign in with your Aside account, then browse and run web tasks from Codex, Claude Code, and more.' },
  { question: "Can't this already be done with Codex or Claude?", answer: 'Codex and Claude run in a terminal. Aside CLI gives them a real browser to drive: logins, file downloads, and visual verification stay on your machine.' },
  { question: 'What is Remote Control?', answer: 'Remote Control runs tasks on this machine from your other devices. Logins and browsing stay on this machine.' },
  { question: 'How do I connect to Aside from a remote machine (e.g. Linux, Hermes)?', answer: 'Enable remote sessions on this machine, then pair the remote device with the code shown in Developers settings.' },
  { question: "What's the difference between Aside CLI and MCP?", answer: 'The CLI drives the browser from your terminal. The MCP server lets agents interact with Aside through CLI and skills instead.' },
]

export function DevelopersPage() {
  const t = useToggles({ mcp: false, remote: false })
  return (
    <div>
      <PageTitle>Developers</PageTitle>
      <div className="mt-4 overflow-hidden rounded-[12px] border border-[var(--as-border)] bg-[var(--as-surface)]">
        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
          <div>
            <p className="text-[15px] font-semibold text-[var(--as-ink)]">Aside CLI</p>
            <p className="mt-1 text-[13px] leading-snug text-[var(--as-ink-2)]">
              Browse and run web tasks from Codex, Claude Code, and more.
            </p>
            <p className="mt-4"><DarkButton split>Install</DarkButton></p>
          </div>
          <div
            className="overflow-hidden rounded-lg p-3 font-mono text-[11px] leading-relaxed text-white"
            style={{ background: 'linear-gradient(135deg,#ffb3d9 0%,#ff7ab8 50%,#3a3a3a 100%)' }}
          >
            <span className="block rounded-md bg-black p-3">
              <span className="mb-1 flex gap-1">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              </span>
              <span className="text-orange-400">Claude Code v2.1.169</span>
              <span className="block text-white/60">Opus 6 (1M context) with high effort</span>
              <span className="block text-white/60">/Documents/aside/CLI</span>
              <span className="block truncate text-white">/aside-browser measure network latency in this branch</span>
            </span>
          </div>
        </div>
      </div>
      <SectionLabel>Skill & MCP</SectionLabel>
      <GroupCard>
        <SettingsRow
          title="Aside Skills"
          description="Allow agents to interact with Aside through CLI and skills"
          control={<PillTrigger>Add skill to...</PillTrigger>}
        />
        <SettingsRow
          title="Enable Aside MCP server"
          description="How to set up MCP server?"
          control={<Toggle label="Enable Aside MCP server" {...t('mcp')} />}
        />
      </GroupCard>
      <SectionLabel>Remote Control</SectionLabel>
      <GroupCard>
        <SettingsRow
          title={<>Allow remote sessions on this machine <Badge tone="pro">PRO</Badge></>}
          description="Run tasks here from your other devices. Logins and browsing stay on this machine. How does Remote Control work?"
          control={
            <span className="flex items-center gap-3">
              <RowButton>Upgrade to Pro</RowButton>
              <Toggle label="Allow remote sessions" {...t('remote')} />
            </span>
          }
        />
      </GroupCard>
      <SectionLabel>FAQs</SectionLabel>
      <Accordion items={FAQS} />
    </div>
  )
}

const CHATS: ChatItem[] = [
  { id: '1', title: 'How good is the Helium browser better th...', preview: '', time: 'a few seconds ago', status: 'running' },
  { id: '2', title: 'can u help me identify figma design syst...', preview: 'Based on your description of Aside\u2019s "Productive Minimalism" design system (Geist font, 8px spacing,...', time: '2 minutes ago' },
  { id: '3', title: 'Look back over my recent work and identi...', preview: "I've successfully created two automation routines for you based on your identified workflows: Routines...", time: '11 minutes ago' },
  { id: '4', title: 'Vercel Bun support question', preview: "I've successfully fixed most of the issues with your pharmaflow Vercel Hono Bun API deployment. Here's...", time: 'an hour ago' },
  { id: '5', title: 'can u help me install opencode ai cli on...', preview: 'OpenCode AI CLI has been successfully installed on your Windows PC via npm. Installation details...', time: 'an hour ago' },
  { id: '6', title: 'what is the latest version of zod', preview: 'The latest version of Zod is 4.6.5"latest":"4.6.5".', time: '4 hours ago' },
  { id: '7', title: 'Is it possible to replace the copilot mo...', preview: 'We need to answer: If I create a custom GitHub app created and installed first for my GitHub org, ca...', time: 'a day ago' },
  { id: '8', title: 'can u tell me what this project is about', preview: 'Now I have the full README. Let me give you a proper breakdown: PharmaFlow. Complete Picture What...', time: '7 days ago', status: 'unread' },
]

export function ChatsPage() {
  const [view, setView] = useState<'list' | 'card'>('list')
  return (
    <div>
      <Composer />
      <div className="mt-3 flex items-center justify-between">
        <SegmentedControl
          value={view}
          onChange={setView}
          options={[
            { value: 'list', label: 'List', icon: 'list' },
            { value: 'card', label: 'Card', icon: 'card' },
          ]}
        />
        <span className="flex items-center gap-3 text-[var(--as-ink-2)]">
          <AsideIcon name="search" size={15} />
          <AsideIcon name="arrowUp" size={15} className="rotate-180" />
        </span>
      </div>
      <div className="mt-2">
        {view === 'list' ? (
          <div>{CHATS.map((c) => <ChatRow key={c.id} chat={c} />)}</div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {CHATS.map((c) => <ChatCard key={c.id} chat={c.id === '2' ? { ...c, thumb: true } : c} />)}
          </div>
        )}
      </div>
      <div className="mt-8">
        <SuggestedTasks />
      </div>
    </div>
  )
}

const MEMORY_FILES = [
  '2026-09-22.md',
  '2026-09-21.md',
  '2026-09-18.md',
  '2026-09-17.md',
  '2026-09-16.md',
  '2026-09-15.md',
]

export function MemoryPage() {
  const [file, setFile] = useState(MEMORY_FILES[0])
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm text-[var(--as-ink-2)]">
          <span className="font-medium text-[var(--as-ink)]">Memory</span>
        </p>
        <DarkButton>Edit</DarkButton>
      </div>
      <div className="mt-3 grid grid-cols-[200px_1fr] overflow-hidden rounded-[12px] border border-[var(--as-border)] bg-[var(--as-surface)]">
        <div className="border-r border-[var(--as-border)] p-2">
          <p className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[13px] font-medium text-[var(--as-ink)]">
            <AsideIcon name="folder" size={14} />episodic
          </p>
          {MEMORY_FILES.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFile(f)}
              className={`flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 font-mono text-xs transition-colors duration-150 ${
                file === f ? 'bg-[var(--as-sunken)] text-[var(--as-ink)]' : 'text-[var(--as-ink-2)] hover:bg-[var(--as-sunken)]'
              }`}
            >
              <AsideIcon name="file" size={13} />{f}
            </button>
          ))}
          <p className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[13px] text-[var(--as-ink-2)]">
            <AsideIcon name="folder" size={14} />projects
          </p>
          <p className="flex items-center gap-1.5 rounded-md px-2 py-1.5 font-mono text-xs text-[var(--as-ink-2)]">
            <AsideIcon name="file" size={13} />MEMORY.md
          </p>
          <p className="flex items-center gap-1.5 rounded-md px-2 py-1.5 font-mono text-xs text-[var(--as-ink-2)]">
            <AsideIcon name="file" size={13} />USER.md
          </p>
        </div>
        <div className="min-w-0 p-6">
          <p className="font-mono text-xs text-[var(--as-ink-3)]">episodic&nbsp;&nbsp;›&nbsp;&nbsp;{file}</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--as-ink)]">{file.replace('.md', '')}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--as-ink-2)]">
            <li>User compared Helium and Aside browsers for personal browsing, weighing privacy against AI-assisted workflows.</li>
            <li>User asked for the Aside design system tokens and component specs to replicate the settings and new-tab UI.</li>
            <li>Latest Zod version confirmed as 4.6.5 with improved type inference.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export function CompactPage({ title, rows }: {
  title: string
  rows: { title: string; description?: string; control?: 'toggle' | 'pill' | 'kbd'; controlText?: string }[]
}) {
  const t = useToggles(Object.fromEntries(rows.map((r, i) => [`r${i}`, true])))
  return (
    <div>
      <PageTitle>{title}</PageTitle>
      <div className="mt-4">
        <GroupCard>
          {rows.map((r, i) => (
            <SettingsRow
              key={r.title}
              title={r.title}
              description={r.description}
              control={
                r.control === 'toggle' ? <Toggle label={r.title} {...t(`r${i}`)} />
                : r.control === 'kbd' ? <Kbd>{r.controlText}</Kbd>
                : r.controlText ? <PillTrigger>{r.controlText}</PillTrigger>
                : undefined
              }
            />
          ))}
        </GroupCard>
      </div>
    </div>
  )
}
