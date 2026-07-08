import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Calculadora from '../components/Calculadora'
import Catalogo from '../components/Catalogo'
import PorQueOro from '../components/PorQueOro'
import Confianza from '../components/Confianza'
import Testimonios from '../components/Testimonios'
import Blog from './Blog'


const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <Stats />
      <PorQueOro />
      <Calculadora />
      <Catalogo limite={6} />
      <Confianza />
      <Testimonios limite={3} />
      <Blog limite={3} />

    </motion.div>
  )
}

export default Home