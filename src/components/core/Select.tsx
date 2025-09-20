import { useEffect, useRef, useState } from 'react'
import styles from './Select.module.css'
import Arrow from '../icons/Arrow'
import Typography from './Typography'
import Popover from './Popover'

interface ItemInterface {
  label: string,
  value: string,
  disabled?: boolean,
}

interface SelectProps {
  label: string,
  name: string,
  items: ItemInterface[],
  width?: string,
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  items,
  width='150px',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLDivElement>(null)

  const [selected, setSelected] = useState<ItemInterface | null>(null)

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

  const updateSelect = (item: ItemInterface) => {
    if (item.disabled) return

    if (item.value === selected?.value) {
      setSelected({ label: '', value: '' })
    } else {
      setSelected(item)
    }

    setIsOpen(false)
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
        <select
          className={styles['select']}
          name={name}
          id={name}
          value={selected?.value}
        >
          <option value=''></option>

          {
            items.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              )
            })
          }
        </select>

        <div className={styles['display-select']}>
          <label
            className={`
              ${styles['label']} 
              ${selected?.value && styles['label-active']}
            `}
            htmlFor={name}
          >
            <Typography weight='400' size={selected?.value ? 's' : 'm'}>
              {label}
            </Typography>
          </label>

          <button
            style={{ width }}
            className={`
              ${styles['button']} 
              ${isOpen && styles['button-active']}
            `}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Typography weight='400'>
              {selected?.label}
            </Typography>
            <Arrow state={isOpen} />
          </button>
        </div>

        <Popover
          position={position}
          isOpen={isOpen}
          onClose={closeSelect}
        >
          {
            items.map((item, index) => {
              return (
                <button
                  key={index}
                  disabled={item.disabled}
                  onClick={() => updateSelect(item)}
                  className={`
                    ${styles['item']} 
                    ${item.disabled && styles['disabled']}
                  `}
                >
                  <Typography weight='400'>
                    {item.label}
                  </Typography>
                </button>
              )
            })
          }
        </Popover>
      </div>
    </>
  )
}

export default Select
