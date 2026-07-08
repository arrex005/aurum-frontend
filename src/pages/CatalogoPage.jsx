import Catalogo from '../components/Catalogo'

function CatalogoPage() {
  return (
    <div className="pt-8">
      <div className="text-center py-12 border-b border-zinc-800">
        <p className="text-yellow-400 text-sm tracking-widest uppercase mb-2">Inversión en metal físico</p>
        <h1 className="text-5xl font-bold text-white">Catálogo completo</h1>
      </div>
      <Catalogo />
    </div>
  )
}

export default CatalogoPage