'use client'

import { useState, useRef, useEffect, ReactNode, Fragment } from 'react'
import { ChevronDown, ChevronRight, Check } from './icons'

export interface DropdownItem {
  label: string
  value: string
  icon?: ReactNode
  disabled?: boolean
  badge?: string
  shortcut?: string
  group?: string
  type?: 'item' | 'separator'
}

export interface DropdownGroup {
  label: string
  items: DropdownItem[]
}

export interface DropdownProps {
  trigger: ReactNode
  items: (DropdownItem | DropdownGroup)[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  searchable?: boolean
  disabled?: boolean
  className?: string
  triggerClassName?: string
  maxHeight?: string
}

export function Dropdown({ 
  trigger, 
  items, 
  value, 
  onChange, 
  placeholder, 
  searchable = false, 
  disabled = false, 
  className = '', 
  triggerClassName = '',
  maxHeight = '320px'
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const selectedItem = items.flatMap(item => 
    'items' in item ? item.items : (item.type === 'separator' ? [] : [item])
  ).find(item => item.value === value)

  const filteredItems = items.flatMap((item, groupIndex) => {
    if ('items' in item) {
      const filtered = item.items.filter(i => 
        i.type !== 'separator' && i.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
      if (filtered.length === 0) return []
      return [{ ...item, items: filtered, _groupIndex: groupIndex }]
    }
    return item.type !== 'separator' && item.label.toLowerCase().includes(searchQuery.toLowerCase()) ? [{ ...item, _groupIndex: groupIndex }] : []
  })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
        setHighlightedIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(-1)
    }
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setIsOpen(true)
      }
      return
    }

    const visibleItems = filteredItems.flatMap(item => 
      'items' in item ? item.items : [item]
    )

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setSearchQuery('')
        setHighlightedIndex(-1)
        triggerRef.current?.focus()
        break
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => Math.min(prev + 1, visibleItems.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => Math.max(prev - 1, -1))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && visibleItems[highlightedIndex]) {
          onChange?.(visibleItems[highlightedIndex].value)
          setIsOpen(false)
          setSearchQuery('')
          setHighlightedIndex(-1)
        }
        break
      case 'Tab':
        setIsOpen(false)
        setSearchQuery('')
        setHighlightedIndex(-1)
        break
    }
  }

  const handleItemClick = (itemValue: string) => {
    onChange?.(itemValue)
    setIsOpen(false)
    setSearchQuery('')
    setHighlightedIndex(-1)
    triggerRef.current?.focus()
  }

  const renderItems = () => {
    return filteredItems.map((item, index) => {
      if ('items' in item) {
        return (
          <Fragment key={item.label}>
            <div className="px-4 py-2 text-label-sm text-on-surface-variant uppercase tracking-wider">
              {item.label}
            </div>
            {item.items.map((subItem, subIndex) => (
              <div
                key={subItem.value}
                className={`dropdown-item ${value === subItem.value ? 'bg-primary-container text-on-primary-container' : ''} ${subItem.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${highlightedIndex === index + subIndex ? 'bg-surface-container-low' : ''}`}
                onClick={() => !subItem.disabled && handleItemClick(subItem.value)}
                onMouseEnter={() => setHighlightedIndex(index + subIndex)}
                role="option"
                aria-selected={value === subItem.value}
                aria-disabled={subItem.disabled}
              >
                {subItem.icon && <span className="flex-shrink-0">{subItem.icon}</span>}
                <span className="flex-1">{subItem.label}</span>
                {subItem.badge && <span className="px-2 py-0.5 text-label-sm bg-primary-container text-on-primary-container rounded-full">{subItem.badge}</span>}
                {subItem.shortcut && <span className="text-label-sm text-on-surface-variant font-mono">{subItem.shortcut}</span>}
                {value === subItem.value && <Check size={16} className="flex-shrink-0" />}
              </div>
            ))}
            {item._groupIndex !== items.length - 1 && <div className="dropdown-separator" />}
          </Fragment>
        )
      }
      return (
        <div
          key={item.value}
          className={`dropdown-item ${value === item.value ? 'bg-primary-container text-on-primary-container' : ''} ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${highlightedIndex === index ? 'bg-surface-container-low' : ''}`}
          onClick={() => !item.disabled && handleItemClick(item.value)}
          onMouseEnter={() => setHighlightedIndex(index)}
          role="option"
          aria-selected={value === item.value}
          aria-disabled={item.disabled}
        >
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          <span className="flex-1">{item.label}</span>
          {item.badge && <span className="px-2 py-0.5 text-label-sm bg-primary-container text-on-primary-container rounded-full">{item.badge}</span>}
          {item.shortcut && <span className="text-label-sm text-on-surface-variant font-mono">{item.shortcut}</span>}
          {value === item.value && <Check size={16} className="flex-shrink-0" />}
        </div>
      )
    })
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        className={`btn-base btn-secondary w-full justify-between ${triggerClassName}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={placeholder}
      >
        <span className="truncate flex-1 text-left">
          {selectedItem?.label || placeholder || 'Select...'}
        </span>
        <ChevronDown size={18} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`dropdown-base ${className}`}
          style={{ maxHeight }}
          role="listbox"
        >
          {searchable && (
            <div className="p-2 border-b border-outline-variant">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-base h-9 text-sm pl-10"
              />
            </div>
          )}
          <div className="max-h-[280px] overflow-y-auto">
            {renderItems()}
          </div>
        </div>
      )}
    </div>
  )
}

export interface MenuProps {
  trigger: ReactNode
  children: ReactNode
  className?: string
  triggerClassName?: string
  align?: 'left' | 'right'
}

export function Menu({ trigger, children, className = '', triggerClassName = '', align = 'left' }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        ref={triggerRef}
        type="button"
        className={`btn-base btn-ghost ${triggerClassName}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          className={`dropdown-base ${className} ${align === 'right' ? 'right-0' : ''}`}
          role="menu"
        >
          {children}
        </div>
      )}
    </div>
  )
}

export interface MenuItemProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  icon?: ReactNode
  shortcut?: string
  destructive?: boolean
  className?: string
}

export function MenuItem({ children, onClick, disabled = false, icon, shortcut, destructive = false, className = '' }: MenuItemProps) {
  return (
    <button
      type="button"
      className={`dropdown-item w-full text-left ${destructive ? 'text-error' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      role="menuitem"
      aria-disabled={disabled}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-1">{children}</span>
      {shortcut && <span className="text-label-sm text-on-surface-variant font-mono">{shortcut}</span>}
    </button>
  )
}

export function MenuSeparator({ className = '' }: { className?: string }) {
  return <div className={`dropdown-separator ${className}`} role="separator" />
}

export interface MenuGroupProps {
  label: string
  children: ReactNode
}

export function MenuGroup({ label, children }: MenuGroupProps) {
  return (
    <div>
      <div className="px-4 py-2 text-label-sm text-on-surface-variant uppercase tracking-wider">
        {label}
      </div>
      {children}
    </div>
  )
}