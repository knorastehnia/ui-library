import styles from './Button.module.css'
import TypographyDefaultsContext from '../utils/TypographyDefaultsContext'
import ButtonDefaultsContext from '../utils/ButtonDefaultsContext'
import type { ButtonDefaultsContextInterface } from '../utils/ButtonDefaultsContext'
import { useContext } from 'react'

interface ButtonProps extends ButtonDefaultsContextInterface {
  children: React.ReactElement | React.ReactElement[],
  action?: string | Function,
  disabled?: boolean,
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
