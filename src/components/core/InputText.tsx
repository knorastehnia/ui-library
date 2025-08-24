import { useEffect, useState } from 'react'
import styles from './InputText.module.css'

interface ErrorInterface {
  failState: boolean,
  message: string,
}

interface InputTextProps {
  children: React.ReactNode,
  validation?: 'none' | 'number' | 'email'
  size?: 'small' | 'default' | 'large',
  name: string,
  errors?: ErrorInterface[],
}

const Input: React.FC<InputTextProps> = ({
  children,
  validation='none',
  size='default',
  name,
  errors,
}) => {
  const [focus, setFocus] = useState(false)
  const [value, setValue] = useState('')
  const [numberError, setNumberError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const validateEmail = () => {
    const emailSyntax = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

    setEmailError(!emailSyntax.test(value) && value.length !== 0)
  }

  const validateNumber = () => {
    setNumberError(Number.isNaN(Number(value)))
  }

  const handleInput = () => {
    if (validation === 'number') validateNumber()
    else if (validation === 'email') validateEmail()
  }

  useEffect(() => {
    if (numberError) validateNumber()
    else if (emailError) validateEmail()
  }, [value])

  return (
    <>
      <div className={styles['input-container']}>
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
            onBlur={() => {
              setFocus(false)
              handleInput()
            }}
            onChange={(e) => setValue(e.target.value)}

            type='text'
            name={name}
            id={name}
          />
        </div>

        <div
          className={`
            ${styles['error-container']} 
            ${numberError ? styles['error-visible'] : ''}
          `}
        >
          <div className={styles['error']}>
            <img src='/src/assets/icons/error.svg' alt='error' />
            <span>
              Please enter a valid number.
            </span>
          </div>
        </div>

        <div
          className={`
            ${styles['error-container']} 
            ${emailError ? styles['error-visible'] : ''}
          `}
        >
          <div className={styles['error']}>
            <img src='/src/assets/icons/error.svg' alt='error' />
            <span>
              Please enter a valid email.
            </span>
          </div>
        </div>

        {
          errors?.map((error) => (
            <div
              className={`
                ${styles['error-container']} 
                ${error.failState ? styles['error-visible'] : ''}
              `}
            >
              <div className={styles['error']}>
                <img src='/src/assets/icons/error.svg' alt='error' />
                <span>
                  {error.message}
                </span>
              </div>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default Input
