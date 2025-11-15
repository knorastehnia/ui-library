import styles from './DatePicker.module.css'
import { useEffect, useId, useRef, useState } from 'react'
import { Calendar, type CalendarProps } from '../Calendar'
import { Typography, type TypographyProps } from '../Typography'
import { Popover, type PopoverProps } from '../Popover'

interface DatePickerProps extends CalendarProps {
  type?: never
  label: string
  disabled?: boolean
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    trigger?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    input?: React.HTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> }
    typography?: TypographyProps
    popover?: PopoverProps
    calendar?: CalendarProps
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

  const id = useId()
  
  const updateInternalValue = (val: Date[]) => {
    if (value === undefined) setInternalValue(val)
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
      {...internal?.root}
    >
      <div
        className={styles['display-select']}
        {...internal?.trigger}
      >
        <label
          className={`
            ${styles['label']} 
            ${(displayValue.length || isOpen) && styles['label-active']}
          `}
          id={`label-${id}`}
        >
          <Typography
            weight='400'
            size={(displayValue.length || isOpen) ? 's' : 'm'}
            color='dimmed'
            {...internal?.typography}
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
          aria-labelledby={`label-${id}`}
          disabled={disabled}
          {...internal?.input}
        />
      </div>

      <Popover
        isOpen={isOpen}
        onClose={closeDropdown}
        arrangement='vertical'
        {...internal?.popover}
      >
        <div className={styles['calendar-container']}>
          <Calendar
            defaultValue={defaultValue}
            minValue={minValue}
            maxValue={maxValue}
            value={internalValue}
            onChange={updateInternalValue}
            type='single'
            {...internal?.calendar}
          />
        </div>
      </Popover>
    </div>
  )
}

export { DatePicker }
export type { DatePickerProps }
