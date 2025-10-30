import styles from './Checkbox.module.css'
import { useState, useId } from 'react'
import { Checkmark } from '../../icons'
import { TypographyDefaultsProvider } from '../Typography'

interface CheckboxProps {
  children: React.ReactElement | React.ReactElement[]
  name: string
  value?: boolean
  defaultValue?: boolean
  onChange?: (value: boolean) => void
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
  value,
  defaultValue=false,
  onChange,
  disabled=false,
  internal,
}) => {
  const id = useId()
  const [internalChecked, setInternalChecked] = useState(defaultValue)

  const checked = value ?? internalChecked

  return (
    <>
      <div
        className={styles['checkbox']}
        {...internal?.root}
      >
        <label
          className={styles['label']}
          htmlFor={id}
        >
          <input
            className={styles['input']}
            type='checkbox'
            disabled={disabled}
            name={name}
            id={id}
            checked={checked}
            onChange={(e) => {
              const newValue = e.target.checked

              setInternalChecked(newValue)
              onChange?.(newValue)
            }}
          />

          <div
            className={`
              ${styles['display-checkbox']} 
              ${checked && styles['checked']} 
              ${disabled && styles['disabled']}
            `}
            {...internal?.display}
          >
            <Checkmark state={checked} />
          </div>

          <div {...internal?.content}>
            <TypographyDefaultsProvider color={disabled ? 'disabled' : undefined}>
              {children}
            </TypographyDefaultsProvider>
          </div>
        </label>
      </div>
    </>
  )
}

export { Checkbox }
export type { CheckboxProps }
