import styles from './Burger.module.css'

interface BurgerProps {
  state?: boolean
  color?:
    | 'primary'
    | 'dimmed'
    | 'inverted'
    | 'disabled'
    | 'success'
    | 'error'
}

const Burger: React.FC<BurgerProps> = ({
  state=false,
  color='dimmed',
}) => {
  return (
    <svg
      style={{
        width: '0.85rem',
        height: '0.85rem',
      }}
      className={`
        ${styles['svg']} 
        ${styles[`color-${color}`]}
      `}
      width='10'
      height='7'
      viewBox='0 0 10 7'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        className={`${state && styles['active']}`}
        d='M0.5 3.5H9.5M0.5 0.5H9.5M0.5 6.5H9.5'
        stroke='#999999'
        strokeLinecap='round'
      />
    </svg>
  )
}

export { Burger }
export type { BurgerProps }
