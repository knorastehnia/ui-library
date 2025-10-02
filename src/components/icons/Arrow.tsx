import styles from './Arrow.module.css'

interface ArrowProps {
  state?: boolean,
}

const Arrow: React.FC<ArrowProps> = ({
  state=false,
}) => {

  return (
    <svg
      style={{
        width: '0.65rem',
        height: '0.65rem',
      }}
      className={styles['svg']}
      viewBox="0 0 11 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >

      <path
        className={`${state && styles['active']}`}
        strokeMiterlimit="16"
        strokeLinecap="round"
        d={
          `M1 1L5.16782 4.70473C5.35726 4.87312 
          5.64274 4.87312 5.83218 4.70473L10 1`
        }
      />
    </svg>
  )
}

export default Arrow
