import { X, Trash2 } from "lucide-react"

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

  const mensajeWhatsApp = encodeURIComponent(
    `Hola Mariajose 👋
Quiero hacer este pedido:

${carrito
  .map(
    (producto, index) =>
      `${index + 1}. ${producto.nombre}
Categoría: ${producto.categoria}
Precio: $${producto.precio}`
  )
  .join("\n\n")}

Total aproximado: $${total}

Mi nombre es:
Mi dirección es:
Método de pago:
Comentarios:`
  )

  return (
    <div className={`fixed inset-0 z-[100] ${abierto ? "visible" : "invisible"}`}>
      <div
        onClick={cerrarCarrito}
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          abierto ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-6 transition-transform duration-300 ${
          abierto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-black text-pink-600">
            Tu carrito
          </h3>

          <button onClick={cerrarCarrito} className="text-pink-500">
            <X size={28} />
          </button>
        </div>

        {carrito.length === 0 ? (
          <p className="text-pink-900/60">
            Tu carrito está vacío.
          </p>
        ) : (
          <div className="space-y-5">
            {carrito.map((producto, index) => (
              <div
                key={index}
                className="flex gap-4 border-b border-pink-100 pb-4"
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-20 h-20 object-cover rounded-2xl"
                />

                <div className="flex-1">
                  <h4 className="font-bold text-pink-600">
                    {producto.nombre}
                  </h4>

                  <p className="font-bold text-pink-400">
                    ${producto.precio}
                  </p>

                  {producto.categoria && (
                    <p className="text-sm text-pink-900/50">
                      {producto.categoria}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => eliminarDelCarrito(index)}
                  className="text-red-400"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            <div className="pt-4 border-t border-pink-100">
              <div className="flex justify-between text-xl font-black text-pink-600 mb-5">
                <span>Total:</span>
                <span>${total}</span>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-green-500 hover:bg-green-600 text-white py-4 rounded-full font-black shadow-lg"
              >
                Finalizar compra por WhatsApp
              </a>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer