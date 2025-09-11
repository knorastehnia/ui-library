import styles from './Checkbox.module.css'
import Checkmark from '../icons/Checkmark'
import { useState } from 'react'

interface CheckboxProps {
  children: React.ReactNode,
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
          <span>
            {children}
          </span>
        </label>
      </div>
    </>
  )
}

export default Checkbox
