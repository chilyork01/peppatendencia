import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function AdminPage() {
  const [productos, setProductos] = useState([])
  const [imagen, setImagen] = useState(null)
  const [preview, setPreview] = useState("")
  const [productoEditando, setProductoEditando] = useState(null)

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
      const respuesta = await fetch(
        "https://peppatendencia-api.onrender.com/products"
      )

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

  const limpiarFormulario = () => {
    setFormulario({
      nombre: "",
      precio: "",
      categoria: "",
      stock: "",
    })

    setImagen(null)
    setProductoEditando(null)
  }

  const agregarProducto = async (e) => {
    e.preventDefault()

    if (
      !formulario.nombre ||
      !formulario.precio ||
      !formulario.categoria ||
      !formulario.stock
    ) {
      alert("Completa todos los campos")
      return
    }

    try {
      const formData = new FormData()

      formData.append("nombre", formulario.nombre)
      formData.append("precio", formulario.precio)
      formData.append("categoria", formulario.categoria)
      formData.append("stock", formulario.stock)

      if (imagen) {
        formData.append("imagen", imagen)
      }

      let respuesta

      if (productoEditando) {
        formData.append("imagenActual", productoEditando.imagen)

        respuesta = await fetch(
          `https://peppatendencia-api.onrender.com/products/${productoEditando.id}`,
          {
            method: "PUT",
            body: formData,
          }
        )
      } else {
        if (!imagen) {
          alert("Selecciona una imagen")
          return
        }

        respuesta = await fetch(
          "https://peppatendencia-api.onrender.com/products",
          {
            method: "POST",
            body: formData,
          }
        )
      }

      if (!respuesta.ok) {
        throw new Error("Error guardando producto")
      }

      await cargarProductos()

      limpiarFormulario()

      e.target.reset()

      alert(
        productoEditando
          ? "Producto actualizado correctamente"
          : "Producto guardado correctamente"
      )
    } catch (error) {
      console.error("Error guardando producto:", error)
      alert("Error guardando producto")
    }
  }

  const eliminarProducto = async (id) => {
    try {
      await fetch(
        `https://peppatendencia-api.onrender.com/products/${id}`,
        {
          method: "DELETE",
        }
      )

      setProductos(
        productos.filter((producto) => producto.id !== id)
      )
    } catch (error) {
      console.error("Error eliminando producto:", error)
    }
  }

  const editarProducto = (producto) => {
    setProductoEditando(producto)

    setFormulario({
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria,
      stock: producto.stock,
    })

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
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
              {productoEditando
                ? "Editar producto"
                : "Agregar producto"}
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
                placeholder="Categoría"
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
  onChange={(e) => {
    const file = e.target.files[0]

    setImagen(file)

    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }}
  className="w-full border border-pink-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-300"
/>
{preview && (
  <img
    src={preview}
    alt="Preview"
    className="w-40 h-40 object-cover rounded-3xl border border-pink-200 mx-auto"
  />
)}
              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-full font-black shadow-lg"
              >
                {productoEditando
                  ? "Guardar cambios"
                  : "Guardar producto"}
              </button>

              {productoEditando && (
                <button
                  type="button"
                  onClick={limpiarFormulario}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-full font-black"
                >
                  Cancelar edición
                </button>
              )}
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

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => editarProducto(producto)}
                        className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-bold hover:bg-blue-200"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => eliminarProducto(producto.id)}
                        className="bg-red-100 text-red-500 px-4 py-2 rounded-full font-bold hover:bg-red-200"
                      >
                        Eliminar
                      </button>
                    </div>
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