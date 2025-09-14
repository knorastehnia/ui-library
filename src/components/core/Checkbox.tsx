import styles from './Checkbox.module.css'
import Checkmark from '../icons/Checkmark'
import Typography from './Typography'
import { useState } from 'react'

interface CheckboxProps {
  label: string,
  name: string,
  value?: string,
  disabled?: boolean,
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
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
            <Typography weight='400'>
              {label}
            </Typography>
          </span>
        </label>
      </div>
    </>
  )
}

export default Checkbox
