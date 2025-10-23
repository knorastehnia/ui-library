import styles from './ContextMenu.module.css'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Typography } from '../Typography'
import { Popover, type PopoverProps } from '../Popover'
import { Button, type ButtonProps } from '../Button'

interface ItemInterface {
  label: string
  action?: string | Function
  disabled?: boolean
}

interface ContextMenuProps {
  children: React.ReactElement | React.ReactElement[]
  items: ItemInterface[]
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    display?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    content?: PopoverProps
    trigger?: ButtonProps
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
  }

  const closeContextMenu = () => {
    setIsOpen(false)
  }

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
            {...internal?.display}
          >
            <Popover
              isOpen={isOpen}
              onClose={closeContextMenu}
              {...internal?.content}
            >
              {items.map((item, index) => {
                return (
                  <Button
                    key={index}
                    action={item.action}
                    surface='hollow'
                    width='full'
                    disabled={item.disabled}
                    {...internal?.trigger}
                  >
                    <Typography>
                      {item.label}
                    </Typography>
                  </Button>
                )
              })}
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
