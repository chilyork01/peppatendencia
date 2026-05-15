import { Link } from "react-router-dom"
import { ShoppingBag } from "lucide-react"

function Navbar({ carritoCantidad, abrirCarrito }) {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <h1 className="text-2xl md:text-3xl font-black text-pink-500">
          Peppa Tendencia
        </h1>

        <div className="hidden md:flex gap-8 text-pink-700 font-semibold">

          <Link to="/" className="hover:text-pink-500">
            Inicio
          </Link>

          <Link to="/productos" className="hover:text-pink-500">
            Productos
          </Link>

          <Link to="/contacto" className="hover:text-pink-500">
            Contacto
          </Link>

          <Link to="/admin-login" className="hover:text-pink-500">
  Admin
</Link>

        </div>

        <button
          onClick={abrirCarrito}
          className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-full shadow-lg font-bold flex items-center gap-2"
        >
          <ShoppingBag size={20} />
          {carritoCantidad}
        </button>

      </div>
    </nav>
  )
}

export default Navbar