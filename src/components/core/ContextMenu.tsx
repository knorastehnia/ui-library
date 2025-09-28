import { useState } from 'react'
import styles from './ContextMenu.module.css'
import Popover from './Popover'
import Typography from './Typography'
import Button from './Button'
import { createPortal } from 'react-dom'

interface ItemInterface {
  label: string,
  action?: string | Function,
  disabled?: boolean,
}

interface ContextMenuProps {
  children: React.ReactElement | React.ReactElement[],
  items: ItemInterface[],
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  items,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const openContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
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
    >
      {children}

      {
        createPortal(
          <div
            className={styles['context-menu']}
            style={{ top: pos.y, left: pos.x, }}
          >
            <Popover
              isOpen={isOpen}
              onClose={closeContextMenu}
            >
              {items.map((item, index) => {
                return (
                  <Button
                    key={index}
                    action={item.action}
                    type='hollow'
                    width='full'
                    disabled={item.disabled}
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

export default ContextMenu
