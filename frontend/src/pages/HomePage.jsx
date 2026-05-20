import Hero from "../components/Hero"
import Products from "../components/products"
import Contact from "../components/Contact"

function HomePage({ agregarAlCarrito, whatsappNumber }) {
  return (
    <>
      <Hero />
      <Products agregarAlCarrito={agregarAlCarrito} />
      <Contact whatsappNumber={whatsappNumber} />
    </>
  )
}

export default HomePage