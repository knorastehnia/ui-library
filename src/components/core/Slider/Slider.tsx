import { useEffect, useRef, useState } from 'react'
import styles from './Slider.module.css'

interface SliderProps {
  children: React.ReactElement | React.ReactElement[],
  name: string,
  minValue: number,
  maxValue: number,
  step?: number,
  value?: number,
  onValueChange?: Function,
  disabled?: boolean,
}

const Slider: React.FC<SliderProps> = ({
  children,
  name,
  minValue,
  maxValue,
  step=1,
  value=minValue,
  onValueChange,
  disabled=false,
}) => {
  const [currentValue, setCurrentValue] = useState(value)
  const valueRef = useRef(currentValue)

  const [isDragging, setIsDragging] = useState(false)
  const isDraggingRef = useRef(isDragging)
  const isPointerDownRef = useRef(false)

  const sliderRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const getNormalizedValue = (rawVal: number) => {
    return Math.max(Math.min(rawVal, maxValue), minValue)
  }

  const setInternalValue = (val: number) => {
    const normalized = getNormalizedValue(val)

    onValueChange?.(normalized)
    setCurrentValue(normalized)
  }

  const setExternalValue = (val: number) => {
    const normalized = getNormalizedValue(val)

    setCurrentValue(normalized)
  }

  const handleKeyboard = (e: KeyboardEvent) => {
    if (!sliderRef.current) return
    if (inputRef.current !== document.activeElement) return

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
        setInternalValue(valueRef.current + (step * modifier))
        break

      case 'ArrowLeft':
      case 'ArrowDown':
        setInternalValue(valueRef.current - (step * modifier))
        break

      case 'PageUp':
        setInternalValue(valueRef.current + (step * 10 * modifier))
        break

      case 'PageDown':
        setInternalValue(valueRef.current - (step * 10 * modifier))
        break

      case 'End':
        setInternalValue(maxValue)
        break

      case 'Home':
        setInternalValue(minValue)
        break

      default:
        break
    }
  }

  const handlePointer = (e: MouseEvent) => {
    if (!sliderRef.current || !inputRef.current) return

    inputRef.current.focus()

    e.preventDefault()

    const rect = sliderRef.current.getBoundingClientRect()
    const valuePercentage = (e.clientX - rect.left) * 100 / (rect.right - rect.left)
    const rawValue = (valuePercentage / 100 * maxValue) + (step / 2)
    const steppedValue = minValue + rawValue - (rawValue % step)
    setInternalValue(steppedValue)
  }

  const pointerMove = (e: MouseEvent) => {
    if (!isPointerDownRef.current) return

    setIsDragging(true)
    handlePointer(e)
  }

  const pointerDown = (e: MouseEvent) => {
    if (!sliderRef.current) return

    const selected = e.target as HTMLElement

    if (selected === sliderRef.current || sliderRef.current.contains(selected)) {
      isPointerDownRef.current = true
      handlePointer(e)
    }
  }

  const pointerUp = () => {
    setIsDragging(false)
    isPointerDownRef.current = false
  }

  useEffect(() => {
    setExternalValue(value)
  }, [value])

  useEffect(() => {
    valueRef.current = currentValue
  }, [currentValue])

  useEffect(() => {
    isDraggingRef.current = isDragging
  }, [isDragging])

  useEffect(() => {
    document.addEventListener('pointerdown', pointerDown)
    document.addEventListener('pointerup', pointerUp)
    document.addEventListener('pointermove', pointerMove)

    document.addEventListener('keydown', handleKeyboard)

    return () => {
      document.removeEventListener('pointerdown', pointerDown)
      document.removeEventListener('pointerup', pointerUp)
      document.removeEventListener('pointermove', pointerMove)

      document.removeEventListener('keydown', handleKeyboard)
    }
  }, [])

  return (
    <div className={styles['slider']}>
      <label htmlFor={name}>
        <div>
          {children}
        </div>

        <input
          ref={inputRef}
          className={styles['input']}
          type='range'
          name={name}
          id={name}
          min={minValue}
          max={maxValue}
          step={step}
          value={currentValue}
          disabled={disabled}
        />

        <div
          ref={sliderRef}
          className={styles['slider-clickbox']}
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
