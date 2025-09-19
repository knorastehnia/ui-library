import { useEffect, useRef, useState } from 'react'
import styles from './Dropdown.module.css'
import Arrow from '../icons/Arrow'
import Typography from './Typography'
import Popover from './Popover'

interface ItemInterface {
  label: string,
  href?: string,
  onClick?: Function,
  disabled?: boolean,
}

interface DropdownProps {
  label: string,
  items: ItemInterface[],
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  items,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLDivElement>(null)

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

    setPosition({
      y: rect.y + window.scrollY + rect.height,
      x: rect.x + window.scrollX,
    })
  }, [isOpen])

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

        <Popover
          isOpen={isOpen}
          onClose={closeDropdown}
          position={position}
        >
          {items.map((item, index) => {
            return (
              <div key={index}>
                {item.href !== undefined && item.href.length > 0

                ?
                  <a
                    href={!item.disabled ? item.href : undefined}
                    onClick={(e) => !item.disabled && item.onClick?.(e)}
                    className={`
                      ${styles['item']} 
                      ${item.disabled && styles['disabled']}
                    `}
                  >
                    <Typography weight='400'>
                      {item.label}
                    </Typography>
                  </a>
                
                :
                  <button
                    disabled={item.disabled}
                    onClick={(e) => !item.disabled && item.onClick?.(e)}
                    className={`
                      ${styles['item']} 
                      ${item.disabled && styles['disabled']}
                    `}
                  >
                    <Typography weight='400'>
                      {item.label}
                    </Typography>
                  </button>
                }
              </div>
            )
          })}
        </Popover>
      </div>
    </>
  )
}

export default Dropdown
