import { Link } from 'react-router-dom'

function PrecioProtegido({ precio, className = '' }) {
  const estaLogueado = !!localStorage.getItem('clienteToken')

  if (estaLogueado) {
    return <span className={className}>{precio}</span>
  }

  return (
    <Link to="/acceso" className={`relative inline-block ${className}`}>
      <span className="blur-sm select-none">{precio}</span>
      <span className="absolute inset-0 flex items-center justify-center text-xs text-yellow-400 bg-black/40 backdrop-blur-[1px]">
        🔒
      </span>
    </Link>
  )
}

export default PrecioProtegido