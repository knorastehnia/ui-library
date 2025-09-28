import { createContext, useContext, useRef, useState } from 'react'
import styles from './Dropdown.module.css'
import Arrow from '../icons/Arrow'
import Button from './Button'
import Typography from './Typography'
import Popover from './Popover'
import ButtonDefaultsContext from '../utils/ButtonDefaultsContext'

interface DropdownProps {
  children: React.ReactElement | React.ReactElement[],
  label: string,
  direction?: 'bottom' | 'right',
}

const DropdownContext = createContext<true | undefined>(undefined)

const Dropdown: React.FC<DropdownProps> = ({
  children,
  label,
  direction,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)

  const ctx = useContext(DropdownContext)
  const activeDirection = direction ?? (!!ctx ? 'right' : 'bottom')

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

  return (
    <div className={styles[`dropdown-${activeDirection}`]}>
      <div ref={buttonRef}>
        <Button
          action={() => setIsOpen(!isOpen)}
          type='hollow'
          width='full'
        >
          <div className={styles['button-content']}>
            <Typography>{label}</Typography>
            <div style={{
              transform: activeDirection === 'right' ? 'rotate(-90deg)' : '',
            }}>
              <Arrow state={isOpen} />
            </div>
          </div>
        </Button>
      </div>

      <div className={styles[`content-${activeDirection}`]}>
        <Popover
          isOpen={isOpen}
          onClose={closeDropdown}
        >
          <DropdownContext.Provider value={true}>
            <ButtonDefaultsContext.Provider value={{
              type: 'hollow',
              width: 'full'
            }}>
              {children}
            </ButtonDefaultsContext.Provider>
          </DropdownContext.Provider>
        </Popover>
      </div>
    </div>
  )
}

export default Dropdown
