import { useEffect } from 'react'
import confetti from 'canvas-confetti'

function useGoldConfetti() {
  const disparar = (x, y) => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#92400e', '#ffffff'],
      shapes: ['circle', 'square'],
      scalar: 0.8,
      gravity: 1.2,
      drift: 0.1,
    })
  }

  useEffect(() => {
    const handler = (e) => disparar(e.clientX, e.clientY)
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [])
}

export default useGoldConfetti