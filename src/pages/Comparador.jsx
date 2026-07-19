import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function Comparador() {
  const [productos, setProductos] = useState([])
  const [seleccionA, setSeleccionA] = useState('')
  const [seleccionB, setSeleccionB] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('clienteToken')
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    fetch(`${import.meta.env.VITE_API_URL}/api/productos`, { headers })
      .then((res) => res.json())
      .then((data) => setProductos(Array.isArray(data) ? data : []))
      .catch(() => setProductos([]))
  }, [])

  const productoA = productos.find((p) => p.id === Number(seleccionA))
  const productoB = productos.find((p) => p.id === Number(seleccionB))

  const campos = [
    { label: 'Metal', key: 'metal' },
    { label: 'Tipo', key: 'tipo' },
    { label: 'Peso', key: 'peso' },
    { label: 'Pureza', key: 'pureza' },
    { label: 'Precio', key: 'precio', format: (v) => v ? `${v.toLocaleString('es-ES')} €` : 'Inicia sesión' },
  ]

  const hayPrecios = productoA?.precio && productoB?.precio

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

      <div className="text-center mb-8 sm:mb-12">
        <p className="text-yellow-400 text-xs sm:text-sm tracking-widest uppercase mb-2">Herramienta de análisis</p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white">Comparador</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div>
          <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Producto A</label>
          <select
            value={seleccionA}
            onChange={(e) => setSeleccionA(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
          >
            <option value="">Selecciona un producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Producto B</label>
          <select
            value={seleccionB}
            onChange={(e) => setSeleccionB(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
          >
            <option value="">Selecciona un producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {productoA && productoB && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Cabecera con los dos nombres */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-zinc-900 border border-zinc-800 p-3 text-center">
              <p className="text-yellow-400 text-xs sm:text-sm font-semibold">{productoA.nombre}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-3 text-center">
              <p className="text-yellow-400 text-xs sm:text-sm font-semibold">{productoB.nombre}</p>
            </div>
          </div>

          {/* Filas de características */}
          <div className="border border-zinc-800">
            {campos.map((campo, i) => (
              <div key={i} className={`${i > 0 ? 'border-t border-zinc-800' : ''}`}>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest text-center pt-2">{campo.label}</p>
                <div className="grid grid-cols-2">
                  <p className={`text-sm font-semibold text-center pb-2 px-2 ${
                    campo.key === 'precio' && hayPrecios && productoA.precio < productoB.precio ? 'text-green-400' : 'text-white'
                  }`}>
                    {campo.format ? campo.format(productoA[campo.key]) : productoA[campo.key]}
                  </p>
                  <p className={`text-sm font-semibold text-center pb-2 px-2 border-l border-zinc-800 ${
                    campo.key === 'precio' && hayPrecios && productoB.precio < productoA.precio ? 'text-green-400' : 'text-white'
                  }`}>
                    {campo.format ? campo.format(productoB[campo.key]) : productoB[campo.key]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 sm:p-6 bg-zinc-900 border border-zinc-800">
            <p className="text-zinc-400 text-sm text-center">
              {!hayPrecios
                ? 'Inicia sesión para comparar los precios'
                : productoA.precio < productoB.precio
                ? `${productoA.nombre} es ${(productoB.precio - productoA.precio).toLocaleString('es-ES')} € más barato`
                : productoB.precio < productoA.precio
                ? `${productoB.nombre} es ${(productoA.precio - productoB.precio).toLocaleString('es-ES')} € más barato`
                : 'Ambos productos tienen el mismo precio'
              }
            </p>
          </div>
        </motion.div>
      )}

      {(!productoA || !productoB) && (
        <div className="text-center py-16 sm:py-20 border border-zinc-800 text-zinc-600 text-sm px-4">
          Selecciona dos productos para compararlos
        </div>
      )}

    </div>
  )
}

export default Comparador