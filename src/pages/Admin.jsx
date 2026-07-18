import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function Admin() {
  const [tab, setTab] = useState('mensajes')
  const [mensajes, setMensajes] = useState([])
  const [clientes, setClientes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [filtro, setFiltro] = useState('todos')
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const headers = { Authorization: `Bearer ${token}` }

  const cargarDatos = () => {
    if (!token) {
      navigate('/login')
      return
    }

    setCargando(true)
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/admin/mensajes`, { headers }),
      fetch(`${import.meta.env.VITE_API_URL}/api/admin/clientes`, { headers }),
    ])
      .then(async ([resMensajes, resClientes]) => {
        if (resMensajes.status === 401) {
          localStorage.removeItem('token')
          navigate('/login')
          return
        }
        const dataMensajes = await resMensajes.json()
        const dataClientes = await resClientes.json()
        setMensajes(dataMensajes)
        setClientes(dataClientes)
        setCargando(false)
      })
      .catch(() => setCargando(false))
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  const marcarLeido = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/admin/mensajes/${id}/leido`, {
      method: 'PATCH',
      headers,
    })
    cargarDatos()
  }

  const eliminarMensaje = async (id) => {
    if (!window.confirm('Eliminar este mensaje?')) return
    await fetch(`${import.meta.env.VITE_API_URL}/api/admin/mensajes/${id}`, {
      method: 'DELETE',
      headers,
    })
    cargarDatos()
  }

  const aprobarCliente = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/admin/clientes/${id}/aprobar`, {
      method: 'PATCH',
      headers,
    })
    cargarDatos()
  }

  const eliminarCliente = async (id) => {
    if (!window.confirm('Eliminar este cliente?')) return
    await fetch(`${import.meta.env.VITE_API_URL}/api/admin/clientes/${id}`, {
      method: 'DELETE',
      headers,
    })
    cargarDatos()
  }

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const mensajesFiltrados = mensajes.filter((m) => {
    if (filtro === 'no-leidos') return !m.leido
    if (filtro === 'leidos') return m.leido
    return true
  })

  const noLeidos = mensajes.filter((m) => !m.leido).length
  const pendientes = clientes.filter((c) => !c.aprobado).length

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-yellow-400 text-sm tracking-widest uppercase mb-2">Panel privado</p>
          <h1 className="text-4xl font-bold text-white">Administración</h1>
        </div>
        <button
          onClick={cerrarSesion}
          className="text-xs border border-zinc-700 text-zinc-400 px-4 py-2 hover:border-red-400 hover:text-red-400 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="flex gap-2 mb-8 border-b border-zinc-800">
        <button
          onClick={() => setTab('mensajes')}
          className={`px-5 py-3 text-sm font-medium transition-colors relative ${
            tab === 'mensajes' ? 'text-yellow-400' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Mensajes {noLeidos > 0 && <span className="ml-1 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">{noLeidos}</span>}
          {tab === 'mensajes' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400" />}
        </button>
        <button
          onClick={() => setTab('clientes')}
          className={`px-5 py-3 text-sm font-medium transition-colors relative ${
            tab === 'clientes' ? 'text-yellow-400' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Clientes {pendientes > 0 && <span className="ml-1 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">{pendientes}</span>}
          {tab === 'clientes' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400" />}
        </button>
      </div>

      {cargando ? (
        <div className="text-center py-20 text-zinc-500">Cargando...</div>
      ) : tab === 'mensajes' ? (
        <>
          <div className="flex gap-2 mb-6">
            {['todos', 'no-leidos', 'leidos'].map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-4 py-2 text-xs border transition-colors ${
                  filtro === f
                    ? 'bg-yellow-400 text-black border-yellow-400 font-semibold'
                    : 'border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400'
                }`}
              >
                {f === 'todos' ? 'Todos' : f === 'no-leidos' ? 'No leídos' : 'Leídos'}
              </button>
            ))}
          </div>

          {mensajesFiltrados.length === 0 ? (
            <div className="text-center py-20 border border-zinc-800 text-zinc-600">No hay mensajes</div>
          ) : (
            <div className="flex flex-col gap-3">
              <AnimatePresence>
                {mensajesFiltrados.map((m) => (
                  <motion.div
                    key={m.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={m.leido ? 'border p-5 border-zinc-800 bg-zinc-900' : 'border p-5 border-yellow-400/40 bg-zinc-900'}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {!m.leido && <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>}
                          <p className="text-white font-semibold">{m.nombre}</p>
                        </div>
                        <p className="text-zinc-500 text-xs">{m.email}</p>
                      </div>
                      <p className="text-zinc-500 text-xs">{new Date(m.createdAt).toLocaleString('es-ES')}</p>
                    </div>
                    <p className="text-yellow-400 text-sm font-medium mb-2">{m.asunto}</p>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-4">{m.mensaje}</p>
                    <div className="flex gap-2">
                      {!m.leido && (
                        <button onClick={() => marcarLeido(m.id)} className="text-xs border border-zinc-700 text-zinc-400 px-3 py-1.5 hover:border-yellow-400 hover:text-yellow-400 transition-colors">
                          Marcar como leído
                        </button>
                      )}
                      <a href={`mailto:${m.email}`} className="text-xs border border-zinc-700 text-zinc-400 px-3 py-1.5 hover:border-yellow-400 hover:text-yellow-400 transition-colors">
                        Responder
                      </a>
                      <button onClick={() => eliminarMensaje(m.id)} className="text-xs border border-zinc-700 text-zinc-400 px-3 py-1.5 hover:border-red-400 hover:text-red-400 transition-colors">
                        Eliminar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </>
      ) : (
        <>
          {clientes.length === 0 ? (
            <div className="text-center py-20 border border-zinc-800 text-zinc-600">No hay clientes registrados</div>
          ) : (
            <div className="flex flex-col gap-3">
              <AnimatePresence>
                {clientes.map((c) => (
                  <motion.div
                    key={c.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={c.aprobado ? 'border p-5 border-zinc-800 bg-zinc-900 flex items-center justify-between' : 'border p-5 border-yellow-400/40 bg-zinc-900 flex items-center justify-between'}
                  >
<div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {!c.aprobado && <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>}
                        <p className="text-white font-semibold">{c.nombre} {c.apellidos}</p>
                        {c.aprobado
                          ? <span className="text-xs bg-green-400/10 text-green-400 px-2 py-0.5">Aprobado</span>
                          : <span className="text-xs bg-yellow-400/10 text-yellow-400 px-2 py-0.5">Pendiente</span>}
                        {c.emailVerificado
                          ? <span className="text-xs bg-blue-400/10 text-blue-400 px-2 py-0.5">✓ Email verificado</span>
                          : <span className="text-xs bg-red-400/10 text-red-400 px-2 py-0.5">✗ Sin verificar</span>}
                      </div>
                      <p className="text-zinc-400 text-xs">{c.email}</p>
                      {c.telefono && <p className="text-zinc-400 text-xs mt-0.5">📞 {c.telefono}</p>}
                      <p className="text-zinc-600 text-xs mt-1">Registrado el {new Date(c.createdAt).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div className="flex gap-2">
                      {!c.aprobado && (
                        <button onClick={() => aprobarCliente(c.id)} className="text-xs bg-yellow-400 text-black font-semibold px-4 py-2 hover:bg-yellow-300 transition-colors">
                          Aprobar
                        </button>
                      )}
                      <button onClick={() => eliminarCliente(c.id)} className="text-xs border border-zinc-700 text-zinc-400 px-3 py-2 hover:border-red-400 hover:text-red-400 transition-colors">
                        Eliminar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </>
      )}

    </div>
  )
}

export default Admin