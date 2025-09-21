import styles from './Button.module.css'
import Typography from './Typography'

interface ButtonProps {
  label: string,
  href?: string,
  onClick?: Function,
  style?: 'fill' | 'outline' | 'text',
  size?: 's' | 'm' | 'l',
  width?: string,
  disabled?: boolean,
}

const Button: React.FC<ButtonProps> = ({
  label,
  href='',
  onClick=(() => null),
  style='outline',
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
          style={style !== 'text' ? { width } : {}}
          className={`
            ${styles[`style-${style}`]} 
            ${style !== 'text' && styles[`size-${size}`]} 
            ${disabled && styles['disabled']}
          `}
        >
          <Typography weight='400' color={disabled ? 'disabled' : 'primary'}>
            {label}
          </Typography>
        </a>
      
      :
        <button
          disabled={disabled}
          onClick={(e) => !disabled && onClick(e)}
          style={style !== 'text' ? { width } : {}}
          className={`
            ${styles[`style-${style}`]} 
            ${style !== 'text' && styles[`size-${size}`]} 
            ${disabled && styles['disabled']}
          `}
        >
          <Typography weight='400' color={disabled ? 'disabled' : 'primary'}>
            {label}
          </Typography>
        </button>
      }
    </>
  )
}

export default Button
