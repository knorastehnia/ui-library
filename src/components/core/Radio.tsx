import styles from './Radio.module.css'
import Typography from './Typography'
import { useState, Children, cloneElement, type ReactElement } from 'react'

interface RadioProps {
  children: React.ReactNode,
  name: string,
  type?: 'vertical' | 'horizontal',
}

interface RadioOptionProps {
  label: string,
  name: string,
  value: string,
  group?: string,
  selected?: string,
  setSelected?: Function,
  disabled?: boolean,
}

type RadioComponent = React.FC<RadioProps> & {
  Option: React.FC<RadioOptionProps>,
}

const Radio: RadioComponent = ({
  children,
  name,
  type='horizontal',
}) => {
  const [selected, setSelected] = useState<string>('')

  return (
    <>
      <div className={styles[`radio-${type}`]}>
        {Children.map(children, (child) => {
          return cloneElement(child as ReactElement<any>, {
            selected,
            setSelected,
            group: name,
          })
        })}
      </div>
    </>
  )
}

const RadioOption: React.FC<RadioOptionProps> = ({
  label,
  name,
  group,
  value,
  selected,
  setSelected,
  disabled=false,
}) => {
  return (
    <>
      <label
        className={`
          ${styles['label']} 
          ${selected === name && styles['checked']}
        `}
        htmlFor={group + name}
      >
        <input
          className={styles['input']}
          type='radio'
          disabled={disabled}
          name={group}
          id={group + name}
          value={value}
          checked={selected === name}
          onChange={() => setSelected!(name)}
        />

        <span>
          <Typography weight='400'>
            {label}
          </Typography>
        </span>
      </label>
    </>
  )
}

Radio.Option = RadioOption

export default Radio
