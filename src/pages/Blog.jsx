import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'

function ArticuloCard({ articulo, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-zinc-900 border border-zinc-800 hover:border-yellow-400/30 transition-colors group cursor-pointer"
    >
      <div className="h-48 overflow-hidden bg-zinc-800">
        {articulo.imagen ? (
          <img
            src={articulo.imagen}
            alt={articulo.titulo}
            onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('flex', 'items-center', 'justify-center') }}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl">📜</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs bg-yellow-400/10 text-yellow-400 px-3 py-1 border border-yellow-400/20">
            {articulo.categoria}
          </span>
          <span className="text-zinc-500 text-xs">
            {new Date(articulo.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-yellow-400 transition-colors leading-snug">
          {articulo.titulo}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
          {articulo.resumen}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500 text-xs">{articulo.autor}</span>
          <Link
            to={`/blog/${articulo.id}`}
            className="text-yellow-400 text-xs hover:underline"
          >
            Leer más →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

function Blog({ limite = null }) {
  const [articulos, setArticulos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/articulos`)
      .then((res) => res.json())
      .then((data) => {
        setArticulos(Array.isArray(data) ? data : [])
        setCargando(false)
      })
      .catch(() => setCargando(false))
  }, [])

  const articulosMostrados = limite ? articulos.slice(0, limite) : articulos

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <div className="text-center mb-12">
        <p className="text-yellow-400 text-sm tracking-widest uppercase mb-2">La historia de los metales preciosos</p>
        <h1 className="text-5xl font-bold text-white">Historia</h1>
      </div>

      {cargando ? (
        <div className="text-center py-20 text-zinc-500">Cargando artículos...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articulosMostrados.map((a, i) => (
            <ArticuloCard key={a.id} articulo={a} index={i} />
          ))}
        </div>
      )}

      {limite && (
        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="border border-yellow-400 text-yellow-400 px-10 py-3 hover:bg-yellow-400/10 transition-colors tracking-widest uppercase text-sm"
          >
            Ver toda la historia
          </Link>
        </div>
      )}

    </div>
  )
}

export default Blog