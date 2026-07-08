import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-yellow-400/20 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-yellow-400 text-2xl font-bold tracking-widest uppercase mb-4">Aurum</h3>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Especialistas en metales preciosos de inversión. Lingotes y monedas de oro, plata y platino certificados con los más altos estándares de calidad.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-zinc-500 hover:text-yellow-400 transition-colors text-sm">Instagram</a>
              <a href="#" className="text-zinc-500 hover:text-yellow-400 transition-colors text-sm">LinkedIn</a>
              <a href="#" className="text-zinc-500 hover:text-yellow-400 transition-colors text-sm">YouTube</a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-4">Catálogo</h4>
            <ul className="space-y-2">
              <li><Link to="/catalogo" className="text-zinc-400 text-sm hover:text-yellow-400 transition-colors">Lingotes de oro</Link></li>
              <li><Link to="/catalogo" className="text-zinc-400 text-sm hover:text-yellow-400 transition-colors">Monedas de oro</Link></li>
              <li><Link to="/catalogo" className="text-zinc-400 text-sm hover:text-yellow-400 transition-colors">Lingotes de plata</Link></li>
              <li><Link to="/catalogo" className="text-zinc-400 text-sm hover:text-yellow-400 transition-colors">Monedas de plata</Link></li>
              <li><Link to="/catalogo" className="text-zinc-400 text-sm hover:text-yellow-400 transition-colors">Platino</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><Link to="/sobre-nosotros" className="text-zinc-400 text-sm hover:text-yellow-400 transition-colors">Sobre nosotros</Link></li>
              <li><Link to="/precios" className="text-zinc-400 text-sm hover:text-yellow-400 transition-colors">Precios en vivo</Link></li>
              <li><Link to="/contacto" className="text-zinc-400 text-sm hover:text-yellow-400 transition-colors">Vender metales</Link></li>
              <li><Link to="/rentabilidad" className="text-zinc-400 text-sm hover:text-yellow-400 transition-colors">Calculadora histórica</Link></li>
              <li><Link to="/contacto" className="text-zinc-400 text-sm hover:text-yellow-400 transition-colors">Contacto</Link></li>
              <li><Link to="/faq" className="text-zinc-400 text-sm hover:text-yellow-400 transition-colors">Preguntas frecuentes</Link></li>
              <li><Link to="/blog" className="text-zinc-400 text-sm hover:text-yellow-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-xs">© 2025 Aurum. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="text-zinc-500 text-xs hover:text-yellow-400 transition-colors">Política de privacidad</a>
            <a href="#" className="text-zinc-500 text-xs hover:text-yellow-400 transition-colors">Cookies</a>
            <a href="#" className="text-zinc-500 text-xs hover:text-yellow-400 transition-colors">Términos y condiciones</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer