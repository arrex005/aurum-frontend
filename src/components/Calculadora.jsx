import { useState } from 'react'

const precios = {
  Oro: 3664,
  Plata: 60.87,
  Platino: 1513,
}

function Calculadora() {
  const [euros, setEuros] = useState(1000)
  const [metal, setMetal] = useState("Oro")

  const precioOz = precios[metal]
  const gramos = ((euros / precioOz) * 31.1).toFixed(2)
  const onzas = (euros / precioOz).toFixed(4)

  return (
    <section className="bg-zinc-900 border-y border-yellow-400/20 py-16 px-6">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-10">
          <p className="text-yellow-400 text-sm tracking-widest uppercase mb-2">Herramienta de inversión</p>
          <h2 className="text-4xl font-bold text-white">¿Cuánto metal puedes comprar?</h2>
          <p className="text-zinc-400 mt-3">Introduce tu presupuesto y descubre cuánto metal físico obtienes al precio actual</p>
        </div>

        <div className="bg-black border border-zinc-800 p-8">

          <div className="flex gap-3 mb-8">
            {Object.keys(precios).map((m) => (
              <button
                key={m}
                onClick={() => setMetal(m)}
                className={`flex-1 py-3 text-sm font-semibold border transition-colors ${
                  metal === m
                    ? "bg-yellow-400 text-black border-yellow-400"
                    : "border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="text-zinc-400 text-sm mb-2 block">Tu presupuesto</label>
            <div className="flex items-center border border-zinc-700 focus-within:border-yellow-400 transition-colors">
              <span className="text-zinc-400 px-4 text-lg">€</span>
              <input
                type="number"
                value={euros}
                onChange={(e) => setEuros(Number(e.target.value))}
                className="bg-transparent text-white text-2xl font-bold py-4 px-2 flex-1 outline-none"
                min={1}
              />
            </div>
          </div>

          <input
            type="range"
            min={100}
            max={100000}
            step={100}
            value={euros}
            onChange={(e) => setEuros(Number(e.target.value))}
            className="w-full mb-8 accent-yellow-400"
          />

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-zinc-900 border border-zinc-800 p-5 text-center">
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Gramos</p>
              <p className="text-yellow-400 text-4xl font-bold">{gramos}</p>
              <p className="text-zinc-500 text-xs mt-1">g de {metal}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-5 text-center">
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Onzas troy</p>
              <p className="text-yellow-400 text-4xl font-bold">{onzas}</p>
              <p className="text-zinc-500 text-xs mt-1">oz de {metal}</p>
            </div>
          </div>

          <div className="flex justify-between text-sm text-zinc-500 border-t border-zinc-800 pt-4">
            <span>Precio actual {metal}</span>
            <span className="text-zinc-300">{precioOz.toLocaleString()} €/oz</span>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Calculadora