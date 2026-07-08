import { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import GraficoHistorico from '../components/GraficoHistorico'

const preciosHistoricos = {
  Oro: {
    2015: 1060, 2016: 1151, 2017: 1257, 2018: 1268,
    2019: 1477, 2020: 1770, 2021: 1798, 2022: 1800,
    2023: 1940, 2024: 2300, 2025: 3200,
  },
  Plata: {
    2015: 13.8, 2016: 17.1, 2017: 17.0, 2018: 15.7,
    2019: 16.2, 2020: 20.5, 2021: 25.1, 2022: 21.7,
    2023: 23.5, 2024: 28.0, 2025: 32.0,
  },
  Platino: {
    2015: 1054, 2016: 987, 2017: 947, 2018: 838,
    2019: 898, 2020: 1020, 2021: 1093, 2022: 975,
    2023: 960, 2024: 980, 2025: 1050,
  },
}

const añoActual = 2025

function Rentabilidad() {
  const [metal, setMetal] = useState('Oro')
  const [inversion, setInversion] = useState(10000)
  const [añoInicio, setAñoInicio] = useState(2015)

  const precioInicio = preciosHistoricos[metal][añoInicio]
  const precioActual = preciosHistoricos[metal][añoActual]
  const gramos = (inversion / precioInicio) * 31.1
  const valorActual = (gramos / 31.1) * precioActual
  const ganancia = valorActual - inversion
  const rentabilidad = ((valorActual - inversion) / inversion) * 100
  const años = añoActual - añoInicio

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      <div className="text-center mb-12">
        <p className="text-yellow-400 text-sm tracking-widest uppercase mb-2">Simulador histórico</p>
        <h1 className="text-5xl font-bold text-white">Calculadora de rentabilidad</h1>
        <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
          Descubre cuánto habrías ganado si hubieras invertido en metales preciosos en el pasado
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-8 mb-8">

        <div className="flex gap-3 mb-8">
          {Object.keys(preciosHistoricos).map((m) => (
            <button
              key={m}
              onClick={() => setMetal(m)}
              className={`flex-1 py-3 text-sm font-semibold border transition-colors ${
                metal === m
                  ? 'bg-yellow-400 text-black border-yellow-400'
                  : 'border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">
              Inversión inicial
            </label>
            <div className="flex items-center border border-zinc-700 focus-within:border-yellow-400 transition-colors mb-3">
              <span className="text-zinc-400 px-4 text-lg">€</span>
              <input
                type="number"
                value={inversion}
                onChange={(e) => setInversion(Math.max(100, Number(e.target.value)))}
                className="bg-transparent text-white text-2xl font-bold py-3 px-2 flex-1 outline-none"
                min={100}
              />
            </div>
            <input
              type="range"
              min={1000}
              max={100000}
              step={1000}
              value={inversion}
              onChange={(e) => setInversion(Number(e.target.value))}
              className="w-full accent-yellow-400"
            />
          </div>

          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">
              Año de inversión
            </label>
            <div className="flex items-center border border-zinc-700 focus-within:border-yellow-400 transition-colors mb-3">
              <span className="text-zinc-400 px-4 text-lg">📅</span>
              <input
                type="number"
                value={añoInicio}
                onChange={(e) => setAñoInicio(Math.min(2024, Math.max(2015, Number(e.target.value))))}
                className="bg-transparent text-white text-2xl font-bold py-3 px-2 flex-1 outline-none"
                min={2015}
                max={2024}
              />
            </div>
            <input
              type="range"
              min={2015}
              max={2024}
              step={1}
              value={añoInicio}
              onChange={(e) => setAñoInicio(Number(e.target.value))}
              className="w-full accent-yellow-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black border border-zinc-800 p-4 text-center">
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Invertiste</p>
            <p className="text-white text-2xl font-bold">{inversion.toLocaleString('es-ES')} €</p>
            <p className="text-zinc-500 text-xs mt-1">en {añoInicio}</p>
          </div>
          <div className="bg-black border border-zinc-800 p-4 text-center">
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Valor actual</p>
            <p className="text-yellow-400 text-2xl font-bold">{Math.round(valorActual).toLocaleString('es-ES')} €</p>
            <p className="text-zinc-500 text-xs mt-1">en {añoActual}</p>
          </div>
          <div className="bg-black border border-zinc-800 p-4 text-center">
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Ganancia</p>
            <p className={`text-2xl font-bold ${ganancia >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {ganancia >= 0 ? '+' : ''}{Math.round(ganancia).toLocaleString('es-ES')} €
            </p>
            <p className="text-zinc-500 text-xs mt-1">en {años} años</p>
          </div>
          <div className="bg-black border border-zinc-800 p-4 text-center">
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Rentabilidad</p>
            <p className={`text-2xl font-bold ${rentabilidad >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {rentabilidad >= 0 ? '+' : ''}{rentabilidad.toFixed(1)}%
            </p>
            <p className="text-zinc-500 text-xs mt-1">total acumulado</p>
          </div>
        </div>

      </div>
      <GraficoHistorico />
      <div className="bg-zinc-900 border border-zinc-800 p-6">
        <p className="text-zinc-500 text-xs text-center leading-relaxed">
          Los datos históricos son aproximados y tienen carácter informativo. La rentabilidad pasada no garantiza rentabilidad futura. Consulta con un asesor financiero antes de invertir.
        </p>
      </div>

    </div>
  )
}

export default Rentabilidad