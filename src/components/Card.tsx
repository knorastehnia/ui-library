import { useEffect, useRef, useState } from 'react'
import './Card.css'

const Card = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y:0 })
  const borderRef = useRef<HTMLDivElement>(null)

  const updateMousePos = (event: MouseEvent) => {
    const rect = borderRef.current!.getBoundingClientRect()
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
        className='border'
        ref={borderRef}
        style={{
          maskImage: `radial-gradient(150px 150px at ${mousePos.x}px ${mousePos.y}px, #000 0%, #00000020)`
        }}
      >
        <div className='card'>
          <svg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'>
            <filter id='noise'>
              <feTurbulence 
                type='fractalNoise' 
                baseFrequency='0.65' 
                numOctaves='3' 
                stitchTiles='stitch'/>
            </filter>
          </svg>
        </div>
      </div>
    </>
  )
}

export default Card
