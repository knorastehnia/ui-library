import styles from './Popover.module.css'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface PopoverProps {
  children: React.ReactElement | React.ReactElement[],
  isOpen: boolean,
  onClose?: Function,
  direction?: 'vertical' | 'horizontal',
}

const Popover: React.FC<PopoverProps> = ({
  children,
  isOpen,
  onClose,
  direction='vertical',
}) => {
  const [invertHorizontal, setInvertHorizontal] = useState(false)
  const [invertVertical, setInvertVertical] = useState(false)
  const [insetStyles, setInsetStyles] = useState<React.CSSProperties>({})
  const contentRef = useRef<HTMLDivElement>(null)
  const isOpenRef = useRef(isOpen)

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
    isOpenRef.current = isOpen

    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.removeAttribute('inert');
      } else {
        contentRef.current.setAttribute('inert', '');
      }
    }
  }, [isOpen])

  useLayoutEffect(() => {
    const left =
      direction === 'vertical' && !invertHorizontal ? '0' :
      direction === 'horizontal' && !invertHorizontal ? '100%' : 'auto'

    const right =
      direction === 'vertical' && invertHorizontal ? '0' :
      direction === 'horizontal' && invertHorizontal ? '100%' : 'auto'

    const top =
      direction === 'horizontal' && !invertVertical ? '0' :
      direction === 'vertical' && !invertVertical ? '100%' : 'auto'

    const bottom =
      direction === 'horizontal' && invertVertical ? '0' :
      direction === 'vertical' && invertVertical ? '100%' : 'auto'

    const margin =
      `${direction === 'vertical' ? 5 : 0}px ${direction === 'horizontal' ? 5 : 0}px`

    setInsetStyles({ left, right, top, bottom, margin })
  }, [invertVertical, invertHorizontal, direction])

  const updatePositioning = () => {
    if (!contentRef.current) return

    const parentElement = contentRef.current.parentElement
    if (!parentElement) return
  
    const rect = contentRef.current.getBoundingClientRect()
    const parentRect = parentElement.getBoundingClientRect()

    setInvertHorizontal(parentRect.right + rect.width >= window.innerWidth)
    setInvertVertical(parentRect.bottom + rect.height >= window.innerHeight)
  }

  useLayoutEffect(() => {
    updatePositioning()

    isOpen
      ? document.addEventListener('scroll', updatePositioning)
      : document.removeEventListener('scroll', updatePositioning)
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
      style={insetStyles}
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
