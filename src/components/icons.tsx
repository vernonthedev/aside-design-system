'use client'

import { SVGProps, forwardRef } from 'react'

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string
  color?: string
}

const createIcon = (paths: JSX.Element) => 
  forwardRef<SVGSVGElement, IconProps>(
    ({ size = 20, color = 'currentColor', className, style, ...props }, ref) => (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={{ ...style, flexShrink: 0 }}
        {...props}
      >
        {paths}
      </svg>
    )
  )

// Navigation & UI
export const ChevronDown = createIcon(<path d="m6 9 6 6 6-6" />)
export const ChevronUp = createIcon(<path d="m18 15-6-6-6 6" />)
export const ChevronLeft = createIcon(<path d="m15 18-6-6 6-6" />)
export const ChevronRight = createIcon(<path d="m9 18 6-6-6-6" />)
export const Menu = createIcon(<path d="M3 12h18M3 6h18M3 18h18" />)
export const Close = createIcon(<path d="M18 6 6 18M6 6l12 12" />)
export const Search = createIcon(<circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />)
export const Plus = createIcon(<path d="M12 5v14M5 12h14" />)
export const Minus = createIcon(<path d="M5 12h14" />)
export const MoreHorizontal = createIcon(<circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />)
export const MoreVertical = createIcon(<circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /><circle cx="12" cy="5" r="1" />)

// Actions
export const Send = createIcon(<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />)
export const Attach = createIcon(<path d="M14.5 12.5H16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h4.5M10 16.5v-6a2 2 0 0 1 2-2h7" />)
export const Sparkles = createIcon(<path d="M12 3v2.2M7 8.3l1.5 1.5M17 8.3l-1.5 1.5M5 13l1.5 1.5M19 13l-1.5 1.5M7 17.7l1.5-1.5M17 17.7l-1.5-1.5M12 21v-2.2" /><path d="M10 15h4M14 11h4M10 5h4" />)
export const Shield = createIcon(<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />)
export const Layers = createIcon(<polygon points="12 2 2 7 12 12 22 7 12 2" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />)
export const Settings = createIcon(<circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />)
export const Expand = createIcon(<path d="M21 21H3v-7M3 3h18v7" />)
export const Minimize = createIcon(<path d="M3 3h18M3 21h18M3 12h18" />)
export const Refresh = createIcon(<path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />)
export const Download = createIcon(<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />)
export const Upload = createIcon(<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 10l-5 5-5-5M12 15V3" />)
export const Copy = createIcon(<rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />)
export const Edit = createIcon(<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />)
export const Trash = createIcon(<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />)
export const Check = createIcon(<path d="M20 6 9 17l-5-5" />)
export const CheckCircle = createIcon(<circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />)
export const AlertCircle = createIcon(<circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />)
export const AlertTriangle = createIcon(<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4M12 17h.01" />)

// Communication
export const MessageSquare = createIcon(<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />)
export const MessageSquareText = createIcon(<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 10h8M8 14h6" />)
export const Bot = createIcon(<rect x="2" y="2" width="20" height="20" rx="2" /><path d="M12 8V4M12 16v4M8 12H4M16 12h4" /><path d="M9 14h6" />)
export const AtSign = createIcon(<circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />)
export const Hash = createIcon(<path d="M4 9h16M4 15h16M9 3v18M15 3v18" />)

// Content & Media
export const Image = createIcon(<rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />)
export const FileText = createIcon(<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6" /><path d="M16 13H8M16 17H8M10 9H8" />)
export const Code = createIcon(<polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />)
export const Terminal = createIcon(<polyline points="4 17 10 11 4 5" /><path d="M12 19h10" />)
export const Globe = createIcon(<circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />)
export const Link = createIcon(<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />)
export const ExternalLink = createIcon(<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />)

// User & Auth
export const User = createIcon(<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />)
export const UserPlus = createIcon(<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /><path d="M16 11h6M19 8v6" />)
export const UserMinus = createIcon(<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /><path d="M16 11h6" />)
export const Lock = createIcon(<rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />)
export const LockOpen = createIcon(<rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /><path d="M9.5 11v-3" />)
export const Key = createIcon(<path d="M15.5 7.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" /><path d="M12 15V7.5" /><path d="M15.5 15.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />)

// Status
export const Circle = createIcon(<circle cx="12" cy="12" r="10" />)
export const CircleCheck = createIcon(<circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />)
export const CircleX = createIcon(<circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" />)
export const CircleAlert = createIcon(<circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />)
export const Dot = createIcon(<circle cx="12" cy="12" r="3" />)
export const BadgeCheck = createIcon(<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" />)
export const Flag = createIcon(<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><path d="M4 22V4" />)

// Layout
export const LayoutSidebar = createIcon(<rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /><path d="M15 3v18" />)
export const LayoutGrid = createIcon(<rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />)
export const LayoutList = createIcon(<path d="M3 3h18M3 12h18M3 21h18" /><path d="M3 3v18" />)
export const LayoutDashboard = createIcon(<rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" />)

// Other
export const Home = createIcon(<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" />)
export const Bookmark = createIcon(<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />)
export const Star = createIcon(<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />)
export const Heart = createIcon(<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />)
export const Bell = createIcon(<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />)
export const BellOff = createIcon(<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /><line x1="1" y1="1" x2="23" y2="23" />)
export const Calendar = createIcon(<rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><path d="M16 2v4M8 2v4M3 10h18" />)
export const Clock = createIcon(<circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />)
export const Tag = createIcon(<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" /><path d="M7 7a2 2 0 0 1 2.83 0" />)
export const Folder = createIcon(<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />)
export const FolderOpen = createIcon(<path d="M20 17a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /><path d="M2 17v-5a2 2 0 0 1 2-2h3.9" />)
export const Archive = createIcon(<rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v6M15 3v6" />)
export const Database = createIcon(<ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14" /><path d="M21 5v14" /><path d="M3 12a9 3 0 0 0 18 0" />)
export const Server = createIcon(<rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><path d="M6 6h12M6 18h12" />)
export const Cpu = createIcon(<rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 4v1M15 4v1M4 9h1M4 15h1M19 9h1M19 15h1M9 19v1M15 19v1" />)
export const HardDrive = createIcon(<path d="M22 12h-4l-3 9H9l-3-9H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /><path d="M6 16h.01M10 16h.01M14 16h.01M18 16h.01" />)

// Routines & Automation
export const Zap = createIcon(<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />)
export const Repeat = createIcon(<path d="M17 1 4 15M17 1h-7v7M10 10v-3a1 1 0 0 0-1-1H7M7 17h3a1 1 0 0 1 1 1v3" />)
export const Play = createIcon(<polygon points="5 3 19 12 5 21 5 3" />)
export const Pause = createIcon(<rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />)
export const Stop = createIcon(<rect x="6" y="6" width="12" height="12" rx="2" />)
export const SkipBack = createIcon(<polygon points="19 20 9 12 19 4 19 20" /><line x1="5" y1="19" x2="5" y2="5" />)
export const SkipForward = createIcon(<polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" />)