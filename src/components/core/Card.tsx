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
  const mousePos = useRef({ x: 0, y: 0})
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 })

  const cardRef = useRef<HTMLDivElement>(null)

  const updateMousePos = (event: MouseEvent) => {
    mousePos.current = { x: event.clientX, y: event.clientY }
  }

  useEffect(() => {
    const interpolate = setInterval(() => {
      const rect = cardRef.current!.getBoundingClientRect()

      setCurrentPos(prevPos => ({
        x: prevPos.x + (mousePos.current.x - rect.left - prevPos.x) * 0.4,
        y: prevPos.y + (mousePos.current.y - rect.top - prevPos.y) * 0.4,
      }))
    }, 25)

    document.addEventListener('mousemove', updateMousePos)

    return () => {
      clearInterval(interpolate)

      document.removeEventListener('mousemove', updateMousePos)
    }
  }, [])

  return (
    <>
      <div
        ref={cardRef}
        className={styles['card']}
        style={{
          width: width === 'auto' ? '100%' : `${width}px`,
          height: height === 'auto' ? '100%' : `${height}px`,
        }}
      >

        <div
          className={styles['border']}
          style={{
            maskImage: `radial-gradient(200px 200px at ${currentPos.x}px ${currentPos.y}px, #00000090 0%, #00000020)`
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
