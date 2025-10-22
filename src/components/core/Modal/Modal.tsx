import styles from './Modal.module.css'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  children: React.ReactElement | React.ReactElement[]
  isOpen: boolean
  setIsOpen: Function
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
  setIsOpen,
  width='auto',
  height='auto',
  internal,
}) => {
  const escapeModal = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', escapeModal)
    return () => document.removeEventListener('keydown', escapeModal)
  }, [])

  return createPortal(
    <div
      className={`
        ${styles['modal']} 
        ${isOpen && styles['open']}
      `}
      {...internal?.root}
    >
      <div
        className={styles['modal-bg']}
        onClick={() => setIsOpen(false)}
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
