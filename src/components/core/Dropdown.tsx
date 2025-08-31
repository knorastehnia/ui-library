import styles from './Dropdown.module.css'
import Arrow from '../icons/Arrow'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface DropdownProps {
  children: React.ReactNode,
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const buttonRef = useRef(null)

  const closeDropdown = (event: MouseEvent) => {
    const btn = buttonRef.current as HTMLButtonElement | null;
    if (!btn) return

    if (event.target !== btn && !btn.contains(event.target as Node)) {
      setIsOpen(prev => {
        if (prev) return false
        return prev
      })
    }
  }

  const openDropdown = (e: React.MouseEvent) => {
    setIsOpen(!isOpen)
    if (e.target instanceof HTMLButtonElement) {
      const rect = e.target.getBoundingClientRect()
      setPos({
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY + rect.height,
      })
    }
  }

  useEffect(() => {
    document.addEventListener('click', closeDropdown)
    
    return () => document.removeEventListener('click', closeDropdown)
  }, [])

  return (
    <>
      <div ref={buttonRef} style={{width: 'fit-content'}}>
        <button
          className={`
            ${styles['button']} 
            ${isOpen && styles['button-active']}
          `}
          onClick={openDropdown}
        >
          Expand
          <Arrow state={isOpen} />
        </button>
      </div>

      {
        createPortal(
          <div
            className={`
              ${styles['dropdown']} 
              ${isOpen && styles['dropdown-visible']}
            `}
            style={{
              top: pos.y,
              left: pos.x,
            }}
          >
            <div
              className={`
                ${styles['content']} 
                ${isOpen && styles['content-visible']}
              `}
            >
              {children}
            </div>
          </div>,
          document.querySelector('#dropdown-portal')!
        )
      }
    </>
  )
}

export default Dropdown
