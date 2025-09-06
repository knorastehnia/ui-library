import styles from './InputRadio.module.css'
import { useState, Children, cloneElement, type ReactElement } from 'react'

interface InputRadioProps {
  children: React.ReactNode,
  name: string,
  type?: 'vertical' | 'horizontal',
}

interface InputRadioOptionProps {
  children: React.ReactNode,
  name: string,
  value: string,
  group?: string,
  selected?: string,
  setSelected?: Function,
  disabled?: boolean,
}

type InputRadioComponent = React.FC<InputRadioProps> & {
  Option: React.FC<InputRadioOptionProps>,
}

const InputRadio: InputRadioComponent = ({
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

const InputRadioOption: React.FC<InputRadioOptionProps> = ({
  children,
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

        {/* <div className={`
          ${styles['display-radio']} 
          ${selected === name && styles['checked']}
        `}>
          <Checkmark state={selected === name} />
        </div> */}
        <span>
          {children}
        </span>
      </label>
    </>
  )
}

InputRadio.Option = InputRadioOption

export default InputRadio
