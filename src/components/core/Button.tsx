import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode,
  onClick: Function,
  style?: 'fill' | 'outline',
  size?: 'small' | 'default' | 'large',
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  style='outline',
  size='default',
}) => {
  return (
    <>
      <button
        onClick={(e) => onClick(e)}
        className={`${styles[`button-${size}`]} ${styles[`button-${style}`]}`}
      >
        {children}
      </button>
    </>
  )
}

export default Button
