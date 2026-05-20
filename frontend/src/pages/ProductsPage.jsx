import { useEffect, useState } from "react"

function ProductsPage({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas")

  useEffect(() => {
    fetch("https://peppatendencia-api.onrender.com/products")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) =>
        console.error("Error cargando productos:", error)
      )
  }, [])

  const categorias = [
    "Todas",
    ...new Set(productos.map((producto) => producto.categoria)),
  ]

  const productosFiltrados = productos.filter((producto) => {
    const tieneStock = Number(producto.stock) > 0

    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())

    const coincideCategoria =
      categoriaSeleccionada === "Todas" ||
      producto.categoria === categoriaSeleccionada

    return tieneStock && coincideBusqueda && coincideCategoria
  })

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

        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full mb-6 border border-pink-200 rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-pink-300"
        />

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaSeleccionada(categoria)}
              className={`px-6 py-3 rounded-full font-bold transition ${
                categoriaSeleccionada === categoria
                  ? "bg-pink-500 text-white shadow-lg"
                  : "bg-white text-pink-500 border border-pink-200 hover:bg-pink-50"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {productosFiltrados.length === 0 ? (
          <p className="text-center text-pink-900/60 text-lg">
            No se encontraron productos.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosFiltrados.map((producto) => (
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