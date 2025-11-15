import { useEffect, useRef, useState, useId, useCallback } from 'react'
import styles from './Slider.module.css'

interface SliderProps {
  children: React.ReactElement | React.ReactElement[]
  name: string
  minValue: number
  maxValue: number
  step?: number
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  disabled?: boolean
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    content?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    clickbox?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

const Slider: React.FC<SliderProps> = ({
  children,
  name,
  minValue,
  maxValue,
  step=1,
  value,
  defaultValue=minValue,
  onChange,
  disabled=false,
  internal,
}) => {
  const id = useId()
  const [internalValue, setInternalValue] = useState(defaultValue)

  const currentValue = value ?? internalValue
  const valueRef = useRef(currentValue)

  const [isDragging, setIsDragging] = useState(false)
  const isPointerDownRef = useRef(false)

  const sliderRef = useRef<HTMLDivElement>(null)

  const updateInternalValue = useCallback((val: number) => {
    const normalized = Math.max(Math.min(val, maxValue), minValue)

    onChange?.(normalized)
    setInternalValue(normalized)
    valueRef.current = normalized
  }, [onChange, minValue, maxValue])

  const handleKeyboard = (e: React.KeyboardEvent) => {
    const keys = [
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
      'PageUp',
      'PageDown',
      'Shift',
      'Control',
    ]

    if (!keys.includes(e.key)) return
    e.preventDefault()

    const modifier =
      e.getModifierState('Control') ||
      e.getModifierState('Shift')
      ? 10 : 1

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        updateInternalValue(valueRef.current + (step * modifier))
        break

      case 'ArrowLeft':
      case 'ArrowDown':
        updateInternalValue(valueRef.current - (step * modifier))
        break

      case 'PageUp':
        updateInternalValue(valueRef.current + (step * 10 * modifier))
        break

      case 'PageDown':
        updateInternalValue(valueRef.current - (step * 10 * modifier))
        break

      case 'End':
        updateInternalValue(maxValue)
        break

      case 'Home':
        updateInternalValue(minValue)
        break

      default:
        break
    }
  }

  const handlePointer = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!sliderRef.current) return

    e.preventDefault()
    sliderRef.current.focus()

    const rect = sliderRef.current.getBoundingClientRect()
    const valuePercentage = (e.clientX - rect.left) * 100 / (rect.right - rect.left)
    const rawValue = (valuePercentage / 100 * maxValue) + (step / 2)
    const steppedValue = minValue + rawValue - (rawValue % step)
    updateInternalValue(steppedValue)
  }, [minValue, maxValue, step, updateInternalValue])

  const pointerMove = useCallback((e: MouseEvent) => {
    if (!isPointerDownRef.current) return

    setIsDragging(true)
    handlePointer(e)
  }, [handlePointer])

  const pointerDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return

    const selected = e.target as HTMLElement

    if (selected === sliderRef.current || sliderRef.current.contains(selected)) {
      isPointerDownRef.current = true
      handlePointer(e)
    }
  }

  const pointerUp = useCallback(() => {
    setIsDragging(false)
    isPointerDownRef.current = false
  }, [])

  useEffect(() => {
    document.addEventListener('pointerup', pointerUp)
    document.addEventListener('pointermove', pointerMove)

    return () => {
      document.removeEventListener('pointerup', pointerUp)
      document.removeEventListener('pointermove', pointerMove)
    }
  }, [pointerUp, pointerMove])

  return (
    <div
      className={styles['slider']}
      {...internal?.root}
    >
      <label id={id}>
        <div {...internal?.content}>
          {children}
        </div>

        <input
          type='range'
          name={name}
          min={minValue}
          max={maxValue}
          step={step}
          value={currentValue}
          disabled={disabled}
          readOnly
          hidden
          aria-hidden='true'
        />

        <div
          ref={sliderRef}
          tabIndex={0}
          aria-valuemin={minValue}
          aria-valuemax={maxValue}
          aria-valuenow={currentValue}
          aria-disabled={disabled}
          aria-labelledby={id}
          role='slider'
          className={`
            ${styles['slider-clickbox']} 
            ${disabled && styles['disabled']}
          `}
          onKeyDown={(e) => disabled || handleKeyboard(e)}
          onPointerDown={(e) => disabled || pointerDown(e)}
          {...internal?.clickbox}
        >
          <div className={styles['display-slider']}>
            <div
              className={`
                ${styles['slider-track']} 
                ${isDragging && styles['dragging']}
              `}
              style={{
                maxWidth: `${currentValue * 100 / maxValue}%`,
              }}
            />
            <div className={styles['slider-thumb']}>
              <div className={styles['thumb-display']} />
            </div>
          </div>
        </div>
      </label>
    </div>
  )
}

export { Slider }
export type { SliderProps }
