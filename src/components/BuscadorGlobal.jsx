import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function BuscadorGlobal() {
  const [abierto, setAbierto] = useState(false)
  const [query, setQuery] = useState('')
  const [resultados, setResultados] = useState({ productos: [], articulos: [] })
  const [cargando, setCargando] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setAbierto((prev) => !prev)
      }
      if (e.key === 'Escape') setAbierto(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (abierto) setTimeout(() => inputRef.current?.focus(), 100)
    else setQuery('')
  }, [abierto])

  useEffect(() => {
    if (!query.trim()) {
      setResultados({ productos: [], articulos: [] })
      return
    }

    setCargando(true)
    const timeout = setTimeout(async () => {
      try {
        const [prodRes, artRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/productos`),
          fetch(`${import.meta.env.VITE_API_URL}/api/articulos`),
        ])
        const productos = await prodRes.json()
        const articulos = await artRes.json()

        setResultados({
          productos: productos.filter((p) =>
            p.nombre.toLowerCase().includes(query.toLowerCase()) ||
            p.metal.toLowerCase().includes(query.toLowerCase())
          ).slice(0, 4),
          articulos: articulos.filter((a) =>
            a.titulo.toLowerCase().includes(query.toLowerCase()) ||
            a.categoria.toLowerCase().includes(query.toLowerCase())
          ).slice(0, 3),
        })
      } catch {}
      setCargando(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  const irA = (ruta) => {
    navigate(ruta)
    setAbierto(false)
  }

  const hayResultados = resultados.productos.length > 0 || resultados.articulos.length > 0

  return (
    <>
      <button
        onClick={() => setAbierto(true)}
        className="flex items-center gap-2 border border-zinc-700 text-zinc-400 px-3 py-1.5 text-xs hover:border-yellow-400 hover:text-yellow-400 transition-colors"
      >
        🔍 Buscar
        <span className="border border-zinc-600 px-1 text-xs text-zinc-500">Ctrl+K</span>
      </button>

      <AnimatePresence>
        {abierto && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAbierto(false)}
              className="fixed inset-0 bg-black/70 z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 bg-zinc-900 border border-zinc-700"
            >
              <div className="flex items-center border-b border-zinc-700 px-4">
                <span className="text-zinc-400 mr-3">🔍</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar productos, artículos..."
                  className="flex-1 bg-transparent text-white py-4 text-sm outline-none placeholder-zinc-500"
                />
                {cargando && <span className="text-zinc-500 text-xs">Buscando...</span>}
              </div>

              {hayResultados && (
                <div className="max-h-80 overflow-y-auto">
                  {resultados.productos.length > 0 && (
                    <div>
                      <p className="text-zinc-500 text-xs uppercase tracking-widest px-4 py-2 border-b border-zinc-800">
                        Productos
                      </p>
                      {resultados.productos.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => irA(`/producto/${p.id}`)}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-800 transition-colors text-left"
                        >
                          <div>
                            <p className="text-white text-sm">{p.nombre}</p>
                            <p className="text-zinc-500 text-xs">{p.metal} · {p.tipo} · {p.peso}</p>
                          </div>
                          <p className="text-yellow-400 text-sm font-semibold">{p.precio.toLocaleString('es-ES')} €</p>
                        </button>
                      ))}
                    </div>
                  )}

                  {resultados.articulos.length > 0 && (
                    <div>
                      <p className="text-zinc-500 text-xs uppercase tracking-widest px-4 py-2 border-b border-zinc-800 border-t border-zinc-800">
                        Artículos
                      </p>
                      {resultados.articulos.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => irA(`/blog/${a.id}`)}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-800 transition-colors text-left"
                        >
                          <div>
                            <p className="text-white text-sm">{a.titulo}</p>
                            <p className="text-zinc-500 text-xs">{a.categoria}</p>
                          </div>
                          <span className="text-zinc-500 text-xs">→</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {query && !hayResultados && !cargando && (
                <div className="px-4 py-8 text-center text-zinc-500 text-sm">
                  No se encontraron resultados para "{query}"
                </div>
              )}

              {!query && (
                <div className="px-4 py-6 text-center text-zinc-600 text-xs">
                  Escribe para buscar productos o artículos
                </div>
              )}

              <div className="border-t border-zinc-800 px-4 py-2 flex gap-4">
                <span className="text-zinc-600 text-xs">↵ Seleccionar</span>
                <span className="text-zinc-600 text-xs">Esc Cerrar</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default BuscadorGlobal