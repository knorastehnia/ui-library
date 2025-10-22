import styles from './Checkbox.module.css'
import { useEffect, useState } from 'react'
import { Checkmark } from '../../icons'

interface CheckboxProps {
  children: React.ReactElement | React.ReactElement[]
  name: string
  value?: boolean
  onInput?: (expose: boolean) => void
  disabled?: boolean
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    display?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    content?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

const Checkbox: React.FC<CheckboxProps> = ({
  children,
  name,
  value=false,
  onInput,
  disabled=false,
  internal,
}) => {
  const [checked, setChecked] = useState(value)

  useEffect(() => {
    setChecked(value)
  }, [value])

  return (
    <>
      <div
        className={styles['checkbox']}
        {...internal?.root}
      >
        <label
          className={styles['label']}
          htmlFor={name}
        >
          <input
            className={styles['input']}
            type='checkbox'
            disabled={disabled}
            name={name}
            id={name}
            checked={checked}
            onChange={(e) => {
              const newValue = e.target.checked

              setChecked(newValue)
              onInput?.(newValue)
            }}
          />

          <div
            className={`
              ${styles['display-checkbox']} 
              ${checked && styles['checked']}
            `}
            {...internal?.display}
          >
            <Checkmark state={checked} />
          </div>

          <div {...internal?.content}>
            {children}
          </div>
        </label>
      </div>
    </>
  )
}

export { Checkbox }
export type { CheckboxProps }
