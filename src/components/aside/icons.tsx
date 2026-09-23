'use client'

import type { CSSProperties, ComponentType } from 'react'
import {
  AiSettingsGearN2,
  AiDossier,
  AiLock,
  AiSparkle,
  AiProjects,
  AiN3DBoxTopBUC0GHm as AiBox3d,
  AiPuzzle,
  AiHistoryDY48T8b as AiHistory,
  AiDevices,
  AiWindowCursor,
  AiHandN5Finger,
  AiBubbles,
  AiArrowUpRight,
  AiMagnifyingGlass,
  AiPlusMedium,
  AiCrossMedium,
  AiChevronDownMedium,
  AiChevronRightMedium,
  AiCheckmarkN2Medium,
  AiArrowUp,
  AiArrowCornerDownLeft,
  AiFolderN1,
  AiSettingsSliderHor,
  AiShieldCheckN3,
  AiListBullets,
  AiDotGridN1XN3HorizontalTight as AiDotGrid,
  AiFileTextDdNKu5L as AiFileText,
  AiFolderOpen,
  AiGlobeBR7Qe9m as AiGlobe,
  AiPlay,
  AiSlack,
  AiZap,
} from './aside-icons.generated'
import {
  AiPeopleCircle,
  AiPaperclipN1,
  AiMoon,
  AiSun,
  AiChipSimple,
  AiKeyN2,
  AiConsole,
  AiArchive,
  AiOfficialBrandSlimeBI3UfR as AiSlime,
  AiMic,
  AiCardView,
  AiGmail,
} from './aside-icons.extra'
import { AiTagMagicWand, AiTagPalette } from './aside-icons.tags'
import {
  siGooglechrome, siGoogle, siGoogledocs, siGooglesheets, siNotion,
} from 'simple-icons'

export type AsideGlyphProps = {
  size?: number
  ariaHidden?: boolean
  className?: string
  style?: CSSProperties
}

type Glyph = ComponentType<any>

export const asideIconMap = {
  general: AiSettingsGearN2,
  appearance: AiSun,
  account: AiPeopleCircle,
  plan: AiDossier,
  security: AiLock,
  agents: AiSparkle,
  projects: AiProjects,
  models: AiBox3d,
  plugins: AiPuzzle,
  memory: AiChipSimple,
  context: AiTagMagicWand,
  passwords: AiKeyN2,
  routines: AiHistory,
  channels: AiDevices,
  developers: AiConsole,
  minipopup: AiWindowCursor,
  lasso: AiHandN5Finger,
  archived: AiArchive,
  feedback: AiBubbles,
  external: AiArrowUpRight,
  search: AiMagnifyingGlass,
  plus: AiPlusMedium,
  close: AiCrossMedium,
  chevronDown: AiChevronDownMedium,
  chevronRight: AiChevronRightMedium,
  moon: AiMoon,
  sun: AiSun,
  check: AiCheckmarkN2Medium,
  mic: AiMic,
  arrowUp: AiArrowUp,
  arrowSort: AiArrowCornerDownLeft,
  folderAdd: AiFolderN1,
  configure: AiSettingsSliderHor,
  shield: AiShieldCheckN3,
  list: AiListBullets,
  card: AiCardView,
  more: AiDotGrid,
  file: AiFileText,
  folder: AiFolderN1,
  folderOpen: AiFolderOpen,
  globe: AiGlobe,
  play: AiPlay,
  paperclip: AiPaperclipN1,
  slime: AiSlime,
} satisfies Record<string, Glyph>

export type AsideIconName = keyof typeof asideIconMap

export function AsideIcon({ name, size = 16, className = '', style }: {
  name: AsideIconName
  size?: number
  className?: string
  style?: CSSProperties
}) {
  const Icon = asideIconMap[name]
  return <Icon size={size} ariaHidden className={className} style={style} aria-hidden />
}

const fileTypeStyles: Record<string, string> = {
  PDF: 'bg-[#e5484d]',
  DOCX: 'bg-[#2f7bff]',
  XLSX: 'bg-[#2fa866]',
  PPTX: 'bg-[#f3761b]',
}

const simpleBrands: Record<string, { hex: string; path: string }> = {
  googlechrome: siGooglechrome,
  google: siGoogle,
  googledocs: siGoogledocs,
  googlesheets: siGooglesheets,
  notion: siNotion,
}

export function BrandIcon({ slug, label, size = 32 }: {
  slug: string
  label: string
  size?: number
}) {
  if (fileTypeStyles[slug]) {
    return (
      <span
        title={label}
        className={`inline-flex shrink-0 items-center justify-center rounded-[10px] text-white ${fileTypeStyles[slug]}`}
        style={{ width: size, height: size }}
      >
        <span style={{ fontSize: size * 0.28 }} className="font-bold tracking-tight">{slug}</span>
      </span>
    )
  }
  if (slug.toLowerCase() === 'gmail') {
    return (
      <span
        title={label}
        className="inline-flex shrink-0 items-center justify-center rounded-[10px] border border-[var(--as-border)] bg-white"
        style={{ width: size, height: size }}
      >
        <AiGmail size={size * 0.72} />
      </span>
    )
  }
  if (slug.toLowerCase() === 'slack') {
    return (
      <span
        title={label}
        className="inline-flex shrink-0 items-center justify-center rounded-[10px] border border-[var(--as-border)] bg-white"
        style={{ width: size, height: size, color: '#4A154B' }}
      >
        <AiSlack size={size * 0.6} />
      </span>
    )
  }
  const brand = simpleBrands[slug.toLowerCase()]
  const hex = brand?.hex ? `#${brand.hex}` : '#6f6f6a'
  return (
    <span
      title={label}
      className="inline-flex shrink-0 items-center justify-center rounded-[10px] border border-[var(--as-border)] bg-white"
      style={{ width: size, height: size }}
    >
      {brand ? (
        <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58} fill={hex} aria-hidden>
          <path d={brand.path} />
        </svg>
      ) : (
        <span style={{ fontSize: size * 0.4 }} className="font-bold text-[var(--as-ink-2)]">
          {label.charAt(0)}
        </span>
      )}
    </span>
  )
}

export function CoverIcon({ glyph, index = 0 }: {
  glyph: 'check' | 'zap' | 'palette'
  index?: number
}) {
  const Glyph = glyph === 'check' ? AiCheckmarkN2Medium : glyph === 'zap' ? AiZap : AiTagPalette
  void index
  return (
    <span
      className="inline-flex items-center justify-center rounded-2xl"
      style={{ width: 56, height: 56, background: 'rgba(255,255,255,0.28)' }}
    >
      <Glyph size={28} className="text-white" />
    </span>
  )
}

const coverGradients = [
  'linear-gradient(135deg,#7aa2ff 0%,#c9b8ff 45%,#6d7cff 100%)',
  'linear-gradient(135deg,#ff9eb5 0%,#f95d9b 55%,#c9b8ff 100%)',
  'linear-gradient(135deg,#ffb347 0%,#ff8a3d 55%,#ffd9a0 100%)',
]

export function CoverArt({ index = 0, glyph }: { index?: number; glyph: 'check' | 'zap' | 'palette' }) {
  return (
    <span
      className="flex h-28 items-center justify-center rounded-t-[12px]"
      style={{ background: coverGradients[index % coverGradients.length] }}
    >
      <CoverIcon glyph={glyph} index={index} />
    </span>
  )
}
