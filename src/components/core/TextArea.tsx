import { useState } from 'react'
import styles from './Field.module.css'
import Typography from './Typography'
import ErrorMessage from './ErrorMessage'

interface ErrorInterface {
  failState: boolean,
  message: string,
}

interface TextAreaProps {
  label: string,
  resizable?: boolean,
  name: string,
  limit?: number,
  height?: number,
  errors?: ErrorInterface[],
  disabled?: boolean,
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  resizable=false,
  name,
  limit=0,
  height='6rem',
  errors=[],
  disabled=false,
}) => {
  const [focus, setFocus] = useState(false)
  const [value, setValue] = useState('')
  const [countError, setCountError] = useState(false)

  const allErrors = [
    { failState: countError, message: 'Character count exceeds limit.' },
    ...errors,
  ]

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
            <Typography weight='400' size={(focus || value) ? 's' : 'm'}>
              {label}
            </Typography>
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

export default TextArea
