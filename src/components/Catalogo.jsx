import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PrecioProtegido from './PrecioProtegido'

const metales = ["Todos", "Oro", "Plata", "Platino"]
const tipos = ["Todos", "Lingote", "Moneda"]
const PRODUCTOS_POR_PAGINA = 12

function Catalogo({ limite = null }) {
  const [productos, setProductos] = useState([])
  const [metalActivo, setMetalActivo] = useState("Todos")
  const [tipoActivo, setTipoActivo] = useState("Todos")
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState("")
  const [orden, setOrden] = useState("default")
  const [vista, setVista] = useState("cuadricula")
  const [pagina, setPagina] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams()
    if (metalActivo !== "Todos") params.append("metal", metalActivo)
    if (tipoActivo !== "Todos") params.append("tipo", tipoActivo)

    setCargando(true)
    fetch(`${import.meta.env.VITE_API_URL}/api/productos?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setProductos(data)
        setCargando(false)
      })
      .catch(() => setCargando(false))
  }, [metalActivo, tipoActivo])

  useEffect(() => {
    setPagina(1)
  }, [metalActivo, tipoActivo, busqueda, orden])

  const todosLosFiltrados = productos
    .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) => {
      if (orden === "precio-asc") return a.precio - b.precio
      if (orden === "precio-desc") return b.precio - a.precio
      return 0
    })

  const totalPaginas = Math.ceil(todosLosFiltrados.length / PRODUCTOS_POR_PAGINA)

  const productosFiltrados = limite
    ? todosLosFiltrados.slice(0, limite)
    : todosLosFiltrados.slice((pagina - 1) * PRODUCTOS_POR_PAGINA, pagina * PRODUCTOS_POR_PAGINA)

  return (
    <section className="bg-black py-16 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-yellow-400 text-sm tracking-widest uppercase mb-2">Inversión en metal físico</p>
          <h2 className="text-4xl font-bold text-white">Catálogo de productos</h2>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2 flex-wrap">
              {metales.map((m) => (
                <button
                  key={m}
                  onClick={() => setMetalActivo(m)}
                  className={`px-5 py-2 text-sm border transition-colors ${
                    metalActivo === m
                      ? "bg-yellow-400 text-black border-yellow-400 font-semibold"
                      : "border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {tipos.map((t) => (
                <button
                  key={t}
                  onClick={() => setTipoActivo(t)}
                  className={`px-5 py-2 text-sm border transition-colors ${
                    tipoActivo === t
                      ? "bg-zinc-100 text-black border-zinc-100 font-semibold"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="flex-1 bg-zinc-900 border border-zinc-700 text-white px-4 py-2 text-sm focus:outline-none focus:border-yellow-400 transition-colors placeholder-zinc-500"
            />
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 text-zinc-300 px-4 py-2 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
            >
              <option value="default">Ordenar por defecto</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
            </select>
            <div className="flex border border-zinc-700">
              <button
                onClick={() => setVista("cuadricula")}
                className={`px-4 py-2 text-sm transition-colors ${vista === "cuadricula" ? "bg-yellow-400 text-black" : "text-zinc-400 hover:text-yellow-400"}`}
              >
                ⊞
              </button>
              <button
                onClick={() => setVista("lista")}
                className={`px-4 py-2 text-sm transition-colors ${vista === "lista" ? "bg-yellow-400 text-black" : "text-zinc-400 hover:text-yellow-400"}`}
              >
                ≡
              </button>
            </div>
          </div>
        </div>

        {cargando ? (
          <div className="text-center py-20 text-zinc-500">Cargando productos...</div>
        ) : (
          <>
            <p className="text-zinc-500 text-sm mb-6">{todosLosFiltrados.length} productos encontrados</p>

            <AnimatePresence mode="wait">
              {vista === "cuadricula" ? (
                <motion.div
                  key="cuadricula"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                  {productosFiltrados.map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="bg-zinc-900 border border-zinc-800 hover:border-yellow-400/50 transition-colors group cursor-pointer relative"
                      onClick={() => navigate(`/producto/${p.id}`)}
                    >
                      {p.destacado && (
                        <div className="absolute top-2 left-2 z-10 bg-yellow-400 text-black text-xs font-bold px-2 py-1">
                          DESTACADO
                        </div>
                      )}
                      <div className="overflow-hidden h-40 bg-zinc-800 flex items-center justify-center">
                        {p.imagen ? (
                          <img
                            src={p.imagen}
                            alt={p.nombre}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                          />
                        ) : (
                          <span className="text-zinc-600 text-sm">Sin imagen</span>
                        )}
                      </div>
                      <div className="p-4">
                        <span className="text-xs text-yellow-400 tracking-widest uppercase">{p.metal} · {p.tipo}</span>
                        <h3 className="text-white font-semibold text-sm mt-1 mb-3 leading-snug">{p.nombre}</h3>
                        <div className="flex justify-between text-xs text-zinc-500 mb-3">
                          <span>{p.peso}</span>
                          <span>{p.pureza}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <PrecioProtegido precio={`${p.precio.toLocaleString('es-ES')} €`} className="text-yellow-400 text-lg font-bold" />
                          <button
                            onClick={(e) => { e.stopPropagation(); navigate(`/producto/${p.id}`) }}
                            className="text-xs border border-zinc-700 text-zinc-400 px-3 py-1.5 hover:border-yellow-400 hover:text-yellow-400 transition-colors"
                          >
                            Ver más
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="lista"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-2"
                >
                  {productosFiltrados.map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="bg-zinc-900 border border-zinc-800 hover:border-yellow-400/50 transition-colors group cursor-pointer relative flex items-center gap-6 p-4"
                      onClick={() => navigate(`/producto/${p.id}`)}
                    >
                      {p.destacado && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1">
                          DESTACADO
                        </div>
                      )}
                      <div className="w-16 h-16 bg-zinc-800 flex-shrink-0 overflow-hidden">
                        {p.imagen ? (
                          <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">—</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-yellow-400 tracking-widest uppercase">{p.metal} · {p.tipo}</span>
                        <h3 className="text-white font-semibold text-sm mt-0.5">{p.nombre}</h3>
                        <div className="flex gap-4 text-xs text-zinc-500 mt-1">
                          <span>{p.peso}</span>
                          <span>{p.pureza}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <PrecioProtegido precio={`${p.precio.toLocaleString('es-ES')} €`} className="text-yellow-400 text-xl font-bold" />
                        <button
                          onClick={(e) => { e.stopPropagation(); navigate(`/producto/${p.id}`) }}
                          className="text-xs border border-zinc-700 text-zinc-400 px-3 py-1.5 hover:border-yellow-400 hover:text-yellow-400 transition-colors mt-2"
                        >
                          Ver más
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {!limite && totalPaginas > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPagina((p) => Math.max(1, p - 1))}
                  disabled={pagina === 1}
                  className="px-4 py-2 border border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ←
                </button>
                {Array.from({ length: totalPaginas }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPagina(i + 1)}
                    className={`px-4 py-2 border transition-colors ${
                      pagina === i + 1
                        ? 'bg-yellow-400 text-black border-yellow-400 font-semibold'
                        : 'border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                  disabled={pagina === totalPaginas}
                  className="px-4 py-2 border border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  →
                </button>
              </div>
            )}
          </>
        )}

        {limite && (
          <div className="text-center mt-10">
            <Link
              to="/catalogo"
              className="border border-yellow-400 text-yellow-400 px-10 py-3 hover:bg-yellow-400/10 transition-colors tracking-widest uppercase text-sm"
            >
              Ver catálogo completo
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}

export default Catalogo