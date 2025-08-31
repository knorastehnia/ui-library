import Frost from './Frost'
import styles from './Dropdown.module.css'
import { createPortal } from 'react-dom'
import Button from './Button'
import { useEffect, useRef, useState } from 'react'

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

  useEffect(() => {
    document.addEventListener('click', closeDropdown)
    
    return () => document.removeEventListener('click', closeDropdown)
  }, [])

  return (
    <>
      <div ref={buttonRef} style={{width: 'fit-content'}}>
        <Button onClick={(e: React.MouseEvent) => {
          setIsOpen(!isOpen)
          if (e.target instanceof HTMLButtonElement) {
            const rect = e.target.getBoundingClientRect()
            setPos({
              x: rect.left + window.scrollX,
              y: rect.top + window.scrollY + rect.height,
            })
          }
        }}>
          Expand
        </Button>
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
              {/* <Frost padding='15px 10px' all radius level={3}> */}
                {children}
              {/* </Frost> */}
            </div>
          </div>,
          document.querySelector('#dropdown-portal')!
        )
      }
    </>
  )
}

export default Dropdown
