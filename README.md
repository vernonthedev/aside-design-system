# Aside Browser Design System

Complete design system extracted from the Aside browser (v1.0.914.1) for recreation in other projects.

## Features

- **Design Tokens**: Colors, typography, spacing, elevation, border radius, motion
- **Components**: Button, Input, Card, Dropdown, Menu, SidePanel, NewTabPage, ChatMessage, ToolOutput, ActivityItem
- **Icons**: 80+ SVG icons (Material Symbols style, 20×20px, 2px stroke)
- **Theming**: Light/Dark/System mode with CSS custom properties
- **Accessibility**: Focus management, keyboard navigation, ARIA attributes
- **Responsive**: Mobile-first, works at all breakpoints

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

## Design Tokens

### Colors (Light Mode)
```css
--primary: #0a7ea4;
--on-primary: #ffffff;
--primary-container: #b3e5fc;
--surface: #ffffff;
--surface-container: #e9ecef;
--on-surface: #090b0c;
--on-surface-variant: #6c757d;
--outline-variant: #cccccc;
```

### Colors (Dark Mode)
```css
--primary: #4fc3f7;
--surface: #171717;
--surface-container: #1f1f1f;
--on-surface: #f5f5f5;
--on-surface-variant: #b0b0b0;
--outline-variant: #444444;
```

### Typography
- **Display Font**: Custom display font (fallback: system-ui)
- **Body Font**: Geist (400, 500, 600)
- **Scale**: display (48px) → headline-lg (36px) → headline-md (28px) → title-lg (20px) → body-lg (18px) → body-md (16px) → label-md (14px) → label-sm (12px)

### Spacing (8px base)
- unit: 8px
- sm: 12px
- md: 24px
- lg: 40px
- xl: 64px
- gutter: 24px

### Elevation
- Level 1: none
- Level 2: 0 4px 12px rgba(0,0,0,0.1)
- Level 3: 0 8px 24px rgba(0,0,0,0.12)
- Focus: 0 0 0 3px rgba(10,126,164,0.1)

### Border Radius
- Full: 9999px (buttons, badges)
- Large: 8px (cards, modals)
- Default: 4px (inputs)
- Small: 2px (small elements)

## Components

### Core Components
- `Button` - Primary, Secondary, Ghost variants with loading state
- `Input` / `Textarea` - With label, error, helper text, icons
- `Card` - Composable with Header, Title, Description, Content, Footer
- `Dropdown` - Searchable, grouped, keyboard accessible
- `Menu` - Context menus with groups, separators, shortcuts

### Composite Components
- `SidePanel` - Full Aside side panel with tabs, sessions, composer
- `NewTabPage` - Aside new tab with search, chat history, routines
- `ChatMessage` - User/assistant/tool messages with metadata
- `CodeBlock` - Syntax highlighted with copy button
- `ToolOutput` - Expandable tool results with status
- `ActivityItem` - Timeline items with expandable details

## Theming

```tsx
import { ThemeProvider, useTheme } from '@/components/ThemeProvider'

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <MyApp />
    </ThemeProvider>
  )
}

function MyComponent() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  // theme: 'light' | 'dark' | 'system'
  // resolvedTheme: 'light' | 'dark'
}
```

## Icons

```tsx
import { Sparkles, MessageSquare, ChevronDown, User } from '@/components/icons'

// All icons accept size and color props
<Sparkles size={24} color="var(--primary)" />
<MessageSquare size={20} />
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens + Tailwind
│   ├── layout.tsx           # Root layout with fonts
│   └── page.tsx             # Demo showcase page
├── components/
│   ├── icons.tsx            # 80+ SVG icon components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Dropdown.tsx
│   ├── SidePanel.tsx
│   ├── NewTabPage.tsx
│   ├── ChatMessage.tsx
│   └── ThemeProvider.tsx
└── lib/
    └── utils.ts             # Utility functions
```

## Extracted From

This design system was reverse-engineered from the Aside browser (v1.0.914.1) by inspecting:
- Side panel (chrome-extension://fjdhphbdlfjogobdofoaagnlnkoibdge/sidepanel.html)
- New tab page (chrome-extension://fjdhphbdlfjogobdofoaagnlnkoibdge/newtab.html)
- Settings (chrome://settings/)
- Official design tokens (aside.com via DESIGN.md analysis)

## License

MIT - Feel free to use in your projects.