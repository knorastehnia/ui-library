import styles from './Select.module.css'
import Arrow from '../icons/Arrow'
import { useEffect, useRef, useState } from 'react'

interface SelectProps {
  children: React.ReactNode,
  label: string,
}

interface SelectItemProps {
  children: React.ReactNode,
  href?: string,
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

  const closeSelect = (event: MouseEvent) => {
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
    document.addEventListener('click', closeSelect)
    
    return () => document.removeEventListener('click', closeSelect)
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
            ${styles['select']} 
            ${isOpen && styles['select-visible']}
          `}
        >
          {children}
        </div>
      </div>
    </>
  )
}

const SelectItem: React.FC<SelectItemProps> = ({
  children,
  href='',
  onClick=(() => null),
  disabled=false,
}) => {
  return (
    <>
      {href.length > 0

      ?
        <a
          href={href}
          onClick={(e) => !disabled && onClick(e)}
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
          onClick={(e) => !disabled && onClick(e)}
          className={`
            ${styles['item']} 
            ${disabled && styles['disabled']}
          `}
        >
          {children}
        </button>
      }
    </>
  )
}

Select.Item = SelectItem

export default Select
