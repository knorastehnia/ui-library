import styles from './Visibility.module.css'

const Visibility: React.FC<{state: boolean}> = ({ state }) => {
  return (
    <>
      <svg
        className={styles['svg']}
        viewBox='0 0 20 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >

        <mask
          id='strike-mask'
          maskUnits='userSpaceOnUse'
          x='0' y='0' width='20' height='12'
        >
          <rect width='20' height='12' fill='#fff' />

          <path
            className={`
              ${styles['cut-through']} 
              ${
                state ? styles['visible'] : styles['hidden']
              }
            `}
            d='M 2.5 -2 L 20 13.5'
            strokeWidth='2'
            strokeLinecap='round'
            pathLength='1'
          />
        </mask>

        <path
          className={`
            ${styles['strike-through']} 
            ${
              state ? styles['visible'] : styles['hidden']
            }
          `}
          d='M 1 -2 L 18.5 13.5'
          strokeWidth='0.8'
          strokeLinecap='round'
          pathLength='1'
        />

        <g mask='url(#strike-mask)'>
          <path
            d={
              `M9.65783 4C10.6577 4.00028 11.6578 5.00014 11.6578 6C11.6578 6.99986 10.6577 
              7.99972 9.65783 8C8.65783 8 7.65783 7 7.65783 6C7.65783 5 8.65783 4 9.65783 4Z`
            }
          />

          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d={
              `M9.65783 0C13.3769 0.000288832 17.5196 3.81096 19.0485 5.3584C19.4045 5.71896 
              19.4045 6.28104 19.0485 6.6416C17.5196 8.18904 13.3769 11.9997 9.65783 12C5.93885 
              12 1.79627 8.18925 0.267209 6.6416C-0.0890696 6.28098 -0.0890696 5.71902 
              0.267209 5.3584C1.79627 3.81075 5.93885 0 9.65783 0ZM9.65783 3C7.65786 3 6.65783 
              4.5 6.65783 6C6.65783 7.5 7.65783 9 9.65783 9C11.6576 8.99979 12.6578 7.49989 
              12.6578 6C12.6578 4.5001 11.6575 3.0002 9.65783 3Z`
            }
          />
        </g>

      </svg>
    </>
  )
}

export default Visibility
