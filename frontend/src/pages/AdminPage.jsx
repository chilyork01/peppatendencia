import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const API_URL = "https://peppatendencia-api.onrender.com"

function AdminPage() {
  const [productos, setProductos] = useState([])
  const [imagen, setImagen] = useState(null)
  const [preview, setPreview] = useState("")
  const [productoEditando, setProductoEditando] = useState(null)
  const [cargando, setCargando] = useState(false)

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
      const respuesta = await fetch(`${API_URL}/products`)
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
    setPreview("")
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
      setCargando(true)

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
          `${API_URL}/products/${productoEditando.id}`,
          {
            method: "PUT",
            body: formData,
          }
        )
      } else {
        if (!imagen) {
          alert("Selecciona una imagen")
          setCargando(false)
          return
        }

        respuesta = await fetch(`${API_URL}/products`, {
          method: "POST",
          body: formData,
        })
      }

      if (!respuesta.ok) {
        throw new Error("Error guardando producto")
      }

      await cargarProductos()
      limpiarFormulario()

      alert(
        productoEditando
          ? "Producto actualizado correctamente"
          : "Producto guardado correctamente"
      )
    } catch (error) {
      console.error("Error guardando producto:", error)
      alert("Error guardando producto")
    } finally {
      setCargando(false)
    }
  }

  const eliminarProducto = async (id) => {
    const confirmar = confirm("¿Seguro que quieres eliminar este producto?")

    if (!confirmar) return

    try {
      await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      })

      setProductos(productos.filter((producto) => producto.id !== id))
    } catch (error) {
      console.error("Error eliminando producto:", error)
      alert("Error eliminando producto")
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

    setPreview(producto.imagen)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const cerrarSesion = () => {
    localStorage.removeItem("adminAuth")
    navigate("/admin-login")
  }

  return (
    <main className="pt-32 px-4 md:px-6 min-h-screen bg-[#fff7fb]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="uppercase tracking-[0.35em] text-pink-400 font-bold mb-4 text-sm">
              Panel Administrador
            </p>

            <h1 className="text-4xl md:text-5xl font-black text-pink-600 mb-4">
              Hola, Mariajose Vergara
            </h1>

            <p className="text-pink-900/60 text-lg">
              Administra productos, precios, stock e imágenes de Peppa Tendencia.
            </p>
          </div>

          <button
            onClick={cerrarSesion}
            className="bg-white text-pink-600 border border-pink-200 px-6 py-3 rounded-full font-black shadow hover:bg-pink-50"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-8">
          <form
            onSubmit={agregarProducto}
            className="bg-white rounded-[32px] shadow-xl p-6 md:p-8 border border-pink-100 h-fit"
          >
            <h2 className="text-3xl font-black text-pink-600 mb-6">
              {productoEditando ? "Editar producto" : "Agregar producto"}
            </h2>

            <div className="space-y-4">
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
                placeholder="Precio, ejemplo: 24990"
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
                  className="w-44 h-44 object-cover rounded-3xl border border-pink-200 mx-auto shadow"
                />
              )}

              <button
                type="submit"
                disabled={cargando}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white py-4 rounded-full font-black shadow-lg"
              >
                {cargando
                  ? "Guardando..."
                  : productoEditando
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

          <section className="bg-white rounded-[32px] shadow-xl p-6 md:p-8 border border-pink-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <h2 className="text-3xl font-black text-pink-600">
                Productos registrados
              </h2>

              <span className="bg-pink-100 text-pink-600 px-5 py-2 rounded-full font-black">
                {productos.length} productos
              </span>
            </div>

            {productos.length === 0 ? (
              <p className="text-pink-900/60">
                Todavía no hay productos agregados.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 max-h-[700px] overflow-y-auto pr-2">
                {productos.map((producto) => (
                  <div
                    key={producto.id}
                    className="border border-pink-100 rounded-3xl p-4 hover:shadow-lg transition bg-[#fffafd]"
                  >
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-48 rounded-2xl object-cover mb-4 bg-pink-50"
                    />

                    <h3 className="text-xl font-black text-pink-600">
                      {producto.nombre}
                    </h3>

                    <p className="text-pink-500 font-black mt-1">
                      ${producto.precio}
                    </p>

                    <p className="text-pink-900/60 text-sm mt-2">
                      Categoría: {producto.categoria}
                    </p>

                    <p className="text-pink-900/60 text-sm">
                      Stock: {producto.stock}
                    </p>

                    <div className="flex gap-2 mt-5">
                      <button
                        onClick={() => editarProducto(producto)}
                        className="flex-1 bg-blue-100 text-blue-600 px-4 py-3 rounded-full font-bold hover:bg-blue-200"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => eliminarProducto(producto.id)}
                        className="flex-1 bg-red-100 text-red-500 px-4 py-3 rounded-full font-bold hover:bg-red-200"
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