import { useState } from 'react'
import styles from './Field.module.css'
import Error from '../icons/Error'

interface ErrorInterface {
  failState: boolean,
  message: string,
}

interface TextAreaProps {
  children: React.ReactNode,
  resizable?: boolean,
  name: string,
  limit?: number,
  height?: number,
  errors?: ErrorInterface[],
  disabled?: boolean,
}

const TextArea: React.FC<TextAreaProps> = ({
  children,
  resizable=false,
  name,
  limit=0,
  height='6rem',
  errors,
  disabled=false,
}) => {
  const [focus, setFocus] = useState(false)
  const [value, setValue] = useState('')
  const [countError, setCountError] = useState(false)

  const validateCount = (value: string) => {
    setCountError(value.length > limit && limit > 0)
  }

  return (
    <>
      <div
        className={styles[`input-container`]}
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
              resize: resizable ? 'vertical' : 'none',
              height,
              minHeight: height,
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(e) => {
              setValue(e.target.value)
              validateCount(e.target.value)
            }}
            name={name}
            id={name}
            disabled={disabled}
          />

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

export default TextArea
