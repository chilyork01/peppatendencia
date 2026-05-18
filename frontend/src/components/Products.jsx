import { useEffect, useState } from "react"
import axios from "axios"

function Products() {

  const [productos, setProductos] = useState([])

  useEffect(() => {

    const obtenerProductos = async () => {
      try {

        const response = await axios.get(
          "https://peppatendencia-api.onrender.com/products"
        )

        setProductos(response.data)

      } catch (error) {
        console.error("Error obteniendo productos:", error)
      }
    }

    obtenerProductos()

  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {productos.map((producto) => (

        <div
          key={producto.id}
          className="bg-white rounded-xl shadow p-4"
        >

          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-64 object-cover rounded-lg"
          />

          <h2 className="text-xl font-bold mt-4">
            {producto.nombre}
          </h2>

          <p className="text-gray-500">
            {producto.categoria}
          </p>

          <p className="text-2xl font-bold mt-2">
            ${producto.precio}
          </p>

        </div>
      ))}

    </div>
  )
}

export default Products