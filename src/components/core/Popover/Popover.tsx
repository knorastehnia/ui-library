import styles from './Popover.module.css'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface PopoverProps {
  children: React.ReactElement | React.ReactElement[]
  isOpen: boolean
  onClose?: Function
  arrangement?: 'vertical' | 'horizontal'
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

const Popover: React.FC<PopoverProps> = ({
  children,
  isOpen,
  onClose,
  arrangement='vertical',
  internal,
}) => {
  const [invertHorizontal, setInvertHorizontal] = useState(false)
  const [invertVertical, setInvertVertical] = useState(false)
  const [insetStyles, setInsetStyles] = useState<React.CSSProperties>({})
  const contentRef = useRef<HTMLDivElement>(null)

  const closePopover = (event: MouseEvent) => {
    const content = contentRef.current as HTMLElement
    if (!content) return
    if (!isOpen) return

    if (event.target !== content && !content.contains(event.target as Node)) {
      onClose?.(event)
    }
  }

  const escapePopover = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return

    onClose?.(event)
  }

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.removeAttribute('inert')
      } else {
        contentRef.current.setAttribute('inert', '')
      }
    }
  }, [isOpen])

  useLayoutEffect(() => {
    const left =
      arrangement === 'vertical' && !invertHorizontal ? '0' :
      arrangement === 'horizontal' && !invertHorizontal ? '100%' : 'auto'

    const right =
      arrangement === 'vertical' && invertHorizontal ? '0' :
      arrangement === 'horizontal' && invertHorizontal ? '100%' : 'auto'

    const top =
      arrangement === 'horizontal' && !invertVertical ? '0' :
      arrangement === 'vertical' && !invertVertical ? '100%' : 'auto'

    const bottom =
      arrangement === 'horizontal' && invertVertical ? '0' :
      arrangement === 'vertical' && invertVertical ? '100%' : 'auto'

    const margin =
      `${arrangement === 'vertical' ? 5 : 0}px ${arrangement === 'horizontal' ? 5 : 0}px`

    setInsetStyles({ left, right, top, bottom, margin })
  }, [invertVertical, invertHorizontal, arrangement])

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

    if (isOpen) {
      document.addEventListener('scroll', updatePositioning)
      window.addEventListener('resize', updatePositioning)
    } else {
      document.removeEventListener('scroll', updatePositioning)
      window.removeEventListener('resize', updatePositioning)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const firstItem = contentRef.current?.children[0]
    firstItem && (firstItem as HTMLElement).focus()

    const raf = requestAnimationFrame(() => {
      document.addEventListener('click', closePopover)
      document.addEventListener('keydown', escapePopover)
    })

    
    return () => {
      document.removeEventListener('click', closePopover)
      document.removeEventListener('keydown', escapePopover)
      cancelAnimationFrame(raf)
    }
  }, [isOpen])

  return (
    <div
      ref={contentRef}
      style={insetStyles}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          onClose?.()
        }
      }}
      className={`
        ${styles['popover']} 
        ${isOpen && styles['popover-visible']}
      `}
      role='dialog'
      aria-hidden={!isOpen}
      {...internal?.root}
    >
      {children}
    </div>
  )
}

export { Popover }
export type { PopoverProps }
