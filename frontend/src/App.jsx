import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import CartDrawer from "./components/CartDrawer"
import Footer from "./components/Footer"
import AppRoutes from "./routes/AppRoutes"

const WHATSAPP_NUMBER = "56973431340"

function App() {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito")

    return carritoGuardado ? JSON.parse(carritoGuardado) : []
  })

  const [carritoAbierto, setCarritoAbierto] = useState(false)

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
  }, [carrito])

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto])
    setCarritoAbierto(true)
  }

  const eliminarDelCarrito = (indexProducto) => {
    setCarrito(carrito.filter((_, index) => index !== indexProducto))
  }

  const total = carrito.reduce((acc, producto) => {
    const precioLimpio = Number(
      String(producto.precio).replace(/[^0-9]/g, "")
    )

    return acc + precioLimpio
  }, 0)

  const mensajeWhatsApp = encodeURIComponent(
    `Hola Mariajose 👋
Quiero hacer este pedido:

${carrito
  .map(
    (producto, index) =>
      `${index + 1}. ${producto.nombre}
Categoría: ${producto.categoria}
Precio: $${producto.precio}
Stock: ${producto.stock}`
  )
  .join("\n\n")}

Total aproximado: $${total}

Mi nombre es:
Mi dirección es:
Método de pago:
Comentarios:`
  )

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeWhatsApp}`

  return (
    <div className="bg-[#fff7fb] min-h-screen overflow-x-hidden">
      <Navbar
        carritoCantidad={carrito.length}
        abrirCarrito={() => setCarritoAbierto(true)}
      />

      <AppRoutes
        carrito={carrito}
        agregarAlCarrito={agregarAlCarrito}
        eliminarDelCarrito={eliminarDelCarrito}
        whatsappNumber={WHATSAPP_NUMBER}
        whatsappLink={whatsappLink}
      />

      <Footer />

      <CartDrawer
        carrito={carrito}
        abierto={carritoAbierto}
        cerrarCarrito={() => setCarritoAbierto(false)}
        eliminarDelCarrito={eliminarDelCarrito}
        whatsappLink={whatsappLink}
      />
    </div>
  )
}

export default App