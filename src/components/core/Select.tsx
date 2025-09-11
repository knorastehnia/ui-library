import { useState } from 'react'
import styles from './Select.module.css'

interface SelectProps {
  children: React.ReactNode,
  name: string,
  width?: string,
  disabled?: boolean,
}

const Select: React.FC<SelectProps> = ({
  children,
  name,
  width='100%',
  disabled=false,
}) => {
  const [focus, setFocus] = useState(false)
  const [value, setValue] = useState('')

  return (
    <>
      <div
        className={styles[`input-container`]}
        style={{ width }}
      >
        <div className={`
          ${styles['input-field']} 
          ${
            focus ? styles['input-active'] : ''
          }
        `}>
          <label
            className={`
              ${styles['label']} 
              ${(focus || value) && styles['label-active']}
            `}
            htmlFor={name}
          >
            {children}
          </label>

          <input
            className={styles['input']}
            onFocus={() => setFocus(true)}
            onBlur={() => { setFocus(false) }}
            onChange={(e) => setValue(e.target.value)}
            name={name}
            id={name}
            disabled={disabled}
          />
        </div>
      </div>
    </>
  )
}

export default Select
