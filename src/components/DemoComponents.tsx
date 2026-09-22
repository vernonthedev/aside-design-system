'use client'

import { 
  Sparkles, Code, Terminal, FileText, Copy, CheckCircle,
  MessageSquare, Bot, User, Layers, Settings, Search, Plus,
  ChevronRight, ChevronDown, Expand, Zap, Play, Pause, Stop,
  Search as SearchIcon
} from '@/components/icons'
import { Button } from '@/components/Button'
import { Input, Textarea } from '@/components/Input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/Card'
import { Dropdown, DropdownItem } from '@/components/Dropdown'
import { 
  ChatMessage, CodeBlock, ToolOutput, ActivityItem 
} from '@/components/ChatMessage'

// ============================================
// Data
// ============================================
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

// ============================================
// Overview Components
// ============================================
export function ColorPalette() {
  const colors = [
    { name: 'Primary', value: 'var(--primary)', on: 'var(--on-primary)', container: 'var(--primary-container)', onContainer: 'var(--on-primary-container)' },
    { name: 'Secondary', value: 'var(--secondary)', on: 'var(--on-secondary)', container: 'var(--secondary-container)', onContainer: 'var(--on-secondary-container)' },
    { name: 'Tertiary', value: 'var(--tertiary)', on: 'var(--on-tertiary)', container: 'var(--tertiary-container)', onContainer: 'var(--on-tertiary-container)' },
    { name: 'Error', value: 'var(--error)', on: 'var(--on-error)', container: 'var(--error-container)', onContainer: 'var(--on-error-container)' },
    { name: 'Surface', value: 'var(--surface)', on: 'var(--on-surface)', container: 'var(--surface-container)', onContainer: 'var(--on-surface)' },
    { name: 'Surface Variant', value: 'var(--surface-variant)', on: 'var(--on-surface-variant)', container: 'var(--surface-container-high)', onContainer: 'var(--on-surface)' },
    { name: 'Outline', value: 'var(--outline)', on: '', container: 'var(--outline-variant)', onContainer: '' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {colors.map((color, i) => (
        <Card key={i} className="p-4">
          <div className="mb-3">
            <div 
              className="h-20 rounded-lg border border-outline-variant"
              style={{ backgroundColor: color.value }}
            />
          </div>
          <h4 className="text-label-md font-medium text-on-surface mb-2">{color.name}</h4>
          <div className="space-y-1 text-label-sm font-mono text-on-surface-variant">
            <div>Main: <code>{color.value}</code></div>
            {color.on && <div>On: <code>{color.on}</code></div>}
            <div>Container: <code>{color.container}</code></div>
            {color.onContainer && <div>On Container: <code>{color.onContainer}</code></div>}
          </div>
        </Card>
      ))}
    </div>
  )
}

export function TypographyDemo() {
  const styles = [
    { name: 'Display', className: 'text-display', sample: 'Display — 48px / 56px' },
    { name: 'Headline Large', className: 'text-headline-lg', sample: 'Headline Large — 36px / 44px' },
    { name: 'Headline Medium', className: 'text-headline-md', sample: 'Headline Medium — 28px / 36px' },
    { name: 'Title Large', className: 'text-title-lg', sample: 'Title Large — 20px / 28px' },
    { name: 'Body Large', className: 'text-body-lg', sample: 'Body Large — 18px / 28px' },
    { name: 'Body Medium', className: 'text-body-md', sample: 'Body Medium — 16px / 24px' },
    { name: 'Label Medium', className: 'text-label-md', sample: 'Label Medium — 14px / 20px' },
    { name: 'Label Small', className: 'text-label-sm', sample: 'Label Small — 12px / 16px' },
  ]

  return (
    <div className="space-y-4">
      {styles.map((style, i) => (
        <Card key={i} className="p-4">
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <span className={`${style.className} text-on-surface`}>{style.sample}</span>
            <code className="text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded">{style.className}</code>
          </div>
          <p className={`${style.className} text-on-surface-variant`}>
            The quick brown fox jumps over the lazy dog. 1234567890 !@#$%^&*()
          </p>
        </Card>
      ))}
    </div>
  )
}

export function SpacingElevationDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Spacing Scale</CardTitle>
          <CardDescription>8px base unit with semantic naming</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {['unit (8px)', 'sm (12px)', 'md (24px)', 'lg (40px)', 'xl (64px)', 'gutter (24px)'].map((space, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 text-label-sm text-on-surface-variant font-mono">{space}</div>
              <div className="flex-1 h-2 bg-surface-container rounded" style={{ width: space.includes('64') ? '100%' : space.includes('40') ? '80%' : space.includes('24') ? '50%' : space.includes('12') ? '30%' : '20%' }} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Elevation Levels</CardTitle>
          <CardDescription>Shadow depth for visual hierarchy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { level: 'Level 1 (Base)', shadow: 'none', desc: 'Primary reading plane' },
            { level: 'Level 2 (Cards)', shadow: '0 4px 12px rgba(0,0,0,0.1)', desc: 'Cards, containers' },
            { level: 'Level 3 (Modals)', shadow: '0 8px 24px rgba(0,0,0,0.12)', desc: 'Modals, popovers' },
            { level: 'Focus Ring', shadow: '0 0 0 3px rgba(10,126,164,0.1)', desc: 'Keyboard focus' },
          ].map((elev, i) => (
            <div key={i} className="p-4 rounded-lg" style={{ boxShadow: elev.shadow, backgroundColor: 'var(--surface)' }}>
              <div className="font-medium text-on-surface">{elev.level}</div>
              <div className="text-label-sm text-on-surface-variant">{elev.desc}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export function RadiusDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { name: 'Full (9999px)', value: 'rounded-full', desc: 'Buttons, badges, pills' },
        { name: 'Large (8px)', value: 'rounded-lg', desc: 'Cards, containers, modals' },
        { name: 'Default (4px)', value: 'rounded-md', desc: 'Inputs, form elements' },
        { name: 'Small (2px)', value: 'rounded-sm', desc: 'Small UI elements' },
      ].map((radius, i) => (
        <Card key={i} className="p-6 text-center">
          <div className={`w-24 h-24 mx-auto mb-3 ${radius.value} flex items-center justify-center`} style={{ backgroundColor: 'var(--surface-container)' }}>
            <span className="text-on-surface-variant">{radius.name.split(' ')[0]}</span>
          </div>
          <h4 className="text-label-md font-medium text-on-surface">{radius.name}</h4>
          <p className="text-label-sm text-on-surface-variant">{radius.desc}</p>
        </Card>
      ))}
    </div>
  )
}

export function IconDemo() {
  const iconCategories = {
    Navigation: ['ChevronDown', 'ChevronUp', 'ChevronLeft', 'ChevronRight', 'Menu', 'Close', 'Search', 'Expand'],
    Actions: ['Plus', 'Minus', 'Send', 'Attach', 'Sparkles', 'Shield', 'Layers', 'Settings', 'Download', 'Upload', 'Copy', 'Edit', 'Trash', 'Check', 'Refresh'],
    Communication: ['MessageSquare', 'MessageSquareText', 'Bot', 'AtSign', 'Hash'],
    Content: ['Image', 'FileText', 'Code', 'Terminal', 'Globe', 'Link', 'ExternalLink'],
    User: ['User', 'UserPlus', 'UserMinus', 'Lock', 'LockOpen', 'Key'],
    Status: ['Circle', 'CircleCheck', 'CircleX', 'CircleAlert', 'Dot', 'BadgeCheck', 'Flag'],
    Layout: ['LayoutSidebar', 'LayoutGrid', 'LayoutList', 'LayoutDashboard'],
    Other: ['Home', 'Bookmark', 'Star', 'Heart', 'Bell', 'BellOff', 'Calendar', 'Clock', 'Tag', 'Folder', 'FolderOpen', 'Archive', 'Database', 'Server', 'Cpu', 'HardDrive'],
    Routines: ['Zap', 'Repeat', 'Play', 'Pause', 'Stop', 'SkipBack', 'SkipForward'],
  }

  return (
    <div className="space-y-6">
      {Object.entries(iconCategories).map(([category, icons]) => (
        <div key={category}>
          <h3 className="text-title-lg text-on-surface mb-3">{category}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            {icons.map(iconName => (
              <div key={iconName} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-surface-container transition-colors group">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-surface-container group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="text-label-sm text-on-surface-variant">{iconName}</span>
                </div>
                <span className="text-label-sm text-on-surface-variant text-center truncate">{iconName}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function Overview() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-display text-on-surface mb-4">Aside Design System</h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl">
          Complete design system extracted from the Aside browser (v1.0.914.1). 
          Includes color tokens, typography, spacing, elevation, components, and icons - 
          ready to use in your projects.
        </p>
      </section>

      <section>
        <h2 className="text-headline-md text-on-surface mb-6">Color Palette</h2>
        <ColorPalette />
      </section>

      <section>
        <h2 className="text-headline-md text-on-surface mb-6">Typography Scale</h2>
        <TypographyDemo />
      </section>

      <section>
        <h2 className="text-headline-md text-on-surface mb-6">Spacing & Elevation</h2>
        <SpacingElevationDemo />
      </section>

      <section>
        <h2 className="text-headline-md text-on-surface mb-6">Border Radius</h2>
        <RadiusDemo />
      </section>

      <section>
        <h2 className="text-headline-md text-on-surface mb-6">Icon System</h2>
        <IconDemo />
      </section>
    </div>
  )
}

// ============================================
// Components Demo - Stateless version to avoid TSX parsing issues
// ============================================
export function ComponentsDemo() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-headline-md text-on-surface mb-6">Buttons</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" leftIcon={<Plus size={18} />}>With Icon</Button>
          <Button variant="secondary" rightIcon={<ChevronRight size={18} />}>Trailing Icon</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </section>

      <section>
        <h2 className="text-headline-md text-on-surface mb-6">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Email"
            placeholder="you@example.com"
            leftIcon={<SearchIcon size={20} />}
            helperText="We'll never share your email"
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error="Password must be at least 8 characters"
            rightIcon={<ChevronRight size={20} />}
          />
          <Textarea
            label="Message"
            placeholder="Type your message here..."
            helperText="Maximum 500 characters"
          />
          <Input
            label="Disabled"
            placeholder="Cannot edit"
            disabled
          />
        </div>
      </section>

      <section>
        <h2 className="text-headline-md text-on-surface mb-6">Dropdowns</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Dropdown
            trigger={<Button variant="secondary"><span>Select model</span> <ChevronDown size={14} /></Button>}
            items={modelOptions}
            value="nemotron-3-ultra"
            onChange={v => console.log(v)}
            placeholder="Select model"
            searchable
          />
          <Dropdown
            trigger={<Button variant="secondary"><span>Reasoning</span> <ChevronDown size={14} /></Button>}
            items={reasoningOptions}
            value="high"
            onChange={v => console.log(v)}
            placeholder="Reasoning level"
          />
          <Dropdown
            trigger={<Button variant="secondary"><span>Permission</span> <ChevronDown size={14} /></Button>}
            items={permissionOptions}
            value="full-access"
            onChange={v => console.log(v)}
            placeholder="Permission"
          />
        </div>
      </section>

      <section>
        <h2 className="text-headline-md text-on-surface mb-6">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card hover>
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>Hover to see elevation change</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body-md text-on-surface-variant">
                Cards use Level 2 elevation by default, transitioning to Level 3 on hover.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm">Action</Button>
              <Button variant="primary" size="sm">Primary</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader action={<span className="px-2 py-0.5 text-label-sm bg-primary-container text-on-primary-container rounded-full">New</span>}>
              <CardTitle>Card with Badge</CardTitle>
              <CardDescription>Status indicators and metadata</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body-md text-on-surface-variant">Content goes here with supporting information.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center py-8">
              <Code size={48} className="text-primary mx-auto mb-3" />
              <h4 className="text-title-lg text-on-surface mb-1">Code Card</h4>
              <p className="text-body-md text-on-surface-variant">Specialized card for code snippets</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-headline-md text-on-surface mb-6">Chat Messages</h2>
        <div className="space-y-4 max-w-2xl">
          <ChatMessage
            role="user"
            content="Can you help me understand the Aside design system?"
            timestamp="2:30 PM"
            metadata={{ model: 'Nemotron 3 Ultra', tokens: 156, duration: '1.2s' }}
          />
          <ChatMessage
            role="assistant"
            content="The Aside design system is built around 'Productive Minimalism' - a philosophy that strips away visual noise while maintaining warmth. Key principles include..."
            timestamp="2:30 PM"
            status="completed"
            metadata={{ model: 'Nemotron 3 Ultra', tokens: 1245, duration: '2.4s' }}
          />
          <ChatMessage
            role="user"
            content="Show me the color tokens"
            timestamp="2:31 PM"
          />
          <ChatMessage
            role="assistant"
            content={<>
              <p className="mb-3">Here are the primary color tokens:</p>
              <CodeBlock 
                code={`:root {
  --primary: #0a7ea4;
  --on-primary: #ffffff;
  --primary-container: #b3e5fc;
  --on-primary-container: #004d6d;
  --primary-fixed: #b3e5fc;
  --primary-fixed-dim: #80deea;
}`}
                language="css"
                filename="colors.css"
              />
            />}
            timestamp="2:31 PM"
            status="completed"
            metadata={{ model: 'Nemotron 3 Ultra', tokens: 892, duration: '1.8s' }}
          />
          <ChatMessage
            role="tool"
            content={<ToolOutput
              title="Web Search: Aside browser design"
              status="completed"
              duration="1.2s"
              expandable
              onExpand={() => {}}
              expanded
            >
              <div className="space-y-2 text-sm">
                <p>Found design system at aside.com with 47 colors...</p>
                <p>Typography uses Geist for body, custom display font for headlines</p>
                <p>Spacing based on 8px unit with semantic scale</p>
              </div>
            </ToolOutput>}
            timestamp="2:31 PM"
            metadata={{ model: 'Search Tool', duration: '1.2s' }}
          />
        </div>
      </section>

      <section>
        <h2 className="text-headline-md text-on-surface mb-6">Activity Items</h2>
        <div className="space-y-2 max-w-md">
          <ActivityItem
            icon={<SearchIcon size={18} />}
            label="Searched for 'Aside browser design system'"
            timestamp="2:30 PM"
          />
          <ActivityItem
            icon={<Code size={18} />}
            label="Extracted design tokens from aside.com"
            timestamp="2:30 PM"
            expandable
            onClick={() => {}}
            expanded
          >
            <div className="mt-2 p-3 bg-surface-container rounded-default text-sm">
              Found 47 colors, 8 type scales, 4 elevation levels, 4 radius values
            </div>
          </ActivityItem>
          <ActivityItem
            icon={<Sparkles size={18} />}
            label="Generated component specifications"
            timestamp="2:31 PM"
            status="running"
          />
          <ActivityItem
            icon={<Terminal size={18} />}
            label="Created icon system (80+ icons)"
            timestamp="2:32 PM"
          />
          <ActivityItem
            icon={<FileText size={18} />}
            label="Wrote DESIGN.md documentation"
            timestamp="2:33 PM"
          />
        </div>
      </section>

      <section>
        <h2 className="text-headline-md text-on-surface mb-6">Tool Outputs</h2>
        <div className="space-y-4 max-w-2xl">
          <ToolOutput
            title="Web Search: Helium browser review"
            status="completed"
            duration="0.8s"
            expandable
            onExpand={() => {}}
            expanded
          >
            <div className="prose prose-sm max-w-none">
              <p>Helium is a Chromium-based browser focused on privacy and minimalism...</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Built-in uBlock Origin</li>
                <li>No background network requests</li>
                <li>Anonymized Chrome Web Store queries</li>
                <li>Manifest V2 support</li>
              </ul>
            </div>
          </ToolOutput>

          <ToolOutput
            title="Code Execution: Design token extraction"
            status="running"
            expandable
            onExpand={() => {}}
            expanded
          >
            <div className="font-mono text-sm bg-surface-container-highest p-3 rounded">
              {`$ python extract_tokens.py
> Fetching aside.com...
> Parsing CSS custom properties...
> Found 47 color tokens
> Found 8 typography scales
> Found 4 elevation levels
> Writing DESIGN.md...
✓ Complete`}
            </div>
          </ToolOutput>

          <ToolOutput
            title="TypeScript Compilation"
            status="error"
            expandable
            onExpand={() => {}}
            expanded
          >
            <div className="font-mono text-sm text-error bg-error-container/20 p-3 rounded">
              {`error TS2322: Type 'string' is not assignable to type 'Theme'.
  Theme = 'light' | 'dark' | 'system'`}
            </div>
          </ToolOutput>
        </div>
      </section>
    </div>
  )
}

// ============================================
// Side Panel Demo
// ============================================
export function SidePanelDemo({ onOpenSidePanel }: { onOpenSidePanel: () => void }) {
  return (
    <div className="h-[80vh] relative">
      <div className="absolute inset-0 bg-surface-container-low rounded-lg border border-outline-variant p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <MessageSquare size={64} className="text-on-surface-variant/30 mx-auto mb-4" />
          <h3 className="text-headline-md text-on-surface mb-2">Side Panel Demo</h3>
          <p className="text-body-md text-on-surface-variant mb-6">
            Click the "Side Panel" button in the top navigation to see the full interactive side panel with chat sessions, routines, and composer.
          </p>
          <Button variant="primary" onClick={onOpenSidePanel} leftIcon={<MessageSquare size={18} />}>
            Open Side Panel
          </Button>
        </div>
      </div>
    </div>
  )
}

// ============================================
// New Tab Demo
// ============================================
export function NewTabDemo({ onOpenNewTab }: { onOpenNewTab: () => void }) {
  return (
    <div className="h-[80vh] relative">
      <div className="absolute inset-0 bg-surface-container-low rounded-lg border border-outline-variant p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Plus size={64} className="text-on-surface-variant/30 mx-auto mb-4" />
          <h3 className="text-headline-md text-on-surface mb-2">New Tab Page Demo</h3>
          <p className="text-body-md text-on-surface-variant mb-6">
            Click the "New Tab" button in the top navigation to see the full new tab page with search, chat history, and routines.
          </p>
          <Button variant="primary" onClick={onOpenNewTab} leftIcon={<Plus size={18} />}>
            Open New Tab
          </Button>
        </div>
      </div>
    </div>
  )
}