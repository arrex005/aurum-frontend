import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    pregunta: '¿Qué es el oro de inversión?',
    respuesta: 'El oro de inversión es oro en forma de lingotes o monedas con una pureza mínima del 995‰. En España está exento de IVA, lo que lo hace especialmente atractivo como activo de inversión.'
  },
  {
    pregunta: '¿Cómo se determina el precio del oro?',
    respuesta: 'El precio del oro se fija en los mercados internacionales, principalmente en Londres y Nueva York. Se expresa en dólares por onza troy y fluctúa según la oferta, la demanda, la inflación y la situación geopolítica mundial.'
  },
  {
    pregunta: '¿Qué diferencia hay entre un lingote y una moneda?',
    respuesta: 'Los lingotes son barras de metal puro producidas por refinerías certificadas. Las monedas son acuñadas por cecas oficiales de gobiernos y suelen tener un valor nominal legal. Ambos son válidos para inversión, aunque las monedas suelen tener una prima mayor sobre el precio spot.'
  },
  {
    pregunta: '¿Tiene IVA la compra de plata?',
    respuesta: 'Sí, la plata física tributa al 21% de IVA en España, a diferencia del oro de inversión que está exento. Esto es importante tenerlo en cuenta al calcular la rentabilidad de una inversión en plata.'
  },
  {
    pregunta: '¿Cómo se envían los productos?',
    respuesta: 'Todos los envíos se realizan de forma discreta y completamente asegurada por el valor total del contenido. Se entregan con seguimiento en tiempo real y requieren firma en el momento de la entrega.'
  },
  {
    pregunta: '¿Puedo vender mis metales de vuelta?',
    respuesta: 'Sí, recompramos cualquier producto adquirido con nosotros al precio de mercado en el momento de la venta. También compramos metales de otros orígenes previa verificación de autenticidad.'
  },
  {
    pregunta: '¿Qué pureza tienen los productos?',
    respuesta: 'Nuestros lingotes de oro tienen una pureza de 999,9‰ (24 quilates). Las monedas de oro varían entre 916,7‰ (22 quilates) y 999,9‰. Los lingotes de plata tienen una pureza de 999‰ y los de platino de 999,5‰.'
  },
  {
    pregunta: '¿Es seguro invertir en metales preciosos?',
    respuesta: 'Los metales preciosos son considerados uno de los activos más seguros a largo plazo. Sin embargo, como cualquier inversión, su precio puede fluctuar a corto plazo. Se recomienda considerarlos como parte de una cartera diversificada.'
  },
]

function FAQItem({ faq, index }) {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="border-b border-zinc-800">
      <button
        onClick={() => setAbierto(!abierto)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-white text-sm font-semibold group-hover:text-yellow-400 transition-colors pr-8">
          {faq.pregunta}
        </span>
        <span className={`text-yellow-400 text-xl flex-shrink-0 transition-transform duration-300 ${abierto ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-zinc-400 text-sm leading-relaxed pb-5">
              {faq.respuesta}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FAQ() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      <div className="text-center mb-12">
        <p className="text-yellow-400 text-sm tracking-widest uppercase mb-2">Resolvemos tus dudas</p>
        <h1 className="text-5xl font-bold text-white">Preguntas frecuentes</h1>
      </div>

      <div className="mb-12">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} index={index} />
        ))}
      </div>

      <div className="bg-zinc-900 border border-yellow-400/20 p-8 text-center">
        <p className="text-white font-semibold mb-2">¿No encuentras lo que buscas?</p>
        <p className="text-zinc-400 text-sm mb-6">Nuestro equipo de expertos está disponible para resolver cualquier duda.</p>
        
          <a href="/contacto"
          className="inline-block bg-yellow-400 text-black font-semibold px-8 py-3 hover:bg-yellow-300 transition-colors"
        >
          Contactar con nosotros
        </a>
      </div>

    </div>
  )
}

export default FAQ