import styles from './Expand.module.css'

const Expand = () => {
  return (
    <>
      <svg
        className={styles['svg']}
        viewBox="0 0 11 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >

        <path
          stroke-miterlimit="16"
          stroke-linecap="round"
          d={
            `M1 1L5.16782 4.70473C5.35726 4.87312 
            5.64274 4.87312 5.83218 4.70473L10 1`
          }
        />
      </svg>
    </>
  )
}

export default Expand
