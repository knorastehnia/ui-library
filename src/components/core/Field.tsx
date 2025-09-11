import { useEffect, useState } from 'react'
import styles from './Field.module.css'
import Error from '../icons/Error'
import Visibility from '../icons/Visibility'

interface ErrorInterface {
  failState: boolean,
  message: string,
}

interface FieldProps {
  children: React.ReactNode,
  type?:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
  name: string,
  limit?: number,
  width?: string,
  errors?: ErrorInterface[],
  disabled?: boolean,
}

const Field: React.FC<FieldProps> = ({
  children,
  type='text',
  limit=0,
  name,
  width='100%',
  errors,
  disabled=false,
}) => {
  const [focus, setFocus] = useState(false)
  const [value, setValue] = useState('')
  const [showValue, setShowValue] = useState(type !== 'password')
  const [numberError, setNumberError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [countError, setCountError] = useState(false)

  const validateCount = () => {
    setCountError(value.length > limit && limit > 0)
  }

  const validateEmail = () => {
    const emailSyntax = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

    setEmailError(!emailSyntax.test(value) && value.length !== 0)
  }

  const validateNumber = () => {
    setNumberError(Number.isNaN(Number(value)))
  }


  // on blur
  const handleInput = () => {
    if (type === 'number') validateNumber()
    else if (type === 'email') validateEmail()
  }

  // on change
  useEffect(() => {
    if (numberError) validateNumber()
    else if (emailError) validateEmail()
    validateCount()
  }, [value])

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
            onBlur={() => { setFocus(false); handleInput(); }}
            onChange={(e) => setValue(e.target.value)}
            type={showValue ? 'text' : 'password'}
            name={name}
            id={name}
            disabled={disabled}
          />

          {
            type === 'password' &&
              <div className={styles['eye-container']}>
                <button onClick={() => setShowValue(!showValue)} className={styles['eye']}>
                  <Visibility state={showValue} />
                </button>
              </div>
          }

          {
            limit > 0 &&
              <div className={styles['counter']}>
                <span
                  className={
                    value.length > limit
                    ? styles['excess-count']
                    : ''
                  }
                >{value.length}</span>
                /
                <span>{limit}</span>
              </div>
          }
        </div>

        <div
          className={`
            ${styles['error-container']} 
            ${countError ? styles['error-visible'] : ''}
          `}
        >
          <div className={styles['error']}>
            <div className={styles['error-icon']}>
              <Error />
            </div>
            <span>
              Character count exceeds limit.
            </span>
          </div>
        </div>

        <div
          className={`
            ${styles['error-container']} 
            ${numberError ? styles['error-visible'] : ''}
          `}
        >
          <div className={styles['error']}>
            <div className={styles['error-icon']}>
              <Error />
            </div>
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
            <div className={styles['error-icon']}>
              <Error />
            </div>
            <span>
              Please enter a valid email.
            </span>
          </div>
        </div>

        {
          errors?.map((error, index) => (
            <div
              key={index}
              className={`
                ${styles['error-container']} 
                ${error.failState ? styles['error-visible'] : ''}
              `}
            >
              <div className={styles['error']}>
                <div className={styles['error-icon']}>
                  <Error />
                </div>
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

export default Field
