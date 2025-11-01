import styles from './ContextMenu.module.css'
import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Popover, type PopoverProps } from '../Popover'
import { Menu, type MenuProps } from '../Menu'

interface ContextMenuProps extends MenuProps {
  children: React.ReactElement | React.ReactElement[]
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    display?: PopoverProps
    content?: MenuProps
  }
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  items,
  internal,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const contextRef = useRef<HTMLDivElement>(null)

  const openContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    if (contextRef?.current?.contains(event.target as HTMLElement)) return

    setPos({
      x: event.clientX + window.scrollX,
      y: event.clientY + window.scrollY,
    })
    setIsOpen(true)

    document.body.style.overflow = 'hidden'
  }

  const closeContextMenu = () => {
    setIsOpen(false)

    document.body.style.overflow = 'auto'
  }

  useLayoutEffect(() => {
    isOpen && contextRef.current?.focus()
  }, [isOpen])

  return (
    <div
      className={styles['context-container']}
      onContextMenu={openContextMenu}
      {...internal?.root}
    >
      {children}

      {
        createPortal(
          <div
            ref={contextRef}
            className={styles['context-menu']}
            style={{ top: pos.y, left: pos.x, }}
            tabIndex={-1}
            {...internal?.display}
          >
            <Popover
              isOpen={isOpen}
              onClose={closeContextMenu}
              {...internal?.content}
            >
              <Menu items={items} />
            </Popover>
          </div>,

          document.querySelector('#root')!
        )
      }
    </div>
  )
}

export { ContextMenu }
export type { ContextMenuProps }
