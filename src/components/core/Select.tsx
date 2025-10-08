import { useEffect, useRef, useState } from 'react'
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
  type?: 'single' | 'multiple' | 'search'
  width?: 'auto' | 'full',
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  items,
  type='single',
  width='auto',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isInteractive, setIsInteractive] = useState(true)
  const [value, setValue] = useState('')
  const [visibleItems, setVisibleItems] = useState(items)
  const [selected, setSelected] = useState<ItemInterface[] | null>(null)

  const contentRef = useRef<HTMLDivElement>(null)
  const visibleItemCountRef = useRef(0)
  const buttonRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const firstItemRef= useRef<HTMLButtonElement>(null)

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
      setValue('')
    } else {
      setSelected([item])
      setValue(
        String([item]?.map((i, index) => {
          return i.label + ([item].length - 1 !== index ? ', ': '')}))
      )
    }

    setIsInteractive(false)
    
    setTimeout(() => {
      setIsOpen(false)
      setIsInteractive(true)
    }, 150)
  }

  const updateSearch = (value: string) => {
    setValue(value)

    if (value !== selected?.at(0)?.label) {
      setSelected(null)
    }

    if (value.length === 0) {
      setVisibleItems(items)
    } else {
      const filteredItems = items.filter((item) => {
        if (
          item.label.toLocaleLowerCase().trim()
            .includes(value.toLocaleLowerCase().trim()) &&
          item.disabled !== true
        ) {
          return item
        }
      })

      setVisibleItems(filteredItems)
    }
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

  const selectFirst = (e: KeyboardEvent) => {
    if (!isOpen || e.key !== 'Enter' || type !== 'search') return
    if (document.activeElement instanceof HTMLButtonElement) return
    if (visibleItemCountRef.current === items.length) return
    if (!buttonRef.current?.contains(document.activeElement)) return

    firstItemRef.current?.focus()
    firstItemRef.current?.click()
  }

  useEffect(() => {
    if (!isOpen && type === 'search') {
      inputRef.current?.blur()
    }

    if (!selected) {
      setValue('')
      setVisibleItems(items)
    }

    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.removeAttribute('inert');
      } else {
        contentRef.current.setAttribute('inert', '');
      }
    }

    document.addEventListener('keydown', selectFirst)
    return () => document.removeEventListener('keydown', selectFirst)
  }, [isOpen])

  useEffect(() => {
    visibleItemCountRef.current = visibleItems.length
  }, [visibleItems])

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
          multiple={type === 'multiple'}
        >
          {
            [{ value: '', label: '', }, ...items].map((item, index) => {
              return (
                <option
                  key={index}
                  value={item.value}
                  selected={
                    item.value !== '' || !!selected?.length ?
                      !!selected?.find((selectedItem) => {
                        return selectedItem.value === item.value
                      })
                    : true
                  }
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
              ${(!!selected?.length || isOpen) && styles['label-active']}
            `}
            htmlFor={name}
          >
            <Typography
              weight='400'
              size={(!!selected?.length || isOpen) ? 's' : 'm'}
              color='dimmed'
            >
              {label}
            </Typography>
          </label>

          {type !== 'search'

          ?
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

          :
            <input
              ref={inputRef}
              className={styles['button']}
              onFocus={() => {
                setIsOpen(true)
                setVisibleItems(items)
              }}
              value={value}
              onChange={(e) => updateSearch(e.target.value)}
              type='text'
            />
          }
        </div>

        <div
          ref={contentRef}
          className={styles['content']}
        >
          <Popover
            isOpen={isOpen}
            onClose={closeSelect}
          >
            {
              visibleItems.map((item, index) => {
                return (
                  <button
                    ref={index === 0 ? firstItemRef : undefined}
                    key={index}
                    disabled={item.disabled}
                    onClick={() => {
                      type === 'multiple'
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

                    <Checkmark state={!!selected?.includes(item)} />
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
