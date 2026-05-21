import { Link } from "react-router-dom"

function Hero() {
  return (
    <section id="inicio" className="pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <p className="uppercase tracking-[0.25em] md:tracking-[0.4em] text-pink-400 font-bold mb-6 text-sm">
            Santiago de Chile
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight text-pink-600 mb-6 md:mb-8">
            Moda femenina moderna y elegante
          </h2>

          <p className="text-pink-900/70 text-lg md:text-xl leading-relaxed mb-8 md:mb-10">
            Descubre ropa y accesorios únicos seleccionados por Mariajose Vergara.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              to="/productos"
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-full shadow-2xl font-bold text-base md:text-lg"
            >
              Ver Colección
            </Link>

            <Link
              to="/contacto"
              className="bg-white text-pink-500 border border-pink-200 hover:bg-pink-50 px-8 md:px-10 py-4 md:py-5 rounded-full shadow-lg font-bold text-base md:text-lg"
            >
              Contactar
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-8 -left-8 w-32 md:w-40 h-32 md:h-40 bg-pink-200 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-8 -right-8 w-32 md:w-40 h-32 md:h-40 bg-rose-300 rounded-full blur-3xl opacity-50"></div>

          <div className="relative bg-white p-3 md:p-5 rounded-[30px] md:rounded-[40px] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200"
              alt="Moda"
              className="rounded-[24px] md:rounded-[30px] h-[420px] md:h-[650px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero