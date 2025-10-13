import styles from './Popover.module.css'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

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
  const [invertHorizontal, setInvertHorizontal] = useState(false)
  const [invertVertical, setInvertVertical] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

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

  useLayoutEffect(() => {
    if (!contentRef.current) return

    const rect = contentRef.current.getBoundingClientRect()

    if (!invertHorizontal) {
      setInvertHorizontal(rect.right >= window.innerWidth)
    } else {
      setInvertHorizontal(rect.right + rect.width >= window.innerWidth)
    }

    if (!invertVertical) {
      setInvertVertical(rect.bottom >= window.innerHeight)
    } else {
      setInvertVertical(rect.bottom + rect.height >= window.innerHeight)
    }
  }, [isOpen])

  useEffect(() => {
    document.addEventListener('click', closePopover)
    document.addEventListener('mousedown', closePopover)
    document.addEventListener('keydown', escapePopover)
    
    return () => {
      document.removeEventListener('click', closePopover)
      document.removeEventListener('mousedown', closePopover)
      document.removeEventListener('keydown', escapePopover)
    }
  }, [])

  return (
    <div
      ref={contentRef}
      style={{
        left: invertHorizontal ? 'auto' : '0',
        right: invertHorizontal ? '0' : 'auto',
        top: invertVertical ? 'auto' : '100%',
        bottom: invertVertical ? '100%' : 'auto',
      }}
      className={`
        ${styles['popover']} 
        ${isOpen && styles['popover-visible']}
      `}
    >
      {children}
    </div>
  )
}

export { Popover }
