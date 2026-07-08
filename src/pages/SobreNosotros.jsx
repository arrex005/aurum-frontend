import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

function SobreNosotros() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      <div className="text-center mb-16">
        <p className="text-yellow-400 text-sm tracking-widest uppercase mb-2">Quiénes somos</p>
        <h1 className="text-5xl font-bold text-white">Sobre Aurum</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Nuestra historia</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Aurum nació con una misión clara: democratizar el acceso a la inversión en metales preciosos. Durante años, este mercado estuvo reservado a grandes inversores y entidades financieras. Nosotros lo cambiamos.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Desde nuestros inicios hemos trabajado con los principales refinadores y acuñadoras del mundo para ofrecer productos de la máxima calidad y pureza, con total transparencia en precios y procedencia.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Hoy somos referencia en el mercado español de metales preciosos de inversión, con miles de clientes satisfechos y millones de euros en metales gestionados.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-zinc-900 border border-zinc-800 p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Nuestros valores</h2>
          <div className="space-y-6">
            {[
              { titulo: "Transparencia", desc: "Precios claros, sin comisiones ocultas ni letra pequeña." },
              { titulo: "Autenticidad", desc: "Todos nuestros productos son 100% auténticos y certificados." },
              { titulo: "Seguridad", desc: "Envíos asegurados y almacenamiento certificado disponible." },
              { titulo: "Experiencia", desc: "Equipo de expertos con décadas de experiencia en el sector." },
            ].map((v) => (
              <div key={v.titulo} className="flex gap-4">
                <div className="w-8 h-8 border border-yellow-400/30 flex items-center justify-center flex-shrink-0 text-yellow-400 text-sm">
                  ✓
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{v.titulo}</p>
                  <p className="text-zinc-400 text-sm">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {[
          { valor: "+10", label: "años de experiencia" },
          { valor: "15.000+", label: "clientes satisfechos" },
          { valor: "500M€+", label: "en metales vendidos" },
          { valor: "100%", label: "productos certificados" },
        ].map((s) => (
          <div key={s.label} className="bg-zinc-900 border border-zinc-800 p-6 text-center">
            <p className="text-yellow-400 text-3xl font-bold mb-2">{s.valor}</p>
            <p className="text-zinc-400 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-yellow-400/20 p-10 text-center">
        <p className="text-yellow-400 text-sm tracking-widest uppercase mb-4">Nuestro compromiso</p>
        <h2 className="text-3xl font-bold text-white mb-4">Tu inversión, nuestra responsabilidad</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Cada producto que vendemos pasa por rigurosos controles de calidad y autenticidad. Trabajamos únicamente con los mejores fabricantes certificados por los organismos internacionales más exigentes del sector.
        </p>
      </div>

    </div>
  )
}

export default SobreNosotros