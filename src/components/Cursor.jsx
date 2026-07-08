import { useEffect, useState } from 'react'

function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState({ x: 0, y: 0 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const mover = (e) => setPos({ x: e.clientX, y: e.clientY })
    const click = () => setClicking(true)
    const unclick = () => setClicking(false)

    const checkHover = (e) => {
      const el = e.target
      const esInteractivo = el.closest('button, a, input, textarea, select')
      setHovering(!!esInteractivo)
    }

    window.addEventListener('mousemove', mover)
    window.addEventListener('mousemove', checkHover)
    window.addEventListener('mousedown', click)
    window.addEventListener('mouseup', unclick)

    return () => {
      window.removeEventListener('mousemove', mover)
      window.removeEventListener('mousemove', checkHover)
      window.removeEventListener('mousedown', click)
      window.removeEventListener('mouseup', unclick)
    }
  }, [])

  useEffect(() => {
    let animFrame
    const seguir = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }))
      animFrame = requestAnimationFrame(seguir)
    }
    animFrame = requestAnimationFrame(seguir)
    return () => cancelAnimationFrame(animFrame)
  }, [pos])

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: clicking ? '8px' : '10px',
          height: clicking ? '8px' : '10px',
          background: '#f59e0b',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.1s, height 0.1s',
        }}
      />
      <div
        style={{
          position: 'fixed',
          left: trail.x,
          top: trail.y,
          width: hovering ? '40px' : '30px',
          height: hovering ? '40px' : '30px',
          border: '1.5px solid #f59e0b',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0.6,
          transition: 'width 0.2s, height 0.2s',
        }}
      />
    </>
  )
}

export default Cursor