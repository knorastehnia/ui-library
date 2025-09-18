import { useRef, useState } from 'react'
import styles from './Select.module.css'
import Arrow from '../icons/Arrow'
import Typography from './Typography'
import Popover from './Popover'

interface SelectProps {
  children: React.ReactNode,
  label: string,
}

interface SelectItemProps {
  label: string,
  onClick?: Function,
  disabled?: boolean,
}

type SelectComponent = React.FC<SelectProps> & {
  Item: React.FC<SelectItemProps>
}

const Select: SelectComponent = ({
  children,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef(null)

  const closeSelect = (event: MouseEvent | KeyboardEvent) => {
    if (event instanceof MouseEvent) {
      const btn = buttonRef.current as HTMLButtonElement | null;
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
    <>
      <div ref={buttonRef} style={{width: 'fit-content'}}>
        <button
          className={`
            ${styles['button']} 
            ${isOpen && styles['button-active']}
          `}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Typography weight='400'>
            {label}
          </Typography>
          <Arrow state={isOpen} />
        </button>

        <Popover position='absolute' isOpen={isOpen} onClose={closeSelect}>
          {children}
        </Popover>
      </div>
    </>
  )
}

const SelectItem: React.FC<SelectItemProps> = ({
  label,
  onClick=(() => null),
  disabled=false,
}) => {
  return (
      <button
        disabled={disabled}
        onClick={(e) => !disabled && onClick(e)}
        className={`
          ${styles['item']} 
          ${disabled && styles['disabled']}
        `}
      >
        <Typography weight='400'>
          {label}
        </Typography>
      </button>
  )
}

Select.Item = SelectItem

export default Select
