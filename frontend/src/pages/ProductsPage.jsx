import { useEffect, useState } from "react"

function ProductsPage({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error cargando productos:", error))
  }, [])

  return (
    <main className="pt-32 px-6 min-h-screen bg-[#fff7fb]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <p className="uppercase tracking-[0.4em] text-pink-400 font-bold mb-4">
            Tienda
          </p>

          <h1 className="text-5xl font-black text-pink-600 mb-4">
            Productos Peppa Tendencia
          </h1>

          <p className="text-pink-900/60 text-lg">
            Explora los productos agregados por Mariajose.
          </p>
        </div>

        {productos.length === 0 ? (
          <p className="text-center text-pink-900/60 text-lg">
            Todavía no hay productos disponibles.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="bg-white rounded-[35px] shadow-xl overflow-hidden border border-pink-100"
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-80 object-cover"
                />

                <div className="p-6">
                  <p className="text-pink-400 font-bold mb-2">
                    {producto.categoria}
                  </p>

                  <h2 className="text-2xl font-black text-pink-600 mb-2">
                    {producto.nombre}
                  </h2>

                  <p className="text-xl font-bold text-pink-900 mb-2">
                    ${producto.precio}
                  </p>

                  <p className="text-pink-900/60 mb-5">
                    Stock: {producto.stock}
                  </p>

                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-full font-black shadow-lg"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default ProductsPage