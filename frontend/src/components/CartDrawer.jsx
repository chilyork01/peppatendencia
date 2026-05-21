import { X, Trash2, ShoppingBag, MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "56973431340"

function CartDrawer({
  carrito,
  abierto,
  cerrarCarrito,
  eliminarDelCarrito
}) {
  const total = carrito.reduce((acc, producto) => {
    const precioLimpio = Number(
      String(producto.precio).replace(/[^0-9]/g, "")
    )

    return acc + precioLimpio
  }, 0)

  const totalFormateado = total.toLocaleString("es-CL")

  const mensajeWhatsApp = encodeURIComponent(
    `Hola Mariajose 👋
Quiero hacer este pedido:

${carrito
  .map(
    (producto, index) =>
      `${index + 1}. ${producto.nombre}
Categoría: ${producto.categoria || "Sin categoría"}
Precio: $${producto.precio}`
  )
  .join("\n\n")}

Total aproximado: $${totalFormateado}

Mi nombre es:
Mi dirección es:
Método de pago:
Comentarios:`
  )

  return (
    <div className={`fixed inset-0 z-[100] ${abierto ? "visible" : "invisible"}`}>
      <div
        onClick={cerrarCarrito}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${
          abierto ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      <aside
        className={`absolute right-0 top-0 h-full w-full sm:max-w-md bg-[#fff7fb] shadow-2xl transition-transform duration-300 flex flex-col ${
          abierto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-white px-5 py-5 border-b border-pink-100 flex justify-between items-center">
          <div>
            <p className="uppercase tracking-[0.25em] text-pink-300 text-xs font-black mb-1">
              Peppa Tendencia
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-pink-600">
              Tu carrito
            </h3>
          </div>

          <button
            onClick={cerrarCarrito}
            className="bg-pink-50 text-pink-500 p-3 rounded-full hover:bg-pink-100 transition"
          >
            <X size={24} />
          </button>
        </div>

        {carrito.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
            <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mb-5">
              <ShoppingBag size={34} className="text-pink-400" />
            </div>

            <h4 className="text-2xl font-black text-pink-600 mb-2">
              Tu carrito está vacío
            </h4>

            <p className="text-pink-900/60">
              Agrega productos para preparar tu pedido por WhatsApp.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              {carrito.map((producto, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[24px] p-4 shadow-sm border border-pink-100 flex gap-4"
                >
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-24 h-24 object-cover rounded-2xl bg-pink-50"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-pink-600 leading-snug line-clamp-2">
                      {producto.nombre}
                    </h4>

                    {producto.categoria && (
                      <p className="text-sm text-pink-900/50 mt-1">
                        {producto.categoria}
                      </p>
                    )}

                    <p className="font-black text-pink-900 mt-2">
                      ${producto.precio}
                    </p>
                  </div>

                  <button
                    onClick={() => eliminarDelCarrito(index)}
                    className="text-red-400 hover:bg-red-50 p-2 rounded-full h-fit transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white border-t border-pink-100 p-5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-pink-900/60 font-bold">
                  Productos
                </span>
                <span className="text-pink-600 font-black">
                  {carrito.length}
                </span>
              </div>

              <div className="flex justify-between items-center text-2xl font-black text-pink-600 mb-5">
                <span>Total</span>
                <span>${totalFormateado}</span>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-full font-black shadow-lg flex items-center justify-center gap-2 transition"
              >
                <MessageCircle size={22} />
                Comprar por WhatsApp
              </a>

              <p className="text-xs text-center text-pink-900/40 mt-3">
                El total es aproximado. Mariajose confirmará disponibilidad y entrega.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer