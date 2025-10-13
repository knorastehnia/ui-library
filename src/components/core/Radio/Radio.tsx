import styles from './Radio.module.css'
import { createContext, useContext, useId, useState } from 'react'
import { Typography } from '../Typography'

interface RadioItemProps {
  children: React.ReactElement | React.ReactElement[],
  value: string,
  disabled?: boolean,
}

interface RadioProps {
  children:
    | React.ReactElement<typeof RadioItem>
    | React.ReactElement<typeof RadioItem>[],

  name: string,
  style?: 'vertical' | 'horizontal',
}

type RadioComponent = React.FC<RadioProps> & {
  Item: React.FC<RadioItemProps>,
}

const RadioContext = createContext<{
  name: string,
  selected: string,
  setSelected: Function,
} | null>(null)

const Radio: RadioComponent = ({
  children,
  name,
  style='horizontal',
}) => {
  const [selected, setSelected] = useState<string>('')

  return (
    <>
      <div className={styles[`radio-${style}`]}>
        <RadioContext.Provider value={{
          name,
          selected,
          setSelected,
        }}>
          {children}
        </RadioContext.Provider>
      </div>
    </>
  )
}

const RadioItem: React.FC<RadioItemProps> = ({
  children,
  value,
  disabled=false,
}) => {
  const ctx = useContext(RadioContext)
  if (!ctx) throw new Error('<Radio.Item> must be a descendant of <Radio>')

  const id = useId()

  return (
    <label
      className={`
        ${styles['label']} 
        ${ctx.selected === value && styles['checked']} 
        ${disabled && styles['disabled']}
      `}
      htmlFor={id}
    >
      <input
        className={styles['input']}
        type='radio'
        disabled={disabled}
        name={ctx.name}
        id={id}
        value={value}
        checked={ctx.selected === value}
        onChange={() => ctx.setSelected(value)}
      />

      <span>
        <Typography color={disabled ? 'disabled' : 'primary'}>
          {children}
        </Typography>
      </span>
    </label>
  )
}

Radio.Item = RadioItem

export { Radio }
