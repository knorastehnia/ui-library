import styles from './Field.module.css'
import { useEffect, useState, useId } from 'react'
import { Visibility } from '../../icons'
import { Typography } from '../Typography'
import { ErrorMessage } from '../ErrorMessage'
import { Button } from '../Button'

interface ErrorInterface {
  failState: boolean
  message: string
}

interface FieldProps {
  label: string
  type?:
    | 'text'
    | 'textarea'
    | 'number'
    | 'email'
    | 'password'

  name?: string
  limit?: number
  resizable?: boolean
  height?: string
  width?: string
  errors?: ErrorInterface[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    display?: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  }
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
  value,
  defaultValue='',
  onChange,
  disabled=false,
  internal,
}) => {
  const id = useId()
  const [focus, setFocus] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [showValue, setShowValue] = useState(type !== 'password')

  const currentValue = value ?? internalValue

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
    setCountError(currentValue.length > limit && limit > 0)
  }

  const validateEmail = () => {
    const emailSyntax = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

    setEmailError(!emailSyntax.test(currentValue) && currentValue.length !== 0)
  }

  const validateNumber = () => {
    setNumberError(Number.isNaN(Number(currentValue)))
  }

  const updateInternalValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInternalValue(event.target.value)
    onChange?.(event.target.value)
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
  }, [currentValue])

  return (
    <div
      className={styles[`input-container`]}
      style={{ width }}
      {...internal?.root}
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
            ${(focus || currentValue) && styles['label-active']}
          `}
          htmlFor={id}
        >
          <Typography size={(focus || currentValue) ? 's' : 'm'} color='dimmed'>
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
            onBlur={() => { setFocus(false); handleInput(); }}
            value={currentValue}
            onChange={updateInternalValue}
            name={name}
            id={id}
            disabled={disabled}
            {...internal?.display as React.HTMLAttributes<HTMLTextAreaElement>}
          />

          :
          <input
            className={styles['input']}
            onFocus={() => setFocus(true)}
            onBlur={() => { setFocus(false); handleInput(); }}
            value={currentValue}
            onChange={updateInternalValue}
            type={showValue ? 'text' : 'password'}
            name={name}
            id={id}
            disabled={disabled}
            {...internal?.display as React.HTMLAttributes<HTMLInputElement>}
          />
        }

        {
          type === 'password' &&
            <Button
              action={() => setShowValue(!showValue)}
              surface='hollow'
              internal={{
                root: {
                  style: {
                    padding: '3px',
                    margin: '0 10px 0 5px',
                  }
                }
              }}
            >
              <Visibility state={showValue} />
            </Button>
        }

        {
          limit > 0 &&
            <div className={styles['counter']}>
              <span>
                <Typography
                  weight='400'
                  size='xs'
                  color={currentValue.length > limit ? 'error' : 'dimmed'}
                >
                  {currentValue.length}
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

export { Field }
export type { FieldProps }
