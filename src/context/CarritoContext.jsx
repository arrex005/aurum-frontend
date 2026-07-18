import { createContext, useContext, useState, useEffect } from 'react'

const CarritoContext = createContext()

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(() => {
    // Cargamos el carrito guardado al iniciar
    try {
      const guardado = localStorage.getItem('carrito')
      return guardado ? JSON.parse(guardado) : []
    } catch {
      return []
    }
  })

  // Guardamos en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(items))
  }, [items])

  const añadir = (producto) => {
    setItems((prev) => {
      // Si ya está, no lo duplicamos (los lingotes/diamantes son únicos por id)
      const existe = prev.find((p) => p.id === producto.id && p.tipo === producto.tipo)
      if (existe) return prev
      return [...prev, producto]
    })
  }

  const quitar = (id, tipo) => {
    setItems((prev) => prev.filter((p) => !(p.id === id && p.tipo === tipo)))
  }

  const vaciar = () => setItems([])

  const total = items.reduce((suma, p) => suma + (p.precio || 0), 0)
  const cantidad = items.length

  return (
    <CarritoContext.Provider value={{ items, añadir, quitar, vaciar, total, cantidad }}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  return useContext(CarritoContext)
}