import styles from './Modal.module.css'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  children: React.ReactElement | React.ReactElement[],
  isOpen: boolean,
  setIsOpen: Function,
  width?: string,
  height?: string,
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  setIsOpen,
  width='auto',
  height='auto',
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
    >
      <div
        className={styles['modal-bg']}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={styles['content']}
        style={{
          width,
          height,
        }}
      >
        {children}
      </div>
    </div>

    , document.querySelector('#root')!
  )
}

export { Modal }
