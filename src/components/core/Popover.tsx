import styles from './Popover.module.css'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import useCollapseEffect from '../utils/useCollapseEffect'

interface PopoverProps {
  children: React.ReactElement | React.ReactElement[],
  isOpen: boolean,
  onClose?: Function,
  position?: { x: number, y: number },
}

const Popover: React.FC<PopoverProps> = ({
  children,
  isOpen,
  onClose,
  position={ x: 0, y: 0 },
}) => {
  const contentRef = useRef(null)

  useCollapseEffect(contentRef, isOpen, 0)

  const closePopover = (event: MouseEvent) => {
    const content = contentRef.current as HTMLButtonElement | null;
    if (!content) return

    if (event.target !== content && !content.contains(event.target as Node)) {
      onClose?.(event)
    }
  }

  const escapePopover = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose?.(event)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', closePopover)
    document.addEventListener('keydown', escapePopover)
    
    return () => {
      document.removeEventListener('mousedown', closePopover)
      document.addEventListener('keydown', escapePopover)
    }
  }, [])

  return (
    createPortal(
      <div
        ref={contentRef}
        style={{ top: position.y, left: position.x }}
        className={`
          ${styles['popover']} 
          ${isOpen && styles['popover-visible']}
        `}
      >
        {children}
      </div>,
      document.querySelector('#root')!
    )
  )
}

export default Popover
