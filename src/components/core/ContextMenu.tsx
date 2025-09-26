import { useState } from 'react'
import styles from './ContextMenu.module.css'
import Popover from './Popover'
import Typography from './Typography'

interface ItemInterface {
  label: string,
  href?: string,
  onClick?: Function,
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

      <Popover
        isOpen={isOpen}
        onClose={closeContextMenu}
        position={{ y: pos.y, x: pos.x }}
      >
        {items.map((item, index) => {
          return (
            <button
              key={index}
              disabled={item.disabled}
              onClick={(e) => {
                !item.disabled && item.onClick?.(e)
                setIsOpen(false)
              }}
              className={`
                ${styles['item']} 
                ${item.disabled && styles['disabled']}
              `}
            >
              <Typography weight='400' color={item.disabled ? 'disabled' : 'primary'}>
                {item.label}
              </Typography>
            </button>
          )
        })}
      </Popover>
    </div>
  )
}

export default ContextMenu
