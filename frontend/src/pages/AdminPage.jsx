import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function AdminPage() {
  const [productos, setProductos] = useState([])
  const [imagen, setImagen] = useState(null)

  const [formulario, setFormulario] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    stock: "",
  })

  const navigate = useNavigate()

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth")

    if (adminAuth !== "true") {
      navigate("/admin-login")
    }
  }, [navigate])

  const cargarProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:4000/products")
      const data = await respuesta.json()
      setProductos(data)
    } catch (error) {
      console.error("Error cargando productos:", error)
    }
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    })
  }

  const agregarProducto = async (e) => {
    e.preventDefault()

    if (
      !formulario.nombre ||
      !formulario.precio ||
      !formulario.categoria ||
      !formulario.stock ||
      !imagen
    ) {
      alert("Completa todos los campos y selecciona una imagen")
      return
    }

    const formData = new FormData()
    formData.append("nombre", formulario.nombre)
    formData.append("precio", formulario.precio)
    formData.append("categoria", formulario.categoria)
    formData.append("stock", formulario.stock)
    formData.append("imagen", imagen)

    try {
      const respuesta = await fetch("http://localhost:4000/products", {
        method: "POST",
        body: formData,
      })

      if (!respuesta.ok) {
        throw new Error("Error al guardar producto")
      }

      await cargarProductos()

      setFormulario({
        nombre: "",
        precio: "",
        categoria: "",
        stock: "",
      })

      setImagen(null)

      e.target.reset()

      alert("Producto guardado correctamente")
    } catch (error) {
      console.error("Error guardando producto:", error)
      alert("Error al guardar el producto")
    }
  }

  const eliminarProducto = async (id) => {
    try {
      await fetch(`http://localhost:4000/products/${id}`, {
        method: "DELETE",
      })

      setProductos(productos.filter((producto) => producto.id !== id))
    } catch (error) {
      console.error("Error eliminando producto:", error)
    }
  }

  return (
    <main className="pt-32 px-6 min-h-screen bg-[#fff7fb]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="uppercase tracking-[0.4em] text-pink-400 font-bold mb-4">
            Panel Administrador
          </p>

          <h1 className="text-5xl font-black text-pink-600 mb-4">
            Hola, Mariajose Vergara
          </h1>

          <p className="text-pink-900/60 text-lg">
            Desde aquí puedes agregar y administrar productos de Peppa Tendencia.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <form
            onSubmit={agregarProducto}
            className="bg-white rounded-[35px] shadow-xl p-8 border border-pink-100"
          >
            <h2 className="text-3xl font-black text-pink-600 mb-8">
              Agregar producto
            </h2>

            <div className="space-y-5">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del producto"
                value={formulario.nombre}
                onChange={manejarCambio}
                className="w-full border border-pink-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-300"
              />

              <input
                type="text"
                name="precio"
                placeholder="Precio, ejemplo: $24.990"
                value={formulario.precio}
                onChange={manejarCambio}
                className="w-full border border-pink-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-300"
              />

              <input
                type="text"
                name="categoria"
                placeholder="Categoría, ejemplo: Vestidos"
                value={formulario.categoria}
                onChange={manejarCambio}
                className="w-full border border-pink-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-300"
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock disponible"
                value={formulario.stock}
                onChange={manejarCambio}
                className="w-full border border-pink-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-300"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagen(e.target.files[0])}
                className="w-full border border-pink-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-300"
              />

              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-full font-black shadow-lg"
              >
                Guardar producto
              </button>
            </div>
          </form>

          <section className="bg-white rounded-[35px] shadow-xl p-8 border border-pink-100">
            <h2 className="text-3xl font-black text-pink-600 mb-8">
              Productos registrados
            </h2>

            {productos.length === 0 ? (
              <p className="text-pink-900/60">
                Todavía no hay productos agregados.
              </p>
            ) : (
              <div className="space-y-5 max-h-[600px] overflow-y-auto pr-2">
                {productos.map((producto) => (
                  <div
                    key={producto.id}
                    className="flex gap-4 border border-pink-100 rounded-3xl p-4"
                  >
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-24 h-24 rounded-2xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-black text-pink-600">
                        {producto.nombre}
                      </h3>

                      <p className="text-pink-400 font-bold">
                        {producto.precio}
                      </p>

                      <p className="text-pink-900/60 text-sm">
                        Categoría: {producto.categoria}
                      </p>

                      <p className="text-pink-900/60 text-sm">
                        Stock: {producto.stock}
                      </p>
                    </div>

                    <button
                      onClick={() => eliminarProducto(producto.id)}
                      className="bg-red-100 text-red-500 px-4 py-2 rounded-full font-bold h-fit hover:bg-red-200"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default AdminPage