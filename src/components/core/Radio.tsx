import styles from './Radio.module.css'
import Typography from './Typography'
import { useState } from 'react'

interface RadioOptionProps {
  label: string,
  name: string,
  value: string,
  disabled?: boolean,
}

interface RadioProps {
  name: string,
  options: RadioOptionProps[],
  style?: 'vertical' | 'horizontal',
}

const Radio: React.FC<RadioProps> = ({
  name,
  options,
  style='horizontal',
}) => {
  const [selected, setSelected] = useState<string>('')

  return (
    <>
      <div className={styles[`radio-${style}`]}>
        {
          options.map((option, index) => {
            return (
              <label
                key={index}
                className={`
                  ${styles['label']} 
                  ${selected === option.name && styles['checked']} 
                  ${option.disabled && styles['disabled']}
                `}
                htmlFor={name + option.name}
              >
                <input
                  className={styles['input']}
                  type='radio'
                  disabled={option.disabled}
                  name={name}
                  id={name + option.name}
                  value={option.value}
                  checked={selected === option.name}
                  onChange={() => setSelected(option.name)}
                />

                <span>
                  <Typography weight='400' color={option.disabled ? 'disabled' : 'primary'}>
                    {option.label}
                  </Typography>
                </span>
              </label>
            )
          })
        }
      </div>
    </>
  )
}

export default Radio
