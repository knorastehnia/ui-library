import styles from './Ellipsis.module.css'

interface EllipsisProps {
  color?:
    | 'primary'
    | 'dimmed'
    | 'inverted'
    | 'disabled'
    | 'success'
    | 'error'
}

const Ellipsis: React.FC<EllipsisProps> = ({
  color='dimmed',
}) => {
  return (
    <svg
      style={{
        width: '0.65rem',
        height: '0.65rem',
      }}
      className={`
        ${styles['svg']} 
        ${styles[`color-${color}`]}
      `}
      width='8'
      height='2'
      viewBox='0 0 8 2'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='4' cy='1' r='1' />
      <circle cx='7' cy='1' r='1' />
      <circle cx='1' cy='1' r='1' />
    </svg>
  )
}

export { Ellipsis }
export type { EllipsisProps }
