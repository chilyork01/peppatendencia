function Hero() {
  return (
    <section id="inicio" className="pt-36 pb-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="uppercase tracking-[0.4em] text-pink-400 font-bold mb-6">
            Santiago de Chile
          </p>

          <h2 className="text-5xl lg:text-7xl font-black leading-tight text-pink-600 mb-8">
            Moda femenina moderna y elegante
          </h2>

          <p className="text-pink-900/70 text-xl leading-relaxed mb-10">
            Descubre ropa y accesorios únicos seleccionados por Mariajose Vergara.
          </p>

          <div className="flex gap-5 flex-wrap">
            <a href="#productos" className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-5 rounded-full shadow-2xl font-bold text-lg">
              Ver Colección
            </a>

            <a href="#contacto" className="bg-white text-pink-500 border border-pink-200 hover:bg-pink-50 px-10 py-5 rounded-full shadow-lg font-bold text-lg">
              Contactar
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-8 -left-8 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-rose-300 rounded-full blur-3xl opacity-50"></div>

          <div className="relative bg-white p-5 rounded-[40px] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200"
              alt="Moda"
              className="rounded-[30px] h-[650px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero