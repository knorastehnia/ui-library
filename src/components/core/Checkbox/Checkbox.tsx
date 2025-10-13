import styles from './Checkbox.module.css'
import { useState } from 'react'
import { Checkmark } from '../../icons'

interface CheckboxProps {
  children: React.ReactElement | React.ReactElement[],
  name: string,
  value?: string,
  disabled?: boolean,
}

const Checkbox: React.FC<CheckboxProps> = ({
  children,
  name,
  value,
  disabled=false,
}) => {
  const [checked, setChecked] = useState(false)

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
            value={value}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
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
