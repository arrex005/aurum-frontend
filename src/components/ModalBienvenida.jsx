import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function ModalBienvenida() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const yaVisto = localStorage.getItem('modalBienvenidaVisto')
    const tieneSesion = localStorage.getItem('clienteToken')

    // Solo lo mostramos si no lo ha visto y no tiene sesión
    if (!yaVisto && !tieneSesion) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const cerrar = () => {
    localStorage.setItem('modalBienvenidaVisto', 'true')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cerrar}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md px-6"
          >
            <div className="bg-zinc-900 border border-yellow-400/30 p-8 relative">

              <button
                onClick={cerrar}
                className="absolute top-4 right-4 text-zinc-500 hover:text-yellow-400 transition-colors text-xl"
                aria-label="Cerrar"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <h2 className="text-yellow-400 text-3xl font-bold tracking-widest uppercase mb-2">Aurum</h2>
                <div className="w-12 h-px bg-yellow-400/40 mx-auto" />
              </div>

              <h3 className="text-white text-xl font-semibold text-center mb-3">
                Inicia sesión para ver la web completa
              </h3>

              <p className="text-zinc-400 text-sm text-center leading-relaxed mb-8">
                Accede a los precios actualizados en tiempo real de todos nuestros lingotes, monedas y diamantes certificados.
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  to="/acceso"
                  onClick={cerrar}
                  className="w-full bg-yellow-400 text-black font-semibold py-3 text-center hover:bg-yellow-300 transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/registro"
                  onClick={cerrar}
                  className="w-full border border-yellow-400/50 text-yellow-400 py-3 text-center hover:bg-yellow-400/10 transition-colors"
                >
                  Crear cuenta
                </Link>
                <button
                  onClick={cerrar}
                  className="w-full text-zinc-500 text-sm py-2 hover:text-zinc-300 transition-colors"
                >
                  Seguir explorando sin cuenta
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ModalBienvenida