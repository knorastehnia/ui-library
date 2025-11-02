import { Menu, type MenuProps } from '../Menu'
import { Flyout, type FlyoutProps } from '../Flyout'
import { useEffect, useRef, useState } from 'react'

interface DropdownMenuProps extends MenuProps {
  label: string
  arrangement?: 'vertical' | 'horizontal'
  disabled?: boolean
  internal?: {
    root?: FlyoutProps
    content?: MenuProps
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
  const flyoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen || !flyoverRef.current) return

    const content = flyoverRef.current.querySelector(':scope > div > div') as HTMLDivElement

    const children = getChildren(content)
    const firstChild = children[0]

    firstChild?.focus()
  }, [isOpen])

  return (
    <div
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false)
        }
      }}
    >
      <Flyout
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        label={label}
        size={size}
        arrangement={arrangement}
        disabled={disabled}
        internal={{
          root: {ref: flyoverRef}
        }}
        {...internal?.root}
      >
        <Menu
          items={items}
          size={size}
          {...internal?.content}
        />
      </Flyout>
    </div>
  )
}

export { DropdownMenu }
export type { DropdownMenuProps }
