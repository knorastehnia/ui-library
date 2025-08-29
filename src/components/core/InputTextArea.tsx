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
  limit?: number,
  width?: number,
  height?: number,
  errors?: ErrorInterface[],
}

const InputTextArea: React.FC<InputTextAreaProps> = ({
  children,
  type='static',
  name,
  limit=0,
  width='auto',
  height='6rem',
  errors,
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
            onBlur={() => setFocus(false)}
            onChange={(e) => {
              setValue(e.target.value)
              validateCount(e.target.value)
            }}
            name={name}
            id={name}
          />

          {
            limit > 0 ?
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
            : null
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
              Character count exceeded.
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
