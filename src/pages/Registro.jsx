import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const provincias = [
  'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
  'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'La Coruña',
  'Cuenca', 'Gerona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares',
  'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia',
  'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Santa Cruz de Tenerife', 'Segovia',
  'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya',
  'Zamora', 'Zaragoza', 'Ceuta', 'Melilla'
]

function Registro() {
  const [paso, setPaso] = useState(1)
  const [form, setForm] = useState({
    nombre: '', apellidos: '', email: '', password: '', telefono: '',
    direccion: '', codigoPostal: '', ciudad: '', provincia: '',
  })
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegistro = async (e) => {
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
        setPaso(2) // pasamos a la pantalla del código
      } else {
        setError(data.error || 'Error al registrarse')
      }
    } catch {
      setError('Error de conexión')
    }

    setCargando(false)
  }

  const handleVerificar = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/clientes/verificar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, codigo }),
      })

      const data = await res.json()

      if (res.ok) {
        setPaso(3) // pantalla de éxito
      } else {
        setError(data.error || 'Código incorrecto')
      }
    } catch {
      setError('Error de conexión')
    }

    setCargando(false)
  }

  // PASO 3: Éxito
  if (paso === 3) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm">
          <p className="text-yellow-400 text-5xl mb-4">✓</p>
          <h1 className="text-2xl font-bold text-white mb-3">Email verificado</h1>
          <p className="text-zinc-400 text-sm mb-8">
            Tu cuenta ha sido verificada y está pendiente de aprobación. Te avisaremos cuando puedas acceder a los precios.
          </p>
          <Link to="/" className="text-yellow-400 text-sm hover:underline">Volver al inicio</Link>
        </motion.div>
      </div>
    )
  }

  // PASO 2: Introducir código
  if (paso === 2) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-yellow-400 text-2xl font-bold tracking-widest uppercase mb-2">Verificación</h1>
            <p className="text-zinc-400 text-sm">
              Hemos enviado un código de 6 dígitos a<br />
              <span className="text-white">{form.email}</span>
            </p>
          </div>

          <form onSubmit={handleVerificar} className="space-y-4">
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              maxLength={6}
              className="w-full bg-zinc-900 border border-zinc-700 text-white text-center text-3xl tracking-[0.5em] px-4 py-4 focus:outline-none focus:border-yellow-400 transition-colors"
            />

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={cargando || codigo.length !== 6}
              className="w-full bg-yellow-400 text-black font-semibold py-3 hover:bg-yellow-300 transition-colors disabled:opacity-50"
            >
              {cargando ? 'Verificando...' : 'Verificar cuenta'}
            </button>

            <p className="text-zinc-500 text-xs text-center">
              ¿No has recibido el código? Revisa tu carpeta de spam.
            </p>
          </form>
        </motion.div>
      </div>
    )
  }

  // PASO 1: Formulario de registro
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-yellow-400 text-2xl font-bold tracking-widest uppercase mb-2">Crear cuenta</h1>
          <p className="text-zinc-500 text-sm">Regístrate para ver los precios</p>
        </div>

        <form onSubmit={handleRegistro} className="space-y-4">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Nombre</label>
              <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required
                className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors" />
            </div>
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Apellidos</label>
              <input type="text" name="apellidos" value={form.apellidos} onChange={handleChange} required
                className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors" />
            </div>
          </div>

          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required
              className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Contraseña</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6}
                className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors" />
            </div>
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Teléfono</label>
              <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} required
                className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors" />
            </div>
          </div>

          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Dirección</label>
            <input type="text" name="direccion" value={form.direccion} onChange={handleChange} required
              className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">C.P.</label>
              <input type="text" name="codigoPostal" value={form.codigoPostal} onChange={handleChange} required
                className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors" />
            </div>
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Ciudad</label>
              <input type="text" name="ciudad" value={form.ciudad} onChange={handleChange} required
                className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors" />
            </div>
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Provincia</label>
              <select name="provincia" value={form.provincia} onChange={handleChange} required
                className="w-full bg-zinc-900 border border-zinc-700 text-white px-3 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors">
                <option value="">—</option>
                {provincias.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button type="submit" disabled={cargando}
            className="w-full bg-yellow-400 text-black font-semibold py-3 hover:bg-yellow-300 transition-colors disabled:opacity-50">
            {cargando ? 'Registrando...' : 'Continuar'}
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