import styles from './Button.module.css'
import { TypographyDefaultsContext } from './Typography'
import { createContext, useContext } from 'react'

interface ButtonDefaultsContextInterface {
  type?: 'fill' | 'outline' | 'hollow' | 'text',
  width?: 'auto' | 'full',
}

interface ButtonProps extends ButtonDefaultsContextInterface {
  children: React.ReactElement | React.ReactElement[],
  action?: string | Function,
  disabled?: boolean,
}

const ButtonDefaultsContext = createContext<ButtonDefaultsContextInterface>({})

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
    <TypographyDefaultsContext.Provider value={{
      color: disabled ? 'disabled' : 'primary',
    }}>
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
    </TypographyDefaultsContext.Provider>
  )
}

export default Button
export { ButtonDefaultsContext }
