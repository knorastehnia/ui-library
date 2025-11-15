import styles from './ContextMenu.module.css'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Popover, type PopoverProps } from '../Popover'
import { Menu, type MenuProps } from '../Menu'

interface ContextMenuProps extends MenuProps {
  target: React.RefObject<HTMLElement | null>
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    popover?: PopoverProps
  }
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  size,
  target,
  internal,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const contextRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const openContextMenu = useCallback((event: MouseEvent) => {
    event.preventDefault()
    if (contextRef?.current?.contains(event.target as HTMLElement)) return

    setPos({
      x: event.clientX,
      y: event.clientY,
    })

    setIsOpen(true)

    document.body.style.overflow = 'hidden'
  }, [])

  const closeContextMenu = () => {
    setIsOpen(false)

    document.body.style.overflow = 'auto'
  }

  useLayoutEffect(() => {
    if (isOpen) contextRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !menuRef.current) return

    menuRef.current.focus()
  }, [isOpen])

  useEffect(() => {
    const trigger = target.current
    if (!trigger) return

    trigger.addEventListener('contextmenu', openContextMenu)

    return () => trigger.removeEventListener('contextmenu', openContextMenu)
  }, [openContextMenu])

  return (
    <div
      ref={contextRef}
      className={styles['context-menu']}
      style={{ top: pos.y, left: pos.x, }}
      tabIndex={-1}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          closeContextMenu()
        }
      }}
      {...internal?.root}
    >
      <Popover
        isOpen={isOpen}
        onClose={closeContextMenu}
        {...internal?.popover}
      >
        <Menu
          items={items}
          size={size}
          internal={{
            root: {ref: menuRef}
          }}
        />
      </Popover>
    </div>
  )
}

export { ContextMenu }
export type { ContextMenuProps }
