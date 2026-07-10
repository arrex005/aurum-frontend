import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PrecioProtegido from '../components/PrecioProtegido'

function ProductoDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('clienteToken')
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    fetch(`${import.meta.env.VITE_API_URL}/api/productos/${id}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        setProducto(data)
        setCargando(false)
      })
      .catch(() => setCargando(false))
  }, [id])

  if (cargando) return <div className="text-center py-40 text-zinc-500">Cargando...</div>
  if (!producto) return <div className="text-center py-40 text-zinc-500">Producto no encontrado</div>

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <button
        onClick={() => navigate(-1)}
        className="text-zinc-400 text-sm hover:text-yellow-400 transition-colors mb-10 flex items-center gap-2"
      >
        ← Volver
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        <div className="bg-zinc-900 border border-zinc-800 h-80 flex items-center justify-center">
          {producto.imagen ? (
            <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover opacity-80" />
          ) : (
            <span className="text-zinc-600">Sin imagen</span>
          )}
        </div>

        <div>
          <span className="text-xs text-yellow-400 tracking-widest uppercase">{producto.metal} · {producto.tipo}</span>
          <h1 className="text-3xl font-bold text-white mt-2 mb-6">{producto.nombre}</h1>

          <div className="space-y-3 mb-8">
            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-zinc-400 text-sm">Peso</span>
              <span className="text-white text-sm font-semibold">{producto.peso}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-zinc-400 text-sm">Pureza</span>
              <span className="text-white text-sm font-semibold">{producto.pureza}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-zinc-400 text-sm">Metal</span>
              <span className="text-white text-sm font-semibold">{producto.metal}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-zinc-400 text-sm">Tipo</span>
              <span className="text-white text-sm font-semibold">{producto.tipo}</span>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 mb-6">
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Precio actual</p>
            <PrecioProtegido 
              precio={producto.precio ? `${producto.precio.toLocaleString('es-ES')} €` : ''} 
              className="text-yellow-400 text-4xl font-bold" 
              tamano="grande"
            />
            <p className="text-zinc-500 text-xs mt-1">Precio orientativo, consulte para precio exacto</p>
          </div>

          <button
            onClick={() => navigate('/contacto')}
            className="w-full bg-yellow-400 text-black font-semibold py-4 hover:bg-yellow-300 transition-colors"
          >
            Solicitar información
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProductoDetalle