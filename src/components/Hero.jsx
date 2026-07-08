import { useCallback } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useNavigate } from 'react-router-dom'
import heroBg from '../assets/luvk.jpg'

function Hero() {
  const navigate = useNavigate()

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <section className="relative bg-black min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: { value: 'transparent' } },
          fpsLimit: 60,
          particles: {
            color: { value: ['#f59e0b', '#fbbf24', '#fcd34d', '#ffffff'] },
            move: {
              enable: true,
              speed: 0.8,
              direction: 'none',
              random: true,
              straight: false,
              outModes: { default: 'out' },
            },
            number: { value: 80, density: { enable: true, area: 800 } },
            opacity: {
              value: { min: 0.1, max: 0.6 },
              animation: { enable: true, speed: 0.5, minimumValue: 0.1 },
            },
            shape: { type: 'circle' },
            size: {
              value: { min: 1, max: 3 },
              animation: { enable: true, speed: 1, minimumValue: 0.5 },
            },
          },
          detectRetina: true,
        }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      <div className="relative z-10 text-center px-6">
        <p className="text-yellow-400 text-sm tracking-[0.3em] uppercase mb-4">Metales preciosos de inversión</p>
        <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
          El valor real <br />
          <span className="text-yellow-400">nunca caduca</span>
        </h2>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
          Lingotes y monedas de oro, plata y platino certificados. Inversión segura respaldada por metal físico.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/catalogo')}
            className="bg-yellow-400 text-black font-semibold px-8 py-3 hover:bg-yellow-300 transition-colors"
          >
            Ver catálogo
          </button>
          <button
            onClick={() => navigate('/precios')}
            className="border border-yellow-400 text-yellow-400 px-8 py-3 hover:bg-yellow-400/10 transition-colors"
          >
            Precio del oro hoy
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero