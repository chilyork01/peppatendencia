const { Pool } = require("pg")
require("dotenv").config()

const isProduction = process.env.NODE_ENV === "production"

const pool = isProduction
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
  : new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      ssl: false
    })

pool.connect()
  .then(() => console.log("PostgreSQL conectado correctamente"))
  .catch((error) =>
    console.error("Error conectando PostgreSQL:", error)
  )

module.exports = pool