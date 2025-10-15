import { useEffect, useRef, useState } from 'react'
import styles from './Slider.module.css'

interface SliderProps {
  children: React.ReactElement | React.ReactElement[],
  name: string,
  minValue: number,
  maxValue: number,
  step?: number,
  defaultValue?: number,
  disabled?: boolean,
}

const Slider: React.FC<SliderProps> = ({
  children,
  name,
  minValue,
  maxValue,
  step=1,
  defaultValue=minValue,
  disabled=false,
}) => {
  const [value, setValue] = useState(defaultValue)
  const sliderRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isDraggingRef = useRef(false)

  const updateValue = (e: MouseEvent) => {
    if (!sliderRef.current || !inputRef.current) return
    if (!isDraggingRef.current) return

    // if (selected === thumbRef.current || thumbRef.current.contains(selected)) {
    //   console.log('thumb selected')

    inputRef.current.focus()

    if (isDraggingRef.current) {
      e.preventDefault()

      const rect = sliderRef.current.getBoundingClientRect()
      const valuePercentage = (e.clientX - rect.left) * 100 / (rect.right - rect.left)
      const rawValue = (valuePercentage / 100 * maxValue) + (step / 2)
      const steppedValue = minValue + rawValue - (rawValue % step)
      setValue(Math.max(Math.min(steppedValue, maxValue), minValue))
    }
  }

  const pointerDown = (e: MouseEvent) => {
    if (!sliderRef.current) return

    const selected = e.target as HTMLElement

    if (selected === sliderRef.current || sliderRef.current.contains(selected)) {
      isDraggingRef.current = true
    }
  }

  const pointerUp = () => {
    isDraggingRef.current = false
  }

  useEffect(() => {
    document.addEventListener('pointerdown', pointerDown)
    document.addEventListener('pointerup', pointerUp)

    document.addEventListener('pointerdown', updateValue)
    document.addEventListener('pointermove', updateValue)

    return () => {
      document.removeEventListener('pointerdown', pointerDown)
      document.removeEventListener('pointerup', pointerUp)

      document.removeEventListener('pointerdown', updateValue)
      document.removeEventListener('pointermove', updateValue)
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
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.valueAsNumber)}
        />

        <div
          ref={sliderRef}
          className={styles['slider-clickbox']}
        >
          <div className={styles['display-slider']}>
            <div
              className={styles['slider-track']}
              style={{
                maxWidth: `${value * 100 / maxValue}%`,
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
