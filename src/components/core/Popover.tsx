import styles from './Popover.module.css'
import { useEffect, useRef } from 'react'
import useCollapseEffect from '../utils/useCollapseEffect'

interface PopoverProps {
  children: React.ReactElement | React.ReactElement[],
  isOpen: boolean,
  onClose?: Function,
}

const Popover: React.FC<PopoverProps> = ({
  children,
  isOpen,
  onClose,
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
    document.addEventListener('click', closePopover)
    document.addEventListener('keydown', escapePopover)
    
    return () => {
      document.removeEventListener('click', closePopover)
      document.addEventListener('keydown', escapePopover)
    }
  }, [])

  return (
    <div
      ref={contentRef}
      className={`
        ${styles['popover']} 
        ${isOpen && styles['popover-visible']}
      `}
    >
      {children}
    </div>
  )
}

export default Popover
