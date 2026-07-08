import { useState, useEffect } from 'react'
import GraficoHistorico from '../components/GraficoHistorico'

const METALES = ['Oro', 'Plata', 'Platino', 'Paladio']

function Precios() {
  const [precios, setPrecios] = useState([])
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null)

  const fetchPrecios = () => {
    fetch('${import.meta.env.VITE_API_URL}/api/precios')
      .then((res) => res.json())
      .then((data) => {
        setPrecios(data)
        setUltimaActualizacion(new Date())
      })
      .catch(() => {})
  }

  useEffect(() => {
    fetchPrecios()
    const intervalo = setInterval(fetchPrecios, 60000)
    return () => clearInterval(intervalo)
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      <div className="text-center mb-12">
        <p className="text-yellow-400 text-sm tracking-widest uppercase mb-2">Mercado en tiempo real</p>
        <h1 className="text-5xl font-bold text-white">Precios de los metales</h1>
        {ultimaActualizacion && (
          <p className="text-zinc-500 text-xs mt-3">
            Última actualización: {ultimaActualizacion.toLocaleTimeString('es-ES')} · Se actualiza cada 60 segundos
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {precios.map((p) => (
          <div key={p.nombre} className="bg-zinc-900 border border-zinc-800 hover:border-yellow-400/40 transition-colors p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">{p.nombre}</p>
                <p className="text-white text-4xl font-bold">
                  {p.precio ? p.precio.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '---'}
                  <span className="text-zinc-400 text-lg font-normal ml-2">€/oz</span>
                </p>
              </div>
              <div className={`text-right px-3 py-1 text-sm font-semibold ${p.variacionPct >= 0 ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
                {p.variacionPct >= 0 ? '▲' : '▼'} {p.variacionPct ? Math.abs(p.variacionPct).toFixed(2) : '0.00'}%
              </div>
            </div>
            <div className="border-t border-zinc-800 pt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Variación</p>
                <p className={`text-sm font-semibold ${p.variacion >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {p.variacion >= 0 ? '+' : ''}{p.variacion ? p.variacion.toFixed(2) : '0.00'} €
                </p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Por gramo</p>
                <p className="text-white text-sm font-semibold">
                  {p.precio ? (p.precio / 31.1).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '---'} €/g
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <GraficoHistorico />
      <div className="bg-zinc-900 border border-zinc-800 p-8">
        <h2 className="text-white text-xl font-semibold mb-2">¿Cómo se fijan los precios?</h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
          Los precios de los metales preciosos se expresan en onzas troy (oz) y se cotizan en los mercados internacionales 24 horas al día. El precio mostrado es el precio spot en euros, que es el precio de referencia para operaciones inmediatas.
        </p>
        <p className="text-zinc-400 text-sm leading-relaxed">
          El precio final de compra puede incluir una prima sobre el precio spot en función del producto, su fabricante y las condiciones del mercado. Consulta con nosotros para obtener el precio exacto de cualquier producto.
        </p>
      </div>

    </div>
  )
}

export default Precios