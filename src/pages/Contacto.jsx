import { useState } from 'react'
import { motion } from 'framer-motion'

function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' })
  const [enviando, setEnviando] = useState(false)
  const [estado, setEstado] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setEstado(null)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contacto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setEstado('exito')
        setForm({ nombre: '', email: '', asunto: '', mensaje: '' })
      } else {
        setEstado('error')
      }
    } catch {
      setEstado('error')
    }

    setEnviando(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      <div className="text-center mb-12">
        <p className="text-yellow-400 text-sm tracking-widest uppercase mb-2">Estamos aquí para ayudarte</p>
        <h1 className="text-5xl font-bold text-white">Contacto</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        <div>
          <h2 className="text-white text-xl font-semibold mb-6">Información de contacto</h2>
          <div className="space-y-6">
            <div className="border-l-2 border-yellow-400 pl-4">
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Teléfono</p>
              <p className="text-white">+34 900 000 000</p>
            </div>
            <div className="border-l-2 border-yellow-400 pl-4">
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Email</p>
              <p className="text-white">info@aurum.es</p>
            </div>
            <div className="border-l-2 border-yellow-400 pl-4">
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Dirección</p>
              <p className="text-white">Calle del Oro, 1<br />28001 Madrid, España</p>
            </div>
            <div className="border-l-2 border-yellow-400 pl-4">
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Horario</p>
              <p className="text-white">Lunes a Viernes<br />9:00 - 18:00</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-6">Envíanos un mensaje</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Asunto</label>
              <input
                type="text"
                name="asunto"
                value={form.asunto}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Mensaje</label>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                placeholder="Escribe tu mensaje aquí..."
              />
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-yellow-400 text-black font-semibold py-4 hover:bg-yellow-300 transition-colors tracking-widest uppercase text-sm disabled:opacity-50"
            >
              {enviando ? 'Enviando...' : 'Enviar mensaje'}
            </button>

            {estado === 'exito' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 text-sm text-center"
              >
                ✓ Mensaje enviado correctamente, te responderemos lo antes posible
              </motion.p>
            )}
            {estado === 'error' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center"
              >
                ✕ Ha ocurrido un error, inténtalo de nuevo
              </motion.p>
            )}
          </form>
        </div>

      </div>
    </div>
  )
}

export default Contacto