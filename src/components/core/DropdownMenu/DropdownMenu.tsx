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

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  arrangement='vertical',
  items,
  size='m',
  disabled=false,
  internal,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) {
      menuRef.current?.focus()
    // } else {
    //   triggerRef.current?.focus()
    }
  }, [isOpen])

  const updateIsOpen = (value: boolean) => {
    setIsOpen(value)

    if (!isOpen && triggerRef.current) {
      triggerRef.current?.focus()
    }
  }

  return (
    <div>
      <Flyout
        isOpen={isOpen}
        onOpenChange={updateIsOpen}
        label={label}
        size={size}
        arrangement={arrangement}
        disabled={disabled}
        internal={{
          trigger: {
            internal: {
              root: {
                ref: triggerRef,
                'aria-expanded': isOpen,
              }
            }
          } as any
        }}
        {...internal?.root}
      >
        <div
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              updateIsOpen(false)
            }
          }}
        >
          <Menu
            items={items}
            size={size}
            internal={{
              root: {ref: menuRef}
            }}
            {...internal?.content}
          />
        </div>
      </Flyout>
    </div>
  )
}

export { DropdownMenu }
export type { DropdownMenuProps }
