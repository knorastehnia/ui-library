import styles from './DatePicker.module.css'
import { useEffect, useRef, useState } from 'react'
import { Calendar, type CalendarProps } from '../Calendar'
import { Typography } from '../Typography'
import { Popover } from '../Popover'

interface DatePickerProps extends CalendarProps {
  label: string
  disabled?: boolean
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    display?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    trigger?: React.HTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> }
    content?: CalendarProps
  }
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  disabled=false,
  defaultValue,
  minValue,
  maxValue,
  value,
  onChange,
  internal,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue)

  const activeValue = value ?? internalValue
  const displayValue = activeValue?.at(0)?.toDateString() || ''

  const inputRef = useRef<HTMLInputElement>(null)
  
  const updateInternalValue = (val: Date[]) => {
    value === undefined && setInternalValue(val)
    onChange?.(val)
  }

  const closeDropdown = (event: MouseEvent | KeyboardEvent) => {
    if (event instanceof KeyboardEvent) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (!isOpen) {
      inputRef.current?.blur()
    }
  }, [isOpen])

  return (
    <div
      className={styles['datepicker']}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false)
        }
      }}
    >
      <div
        className={styles['display-select']}
        {...internal?.display}
      >
        <label
          className={`
            ${styles['label']} 
            ${(displayValue.length || isOpen) && styles['label-active']}
          `}
        >
          <Typography
            weight='400'
            size={(displayValue.length || isOpen) ? 's' : 'm'}
            color='dimmed'
          >
            {label}
          </Typography>
        </label>
          <input
            ref={inputRef}
            className={`
              ${styles['button']} 
              ${isOpen && styles['button-active']}
            `}
            onFocus={() => setIsOpen(true)}
            value={displayValue}
            onChange={() => null}
            type='text'
            role='combobox'
            aria-expanded={isOpen}
            disabled={disabled}
            {...internal?.trigger}
          />
      </div>

      <Popover
        isOpen={isOpen}
        onClose={closeDropdown}
        arrangement='vertical'
        {...internal?.content}
      >
        <div className={styles['calendar-container']}>
          <Calendar
            defaultValue={defaultValue}
            minValue={minValue}
            maxValue={maxValue}
            value={internalValue}
            onChange={updateInternalValue}
            type='single'
          />
        </div>
      </Popover>
    </div>
  )
}

export { DatePicker }
export type { DatePickerProps }
