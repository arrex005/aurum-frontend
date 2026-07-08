import { useEffect, useRef, useState } from 'react'

function useContador(valor, duracion = 2000) {
  const [contador, setContador] = useState(0)
  const ref = useRef(null)
  const iniciado = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !iniciado.current) {
          iniciado.current = true
          const inicio = performance.now()
          const animate = (ahora) => {
            const progreso = Math.min((ahora - inicio) / duracion, 1)
            const easing = 1 - Math.pow(1 - progreso, 3)
            setContador(Math.floor(easing * valor))
            if (progreso < 1) requestAnimationFrame(animate)
            else setContador(valor)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [valor, duracion])

  return { contador, ref }
}

function StatItem({ valor, sufijo, prefijo, label }) {
  const { contador, ref } = useContador(valor)

  return (
    <div ref={ref} className="text-center">
      <p className="text-yellow-400 text-4xl font-bold mb-1">
        {prefijo}{contador.toLocaleString('es-ES')}{sufijo}
      </p>
      <p className="text-zinc-400 text-sm">{label}</p>
    </div>
  )
}

function Stats() {
  return (
    <section className="bg-zinc-900 border-y border-yellow-400/20 py-16">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        <StatItem valor={500} prefijo="+" sufijo="M €" label="en metales vendidos" />
        <StatItem valor={15000} prefijo="" sufijo="+" label="clientes satisfechos" />
        <StatItem valor={100} prefijo="" sufijo="%" label="metal certificado" />
        <StatItem valor={10} prefijo="+" sufijo=" años" label="de experiencia" />
      </div>
    </section>
  )
}

export default Stats