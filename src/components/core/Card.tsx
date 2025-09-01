import Frost from './Frost'
import styles from './Card.module.css'

interface CardProps {
  children: React.ReactNode,
  width?: number,
  height?: number,
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
        style={{
          width: width === 'auto' ? '100%' : `${width}px`,
          height: height === 'auto' ? '100%' : `${height}px`,
        }}
      >
        <Frost padding='30px 20px' all radius level={2}>
          {children}
        </Frost>
      </div>
    </>
  )
}

export default Card
