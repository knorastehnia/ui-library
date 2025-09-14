import { useEffect, useState } from 'react'
import useCollapseEffect from '../utils/useCollapseEffect'
import styles from './Field.module.css'
import Visibility from '../icons/Visibility'
import Typography from './Typography'
import ErrorMessage from './ErrorMessage'

interface ErrorInterface {
  failState: boolean,
  message: string,
}

interface FieldProps {
  label: string,
  type?:
    | 'text'
    | 'number'
    | 'email'
    | 'password',

  name: string,
  limit?: number,
  width?: string,
  errors?: ErrorInterface[],
  disabled?: boolean,
}

const Field: React.FC<FieldProps> = ({
  label,
  type='text',
  limit=0,
  name,
  width='100%',
  errors=[],
  disabled=false,
}) => {
  const [focus, setFocus] = useState(false)
  const [value, setValue] = useState('')
  const [showValue, setShowValue] = useState(type !== 'password')

  const [numberError, setNumberError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [countError, setCountError] = useState(false)

  useCollapseEffect

  const allErrors = [
    { failState: numberError, message: 'Please enter a valid number.' },
    { failState: emailError, message: 'Please enter a valid email.' },
    { failState: countError, message: 'Character count exceeds limit.' },
    ...errors,
  ]

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
            <Typography weight='400' size={(focus || value) ? 's' : 'm'}>
              {label}
            </Typography>
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
                >
                  <Typography weight='400' size='xs'>
                    {value.length}
                  </Typography>
                </span>
                /
                <span>
                  <Typography weight='400' size='xs'>
                    {limit}
                  </Typography>
                </span>
              </div>
          }
        </div>

        <div className={styles['error-container']}>
          {
            allErrors?.map((error, index) => (
                <div key={index}>
                  <ErrorMessage message={error.message} state={error.failState} />
                </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Field
