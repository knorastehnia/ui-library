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
  const contentRef = useRef<HTMLDivElement>(null)
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

  const generatePreview = () => {
    let preview = ''

    selected.forEach((item, index) => {
      preview += item.label + (selected.length - 1 !== index ? ', ': ''
      )
    })

    return preview
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
      setCurrentValue(generatePreview())
    }

    setIsInteractive(false)

    setTimeout(() => {
      setIsOpen(false)
      setIsInteractive(true)
    }, 150)
  }

  const updateSearch = (searchString: string) => {
    if (!contentRef.current?.children) return
    setCurrentValue(searchString)

    if (searchString !== selected.at(0)?.label) {
      onChange?.([])
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

  const handleKeyboard = (e: React.KeyboardEvent) => {
    if (!contentRef.current?.children) return

    if (
      e.key === 'Enter' &&
      type === 'search' &&
      document.activeElement === inputRef.current &&
      visibleItemCountRef.current !== items.length
    ) {
      firstItemRef.current?.focus()
      firstItemRef.current?.click()

      return
    }

    const keys = [
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
      'PageUp',
      'PageDown',
      'Enter',
    ]

    if (!keys.includes(e.key)) {
      inputRef.current?.focus()
      return
    }

    if (e.key !== 'Enter') e.preventDefault()

    const children = Array.from(contentRef.current.children).filter((child) => {
      return !(child as HTMLButtonElement).disabled
    }) as HTMLElement[]

    let loop = false

    switch (e.key) {
      case 'ArrowDown':
        loop = true
      case 'PageDown':
        if (!contentRef.current.contains(document.activeElement)) {
          children[0].focus()

          break
        }

        for (let i = 0; i < children.length; i++) {
          if (children[i] === document.activeElement) {
            const current = children[i === children.length-1 && loop ? 0 : i+1]
            current.focus()

            break
          }
        }

        break

      case 'ArrowUp':
        loop = true
      case 'PageUp':
        if (!contentRef.current.contains(document.activeElement)) {
          children[children.length - 1].focus()

          break
        }

        for (let i = children.length-1; i > -1; i--) {
          if (children[i] === document.activeElement) {
            const current = children[i === 0 && loop ? children.length-1 : i-1]
            current.focus()
    
            break
          }
        }

        break

      case 'End':
        const lastTab = children[children.length - 1]
        lastTab.focus()

        break

      case 'Home':
        const firstTab = children[0]
        firstTab.focus()

        break

      default:
        break
    }
  }

  useEffect(() => {
    if (selected.length === 0) return

    setCurrentValue(generatePreview())
  }, [value])

  useEffect(() => {
    if (!isOpen && type === 'search') {
      inputRef.current?.blur()
    }

    if (!selected.length) {
      setVisibleItems(items)
      setCurrentValue('')
    }
  }, [isOpen])

  useEffect(() => {
    visibleItemCountRef.current = visibleItems.length
  }, [visibleItems])

  return (
    <div
      ref={buttonRef}
      className={styles[`width-${width}`]}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false)
        }
      }}
      {...internal?.root}
    >
      <select
        name={name}
        id={id}
        value={
          type === 'multiple' ?
            selected.map((item) => item.value) :
            selected.at(0)?.value
        }
        onChange={() => {}}
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
            onKeyDown={handleKeyboard}
            role='combobox'
            aria-expanded={isOpen}
            {...internal?.trigger as React.HTMLAttributes<HTMLButtonElement>}
          >
            <Typography>
              {
                generatePreview()
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
            onKeyDown={handleKeyboard}
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
        <div ref={contentRef}>
          {
            visibleItems.map((item, index) => {
              return (
                <button
                  ref={index === 0 ? firstItemRef : undefined}
                  key={index}
                  tabIndex={-1}
                  disabled={item.disabled}
                  onKeyDown={handleKeyboard}
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
        </div>
      </Popover>
    </div>
  )
}

export { Select }
export type { SelectProps }
