import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Card from './Card'
import styles from './Modal.module.css'

interface ModalProps {
  children: React.ReactNode,
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

      <div className={styles['content']}>
        <Card width={width} height={height}>{children}</Card>
      </div>
    </div>

    , document.querySelector('#root')!
  )
}

export default Modal
