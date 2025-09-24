import styles from './Button.module.css'
import Typography from './Typography'

interface ButtonProps {
  children: React.ReactNode,
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
    <>
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
          <Typography color={disabled ? 'disabled' : 'primary'}>
            {children}
          </Typography>
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
          <Typography color={disabled ? 'disabled' : 'primary'}>
            {children}
          </Typography>
        </button>
      }
    </>
  )
}

export default Button
