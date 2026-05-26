import { useRef, useState } from "react"

function AdminProducts() {
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState("")
  const [categoria, setCategoria] = useState("")
  const [stock, setStock] = useState("")
  const [imagen, setImagen] = useState(null)
  const [mensaje, setMensaje] = useState("")
  const [cargando, setCargando] = useState(false)

  const inputImagenRef = useRef(null)

  const guardarProducto = async (e) => {
    e.preventDefault()
    setCargando(true)
    setMensaje("")

    try {
      const formData = new FormData()
      formData.append("nombre", nombre)
      formData.append("precio", precio)
      formData.append("categoria", categoria)
      formData.append("stock", stock)

      if (imagen) {
        formData.append("imagen", imagen)
      }

      const res = await fetch("http://localhost:4000/products", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detalle || data.error || "Error al guardar")
      }

      setMensaje("Producto guardado correctamente ✅")
      setNombre("")
      setPrecio("")
      setCategoria("")
      setStock("")
      setImagen(null)

      if (inputImagenRef.current) {
        inputImagenRef.current.value = ""
      }
    } catch (error) {
      console.error("Error al guardar producto:", error)
      setMensaje(`Error al guardar producto ❌ ${error.message}`)
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="pt-28 px-6 min-h-screen bg-pink-50">
      <form
        onSubmit={guardarProducto}
        className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow"
      >
        <h1 className="text-3xl font-black text-pink-600 mb-2">
          Agregar producto
        </h1>

        <p className="mb-6 text-green-600 font-bold">
          Estoy en AdminProducts nuevo
        </p>

        {mensaje && (
          <p className="mb-4 font-bold text-pink-600">
            {mensaje}
          </p>
        )}

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full mb-4 border p-4 rounded-xl"
          required
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-full mb-4 border p-4 rounded-xl"
          required
        />

        <input
          type="text"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full mb-4 border p-4 rounded-xl"
          required
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full mb-4 border p-4 rounded-xl"
          required
        />

        <input
          ref={inputImagenRef}
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0] || null)}
          className="w-full mb-6"
        />

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-pink-500 text-white py-4 rounded-full font-black disabled:opacity-50"
        >
          {cargando ? "Guardando..." : "Guardar producto"}
        </button>
      </form>
    </main>
  )
}

export default AdminProducts