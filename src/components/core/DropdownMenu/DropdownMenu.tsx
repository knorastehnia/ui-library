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

  useEffect(() => {
    if (!isOpen || !menuRef.current) return

    menuRef.current.focus()
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
        {...internal?.root}
      >
        <Menu
          items={items}
          size={size}
          internal={{
            root: {ref: menuRef}
          }}
          {...internal?.content}
        />
      </Flyout>
    </div>
  )
}

export { DropdownMenu }
export type { DropdownMenuProps }
