import { Menu, type MenuProps } from '../Menu'
import { Flyout } from '../Flyout'
import { useRef, useState } from 'react'

interface DropdownMenuProps extends MenuProps {
  label: string
  arrangement?: 'vertical' | 'horizontal'
  disabled?: boolean
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    menu?: MenuProps
  }
}

const getChildren = (content: HTMLDivElement) => {
  return Array.from(content.children).flatMap((child) => {
    if ((child as HTMLButtonElement).disabled) return []

    if (child.tagName === 'BUTTON' || child.tagName === 'A') {
      return child
    } else if (child.tagName === 'DIV') {
      return child.querySelector('button')
    }
  }) as HTMLElement[]
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  arrangement='vertical',
  items,
  size='m',
  disabled=false,
  internal,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuContainerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const handleKeyboard = (e: React.KeyboardEvent) => {
    const content = menuContainerRef.current?.querySelector(':scope > div > div') as HTMLDivElement
    if (!content || document.activeElement !== triggerRef.current) return

    const keys = [
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
      'PageUp',
      'PageDown',
    ]

    if (!keys.includes(e.key)) return
    e.preventDefault()

    const children = getChildren(content)

    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
        children[0].focus()
        break

      case 'ArrowUp':
      case 'PageUp':
        children[children.length - 1].focus()
        break

      case 'End':
        const lastTab = children[children.length - 1]
        lastTab.focus()
        break

      case 'Home':
        const firstTab = children[0]
        firstTab.focus()
        break

      default:
        break
    }
  }

  const updateIsOpen = (value: boolean) => {
    setIsOpen(value)

    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus()
    }
  }

  return (
    <div
      {...internal?.root}
      onKeyDown={handleKeyboard}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false)
        }
      }}
    >
      <Flyout
        isOpen={isOpen}
        onOpenChange={updateIsOpen}
        label={label}
        size={size}
        arrangement={arrangement}
        disabled={disabled}
        internal={{
          button: {
            internal: {
              root: {
                ref: triggerRef,
                'aria-expanded': isOpen,
              }
            }
          } as any
        }}
      >
        <div
          ref={menuContainerRef}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              updateIsOpen(false)
            }
          }}
        >
          <Menu
            items={items}
            size={size}
            {...internal?.menu}
          />
        </div>
      </Flyout>
    </div>
  )
}

export { DropdownMenu }
export type { DropdownMenuProps }
