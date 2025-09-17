import styles from './Popover.module.css'
import { useEffect, useRef } from 'react'
import useCollapseEffect from '../utils/useCollapseEffect'

interface PopoverProps {
  children: React.ReactNode,
  isOpen: boolean,
  onClose?: Function,
  inset?: string,
}

const Popover: React.FC<PopoverProps> = ({
  children,
  isOpen,
  onClose,
  inset='auto',
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

  useEffect(() => {
    document.addEventListener('click', closePopover)
    
    return () => document.removeEventListener('click', closePopover)
  }, [])

  return (
    <div
      ref={contentRef}
      style={{ inset }}
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
