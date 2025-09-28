import { createContext, useContext, useRef, useState } from 'react'
import styles from './Dropdown.module.css'
import Arrow from '../icons/Arrow'
import Button from './Button'
import Typography from './Typography'
import Popover from './Popover'

interface DropdownItemProps {
  label: string,
  action?: string | Function,
  disabled?: boolean,
}

interface DropdownProps {
  children: React.ReactElement | React.ReactElement[],
  label: string,
  direction?: 'bottom' | 'right',
}

type DropdownComponent = React.FC<DropdownProps> & {
  Item: React.FC<DropdownItemProps>
}

const DropdownContext = createContext<true | undefined>(undefined)

const DropdownItem: React.FC<DropdownItemProps> = ({
  label,
  action,
  disabled=false,
}) => {
  return (
    <Button
      action={action}
      disabled={disabled}
      type='hollow'
      width='full'
    >
      <Typography>{label}</Typography>
    </Button>
  )
}

const Dropdown: DropdownComponent = ({
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
            {children}
          </DropdownContext.Provider>
        </Popover>
      </div>
    </div>
  )
}

Dropdown.Item = DropdownItem

export default Dropdown
