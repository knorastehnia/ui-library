import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode,
  href?: string,
  onClick?: Function,
  style?: 'fill' | 'outline' | 'text',
  size?: 'small' | 'default' | 'large',
  disabled?: boolean,
}

const Button: React.FC<ButtonProps> = ({
  children,
  href='',
  onClick=(() => null),
  style='outline',
  size='default',
  disabled=false,
}) => {
  return (
    <>
      {href.length > 0

      ?
        <a
          href={href}
          onClick={(e) => !disabled && onClick(e)}
          className={`
            ${styles[`button-${style}`]} 
            ${style !== 'text' && styles[`button-${size}`]} 
            ${disabled && styles['disabled']}
          `}
        >
          {children}
        </a>
      
      :
        <button
          disabled={disabled}
          onClick={(e) => !disabled && onClick(e)}
          className={`
            ${styles[`button-${style}`]} 
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
