import { useEffect, useState } from 'react'
import styles from './InputText.module.css'
import Error from '../icons/Error'
import Visibility from '../icons/Visibility'

interface ErrorInterface {
  failState: boolean,
  message: string,
}

interface InputTextAreaProps {
  children: React.ReactNode,
  type?:
    | 'static'
    | 'dynamic'
  name: string,
  width?: number,
  height?: number,
  errors?: ErrorInterface[],
}

const InputTextArea: React.FC<InputTextAreaProps> = ({
  children,
  type='text',
  name,
  width='auto',
  height='6rem',
  errors,
}) => {
  const [focus, setFocus] = useState(false)
  const [value, setValue] = useState('')
  const [showValue, setShowValue] = useState(type !== 'password')
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
    if (type === 'number') validateNumber()
    else if (type === 'email') validateEmail()
  }

  useEffect(() => {
    if (numberError) validateNumber()
    else if (emailError) validateEmail()
  }, [value])

  return (
    <>
      <div
        className={styles[`input-container`]}
        style={{
          width: width === 'auto' ? '100%' : `${width}px`,
        }}
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
              ${
                (focus || value) ? styles['label-active'] : ''
              }
            `}
            htmlFor={name}
          >
            {children}
          </label>

          <textarea
            className={styles['input']}
            style={{
              resize: type === 'dynamic' ? 'vertical' : 'none',
              height,
              minHeight: height,
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => { setFocus(false); handleInput(); }}
            onChange={(e) => setValue(e.target.value)}
            name={name}
            id={name}
          />

          {
            type === 'password' ?
              <div className={styles['eye-container']}>
                <button onClick={() => setShowValue(!showValue)} className={styles['eye']}>
                  <Visibility state={showValue} />
                </button>
              </div>
            : null
          }
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

export default InputTextArea
