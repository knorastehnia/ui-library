import styles from './Checkmark.module.css'

interface CheckmarkProps {
  state: boolean,
  color: 'light' | 'dark',
}

const Checkmark: React.FC<CheckmarkProps> = ({
  state,
  color,
}) => {
  return (
    <>
      <svg
        className={styles['svg']}
        viewBox='0 0 11 11'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          className={`
            ${styles[`color-${color}`]} 
            ${state ? styles['visible'] : styles['hidden']}
          `}
          strokeMiterlimit='16'
          strokeLinecap='round'
          pathLength='1'
          d={
            `M1 6.5L4.04057 9.97493C4.26605 10.2326 
            4.678 10.1925 4.84957 9.8962L10 1`
          }
        />
      </svg>
    </>
  )
}

export default Checkmark
