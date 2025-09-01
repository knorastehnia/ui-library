import styles from './Dropdown.module.css'
import Arrow from '../icons/Arrow'
import Frost from './Frost'
import { useEffect, useRef, useState } from 'react'

interface DropdownProps {
  children: React.ReactNode,
  label: string,
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false)
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
        <button
          className={`
            ${styles['button']} 
            ${isOpen && styles['button-active']}
          `}
          onClick={() => setIsOpen(!isOpen)}
        >
          {label}
          <Arrow state={isOpen} />
        </button>

        <div
          className={`
            ${styles['dropdown']} 
            ${isOpen && styles['dropdown-visible']}
          `}
        >
          <Frost padding='15px 10px' all radius level={3}>
            {children}
          </Frost>
        </div>
      </div>
    </>
  )
}

export default Dropdown

