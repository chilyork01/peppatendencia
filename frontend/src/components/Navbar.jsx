import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, Menu, X } from "lucide-react"

function Navbar({ carritoCantidad, abrirCarrito }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => {
    setMenuAbierto(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/90 border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        
        <Link
          to="/"
          onClick={cerrarMenu}
          className="text-xl md:text-3xl font-black text-pink-500"
        >
          Peppa Tendencia
        </Link>

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

        <div className="flex items-center gap-3">
          <button
            onClick={abrirCarrito}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded-full shadow-lg font-bold flex items-center gap-2"
          >
            <ShoppingBag size={20} />
            <span>{carritoCantidad}</span>
          </button>

          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="md:hidden bg-pink-50 text-pink-600 p-3 rounded-full border border-pink-100"
          >
            {menuAbierto ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuAbierto && (
        <div className="md:hidden bg-white border-t border-pink-100 shadow-lg px-6 py-5">
          <div className="flex flex-col gap-5 text-pink-700 font-bold">
            <Link onClick={cerrarMenu} to="/">
              Inicio
            </Link>

            <Link onClick={cerrarMenu} to="/productos">
              Productos
            </Link>

            <Link onClick={cerrarMenu} to="/contacto">
              Contacto
            </Link>

            <Link onClick={cerrarMenu} to="/admin-login">
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar