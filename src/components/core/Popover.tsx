import styles from './Popover.module.css'
import { useEffect, useRef, useState } from 'react'
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
  const [invertHorizontal, setInvertHorizontal] = useState(false)
  const [invertVertical, setInvertVertical] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

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
    if (!contentRef.current) return

    const rect = contentRef.current.getBoundingClientRect()
    console.log(rect.top + contentRef.current?.scrollHeight, window.innerHeight)

    if (!invertHorizontal) {
      setInvertHorizontal(rect.right >= window.innerWidth)
    } else {
      setInvertHorizontal(rect.right + rect.width >= window.innerWidth)
    }


    if (!invertVertical) {
      setInvertVertical(rect.top + contentRef.current?.scrollHeight >= window.innerHeight)
    } else {
      setInvertVertical(rect.top + 2*contentRef.current?.scrollHeight >= window.innerHeight)
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
        left: `-${invertHorizontal ? contentRef.current?.scrollWidth : 0}px`,
        top: `-${invertVertical ? contentRef.current?.scrollHeight : 0}px`,
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

export default Popover
