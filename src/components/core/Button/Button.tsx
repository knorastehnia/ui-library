import styles from './Button.module.css'
import { createContext, useContext } from 'react'
import { TypographyDefaultsProvider } from '../Typography'

interface ButtonDefaultsContextInterface {
  appearance?: 'fill' | 'outline' | 'hollow' | 'text'
  size?: 's' | 'm' | 'l'
  width?: 'auto' | 'full'
}

interface ButtonProps extends ButtonDefaultsContextInterface {
  children: React.ReactElement | React.ReactElement[]
  action?: string | Function
  disabled?: boolean
  internal?: {
    root?: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  }
}

interface ButtonDefaultsProviderProps extends ButtonDefaultsContextInterface {
  children: React.ReactElement | React.ReactElement[]
}

const ButtonDefaultsContext = createContext<ButtonDefaultsContextInterface>({})

const ButtonDefaultsProvider: React.FC<ButtonDefaultsProviderProps> = ({
  children,
  appearance,
  size,
  width,
}) => {
  const defaultsContext = useContext(ButtonDefaultsContext)
  const activeAppearance = appearance ?? defaultsContext.appearance
  const activeSize = size ?? defaultsContext.size
  const activeWidth = width ?? defaultsContext.width

  return (
    <ButtonDefaultsContext.Provider value={{
      appearance: activeAppearance,
      size: activeSize,
      width: activeWidth,
    }}>
      {children}
    </ButtonDefaultsContext.Provider>
  )
}

const Button: React.FC<ButtonProps> = ({
  children,
  action,
  appearance,
  size,
  width,
  disabled=false,
  internal,
}) => {
  const defaultsContext = useContext(ButtonDefaultsContext)
  const activeAppearance = appearance ?? defaultsContext.appearance ?? 'outline'
  const activeSize = size ?? defaultsContext.size ?? 'm'
  const activeWidth = width ?? defaultsContext.width ?? 'auto'

  return (
    <TypographyDefaultsProvider color={disabled ? 'disabled' : undefined}>
      {(typeof action === 'string') && action.length > 0

      ?
        <a
          href={action}
          className={`
            ${styles['button']} 
            ${styles[`appearance-${activeAppearance}`]} 
            ${styles[`size-${activeSize}`]} 
            ${styles[`width-${activeWidth}`]} 
            ${disabled && styles['disabled']}
          `}
          {...internal?.root as React.RefAttributes<HTMLAnchorElement>}
        >
          {children}
        </a>
      
      :
        <button
          disabled={disabled}
          onClick={(e) => !disabled && typeof action === 'function' && action(e)}
          className={`
            ${styles['button']} 
            ${styles[`appearance-${activeAppearance}`]} 
            ${styles[`size-${activeSize}`]} 
            ${styles[`width-${activeWidth}`]} 
            ${disabled && styles['disabled']}
          `}
          {...internal?.root as React.RefAttributes<HTMLButtonElement>}
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

export type { ButtonProps }
