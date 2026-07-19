import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import BuscadorGlobal from './BuscadorGlobal'
import { useCarrito } from '../context/CarritoContext'

function Header() {
  const [precios, setPrecios] = useState([])
  const [herramientasAbierto, setHerramientasAbierto] = useState(false)
  const [menuMovil, setMenuMovil] = useState(false)
  const dropdownRef = useRef(null)
  const { cantidad } = useCarrito()

  const fetchPrecios = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/precios`)
      .then((res) => res.json())
      .then((data) => setPrecios(data))
      .catch(() => {})
  }

  useEffect(() => {
    fetchPrecios()
    const intervalo = setInterval(fetchPrecios, 60000)
    return () => clearInterval(intervalo)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setHerramientasAbierto(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const estaLogueado = !!localStorage.getItem('clienteToken')

  const cerrarSesion = () => {
    localStorage.removeItem('clienteToken')
    localStorage.removeItem('clienteNombre')
    window.location.reload()
  }

  return (
    <header className="bg-zinc-900 border-b border-yellow-400/20 sticky top-0 z-50">
      <div className="bg-black/60 px-3 sm:px-6 py-2 flex gap-4 sm:gap-6 text-xs sm:text-sm border-b border-zinc-800 overflow-x-auto whitespace-nowrap">
        {precios.length === 0 ? (
          <span className="text-zinc-500 text-xs">Cargando precios...</span>
        ) : (
          precios.map((p) => (
            <span key={p.nombre} className="text-zinc-400 whitespace-nowrap">
              {p.nombre}{' '}
              <span className="text-yellow-400 font-semibold">
                {p.precio ? (p.precio / 31.1035).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '---'} €/g
              </span>
              {p.variacionPct !== undefined && (
                <span className={`ml-1 text-xs ${p.variacionPct >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {p.variacionPct >= 0 ? '▲' : '▼'} {Math.abs(p.variacionPct).toFixed(2)}%
                </span>
              )}
            </span>
          ))
        )}
      </div>

      <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo-icono.png" alt="Golden Heights" className="h-8 w-auto" />
          <span className="text-yellow-400 text-lg font-bold tracking-widest uppercase leading-none hidden sm:block">
            Golden Heights
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm text-zinc-300">
          <Link to="/" className="hover:text-yellow-400 transition-colors">Inicio</Link>
          <Link to="/catalogo" className="hover:text-yellow-400 transition-colors">Catálogo</Link>
          <Link to="/diamantes" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
            Diamantes
            <span className="bg-yellow-400 text-black text-[9px] font-bold px-1.5 py-0.5 rounded">NEW</span>
          </Link>
          <Link to="/precios" className="hover:text-yellow-400 transition-colors">Precios</Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setHerramientasAbierto(!herramientasAbierto)}
              className={`hover:text-yellow-400 transition-colors flex items-center gap-1 ${herramientasAbierto ? 'text-yellow-400' : ''}`}
            >
              Herramientas
              <span className={`text-xs transition-transform duration-200 ${herramientasAbierto ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {herramientasAbierto && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 z-50">
                <Link to="/rentabilidad" onClick={() => setHerramientasAbierto(false)} className="flex items-center gap-3 px-4 py-3 text-zinc-300 hover:text-yellow-400 hover:bg-zinc-800 transition-colors border-b border-zinc-800">
                  <span>📈</span>
                  <div>
                    <p className="text-sm font-medium">Calculadora</p>
                    <p className="text-xs text-zinc-500">Rentabilidad histórica</p>
                  </div>
                </Link>
                <Link to="/comparador" onClick={() => setHerramientasAbierto(false)} className="flex items-center gap-3 px-4 py-3 text-zinc-300 hover:text-yellow-400 hover:bg-zinc-800 transition-colors">
                  <span>⚖️</span>
                  <div>
                    <p className="text-sm font-medium">Comparador</p>
                    <p className="text-xs text-zinc-500">Compara productos</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link to="/blog" className="hover:text-yellow-400 transition-colors">Historia</Link>
          <Link to="/contacto" className="hover:text-yellow-400 transition-colors">Contacto</Link>

          

          {estaLogueado ? (
            <Link to="/mi-cuenta" className="text-xs bg-yellow-400 text-black font-semibold px-4 py-1.5 hover:bg-yellow-300 transition-colors">
              Mi cuenta
            </Link>
          ) : (
            <Link to="/acceso" className="text-xs bg-yellow-400 text-black font-semibold px-4 py-1.5 hover:bg-yellow-300 transition-colors">
              Acceder
            </Link>
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <BuscadorGlobal />
          <Link to="/carrito" className="relative bg-yellow-400 text-black p-2 rounded hover:bg-yellow-300 transition-colors" aria-label="Carrito">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cantidad > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-yellow-400 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-yellow-400">
                {cantidad}
              </span>
            )}
          </Link>
        </div>

        <button
          onClick={() => setMenuMovil(!menuMovil)}
          className="lg:hidden text-yellow-400 text-2xl"
        >
          {menuMovil ? '✕' : '☰'}
        </button>
      </div>

      {menuMovil && (
        <nav className="lg:hidden bg-zinc-900 border-t border-zinc-800 flex flex-col px-6 py-4 gap-3 text-sm text-zinc-300">
          <Link to="/" onClick={() => setMenuMovil(false)} className="hover:text-yellow-400 transition-colors py-1">Inicio</Link>
          <Link to="/catalogo" onClick={() => setMenuMovil(false)} className="hover:text-yellow-400 transition-colors py-1">Catálogo</Link>
          <Link to="/diamantes" onClick={() => setMenuMovil(false)} className="hover:text-yellow-400 transition-colors py-1">Diamantes</Link>
          <Link to="/precios" onClick={() => setMenuMovil(false)} className="hover:text-yellow-400 transition-colors py-1">Precios</Link>
          <Link to="/rentabilidad" onClick={() => setMenuMovil(false)} className="hover:text-yellow-400 transition-colors py-1">Calculadora</Link>
          <Link to="/comparador" onClick={() => setMenuMovil(false)} className="hover:text-yellow-400 transition-colors py-1">Comparador</Link>
          <Link to="/blog" onClick={() => setMenuMovil(false)} className="hover:text-yellow-400 transition-colors py-1">Historia</Link>
          <Link to="/contacto" onClick={() => setMenuMovil(false)} className="hover:text-yellow-400 transition-colors py-1">Contacto</Link>
          <Link to="/carrito" onClick={() => setMenuMovil(false)} className="hover:text-yellow-400 transition-colors py-1">
            Carrito {cantidad > 0 && <span className="text-yellow-400">({cantidad})</span>}
          </Link>
          {estaLogueado ? (
            <>
              <Link to="/mi-cuenta" onClick={() => setMenuMovil(false)} className="text-yellow-400 font-semibold py-1">
                Mi cuenta
              </Link>
              <button onClick={cerrarSesion} className="text-left text-zinc-400 hover:text-yellow-400 transition-colors py-1">
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/acceso" onClick={() => setMenuMovil(false)} className="text-yellow-400 font-semibold py-1">
              Acceder
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}

export default Header