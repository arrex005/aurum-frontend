import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function Registro() {
  const [paso, setPaso] = useState(1)
  const [form, setForm] = useState({
    nombre: '', apellidos: '', email: '', telefono: '', password: '',
  })
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Validación en el navegador antes de enviar
  const validar = () => {
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const movilOk = /^[67][0-9]{8}$/

    if (!soloLetras.test(form.nombre.trim())) return 'El nombre solo puede contener letras'
    if (!soloLetras.test(form.apellidos.trim())) return 'Los apellidos solo pueden contener letras'
    if (!emailOk.test(form.email.trim())) return 'Introduce un email válido'
    if (form.telefono.trim() && !movilOk.test(form.telefono.trim())) return 'Si indicas teléfono, debe ser un móvil español (9 dígitos, empieza por 6 o 7)'
    if (form.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres'
    return null
  }

  const handleRegistro = async (e) => {
    e.preventDefault()
    setError('')

    const errorValidacion = validar()
    if (errorValidacion) {
      setError(errorValidacion)
      return
    }

    setCargando(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/clientes/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setPaso(2)
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
        setPaso(3)
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
            Tu cuenta ha sido verificada y está pendiente de aprobación. Te avisaremos por email cuando puedas acceder a los precios.
          </p>
          <Link to="/" className="text-yellow-400 text-sm hover:underline">Volver al inicio</Link>
        </motion.div>
      </div>
    )
  }

  // PASO 2: Código
  if (paso === 2) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Golden Heights Group" className="h-20 w-auto mx-auto mb-3" />
            <h1 className="text-white text-xl font-semibold mb-2">Verifica tu email</h1>
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

  // PASO 1: Formulario
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Golden Heights Group" className="h-20 w-auto mx-auto mb-3" />
          <p className="text-zinc-500 text-sm">Crea tu cuenta para ver los precios</p>
        </div>

        <form onSubmit={handleRegistro} className="space-y-4" noValidate>
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

          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Teléfono móvil <span className="text-zinc-600 normal-case">(opcional)</span></label>
<input type="tel" name="telefono" value={form.telefono} onChange={handleChange}
  placeholder="600 000 000"
  className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors" />
          </div>

          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Contraseña</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6}
              className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors" />
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