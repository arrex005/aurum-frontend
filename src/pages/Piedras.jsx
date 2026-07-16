import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PrecioProtegido from '../components/PrecioProtegido'

const formas = ['ROUND', 'PRINCESS', 'CUSHION', 'OVAL', 'EMERALD', 'PEAR']
const formasNombre = {
  ROUND: 'Redondo',
  PRINCESS: 'Princesa',
  CUSHION: 'Cojín',
  OVAL: 'Óvalo',
  EMERALD: 'Esmeralda',
  PEAR: 'Pera',
}

function Piedras() {
  const [piedras, setPiedras] = useState([])
  const [cargando, setCargando] = useState(true)
  const [forma, setForma] = useState('ROUND')
  const [quilatesMin, setQuilatesMin] = useState(0.5)
  const [quilatesMax, setQuilatesMax] = useState(2)
  const [pagina, setPagina] = useState(1)
  const [hayMas, setHayMas] = useState(false)
  const navigate = useNavigate()

 // Al cambiar cualquier filtro, volvemos a la primera página
  useEffect(() => {
    setPagina(1)
  }, [forma, quilatesMin, quilatesMax])

  // Subir arriba solo al cambiar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pagina])

  useEffect(() => {
    setCargando(true)
    const token = localStorage.getItem('clienteToken')
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    const params = new URLSearchParams({ forma, quilatesMin, quilatesMax, pagina })

    fetch(`${import.meta.env.VITE_API_URL}/api/piedras?${params}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        setPiedras(Array.isArray(data.items) ? data.items : [])
        setHayMas(!!data.hayMas)
        setCargando(false)
        
      })
      .catch(() => setCargando(false))
  }, [forma, quilatesMin, quilatesMax, pagina])

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <div className="text-center mb-12">
        <p className="text-yellow-400 text-sm tracking-widest uppercase mb-2">Piedras preciosas certificadas</p>
        <h1 className="text-5xl font-bold text-white">Diamantes</h1>
        <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
          Diamantes naturales certificados por GIA e IGI. Cada piedra incluye su certificado de autenticidad.
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 mb-8">
        <p className="text-white text-sm font-semibold mb-4">Filtrar diamantes</p>

        <div className="mb-6">
          <label className="text-zinc-400 text-xs uppercase tracking-widest mb-3 block">Forma</label>
          <div className="flex gap-2 flex-wrap">
            {formas.map((f) => (
              <button
                key={f}
                onClick={() => setForma(f)}
                className={`px-4 py-2 text-sm border transition-colors ${
                  forma === f
                    ? 'bg-yellow-400 text-black border-yellow-400 font-semibold'
                    : 'border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400'
                }`}
              >
                {formasNombre[f]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">
              Quilates mínimo: <span className="text-yellow-400">{quilatesMin} ct</span>
            </label>
            <input type="range" min={0.3} max={5} step={0.1} value={quilatesMin}
              onChange={(e) => setQuilatesMin(Number(e.target.value))}
              className="w-full accent-yellow-400" />
          </div>
          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">
              Quilates máximo: <span className="text-yellow-400">{quilatesMax} ct</span>
            </label>
            <input type="range" min={0.3} max={5} step={0.1} value={quilatesMax}
              onChange={(e) => setQuilatesMax(Number(e.target.value))}
              className="w-full accent-yellow-400" />
          </div>
        </div>
      </div>

      {cargando ? (
        <div className="text-center py-20 text-zinc-500">Cargando diamantes...</div>
      ) : piedras.length === 0 ? (
        <div className="text-center py-20 border border-zinc-800 text-zinc-600">
          No hay diamantes con estos filtros
        </div>
      ) : (
        <>
          <p className="text-zinc-500 text-sm mb-6">
            Mostrando {piedras.length} diamantes · Página {pagina}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {piedras.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                onClick={() => navigate(`/diamante/${encodeURIComponent(p.id)}`)}
                className="bg-zinc-900 border border-zinc-800 hover:border-yellow-400/50 transition-colors group cursor-pointer"
              >
                <div className="overflow-hidden h-48 bg-gradient-to-br from-zinc-100 to-zinc-300 flex items-center justify-center relative">
                  {p.diamond?.image ? (
                    <img
                      src={p.diamond.image}
                      alt={`Diamante ${p.diamond?.certificate?.carats}ct`}
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling?.classList.remove('hidden') }}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                  <div className={`${p.diamond?.image ? 'hidden' : ''} absolute inset-0 flex items-center justify-center`}>
                    <span className="text-6xl">💎</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-yellow-400 tracking-widest uppercase">
                      {formasNombre[p.diamond?.certificate?.shape] || p.diamond?.certificate?.shape}
                    </span>
                    <span className="text-xs text-zinc-500">{p.diamond?.certificate?.lab}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">
                    {p.diamond?.certificate?.carats} ct
                  </h3>
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-zinc-800 py-2">
                      <p className="text-zinc-500 text-xs">Color</p>
                      <p className="text-white text-sm font-semibold">{p.diamond?.certificate?.color || '—'}</p>
                    </div>
                    <div className="bg-zinc-800 py-2">
                      <p className="text-zinc-500 text-xs">Pureza</p>
                      <p className="text-white text-sm font-semibold">{p.diamond?.certificate?.clarity || '—'}</p>
                    </div>
                    <div className="bg-zinc-800 py-2">
                      <p className="text-zinc-500 text-xs">Talla</p>
                      <p className="text-white text-sm font-semibold">{p.diamond?.certificate?.cut || '—'}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <PrecioProtegido
                      precio={p.price ? `${(p.price / 100).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €` : ''}
                      className="text-yellow-400 text-lg font-bold"
                    />
                    <span className="text-xs border border-zinc-700 text-zinc-400 px-3 py-1.5 group-hover:border-yellow-400 group-hover:text-yellow-400 transition-colors">
                      Ver detalle
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={pagina === 1}
              className="px-6 py-3 border border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              ← Anterior
            </button>
            <span className="text-zinc-500 text-sm">Página {pagina}</span>
            <button
              onClick={() => setPagina((p) => p + 1)}
              disabled={!hayMas}
              className="px-6 py-3 border border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              Siguiente →
            </button>
          </div>
        </>
      )}

    </div>
  )
}

export default Piedras