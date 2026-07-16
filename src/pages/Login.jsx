import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('token', data.token)
        navigate('/admin')
      } else {
        setError(data.error || 'Error al iniciar sesión')
      }
    } catch {
      setError('Error de conexión')
    }

    setCargando(false)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <img src="/logo.png" alt="Golden Heights Group" className="h-20 w-auto mx-auto mb-3" />
          <p className="text-zinc-500 text-sm">Acceso administración</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-widest mb-2 block">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-yellow-400 text-black font-semibold py-3 hover:bg-yellow-300 transition-colors disabled:opacity-50"
          >
            {cargando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login