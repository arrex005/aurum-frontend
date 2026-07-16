import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progreso, setProgreso] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setProgreso((prev) => {
        if (prev >= 100) {
          clearInterval(intervalo)
          setTimeout(() => setVisible(false), 400)
          return 100
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(intervalo)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-yellow-400 text-6xl font-bold tracking-widest uppercase mb-2">
              Golden Heights Group
            </h1>
            <p className="text-zinc-500 text-xs tracking-widest uppercase mb-12">
              Metales preciosos de inversión
            </p>

            <div className="w-64 h-px bg-zinc-800 mx-auto mb-3">
              <motion.div
                className="h-px bg-yellow-400"
                style={{ width: `${progreso}%` }}
              />
            </div>

            <p className="text-zinc-600 text-xs tracking-widest">
              {progreso < 100 ? 'Cargando...' : 'Bienvenido'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen