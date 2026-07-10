import { useEffect, useState, useRef } from 'react'

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const estelaRef = useRef([])
  const [estela, setEstela] = useState([])

  useEffect(() => {
    const mover = (e) => {
      setPos({ x: e.clientX, y: e.clientY })

      const el = e.target
      const esInteractivo = el.closest('button, a, input, textarea, select, [role="button"]')
      setHovering(!!esInteractivo)
    }

    const click = () => setClicking(true)
    const unclick = () => setClicking(false)

    window.addEventListener('mousemove', mover)
    window.addEventListener('mousedown', click)
    window.addEventListener('mouseup', unclick)

    return () => {
      window.removeEventListener('mousemove', mover)
      window.removeEventListener('mousedown', click)
      window.removeEventListener('mouseup', unclick)
    }
  }, [])

  // Estela: guardamos las últimas posiciones y las vamos desvaneciendo
  useEffect(() => {
    let frame
    const animar = () => {
      estelaRef.current = [pos, ...estelaRef.current].slice(0, 12)
      setEstela([...estelaRef.current])
      frame = requestAnimationFrame(animar)
    }
    frame = requestAnimationFrame(animar)
    return () => cancelAnimationFrame(frame)
  }, [pos])

  return (
    <>
      {estela.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            left: p.x,
            top: p.y,
            width: `${Math.max(2, 8 - i * 0.6)}px`,
            height: `${Math.max(2, 8 - i * 0.6)}px`,
            background: '#f59e0b',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9998,
            opacity: (1 - i / estela.length) * 0.35,
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: hovering ? '16px' : clicking ? '8px' : '12px',
          height: hovering ? '16px' : clicking ? '8px' : '12px',
          background: hovering ? 'transparent' : '#f59e0b',
          border: hovering ? '2px solid #f59e0b' : 'none',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.18s ease, height 0.18s ease, background 0.18s ease',
          boxShadow: hovering ? '0 0 12px rgba(245, 158, 11, 0.5)' : '0 0 8px rgba(245, 158, 11, 0.4)',
        }}
      />
    </>
  )
}

export default Cursor