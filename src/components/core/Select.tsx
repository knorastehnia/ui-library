import styles from './Select.module.css'
import Arrow from '../icons/Arrow'
import { useEffect, useRef, useState } from 'react'
import Typography from './Typography'
import useCollapseEffect from '../utils/useCollapseEffect'

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
  const contentRef = useRef(null)

  useCollapseEffect(contentRef, isOpen, 500)


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
          <Typography weight='400'>
            {label}
          </Typography>
          <Arrow state={isOpen} />
        </button>

        <div
          ref={contentRef}
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
