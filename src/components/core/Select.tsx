import { useRef, useState } from 'react'
import styles from './Select.module.css'
import Arrow from '../icons/Arrow'
import Typography from './Typography'
import Popover from './Popover'
import Checkmark from '../icons/Checkmark'

interface ItemInterface {
  label: string,
  value: string,
  disabled?: boolean,
}

interface SelectProps {
  label: string,
  name: string,
  items: ItemInterface[],
  width?: 'auto' | 'full',
  multiple?: boolean,
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  items,
  width='auto',
  multiple=false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isInteractive, setIsInteractive] = useState(true)
  const buttonRef = useRef<HTMLDivElement>(null)

  const [selected, setSelected] = useState<ItemInterface[] | null>(null)

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

    if (selected && selected[0].value === item.value) {
      setSelected(null)
    } else {
      setSelected([item])
    }

    setIsInteractive(false)

    setTimeout(() => {
      setIsOpen(false)
      setIsInteractive(true)
    }, 150)
  }

  const updateSelectMultiple = (item: ItemInterface) => {
    if (item.disabled) return

    if (!!selected?.find((selectedItem) => {
      return selectedItem.value === item.value
    })) {
      setSelected(
        selected.filter((selectedItem) => {
          return selectedItem.value !== item.value
        })
      )
    } else {
      setSelected(selected ? [...selected, item] : [item])
    }
  }

  return (
    <>
      <div
        ref={buttonRef}
        className={styles[`width-${width}`]}
      >
        <select
          className={styles['select']}
          name={name}
          id={name}
          multiple={multiple}
        >
          {
            items.map((item, index) => {
              return (
                <option
                  key={index}
                  value={item.value}
                  selected={!!selected?.find((selectedItem) => {
                    return selectedItem.value === item.value
                  })}
                >
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
              ${!!selected?.length  && styles['label-active']}
            `}
            htmlFor={name}
          >
            <Typography
              weight='400'
              size={!!selected?.length ? 's' : 'm'}
              color='dimmed'
            >
              {label}
            </Typography>
          </label>

          <button
            className={`
              ${styles['button']} 
              ${isOpen && styles['button-active']}
            `}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Typography>
              {
                selected?.map((item, index) => {
                  return (
                    item.label + (selected.length - 1 !== index ? ', ': '')
                  )
                })
              }
            </Typography>

            <div className={styles['expand-arrow']}>
              <Arrow state={isOpen} />
            </div>
          </button>
        </div>
        
        <div className={styles['content']}>
          <Popover
            isOpen={isOpen}
            onClose={closeSelect}
          >
            {
              items.map((item, index) => {
                return (
                  <button
                    key={index}
                    disabled={item.disabled}
                    onClick={() => {
                      multiple
                        ? updateSelectMultiple(item)
                        : (isInteractive ? updateSelect(item) : null)
                    }}
                    className={`
                      ${styles['item']} 
                      ${item.disabled && styles['disabled']}
                    `}
                  >
                    <Typography color={item.disabled ? 'disabled' : 'primary'}>
                      {item.label}
                    </Typography>

                    <Checkmark
                      state={
                        !!selected?.includes(item)
                      }
                      color='foreground'
                    />
                  </button>
                )
              })
            }
          </Popover>
        </div>
      </div>
    </>
  )
}

export default Select
