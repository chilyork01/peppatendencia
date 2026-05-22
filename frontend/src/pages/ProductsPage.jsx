import { useEffect, useState } from "react"
import { ShoppingBag, Search } from "lucide-react"
import { motion } from "framer-motion"

function ProductsPage({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas")

  useEffect(() => {
    fetch("https://peppatendencia-api.onrender.com/products")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error cargando productos:", error))
  }, [])

  const categorias = [
    "Todas",
    ...new Set(
      productos
        .map((producto) => producto.categoria)
        .filter(Boolean)
    ),
  ]

  const productosFiltrados = productos.filter((producto) => {
    const tieneStock = Number(producto.stock) > 0

    const coincideBusqueda = producto.nombre
      ?.toLowerCase()
      .includes(busqueda.toLowerCase())

    const coincideCategoria =
      categoriaSeleccionada === "Todas" ||
      producto.categoria === categoriaSeleccionada

    return tieneStock && coincideBusqueda && coincideCategoria
  })

  return (
    <main className="pt-28 md:pt-32 px-4 md:px-6 pb-20 min-h-screen bg-[#fff7fb]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-12 text-center">
          <p className="uppercase tracking-[0.3em] md:tracking-[0.4em] text-pink-400 font-bold mb-4 text-sm">
            Tienda
          </p>

          <h1 className="text-4xl md:text-5xl font-black text-pink-600 mb-4">
            Productos Peppa Tendencia
          </h1>

          <p className="text-pink-900/60 text-base md:text-lg max-w-2xl mx-auto">
            Explora prendas y accesorios seleccionados especialmente para ti.
          </p>
        </div>

        <div className="relative mb-6">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-300"
          />

          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full border border-pink-200 rounded-full pl-14 pr-6 py-4 outline-none focus:ring-2 focus:ring-pink-300 bg-white shadow-sm"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 md:justify-center">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaSeleccionada(categoria)}
              className={`shrink-0 px-6 py-3 rounded-full font-bold transition ${
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
          <div className="bg-white rounded-[30px] p-10 text-center shadow-lg border border-pink-100">
            <p className="text-pink-900/60 text-lg">
              No se encontraron productos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {productosFiltrados.map((producto) => (
             <motion.article
  key={producto.id}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  whileHover={{ y: -8 }}
  className="group bg-white rounded-[30px] md:rounded-[35px] shadow-lg hover:shadow-2xl overflow-hidden border border-pink-100 transition duration-300"
>
                <div className="relative overflow-hidden bg-pink-50">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition duration-500"
                  />

                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-pink-500 text-sm font-black shadow">
                    {producto.categoria}
                  </span>
                </div>

                <div className="p-5 md:p-6">
                  <h2 className="text-xl md:text-2xl font-black text-pink-600 mb-2 line-clamp-2">
                    {producto.nombre}
                  </h2>

                  <div className="flex items-center justify-between mb-5">
                    <p className="text-2xl font-black text-pink-900">
                      ${producto.precio}
                    </p>

                    <p className="text-sm font-bold text-pink-900/50">
                      Stock: {producto.stock}
                    </p>
                  </div>

                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-full font-black shadow-lg flex items-center justify-center gap-2 transition"
                  >
                    <ShoppingBag size={20} />
                    Agregar
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default ProductsPage