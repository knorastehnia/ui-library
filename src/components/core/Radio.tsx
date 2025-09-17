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
  disabled?: boolean,
  _group?: string,
  _selected?: string,
  _setSelected?: Function,
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
            _selected: selected,
            _setSelected: setSelected,
            _group: name,
          })
        })}
      </div>
    </>
  )
}

const RadioOption: React.FC<RadioOptionProps> = ({
  label,
  name,
  value,
  disabled=false,
  _group,
  _selected,
  _setSelected,
}) => {
  return (
    <>
      <label
        className={`
          ${styles['label']} 
          ${_selected === name && styles['checked']}
        `}
        htmlFor={_group + name}
      >
        <input
          className={styles['input']}
          type='radio'
          disabled={disabled}
          name={_group}
          id={_group + name}
          value={value}
          checked={_selected === name}
          onChange={() => _setSelected!(name)}
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
