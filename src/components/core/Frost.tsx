import { useEffect, useRef, useState } from 'react'
import styles from './Frost.module.css'

interface FrostProps {
  children: React.ReactNode,
  level: number,
  radius?: boolean,
  all?: boolean,
  top?: boolean,
  bottom?: boolean,
  left?: boolean,
  right?: boolean,
  padding?: string,
}

const Frost: React.FC<FrostProps> = ({
  children,
  level,
  radius=false,
  all=false,
  top=all,
  bottom=all,
  left=all,
  right=all,
  padding='0px 0px',
}) => {
  const mousePos = useRef({ x: 0, y: 0})
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)

  const updateMousePos = (event: MouseEvent) => {
    mousePos.current = { x: event.clientX, y: event.clientY }
  }

  useEffect(() => {
    const interpolate = setInterval(() => {
      const rect = containerRef.current!.getBoundingClientRect()

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
        ref={containerRef}
        className={`
          ${styles['container']} 
          ${
            radius ? styles['radius'] : null
          }
        `}
        style={{
          paddingTop: top ? '0.8px' : '0',
          paddingBottom: bottom ? '0.8px' : '0',
          paddingLeft: left ? '0.8px' : '0',
          paddingRight: right ? '0.8px' : '0',
        }}
      >

        <div className={styles['blur']}></div>

        <div
          className={`
            ${styles['border']} 
            ${styles[`level-${level}`]}
          `}
          style={{
            maskImage: `radial-gradient(
              200px 200px at ${currentPos.x}px ${currentPos.y}px,
              #00000090 0%, #000000${(level + 1) * 10}
            )`
          }}
        ></div>

        <div
          className={styles['content']}
          style={{ padding }}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default Frost
