import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function MiCuenta() {
  const [cliente, setCliente] = useState(null)
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('clienteToken')
    if (!token) {
      navigate('/acceso')
      return
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/clientes/perfil`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem('clienteToken')
          navigate('/acceso')
          return null
        }
        return res.json()
      })
      .then((data) => {
        if (data) {
          setCliente(data)
          setCargando(false)
        }
      })
      .catch(() => setCargando(false))
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem('clienteToken')
    localStorage.removeItem('clienteNombre')
    navigate('/')
    window.location.reload()
  }

  if (cargando) return <div className="text-center py-40 text-zinc-500">Cargando...</div>
  if (!cliente) return null

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      <div className="text-center mb-12">
        <p className="text-yellow-400 text-sm tracking-widest uppercase mb-2">Área privada</p>
        <h1 className="text-5xl font-bold text-white">Mi cuenta</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-zinc-900 border border-zinc-800 p-8 mb-6"
      >
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-800">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black text-2xl font-bold">
            {cliente.nombre.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-white text-xl font-semibold">{cliente.nombre}</h2>
            <p className="text-zinc-500 text-sm">{cliente.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-zinc-800">
            <span class Name="text-zinc-400 text-sm">Nombre</span>
            <span className="text-white text-sm font-medium">{cliente.nombre}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-zinc-800">
            <span className="text-zinc-400 text-sm">Email</span>
            <span className="text-white text-sm font-medium">{cliente.email}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-zinc-800">
            <span className="text-zinc-400 text-sm">Estado de la cuenta</span>
            {cliente.aprobado ? (
              <span className="text-xs bg-green-400/10 text-green-400 px-3 py-1">Aprobada</span>
            ) : (
              <span className="text-xs bg-yellow-400/10 text-yellow-400 px-3 py-1">Pendiente de aprobación</span>
            )}
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-zinc-400 text-sm">Miembro desde</span>
            <span className="text-white text-sm font-medium">
              {new Date(cliente.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="flex justify-between items-center">
        <p className="text-zinc-500 text-sm">
          {cliente.aprobado ? 'Tienes acceso completo a todos los precios' : 'Podrás ver los precios cuando tu cuenta sea aprobada'}
        </p>
        <button
          onClick={cerrarSesion}
          className="text-xs border border-zinc-700 text-zinc-400 px-4 py-2 hover:border-red-400 hover:text-red-400 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>

    </div>
  )
}

export default MiCuenta