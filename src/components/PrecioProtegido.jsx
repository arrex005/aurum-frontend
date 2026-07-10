import { Link } from 'react-router-dom'

function PrecioProtegido({ precio, className = '', tamano = 'normal' }) {
  const estaLogueado = !!localStorage.getItem('clienteToken')

  if (precio) {
    return <span className={className}>{precio}</span>
  }

  const estilos = tamano === 'grande'
    ? 'text-sm px-4 py-2'
    : 'text-xs px-3 py-1.5'

  return (
    <Link
      to="/acceso"
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center gap-1.5 border border-yellow-400/50 text-yellow-400 ${estilos} hover:bg-yellow-400 hover:text-black transition-colors whitespace-nowrap`}
    >
      <span>🔒</span>
      <span>Ver precio</span>
    </Link>
  )
}

export default PrecioProtegido