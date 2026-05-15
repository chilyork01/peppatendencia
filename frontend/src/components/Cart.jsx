function Cart({ carrito, eliminarDelCarrito, whatsappLink }) {
  return (
    <section id="carrito" className="py-24 px-6 bg-pink-50">
      <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-xl p-10">
        <h3 className="text-4xl font-black text-pink-600 mb-8">
          Carrito de Compras
        </h3>

        {carrito.length === 0 ? (
          <p className="text-pink-900/60 text-lg">
            Tu carrito está vacío.
          </p>
        ) : (
          <div className="space-y-5">
            {carrito.map((producto, index) => (
              <div key={index} className="flex justify-between items-center border-b border-pink-100 pb-4">
                <div>
                  <h4 className="text-xl font-bold text-pink-600">
                    {producto.nombre}
                  </h4>

                  <p className="text-pink-400 font-bold">
                    {producto.precio}
                  </p>
                </div>

                <button
                  onClick={() => eliminarDelCarrito(index)}
                  className="bg-red-100 text-red-500 px-4 py-2 rounded-full font-bold hover:bg-red-200"
                >
                  Eliminar
                </button>
              </div>
            ))}

            <a
              href={whatsappLink}
              target="_blank"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-bold shadow-lg"
            >
              Comprar por WhatsApp
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export default Cart