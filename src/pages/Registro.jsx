import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Registro() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/clientes/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        setExito(true)
      } else {
        setError(data.error || 'Error al registrarse')
      }
    } catch {
      setError('Error de conexión')
    }

    setCargando(false)
  }

  if (exito) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 text-center">
        <div className="max-w-sm">
          <p className="text-yellow-400 text-4xl mb-4">✓</p>
          <h1 className="text-2xl font-bold text-white mb-3">Registro completado</h1>
          <p className="text-zinc-400 text-sm mb-8">
            Tu cuenta está pendiente de aprobación. Te avisaremos por email cuando puedas acceder.
          </p>
          <Link to="/" className="text-yellow-400 text-sm hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-yellow-400 text-2xl font-bold tracking-widest uppercase mb-2">Aurum</h1>
          <p className="text-zinc-500 text-sm">Crea tu cuenta para ver precios</p>
        </div>

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
            />
          </div>
          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-yellow-400 text-black font-semibold py-3 hover:bg-yellow-300 transition-colors disabled:opacity-50"
          >
            {cargando ? 'Registrando...' : 'Crear cuenta'}
          </button>

          <p className="text-zinc-500 text-xs text-center">
            ¿Ya tienes cuenta? <Link to="/acceso" className="text-yellow-400 hover:underline">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Registro