const express = require("express")
const cors = require("cors")
const multer = require("multer")
const { v2: cloudinary } = require("cloudinary")
require("dotenv").config()

const db = require("./db")

const app = express()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://peppatendencia.com",
      "https://www.peppatendencia.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)

app.use(express.json())

const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

const subirImagenCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "peppatendencia",
        resource_type: "image",
        transformation: [
          {
            width: 900,
            crop: "limit",
            quality: "auto",
            fetch_format: "auto",
          },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )

    stream.end(fileBuffer)
  })
}

app.get("/", (req, res) => {
  res.send("API Peppa Tendencia funcionando 🚀")
})

app.post("/products", upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, precio, categoria, stock } = req.body

    if (!nombre || !precio || !categoria || stock === undefined) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      })
    }

    let imagen = ""

    if (req.file) {
      const resultado = await subirImagenCloudinary(req.file.buffer)
      imagen = resultado.secure_url
    }

    const result = await db.query(
      `INSERT INTO products 
       (nombre, precio, imagen, categoria, stock)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nombre, precio, imagen, categoria, stock]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error("Error creando producto:", error)

    res.status(500).json({
      error: "Error creando producto",
      detalle: error.message,
    })
  }
})

app.get("/products", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id DESC")
    res.json(result.rows)
  } catch (error) {
    console.error("Error obteniendo productos:", error)

    res.status(500).json({
      error: "Error obteniendo productos",
      detalle: error.message,
    })
  }
})

app.put("/products/:id", upload.single("imagen"), async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, precio, categoria, stock, imagenActual } = req.body

    if (!nombre || !precio || !categoria || stock === undefined) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      })
    }

    let imagen = imagenActual || ""

    if (req.file) {
      const resultado = await subirImagenCloudinary(req.file.buffer)
      imagen = resultado.secure_url
    }

    const result = await db.query(
      `UPDATE products
       SET nombre = $1,
           precio = $2,
           categoria = $3,
           stock = $4,
           imagen = $5
       WHERE id = $6
       RETURNING *`,
      [nombre, precio, categoria, stock, imagen, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Producto no encontrado",
      })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error("Error editando producto:", error)

    res.status(500).json({
      error: "Error editando producto",
      detalle: error.message,
    })
  }
})

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await db.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Producto no encontrado",
      })
    }

    res.json({
      message: "Producto eliminado",
    })
  } catch (error) {
    console.error("Error eliminando producto:", error)

    res.status(500).json({
      error: "Error eliminando producto",
      detalle: error.message,
    })
  }
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})