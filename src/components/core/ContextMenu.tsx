import { useState } from 'react'
import styles from './ContextMenu.module.css'
import Popover from './Popover'
import Typography from './Typography'

interface ItemInterface {
  label: string,
  href?: string,
  onClick?: Function,
}

interface ContextMenuProps {
  children: React.ReactNode,
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
            <div key={index}>
              {item.href !== undefined && item.href.length > 0

              ?
                <a
                  href={item.href}
                  onClick={() => item.onClick}
                  className={styles['item']}
                >
                  {item.label}
                </a>

              :
                <button
                  onClick={() => item.onClick}
                  className={styles['item']}
                >
                  <Typography size='s' weight='300'>
                    {item.label}
                  </Typography>
                </button>
              }
            </div>
          )
        })}
      </Popover>
    </div>
  )
}

export default ContextMenu
