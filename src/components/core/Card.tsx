import { useEffect, useRef, useState } from 'react'
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const updateMousePos = (event: MouseEvent) => {
    const rect = cardRef.current!.getBoundingClientRect()
    const adjustedX = event.clientX - rect.left
    const adjustedY = event.clientY - rect.top

    setMousePos({ x: adjustedX, y: adjustedY })
  }

  useEffect(() => {
    document.addEventListener('mousemove', updateMousePos)
    return () => document.removeEventListener('mousemove', updateMousePos)
  }, [])

  return (
    <>
      <div
        ref={cardRef}
        className={styles['card']}
        style={{
          width: width === 'auto' ? 'auto' : `${width}px`,
          height: height === 'auto' ? 'auto' : `${height}px`,
        }}
      >
        <div
          className={styles['border-outer']}
          style={{
            maskImage: `radial-gradient(75px 75px at ${mousePos.x}px ${mousePos.y}px, #000 0%, transparent)`
          }}
        ></div>

        <div
          className={styles['border-inner']}
          style={{
            maskImage: `radial-gradient(150px 150px at ${mousePos.x}px ${mousePos.y}px, #000 0%, #00000020)`
          }}
        ></div>

        <div className={styles['content']}>
          {children}
        </div>
      </div>
    </>
  )
}

export default Card
