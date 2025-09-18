import { useState } from 'react'
import styles from './ContextMenu.module.css'
import Popover from './Popover'

interface ContextMenuProps {
  children: React.ReactNode,
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const openContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setPos({
      x: event.clientX,
      y: event.clientY,
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
        position='fixed'
        inset={`${pos.y}px auto auto ${pos.x}px`}
      >
        Content
      </Popover>
    </div>
  )
}

export default ContextMenu
