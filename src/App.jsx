import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Rentabilidad from './pages/Rentabilidad'
import Home from './pages/Home'
import Blog from './pages/Blog'
import TestimoniosPage from './pages/TestimoniosPage'
import CatalogoPage from './pages/CatalogoPage'
import ProductoDetalle from './pages/ProductoDetalle'
import Contacto from './pages/Contacto'
import Precios from './pages/Precios'
import SobreNosotros from './pages/SobreNosotros'
import { useEffect } from 'react'
import ModalBienvenida from './components/ModalBienvenida'
import FAQ from './pages/FAQ'
import NotFound from './pages/NotFound'
import LoadingScreen from './components/LoadingScreen'
import Comparador from './pages/Comparador'
import ArticuloDetalle from './pages/ArticuloDetalle'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Acceso from './pages/Acceso'
import Piedras from './pages/Piedras'
import RutaProtegida from './components/RutaProtegida'
import MiCuenta from './pages/MiCuenta'
import DiamanteDetalle from './pages/DiamanteDetalle'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
)

function App() {
  const location = useLocation()
  

  return (
    <div className="bg-black min-h-screen text-white" style={{ cursor: 'none' }}>
      <Cursor />
      <ModalBienvenida />
      <LoadingScreen />
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/catalogo" element={<PageWrapper><CatalogoPage /></PageWrapper>} />
          <Route path="/producto/:id" element={<PageWrapper><ProductoDetalle /></PageWrapper>} />
          <Route path="/contacto" element={<PageWrapper><Contacto /></PageWrapper>} />
          <Route path="/precios" element={<PageWrapper><Precios /></PageWrapper>} />
          <Route path="/sobre-nosotros" element={<PageWrapper><SobreNosotros /></PageWrapper>} />
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          <Route path="/comparador" element={<PageWrapper><Comparador /></PageWrapper>} />
          <Route path="/rentabilidad" element={<PageWrapper><Rentabilidad /></PageWrapper>} />
          <Route path="/faq" element={<PageWrapper><FAQ /></PageWrapper>} />
          <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
          <Route path="/blog/:id" element={<PageWrapper><ArticuloDetalle /></PageWrapper>} />
          <Route path="/testimonios" element={<PageWrapper><TestimoniosPage /></PageWrapper>} />
          <Route path="/admin" element={<RutaProtegida><PageWrapper><Admin /></PageWrapper></RutaProtegida>} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/registro" element={<PageWrapper><Registro /></PageWrapper>} />
          <Route path="/acceso" element={<PageWrapper><Acceso /></PageWrapper>} />
          <Route path="/diamantes" element={<PageWrapper><Piedras /></PageWrapper>} />
          <Route path="/diamante/:id" element={<PageWrapper><DiamanteDetalle /></PageWrapper>} />

          <Route path="/mi-cuenta" element={<PageWrapper><MiCuenta/></PageWrapper>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App