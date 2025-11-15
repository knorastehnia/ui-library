import { TypographyDefaultsProvider } from '../Typography'
import styles from './Radio.module.css'
import { createContext, useContext, useId, useRef, useState } from 'react'

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
  setSelected: (value: string) => void,
  handleKeyboard: (e: React.KeyboardEvent) => void,
  contentRef: React.RefObject<HTMLDivElement | null>,
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
  const contentRef = useRef<HTMLDivElement>(null)

  const selected = value ?? internalSelected

  const updateInternalSelected = (value: string) => {
    setInternalSelected(value)
    onChange?.(value)
  }

  const handleKeyboard = (e: React.KeyboardEvent) => {
    if (!contentRef.current?.children) return

    const keys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowRight',
      'ArrowLeft',
      'Home',
      'End',
      'PageUp',
      'PageDown',
    ]

    if (!keys.includes(e.key)) return
    e.preventDefault()

    const children = Array.from(contentRef.current.children).flatMap((child) => {
      const input = child.getElementsByTagName('input')[0]
      if (!input.disabled) {
        return input
      } else {
        return []
      }
    }) as HTMLInputElement[]

    let loop = false

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        loop = true
      case 'PageDown':
        if (!children.some(item => item.checked)) {
          children[0].click()

          break
        }

        for (let i = 0; i < children.length; i++) {
          if (children[i].checked === true) {
            const current = children[i === children.length-1 && loop ? 0 : i+1]
            current?.click()

            break
          }
        }

        break

      case 'ArrowUp':
      case 'ArrowLeft':
        loop = true
      case 'PageUp':
        if (!children.some(item => item.checked)) {
          children[children.length - 1].click()

          break
        }

        for (let i = children.length-1; i > -1; i--) {
          if (children[i].checked === true) {
            const current = children[i === 0 && loop ? children.length-1 : i-1]
            current?.click()
    
            break
          }
        }

        break

      case 'End':
        const lastTab = children[children.length - 1]
        lastTab.click()

        break

      case 'Home':
        const firstTab = children[0]
        firstTab.click()

        break

      default:
        break
    }
  }

  return (
    <>
      <div
        className={styles[`arrangement-${arrangement}`]}
        ref={contentRef}
        tabIndex={0}
        onKeyDown={handleKeyboard}
        {...internal?.root}
      >
        <RadioContext.Provider value={{
          name,
          selected,
          setSelected: updateInternalSelected,
          handleKeyboard,
          contentRef,
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

  return (
    <label
      className={`
        ${styles['label']} 
        ${ctx.selected === value && styles['checked']} 
        ${disabled && styles['disabled']}
      `}
      tabIndex={-1}
      htmlFor={id}
      {...internal?.root}
    >
      <input
        className={styles['input']}
        type='radio'
        disabled={disabled}
        name={ctx.name}
        id={id}
        tabIndex={-1}
        value={value}
        checked={ctx.selected === value}
        onFocus={() => ctx.contentRef.current?.focus()}
        onChange={() => ctx.setSelected(value)}
        onKeyDown={(e) => ctx.handleKeyboard(e)}
      />

      <div {...internal?.content}>
        <TypographyDefaultsProvider color={disabled ? 'disabled' : undefined}>
          {children}
        </TypographyDefaultsProvider>
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
