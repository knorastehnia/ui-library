import { createContext, useContext, useEffect, useRef, useState } from 'react'
import styles from './Dropdown.module.css'
import Arrow from '../icons/Arrow'
import Typography from './Typography'
import TypographyDefaultsContext from '../utils/TypographyDefaultsContext'
import Popover from './Popover'

interface DropdownItemProps {
  children: React.ReactElement | React.ReactElement[],
  action?: string | Function,
  disabled?: boolean,
}

interface DropdownProps {
  children: React.ReactElement | React.ReactElement[],
  label: string,
  width?: 'auto' | 'full',
}

type DropdownComponent = React.FC<DropdownProps> & {
  Item: React.FC<DropdownItemProps>
}

const DropdownContext = createContext<{
  width?: 'auto' | 'full',
} | null>(null)

const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  action,
  disabled=false,
}) => {
  return (
    <TypographyDefaultsContext.Provider value={{
      color: disabled ? 'disabled' : 'primary',
    }}>
      {(typeof action === 'string') && action.length > 0

      ?
        <a
          href={!disabled ? action : undefined}
          className={`
            ${styles['item']} 
            ${disabled && styles['disabled']}
          `}
        >
            {children}
        </a>
      
      :
      <button
      disabled={disabled}
      onClick={(e) => !disabled && typeof action === 'function' && action(e)}
      className={`
        ${styles['item']} 
        ${disabled && styles['disabled']}
        `}
        >
          {children}
        </button>
      }
    </TypographyDefaultsContext.Provider>
  )
}

const Dropdown: DropdownComponent = ({
  children,
  label,
  width,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const ctx = useContext(DropdownContext)
  const isTopLevel = ctx === null
  const activeWidth = width ?? ctx?.width ?? 'auto'

  const closeDropdown = (event: MouseEvent | KeyboardEvent) => {
    if (event instanceof MouseEvent) {
      const btn = buttonRef.current
      if (!btn) return
  
      if (event.target !== btn && !btn.contains(event.target as Node)) {
        setIsOpen(prev => {
          if (prev) return false
          return prev
        })
      }
    } else if (event instanceof KeyboardEvent) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const btn = buttonRef.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()

    setPosition(
      isTopLevel ? {
        y: rect.y + window.scrollY + rect.height + 5,
        x: rect.x + window.scrollX,
      } : {
        y: rect.y + window.scrollY,
        x: rect.x + window.scrollX + rect.width + 5,
      }
    )
  }, [isOpen])

  return (
    <>
      <button
        ref={buttonRef}
        className={`
          ${styles['button']} 
          ${styles[`width-${activeWidth}`]} 
          ${isOpen && styles['button-active']}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Typography>{label}</Typography>
        <div style={{
          transform: isTopLevel ? '' : 'rotate(-90deg)'
        }}>
          <Arrow state={isOpen} />
        </div>
      </button>

      <Popover
        isOpen={isOpen}
        onClose={closeDropdown}
        position={position}
      >
        <DropdownContext.Provider value={{
          width: 'full',
        }}>
          {children}
        </DropdownContext.Provider>
      </Popover>
    </>
  )
}

Dropdown.Item = DropdownItem

export default Dropdown
