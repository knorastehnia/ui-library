import { useEffect, useState } from 'react'
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
    | 'textarea'
    | 'number'
    | 'email'
    | 'password',

  name?: string,
  limit?: number,
  resizable?: boolean,
  height?: string,
  width?: string,
  errors?: ErrorInterface[],
  disabled?: boolean,
}

const Field: React.FC<FieldProps> = ({
  label,
  type='text',
  name,
  limit=0,
  resizable=false,
  height='6rem',
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
    if (type === 'email') validateEmail()
    if (limit > 0) validateCount()
  }

  // on change
  useEffect(() => {
    if (numberError) validateNumber()
    if (emailError) validateEmail()
    if (countError) validateCount()
  }, [value])

  return (
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
          <Typography size={(focus || value) ? 's' : 'm'} color='dimmed'>
            {label}
          </Typography>
        </label>

        {type === 'textarea'

          ?
          <textarea
            className={styles['input']}
            style={{
              resize: resizable ? 'vertical' : 'none',
              height,
              minHeight: height,
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(e) => setValue(e.target.value)}
            name={name}
            id={name}
            disabled={disabled}
          />

          :
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
        }

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
              <span>
                <Typography
                  weight='400'
                  size='xs'
                  color={value.length > limit ? 'error' : 'dimmed'}
                >
                  {value.length}
                </Typography>
              </span>

              <span>
                <Typography
                  weight='400'
                  size='xs'
                  color='dimmed'
                >
                  {'/' + limit}
                </Typography>
              </span>
            </div>
        }
      </div>

      <div className={styles['error-container']}>
        {
          allErrors?.map((error, index) => (
              <div key={index}>
                <ErrorMessage state={error.failState}>
                  <Typography>
                    {error.message}
                  </Typography>
                </ErrorMessage>
              </div>
          ))
        }
      </div>
    </div>
  )
}

export default Field
