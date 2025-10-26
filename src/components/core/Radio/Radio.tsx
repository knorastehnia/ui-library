import styles from './Radio.module.css'
import { createContext, useContext, useId, useState } from 'react'

interface RadioItemProps {
  children: React.ReactElement | React.ReactElement[]
  value: string
  disabled?: boolean
  internal?: {
    root?: React.HTMLAttributes<HTMLLabelElement> & { ref?: React.Ref<HTMLLabelElement> }
    content?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

interface RadioProps {
  children:
    | React.ReactElement<typeof RadioItem>
    | React.ReactElement<typeof RadioItem>[]
  name: string
  arrangement?: 'vertical' | 'horizontal'
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

type RadioComponent = React.FC<RadioProps> & {
  Item: React.FC<RadioItemProps>
}

const RadioContext = createContext<{
  name: string,
  selected: string,
  setSelected: Function,
} | null>(null)

const Radio: RadioComponent = ({
  children,
  name,
  value,
  defaultValue='',
  onChange,
  arrangement='horizontal',
  internal,
}) => {
  const [internalSelected, setInternalSelected] = useState(defaultValue)

  const selected = value ?? internalSelected

  const updateInternalSelected = (value: string) => {
    setInternalSelected(value)
    onChange?.(value)
  }

  return (
    <>
      <div
        className={styles[`arrangement-${arrangement}`]}
        {...internal?.root}
      >
        <RadioContext.Provider value={{
          name,
          selected,
          setSelected: updateInternalSelected,
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
  internal,
}) => {
  const ctx = useContext(RadioContext)
  if (!ctx) throw new Error('<Radio.Item> must be a descendant of <Radio>')

  const id = useId()

  const handleKeyboard = (e: React.KeyboardEvent) => {
    e.preventDefault()
  }

  return (
    <label
      className={`
        ${styles['label']} 
        ${ctx.selected === value && styles['checked']} 
        ${disabled && styles['disabled']}
      `}
      htmlFor={id}
      {...internal?.root}
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
        onKeyDown={(e) => handleKeyboard(e)}
      />

      <div {...internal?.content}>
        {children}
      </div>
    </label>
  )
}

Radio.Item = RadioItem

export { Radio }

export type {
  RadioProps,
  RadioItemProps,
}
