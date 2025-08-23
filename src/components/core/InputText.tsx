import { useState } from 'react'
import styles from './InputText.module.css'

interface InputProps {
  children: React.ReactNode,
  size?: 'small' | 'default' | 'large',
  name: string,
}

const Input: React.FC<InputProps> = ({
  children,
  size='default',
  name,
}) => {
  const [focus, setFocus] = useState(false)
  const [value, setValue] = useState('')

  return (
    <>
      <div className={styles[`input-${size}`]}>
        <label
          className={`
            ${styles['label']} 
            ${
              (focus || value) ? styles['label-active'] : ''
            }
          `}
          htmlFor={name}
        >
          {children}
        </label>

        <input
          className={styles['input']}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => setValue(e.target.value)}
          type='text'
          name={name}
          id={name}
        />
      </div>
    </>
  )
}

export default Input
