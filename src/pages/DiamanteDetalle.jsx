import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PrecioProtegido from '../components/PrecioProtegido'

const formasNombre = {
  ROUND: 'Redondo',
  PRINCESS: 'Princesa',
  CUSHION: 'Cojín',
  OVAL: 'Óvalo',
  EMERALD: 'Esmeralda',
  PEAR: 'Pera',
}

function DiamanteDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [piedra, setPiedra] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [mostrarVideo, setMostrarVideo] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/piedras/${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then((data) => {
        setPiedra(data)
        setCargando(false)
      })
      .catch(() => setCargando(false))
  }, [id])

  if (cargando) return <div className="text-center py-40 text-zinc-500">Cargando...</div>
  if (!piedra || piedra.error) return <div className="text-center py-40 text-zinc-500">Diamante no encontrado</div>

  const cert = piedra.diamond?.certificate
  const d = piedra.diamond

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <button
        onClick={() => navigate(-1)}
        className="text-zinc-400 text-sm hover:text-yellow-400 transition-colors mb-10 flex items-center gap-2"
      >
        ← Volver a diamantes
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        <div>
          <div className="bg-gradient-to-br from-zinc-100 to-zinc-300 h-96 flex items-center justify-center relative overflow-hidden">
            {mostrarVideo && d?.video ? (
              <iframe
                src={d.video}
                title="Vídeo del diamante"
                className="w-full h-full"
                frameBorder="0"
              />
            ) : d?.image ? (
              <img
                src={d.image}
                alt={`Diamante ${cert?.carats}ct`}
                onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling?.classList.remove('hidden') }}
                className="w-full h-full object-cover"
              />
            ) : null}
            <div className={`${d?.image ? 'hidden' : ''} absolute inset-0 flex items-center justify-center`}>
              <span className="text-8xl">💎</span>
            </div>
          </div>

          {d?.video && (
            <button
              onClick={() => setMostrarVideo(!mostrarVideo)}
              className="w-full mt-3 border border-zinc-700 text-zinc-300 py-3 text-sm hover:border-yellow-400 hover:text-yellow-400 transition-colors"
            >
              {mostrarVideo ? 'Ver imagen' : 'Ver vídeo 360°'}
            </button>
          )}
        </div>

        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs text-yellow-400 tracking-widest uppercase">
              {formasNombre[cert?.shape] || cert?.shape}
            </span>
            <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1">Certificado {cert?.lab}</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-6">Diamante {cert?.carats} ct</h1>

          <div className="bg-zinc-900 border border-zinc-800 p-6 mb-6">
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Precio</p>
            <PrecioProtegido
              precio={`${(piedra.price / 100).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`}
              className="text-yellow-400 text-4xl font-bold"
            />
          </div>

          <div className="space-y-3 mb-8">
            <p className="text-white font-semibold text-sm mb-3">Características (4 C)</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-900 border border-zinc-800 p-3 text-center">
                <p className="text-zinc-500 text-xs uppercase">Quilates</p>
                <p className="text-white text-lg font-bold">{cert?.carats}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-3 text-center">
                <p className="text-zinc-500 text-xs uppercase">Color</p>
                <p className="text-white text-lg font-bold">{cert?.color}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-3 text-center">
                <p className="text-zinc-500 text-xs uppercase">Pureza</p>
                <p className="text-white text-lg font-bold">{cert?.clarity}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-3 text-center">
                <p className="text-zinc-500 text-xs uppercase">Talla</p>
                <p className="text-white text-lg font-bold">{cert?.cut}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-8 text-sm">
            {cert?.polish && (
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Pulido</span>
                <span className="text-white">{cert.polish}</span>
              </div>
            )}
            {cert?.symmetry && (
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Simetría</span>
                <span className="text-white">{cert.symmetry}</span>
              </div>
            )}
            {cert?.certNumber && (
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Nº Certificado</span>
                <span className="text-white">{cert.certNumber}</span>
              </div>
            )}
            {d?.mine_of_origin && (
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Origen</span>
                <span className="text-white">{d.mine_of_origin}</span>
              </div>
            )}
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

export default DiamanteDetalle