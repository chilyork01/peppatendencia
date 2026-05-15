function Contact({ whatsappNumber }) {
  return (
    <section id="contacto" className="py-24 px-6">
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-pink-500 to-rose-400 rounded-[50px] p-16 text-center shadow-2xl">
        <p className="uppercase tracking-[0.4em] text-pink-100 font-bold mb-5">
          Peppa Tendencia
        </p>

        <h3 className="text-5xl font-black text-white mb-8">
          ¿Lista para renovar tu estilo?
        </h3>

        <p className="text-pink-100 text-xl mb-10">
          Contáctanos por WhatsApp y descubre las últimas tendencias.
        </p>

        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          className="bg-white text-pink-500 px-10 py-5 rounded-full font-black text-lg shadow-2xl hover:scale-105 transition inline-block"
        >
          Hablar por WhatsApp
        </a>
      </div>
    </section>
  )
}

export default Contact