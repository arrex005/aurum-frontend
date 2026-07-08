import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const razones = [
  {
    numero: "01",
    titulo: "Valor refugio",
    descripcion: "El oro ha mantenido su valor durante miles de años. En tiempos de crisis económica, guerras e inflación, el oro siempre ha sido el activo refugio por excelencia.",
  },
  {
    numero: "02",
    titulo: "Protección contra la inflación",
    descripcion: "Cuando el poder adquisitivo de las monedas cae, el precio del oro sube. Es la mejor cobertura conocida contra la pérdida de valor del dinero en papel.",
  },
  {
    numero: "03",
    titulo: "Activo tangible",
    descripcion: "A diferencia de las acciones o criptomonedas, el oro es un activo físico real que puedes tocar, guardar y transmitir. No depende de ningún sistema tecnológico.",
  },
  {
    numero: "04",
    titulo: "Diversificación de cartera",
    descripcion: "Los expertos recomiendan tener entre un 5% y un 15% de la cartera en metales preciosos para reducir el riesgo global de la inversión.",
  },
]

function RazonItem({ razon, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex gap-6 group"
    >
      <div className="flex-shrink-0">
        <span className="text-yellow-400/30 text-5xl font-bold group-hover:text-yellow-400/60 transition-colors duration-500">
          {razon.numero}
        </span>
      </div>
      <div className="border-l border-zinc-800 pl-6 group-hover:border-yellow-400/40 transition-colors duration-500">
        <h3 className="text-white text-xl font-semibold mb-2">{razon.titulo}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{razon.descripcion}</p>
      </div>
    </motion.div>
  )
}

function PorQueOro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="bg-zinc-950 py-24 px-6 border-y border-yellow-400/10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-yellow-400 text-sm tracking-widest uppercase mb-4">Inversión inteligente</p>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              ¿Por qué invertir en <span className="text-yellow-400">metales preciosos?</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              En un mundo de incertidumbre económica, los metales preciosos han demostrado ser la inversión más sólida y duradera de la historia. Más de 5.000 años de historia lo avalan.
            </p>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-yellow-400 text-2xl font-bold">5.000</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest">años de historia</p>
              </div>
              <div className="w-px bg-zinc-800" />
              <div className="text-center">
                <p className="text-yellow-400 text-2xl font-bold">+400%</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest">revalorización 20 años</p>
              </div>
              <div className="w-px bg-zinc-800" />
              <div className="text-center">
                <p className="text-yellow-400 text-2xl font-bold">0%</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest">IVA en oro inversión</p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-8">
            {razones.map((razon, index) => (
              <RazonItem key={razon.numero} razon={razon} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default PorQueOro