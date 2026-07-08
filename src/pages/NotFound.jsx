import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-yellow-400 text-8xl font-bold mb-4">404</p>
        <h1 className="text-3xl font-bold text-white mb-4">Página no encontrada</h1>
        <p className="text-zinc-400 mb-10 max-w-md mx-auto">
          La página que buscas no existe o ha sido movida. Vuelve al inicio o explora nuestro catálogo.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="bg-yellow-400 text-black font-semibold px-8 py-3 hover:bg-yellow-300 transition-colors"
          >
            Volver al inicio
          </Link>
          <Link
            to="/catalogo"
            className="border border-yellow-400 text-yellow-400 px-8 py-3 hover:bg-yellow-400/10 transition-colors"
          >
            Ver catálogo
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound