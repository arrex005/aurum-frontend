import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCarrito } from '../context/CarritoContext'

function Carrito() {
  const { items, quitar, vaciar, total } = useCarrito()
  const navigate = useNavigate()

  // El carrito es solo para clientes con sesión
  useEffect(() => {
    const token = localStorage.getItem('clienteToken')
    if (!token) {
      navigate('/acceso')
    }
  }, [])

  const formatoPrecio = (p) =>
    p ? `${p.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €` : '—'

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="text-zinc-700 mb-6 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Tu carrito está vacío</h1>
        <p className="text-zinc-400 text-sm mb-8">Añade productos desde el catálogo o la sección de diamantes.</p>
        <Link to="/catalogo" className="bg-yellow-400 text-black font-semibold px-8 py-3 hover:bg-yellow-300 transition-colors inline-block">
          Ver catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-white">Tu carrito</h1>
        <button onClick={vaciar} className="text-zinc-500 text-sm hover:text-red-400 transition-colors">
          Vaciar carrito
        </button>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={`${item.tipo}-${item.id}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-zinc-900 border border-zinc-800 p-3 sm:p-4 flex items-center gap-3 sm:gap-4"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden">
                {item.imagen ? (
                  <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">{item.tipo === 'diamante' ? '💎' : '🪙'}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-snug">{item.nombre}</p>
                <p className="text-zinc-500 text-xs mt-0.5">
                  {item.tipo === 'diamante' ? 'Diamante' : `${item.metal} · ${item.peso}`}
                </p>
                <p className="text-yellow-400 font-bold text-sm mt-1 sm:hidden">{formatoPrecio(item.precio)}</p>
              </div>

              <p className="text-yellow-400 font-bold whitespace-nowrap hidden sm:block">{formatoPrecio(item.precio)}</p>

              <button
                onClick={() => quitar(item.id, item.tipo)}
                className="text-zinc-600 hover:text-red-400 transition-colors flex-shrink-0"
                aria-label="Quitar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <span className="text-zinc-400">Total</span>
          <span className="text-yellow-400 text-2xl font-bold">{formatoPrecio(total)}</span>
        </div>
        <button
          onClick={() => navigate('/pago')}
          className="w-full bg-yellow-400 text-black font-semibold py-4 hover:bg-yellow-300 transition-colors"
        >
          Continuar al pago
        </button>
        <p className="text-zinc-600 text-xs text-center mt-4">
          Los precios pueden variar según la cotización del metal en el momento de la compra.
        </p>
      </div>
    </div>
  )
}

export default Carrito