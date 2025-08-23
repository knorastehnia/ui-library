import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode,
  type?: 'fill' | 'outline',
  size?: 'small' | 'default' | 'large',
}

const Button: React.FC<ButtonProps> = ({
  children,
  type='outline',
  size='default',
}) => {
  return (
    <>
      <button
        className={
          type === 'fill' ? styles['button-fill'] :
          styles['button-outline']
        }

        style={{
          padding:
            size === 'large' ? '20px 30px' :
            size === 'small' ? '5px 10px' :
            '10px 15px',
        }}
      >
        {children}
      </button>
    </>
  )
}

export default Button
