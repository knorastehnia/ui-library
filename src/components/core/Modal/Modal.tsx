import styles from './Modal.module.css'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useFocusTrap } from '../../../hooks/useFocusTrap'

interface ModalProps {
  children: React.ReactElement | React.ReactElement[]
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    background?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    content?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

const ModalContext = createContext<{ setHasNestedModal: Function } | null>(null)

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onOpenChange,
  internal,
}) => {
  const [hasNestedModal, setHasNestedModal] = useState(false)

  const ctx = useContext(ModalContext)

  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const nonModalContentRef = useRef<HTMLElement[]>(null)

  const trapFocus = isOpen && !hasNestedModal

  useFocusTrap(modalRef, trapFocus)

  const escapeModal = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      onOpenChange(false)
    }
  }

  useEffect(() => {
    if (!isOpen) return

    if (ctx && modalRef.current !== null) {
      ctx.setHasNestedModal(true)

      const zIndexNumeric = Number(window.getComputedStyle(modalRef.current).zIndex)
      modalRef.current.style.zIndex = String(zIndexNumeric + 1)
    }

    nonModalContentRef.current = Array.from(document.body.children).filter(
      (child): child is HTMLElement =>
        child.getAttribute('aria-modal') !== 'true' &&
        child.getAttribute('aria-hidden') === null &&
        child instanceof HTMLElement &&
        !(child instanceof HTMLScriptElement)
    )

    nonModalContentRef.current.forEach(el => el.setAttribute('aria-hidden', 'true'))

    const raf = requestAnimationFrame(() => contentRef.current?.focus())

    return () => {
      nonModalContentRef.current?.forEach(el => el.removeAttribute('aria-hidden'))

      ctx && ctx.setHasNestedModal(false)

      cancelAnimationFrame(raf)
    }
  }, [isOpen])

  return createPortal(
    <div
      ref={modalRef}
      className={`
        ${styles['modal']} 
        ${isOpen && styles['open']}
      `}
      role='dialog'
      aria-modal='true'
      onKeyDown={escapeModal}
      {...internal?.root}
    >
      <div
        className={styles['modal-bg']}
        onClick={() => onOpenChange(false)}
        {...internal?.background}
      />

      <div
        ref={contentRef}
        className={styles['content']}
        tabIndex={-1}
        {...internal?.content}
      >
        <ModalContext.Provider value={{ setHasNestedModal }}>
          {children}
        </ModalContext.Provider>
      </div>
    </div>,

    document.body
  )
}

export { Modal }
export type { ModalProps }
