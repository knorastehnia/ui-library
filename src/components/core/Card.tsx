import styles from './Card.module.css'

interface CardProps {
  children: React.ReactNode,
  width?: string,
  height?: string,
}

const Card: React.FC<CardProps> = ({
  children,
  width='auto',
  height='auto',
}) => {
  return (
    <>
      <div
        className={styles['card']}
        style={{ width, height }}
      >
        {children}
      </div>
    </>
  )
}

export default Card
