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
          maskImage: `radial-gradient(200px 200px at ${mousePos.x}px ${mousePos.y}px, #000 0%, #00000030)`
        }}
      >
        <div className='card'></div>
      </div>
    </>
  )
}

export default Card
