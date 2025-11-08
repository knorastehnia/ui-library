import styles from './Modal.module.css'
import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useFocusTrap } from '../../../hooks/useFocusTrap'

interface ModalProps {
  children: React.ReactElement | React.ReactElement[]
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  width?: string
  height?: string
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    background?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    content?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onOpenChange,
  width='auto',
  height='auto',
  internal,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useFocusTrap(modalRef, isOpen)

  const escapeModal = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onOpenChange(false)
    }
  }, [onOpenChange])

  useEffect(() => {
    document.addEventListener('keydown', escapeModal)
    return () => document.removeEventListener('keydown', escapeModal)
  }, [escapeModal])

  return createPortal(
    <div
      ref={modalRef}
      className={`
        ${styles['modal']} 
        ${isOpen && styles['open']}
      `}
      {...internal?.root}
    >
      <div
        className={styles['modal-bg']}
        onClick={() => onOpenChange(false)}
        {...internal?.background}
      />

      <div
        className={styles['content']}
        style={{
          width,
          height,
        }}
        {...internal?.content}
      >
        {children}
      </div>
    </div>,

    document.querySelector('#root')!
  )
}

export { Modal }
export type { ModalProps }
