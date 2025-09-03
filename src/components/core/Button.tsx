import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode,
  href?: string,
  onClick?: Function,
  type?: 'fill' | 'outline' | 'text',
  size?: 's' | 'm' | 'l',
  width?: string,
  disabled?: boolean,
}

const Button: React.FC<ButtonProps> = ({
  children,
  href='',
  onClick=(() => null),
  type='outline',
  size='m',
  width='auto',
  disabled=false,
}) => {
  return (
    <>
      {href.length > 0

      ?
        <a
          href={href}
          onClick={(e) => !disabled && onClick(e)}
          style={type !== 'text' ? { width } : {}}
          className={`
            ${styles[`button-${type}`]} 
            ${type !== 'text' && styles[`button-${size}`]} 
            ${disabled && styles['disabled']}
          `}
        >
          {children}
        </a>
      
      :
        <button
          disabled={disabled}
          onClick={(e) => !disabled && onClick(e)}
          style={type !== 'text' ? { width } : {}}
          className={`
            ${styles[`button-${type}`]} 
            ${styles[`button-${size}`]} 
            ${disabled && styles['disabled']}
          `}
        >
          {children}
        </button>
      }
    </>
  )
}

export default Button
