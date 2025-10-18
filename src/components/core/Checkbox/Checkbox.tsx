import styles from './Checkbox.module.css'
import { useEffect, useState } from 'react'
import { Checkmark } from '../../icons'

interface CheckboxProps {
  children: React.ReactElement | React.ReactElement[],
  name: string,
  value?: boolean,
  onInput?: (expose: boolean) => void,
  disabled?: boolean,
}

const Checkbox: React.FC<CheckboxProps> = ({
  children,
  name,
  value=false,
  onInput,
  disabled=false,
}) => {
  const [checked, setChecked] = useState(value)

  useEffect(() => {
    setChecked(value)
  }, [value])

  return (
    <>
      <div className={styles['checkbox']}>
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

          <div className={`
            ${styles['display-checkbox']} 
            ${checked && styles['checked']}
          `}>
            <Checkmark state={checked} />
          </div>

          <div>
            {children}
          </div>
        </label>
      </div>
    </>
  )
}

export { Checkbox }
