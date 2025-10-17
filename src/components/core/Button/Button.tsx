import styles from './Button.module.css'
import { createContext, useContext } from 'react'
import { TypographyDefaultsProvider } from '../Typography'

interface ButtonDefaultsContextInterface {
  type?: 'fill' | 'outline' | 'hollow' | 'text',
  width?: 'auto' | 'full',
}

interface ButtonProps extends ButtonDefaultsContextInterface {
  children: React.ReactElement | React.ReactElement[],
  action?: string | Function,
  disabled?: boolean,
}

interface ButtonDefaultsProviderProps extends ButtonDefaultsContextInterface {
  children: React.ReactElement | React.ReactElement[],
}

const ButtonDefaultsContext = createContext<ButtonDefaultsContextInterface>({})

const ButtonDefaultsProvider: React.FC<ButtonDefaultsProviderProps> = ({
  children,
  type,
  width,
}) => {
  return (
    <ButtonDefaultsContext.Provider value={{ type, width }}>
      {children}
    </ButtonDefaultsContext.Provider>
  )
}

const Button: React.FC<ButtonProps> = ({
  children,
  action,
  type,
  width,
  disabled=false,
}) => {
  const defaultsContext = useContext(ButtonDefaultsContext)
  const activeType = type ?? defaultsContext.type ?? 'outline'
  const activeWidth = width ?? defaultsContext.width ?? 'auto'

  return (
    <TypographyDefaultsProvider color={disabled ? 'disabled' : 'primary'}>
      {(typeof action === 'string') && action.length > 0

      ?
        <a
          href={action}
          className={`
            ${styles['button']} 
            ${styles[`style-${activeType}`]} 
            ${styles[`width-${activeWidth}`]} 
            ${disabled && styles['disabled']}
          `}
        >
          {children}
        </a>
      
      :
        <button
          disabled={disabled}
          onClick={(e) => !disabled && typeof action === 'function' && action(e)}
          className={`
            ${styles['button']} 
            ${styles[`style-${activeType}`]} 
            ${styles[`width-${activeWidth}`]} 
            ${disabled && styles['disabled']}
          `}
        >
          {children}
        </button>
      }
    </TypographyDefaultsProvider>
  )
}

export {
  Button,
  ButtonDefaultsProvider,
}
