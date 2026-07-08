import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const certificaciones = [
  { nombre: "LBMA", descripcion: "London Bullion Market Association" },
  { nombre: "ISO 9001", descripcion: "Gestión de calidad certificada" },
  { nombre: "999,9‰", descripcion: "Pureza máxima garantizada" },
  { nombre: "LOCO London", descripcion: "Estándar internacional de oro" },
  { nombre: "CME Group", descripcion: "Mercado de futuros certificado" },
]

function Confianza() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="bg-black py-16 px-6 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-zinc-500 text-xs uppercase tracking-widest">Avalado por los organismos más prestigiosos del sector</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {certificaciones.map((c, i) => (
            <motion.div
              key={c.nombre}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border border-zinc-800 hover:border-yellow-400/40 transition-colors p-4 text-center group"
            >
              <p className="text-yellow-400 font-bold text-lg mb-1 group-hover:scale-110 transition-transform duration-300">{c.nombre}</p>
              <p className="text-zinc-500 text-xs leading-tight">{c.descripcion}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border border-yellow-400/30 flex items-center justify-center flex-shrink-0 text-yellow-400">
              ✓
            </div>
            <div>
              <p className="text-white text-sm font-semibold mb-1">Envío asegurado</p>
              <p className="text-zinc-500 text-xs leading-relaxed">Todos los envíos van completamente asegurados y con seguimiento en tiempo real.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border border-yellow-400/30 flex items-center justify-center flex-shrink-0 text-yellow-400">
              ✓
            </div>
            <div>
              <p className="text-white text-sm font-semibold mb-1">Certificado de autenticidad</p>
              <p className="text-zinc-500 text-xs leading-relaxed">Cada producto incluye su certificado de autenticidad y pureza verificable.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border border-yellow-400/30 flex items-center justify-center flex-shrink-0 text-yellow-400">
              ✓
            </div>
            <div>
              <p className="text-white text-sm font-semibold mb-1">Recompra garantizada</p>
              <p className="text-zinc-500 text-xs leading-relaxed">Recompramos cualquier producto adquirido con nosotros al precio de mercado.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Confianza