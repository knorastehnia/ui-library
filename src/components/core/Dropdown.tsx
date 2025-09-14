import { useEffect, useRef, useState } from 'react'
import styles from './Dropdown.module.css'
import Arrow from '../icons/Arrow'
import Typography from './Typography'
import useCollapseEffect from '../utils/useCollapseEffect'

interface DropdownProps {
  children: React.ReactNode,
  label: string,
}

interface DropdownItemProps {
  label: string,
  href?: string,
  onClick?: Function,
  disabled?: boolean,
}

type DropdownComponent = React.FC<DropdownProps> & {
  Item: React.FC<DropdownItemProps>
}

const Dropdown: DropdownComponent = ({
  children,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef(null)

  useCollapseEffect(buttonRef, isOpen, 500)

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
          <Typography weight='400'>
            {label}
          </Typography>
          <Arrow state={isOpen} />
        </button>

        <div
          className={`
            ${styles['dropdown']} 
            ${isOpen && styles['dropdown-visible']}
          `}
        >
          {children}
        </div>
      </div>
    </>
  )
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  label,
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
          <Typography weight='400'>
            {label}
          </Typography>
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
          <Typography weight='400'>
            {label}
          </Typography>
        </button>
      }
    </>
  )
}

Dropdown.Item = DropdownItem

export default Dropdown
