import styles from './Dropdown.module.css'
import { createContext, useContext, useRef, useState } from 'react'
import { Arrow } from '../../icons'
import { Button, ButtonDefaultsProvider, type ButtonProps } from '../Button'
import { Typography } from '../Typography'
import { Popover, type PopoverProps } from '../Popover'

interface DropdownProps {
  children: React.ReactElement | React.ReactElement[]
  label: string
  direction?: 'vertical' | 'horizontal'
  internal?: {
    root?: React.RefAttributes<HTMLDivElement>
    trigger?: ButtonProps
    content?: PopoverProps
  }
}

const DropdownContext = createContext<true | undefined>(undefined)

const Dropdown: React.FC<DropdownProps> = ({
  children,
  label,
  direction,
  internal,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)

  const ctx = useContext(DropdownContext)
  const activeDirection = direction ?? (!!ctx ? 'horizontal' : 'vertical')

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
    <div
      className={styles['dropdown']}
      {...internal?.root}
    >
      <Button
        action={() => setIsOpen(!isOpen)}
        type='hollow'
        width='full'
        internal={{ root: { ref: buttonRef } }}
        {...internal?.trigger}
      >
        <div className={styles['button-content']}>
          <Typography>{label}</Typography>
          <div style={{
            transform: activeDirection === 'horizontal' ? 'rotate(-90deg)' : '',
          }}>
            <Arrow state={isOpen} />
          </div>
        </div>
      </Button>

      <Popover
        isOpen={isOpen}
        onClose={closeDropdown}
        direction={activeDirection}
        {...internal?.content}
      >
        <DropdownContext.Provider value={true}>
          <ButtonDefaultsProvider type='hollow' width='full'>
            {children}
          </ButtonDefaultsProvider>
        </DropdownContext.Provider>
      </Popover>
    </div>
  )
}

export { Dropdown }
export type { DropdownProps }
