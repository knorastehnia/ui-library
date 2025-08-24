import { useState } from 'react'
import styles from './InputPassword.module.css'

interface InputPasswordProps {
  children: React.ReactNode,
  size?: 'small' | 'default' | 'large',
  name: string,
}

const Input: React.FC<InputPasswordProps> = ({
  children,
  size='default',
  name,
}) => {
  const [focus, setFocus] = useState(false)
  const [value, setValue] = useState('')
  const [showValue, setShowValue] = useState(false)

  return (
    <>
      <div className={styles['input-container']}>
        <div className={`
          ${styles[`input-${size}`]} 
          ${
            focus ? styles['input-active'] : ''
          }
        `}>
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
              {
                showValue
                ? <img src='/src/assets/icons/eye-off.svg' alt='hide password' />
                : <img src='/src/assets/icons/eye-on.svg' alt='show password' />
              }
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Input
