import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function ArticuloDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [articulo, setArticulo] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:3001/api/articulos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArticulo(data)
        setCargando(false)
      })
      .catch(() => setCargando(false))
  }, [id])

  if (cargando) return <div className="text-center py-40 text-zinc-500">Cargando...</div>
  if (!articulo) return <div className="text-center py-40 text-zinc-500">Artículo no encontrado</div>

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <button
        onClick={() => navigate(-1)}
        className="text-zinc-400 text-sm hover:text-yellow-400 transition-colors mb-10 flex items-center gap-2"
      >
        ← Volver al blog
      </button>

      {articulo.imagen && (
        <div className="h-64 overflow-hidden mb-8">
          <img
            src={articulo.imagen}
            alt={articulo.titulo}
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs bg-yellow-400/10 text-yellow-400 px-3 py-1 border border-yellow-400/20">
          {articulo.categoria}
        </span>
        <span className="text-zinc-500 text-xs">
          {new Date(articulo.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        <span className="text-zinc-500 text-xs">{articulo.autor}</span>
      </div>

      <h1 className="text-4xl font-bold text-white mb-6 leading-tight">{articulo.titulo}</h1>
      <p className="text-zinc-300 text-lg leading-relaxed mb-8 border-l-2 border-yellow-400 pl-4">
        {articulo.resumen}
      </p>

      <div className="prose prose-invert max-w-none">
        {articulo.contenido.split('\n\n').map((parrafo, i) => (
          <p key={i} className="text-zinc-400 leading-relaxed mb-4">
            {parrafo}
          </p>
        ))}
      </div>

    </div>
  )
}

export default ArticuloDetalle