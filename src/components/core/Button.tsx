import styles from './Button.module.css'
import TypographyDefaultsContext from '../utils/TypographyDefaultsContext'

interface ButtonProps {
  children: React.ReactElement | React.ReactElement[],
  action?: string | Function,
  type?: 'fill' | 'outline' | 'text',
  width?: 'auto' | 'full',
  disabled?: boolean,
}

const Button: React.FC<ButtonProps> = ({
  children,
  action,
  type='outline',
  width='auto',
  disabled=false,
}) => {
  return (
    <TypographyDefaultsContext.Provider value={{
      color: disabled ? 'disabled' : 'primary',
    }}>
      {(typeof action === 'string') && action.length > 0

      ?
        <a
          href={action}
          className={`
            ${styles[`style-${type}`]} 
            ${styles[`width-${width}`]} 
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
            ${styles[`style-${type}`]} 
            ${styles[`width-${width}`]} 
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
