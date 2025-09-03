import Frost from './Frost'
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
        <Frost padding='30px 20px' all radius level={2}>
          {children}
        </Frost>
      </div>
    </>
  )
}

export default Card
