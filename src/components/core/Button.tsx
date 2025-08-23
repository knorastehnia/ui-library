import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode,
  style?: 'fill' | 'outline',
  size?: 'small' | 'default' | 'large',
}

const Button: React.FC<ButtonProps> = ({
  children,
  style='outline',
  size='default',
}) => {
  return (
    <>
      <button
        className={`${styles[`button-${size}`]} ${styles[`button-${style}`]}`}
      >
        {children}
      </button>
    </>
  )
}

export default Button
