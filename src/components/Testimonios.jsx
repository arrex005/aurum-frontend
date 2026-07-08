import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'

function TestimonioCard({ testimonio, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-zinc-900 border border-zinc-800 hover:border-yellow-400/30 transition-colors p-6 flex flex-col"
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonio.estrellas }).map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
      </div>
      <p className="text-zinc-300 text-sm leading-relaxed flex-1 mb-6">
        "{testimonio.texto}"
      </p>
      <div className="border-t border-zinc-800 pt-4 flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-semibold">{testimonio.nombre}</p>
          <p className="text-zinc-500 text-xs">{testimonio.ciudad}</p>
        </div>
        <div className="text-right">
          <p className="text-zinc-500 text-xs">Compró</p>
          <p className="text-yellow-400 text-xs">{testimonio.producto}</p>
        </div>
      </div>
    </motion.div>
  )
}

function Testimonios({ limite = null }) {
  const [testimonios, setTestimonios] = useState([])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/testimonios`)
      .then((res) => res.json())
      .then((data) => setTestimonios(data))
      .catch(() => {})
  }, [])

  const testimoniosMostrados = limite ? testimonios.slice(0, limite) : testimonios

  return (
    <section className="bg-zinc-950 py-24 px-6 border-y border-yellow-400/10">
      <div className="max-w-6xl mx-auto">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-yellow-400 text-sm tracking-widest uppercase mb-2">Lo que dicen nuestros clientes</p>
          <h2 className="text-4xl font-bold text-white">Testimonios</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimoniosMostrados.map((t, i) => (
            <TestimonioCard key={t.id} testimonio={t} index={i} />
          ))}
        </div>

        {limite && (
          <div className="text-center mt-10">
            <Link
              to="/testimonios"
              className="border border-yellow-400 text-yellow-400 px-10 py-3 hover:bg-yellow-400/10 transition-colors tracking-widest uppercase text-sm"
            >
              Ver todos los testimonios
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}

export default Testimonios