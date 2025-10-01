import styles from './Spinner.module.css'

interface SpinnerProps {
  state?: boolean,
  width?: string,
  height?: string,
}

const Spinner: React.FC<SpinnerProps> = ({
  state=false,
  width='1rem',
  height='1rem',
}) => {
  return (
    <>
      <svg
        style={{
          width,
          height,
        }}
        className={styles['svg']}
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
            ${state ? styles['visible'] : styles['hidden']}
          `}
        />
      </svg>
    </>
  )
}

export default Spinner
