import styles from './Select.module.css'
import { useEffect, useRef, useState, useId } from 'react'
import { Arrow } from '../../icons'
import { Typography } from '../Typography'
import { Popover, type PopoverProps } from '../Popover'
import { Checkmark } from '../../icons'

interface ItemInterface {
  label: string
  value: string
  disabled?: boolean
}

interface SelectProps {
  label: string
  name: string
  items: ItemInterface[]
  type?: 'single' | 'multiple' | 'search'
  width?: 'auto' | 'full'
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  disabled?: boolean
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    display?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    trigger?: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
    content?: PopoverProps
  }
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  items,
  type='single',
  width='auto',
  value,
  defaultValue=[],
  onChange,
  disabled=false,
  internal,
}) => {
  const deriveInterface = (valueArray?: string[]) => {
    const derived = items.filter((item) => {
      if (!valueArray) return false
      return valueArray.includes(item.value)
    })

    return derived
  }

  const id = useId()

  const [isOpen, setIsOpen] = useState(false)
  const [isInteractive, setIsInteractive] = useState(true)
  const [currentValue, setCurrentValue] = useState('')
  const [visibleItems, setVisibleItems] = useState(items)
  const [internalSelected, setInternalSelected] = useState<ItemInterface[]>(deriveInterface(defaultValue))

  const selected = value !== undefined ? deriveInterface(value) : internalSelected

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

    if (selected.length && selected[0].value === item.value) {
      onChange?.([])
      setInternalSelected([])
      setCurrentValue('')
    } else {
      onChange?.([item.value])
      setInternalSelected([item])
      setCurrentValue(
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

  const updateSearch = (searchString: string) => {
    setCurrentValue(searchString)

    if (searchString !== selected.at(0)?.label) {
      setInternalSelected([])
    }

    if (searchString.length === 0) {
      setVisibleItems(items)
    } else {
      const filteredItems = items.filter((item) => {
        if (
          item.label.toLocaleLowerCase().trim()
            .includes(searchString.toLocaleLowerCase().trim()) &&
          item.disabled !== true
        ) {
          return true
        }
      })

      setVisibleItems(filteredItems)
    }
  }

  const updateSelectMultiple = (item: ItemInterface) => {
    if (item.disabled) return

    if (!!selected.find((selectedItem) => {
      return selectedItem.value === item.value
    })) {
      const filtered = selected.filter((selectedItem) => {
        return selectedItem.value !== item.value
      })

      setInternalSelected(filtered)
      onChange?.(filtered.map((item) => item.value))
    } else {
      const selectedItem = selected.length ? [...selected, item] : [item]

      setInternalSelected(selectedItem)
      onChange?.(selectedItem.map((item) => item.value))
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

    if (!selected.length) {
      setVisibleItems(items)
      setCurrentValue('')
    }

    document.addEventListener('keydown', selectFirst)
    return () => document.removeEventListener('keydown', selectFirst)
  }, [isOpen])

  useEffect(() => {
    visibleItemCountRef.current = visibleItems.length
  }, [visibleItems])

  return (
    <div
      ref={buttonRef}
      className={styles[`width-${width}`]}
      {...internal?.root}
    >
      <select
        name={name}
        id={id}
        value={selected.map((item) => item.value)}
        multiple={type === 'multiple'}
        disabled={disabled}
        hidden
        aria-hidden='true'
      >
        {
          [{ value: '', label: '', }, ...items].map((item, index) => {
            return (
              <option
                key={index}
                value={item.value}
              >
                {item.label}
              </option>
            )
          })
        }
      </select>

      <div
        className={styles['display-select']}
        {...internal?.display}
      >
        <label
          className={`
            ${styles['label']} 
            ${(selected.length || isOpen) && styles['label-active']}
          `}
          htmlFor={name}
        >
          <Typography
            weight='400'
            size={(selected.length || isOpen) ? 's' : 'm'}
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
            role='combobox'
            aria-expanded={isOpen}
            {...internal?.trigger as React.HTMLAttributes<HTMLButtonElement>}
          >
            <Typography>
              {
                selected.map((item, index) => {
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
            className={`
              ${styles['button']} 
              ${isOpen && styles['button-active']}
            `}
            onFocus={() => {
              setIsOpen(true)
              setVisibleItems(items)
            }}
            value={currentValue}
            onChange={(e) => updateSearch(e.target.value)}
            type='text'
            role='combobox'
            aria-expanded={isOpen}
            {...internal?.trigger as React.HTMLAttributes<HTMLInputElement>}
          />
        }
      </div>

      <Popover
        isOpen={isOpen}
        onClose={closeSelect}
        arrangement='vertical'
        {...internal?.content}
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

                <Checkmark state={selected.some((s) => s.value === item.value)} />
              </button>
            )
          })
        }
      </Popover>
    </div>
  )
}

export { Select }
export type { SelectProps }
