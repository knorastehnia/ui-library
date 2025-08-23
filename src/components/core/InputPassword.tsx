import { useState } from 'react'
import styles from './InputPassword.module.css'

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
  const [showValue, setShowValue] = useState(false)

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
          type={showValue ? 'text' : 'password'}
          name={name}
          id={name}
        />

        <div className={styles['eye-container']}>
          <button onClick={() => setShowValue(!showValue)} className={styles['eye']}>
            <img
              src={`/src/assets/icons/eye-${showValue ? 'off' : 'on'}.svg`}
              alt='hide password'
            />
          </button>
        </div>
      </div>
    </>
  )
}

export default Input
