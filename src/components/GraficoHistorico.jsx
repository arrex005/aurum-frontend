import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const METALES = [
  { nombre: 'Oro', simbolo: 'XAU' },
  { nombre: 'Plata', simbolo: 'XAG' },
  { nombre: 'Platino', simbolo: 'XPT' },
]

const PERIODOS = [
  { label: '1 mes', value: 'mes' },
  { label: '1 año', value: 'año' },
  { label: '5 años', value: '5años' },
]

function GraficoHistorico() {
  const [datos, setDatos] = useState([])
  const [metal, setMetal] = useState('XAU')
  const [periodo, setPeriodo] = useState('mes')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    setCargando(true)
    fetch(`${import.meta.env.VITE_API_URL}/api/historico?metal=${metal}&periodo=${periodo}`)
      .then((res) => res.json())
      .then((data) => {
        setDatos(data)
        setCargando(false)
      })
      .catch(() => setCargando(false))
  }, [metal, periodo])

  const precioInicio = datos[0]?.precio || 0
  const precioFin = datos[datos.length - 1]?.precio || 0
  const variacion = precioFin - precioInicio
  const variacionPct = precioInicio ? ((variacion / precioInicio) * 100).toFixed(2) : 0
  const precioGramo = precioFin ? (precioFin / 31.1035).toFixed(2) : 0
  const metalNombre = METALES.find((m) => m.simbolo === metal)?.nombre || ''

  const formatFecha = (fecha) => {
    const d = new Date(fecha)
    if (periodo === 'mes') return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
    if (periodo === 'año') return d.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' })
    return d.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-yellow-400 text-xs uppercase tracking-widest mb-1">Evolución histórica</p>
          <h2 className="text-2xl font-bold text-white">Precio del {metalNombre}</h2>
          {!cargando && (
            <p className={`text-sm mt-1 ${variacion >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {variacion >= 0 ? '▲' : '▼'} {Math.abs(variacion).toFixed(2)} € ({variacion >= 0 ? '+' : ''}{variacionPct}%)
            </p>
            
            
          )}
          <div className="flex gap-6 mt-3">
            <div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Por onza</p>
                <p className="text-white text-lg font-bold">{precioFin.toLocaleString('es-ES')} €/oz</p>
            </div>
            <div className="w-px bg-zinc-800" />
            <div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Por gramo</p>
                <p className="text-white text-lg font-bold">{precioGramo} €/g</p>
            </div>
            </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {METALES.map((m) => (
              <button
                key={m.simbolo}
                onClick={() => setMetal(m.simbolo)}
                className={`px-4 py-2 text-xs border transition-colors ${
                  metal === m.simbolo
                    ? 'bg-yellow-400 text-black border-yellow-400 font-semibold'
                    : 'border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400'
                }`}
              >
                {m.nombre}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {PERIODOS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriodo(p.value)}
                className={`flex-1 px-4 py-2 text-xs border transition-colors ${
                  periodo === p.value
                    ? 'bg-zinc-600 text-white border-zinc-600 font-semibold'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-400 hover:text-zinc-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {cargando ? (
        <div className="h-64 flex items-center justify-center text-zinc-500">
          Cargando datos...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={datos} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis
              dataKey="fecha"
              stroke="#71717a"
              tick={{ fill: '#71717a', fontSize: 11 }}
              tickFormatter={formatFecha}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#71717a"
              tick={{ fill: '#71717a', fontSize: 11 }}
              tickFormatter={(v) => `${v.toLocaleString('es-ES')}€`}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #3f3f46',
                color: '#fff',
              }}
              formatter={(value) => [
                `${value.toLocaleString('es-ES')} €/oz  |  ${(value / 31.1035).toFixed(2)} €/g`,
                metalNombre
              ]}
              labelFormatter={(label) => new Date(label).toLocaleDateString('es-ES')}
              labelStyle={{ color: '#a1a1aa' }}
            />
            <Line
              type="monotone"
              dataKey="precio"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: '#fbbf24' }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default GraficoHistorico