import styles from './Spinner.module.css'

interface SpinnerProps {
  state?: boolean
  size?: 's' | 'm' | 'l'
  color?:
    | 'primary'
    | 'dimmed'
    | 'inverted'
    | 'disabled'
    | 'success'
    | 'error'
}

const Spinner: React.FC<SpinnerProps> = ({
  state=false,
  size='m',
  color='dimmed',
}) => {
  const activeSize = {
    's': '1rem',
    'm': '2rem',
    'l': '4rem',
  }[size]

  return (
    <svg
      style={{
        width: activeSize,
        height: activeSize,
      }}
      className={`
        ${styles['svg']} 
        ${styles[`color-${color}`]}
      `}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx='16'
        cy='16'
        r='14'
        strokeLinecap='round'
        pathLength='1'
        className={`
          ${!state && styles['hidden']}
        `}
      />
    </svg>
  )
}

export { Spinner }
export type { SpinnerProps }
