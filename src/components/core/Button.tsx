import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode,
  onClick: Function,
  style?: 'fill' | 'outline',
  size?: 'small' | 'default' | 'large',
  disabled?: boolean,
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  style='outline',
  size='default',
  disabled=false,
}) => {
  return (
    <>
      <button
        onClick={(e) => !disabled ? onClick(e) : null}
        className={`
          ${styles[`button-${size}`]} 
          ${styles[`button-${style}`]} 
          ${
            disabled
            ? styles['disabled']
            : null
          }
        `}
      >
        {children}
      </button>
    </>
  )
}

export default Button
