import { Link } from "react-router-dom"
import { MessageCircle, MapPin } from "lucide-react"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-pink-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-12">
          
          <div>
            <p className="uppercase tracking-[0.3em] text-pink-300 font-black text-xs mb-4">
              Peppa Tendencia
            </p>

            <h3 className="text-4xl font-black text-pink-500 mb-4">
              Moda femenina moderna
            </h3>

            <p className="text-pink-900/60 leading-relaxed">
              Moda femenina en Santiago de Chile. Prendas y accesorios seleccionados con estilo.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-black text-pink-600 mb-5">
              Navegación
            </h4>

            <div className="flex flex-col gap-4 text-pink-900/70 font-semibold">
              <Link to="/">Inicio</Link>
              <Link to="/productos">Productos</Link>
              <Link to="/contacto">Contacto</Link>
              <Link to="/admin-login">Admin</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-black text-pink-600 mb-5">
              Contacto
            </h4>

            <div className="space-y-4 text-pink-900/70 font-semibold">
              <a
                href="https://wa.me/56973431340"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-pink-500"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>

              <p className="flex items-center gap-3">
                <MapPin size={20} />
                Santiago de Chile
              </p>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 block"
              >
                Instagram
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 block"
              >
                Facebook
              </a>
              <a
  href="https://www.tiktok.com"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-pink-500 block"
>
  TikTok
</a>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-100 mt-12 pt-6 text-center">
          <p className="text-pink-900/50 text-sm">
            © {currentYear} Peppa Tendencia. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer