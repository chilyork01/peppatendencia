import Hero from "../components/Hero"
import ProductsPage from "./ProductsPage"
import Contact from "../components/Contact"

function HomePage({ agregarAlCarrito, whatsappNumber }) {
  return (
    <>
      <Hero />
      <ProductsPage agregarAlCarrito={agregarAlCarrito} />
      <Contact whatsappNumber={whatsappNumber} />
    </>
  )
}

export default HomePage