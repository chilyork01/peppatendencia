import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AdminLogin() {
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const entrar = (e) => {
    e.preventDefault()

    if (password === "peppa123") {
      localStorage.setItem("adminAuth", "true")
      navigate("/admin")
    } else {
      alert("Contraseña incorrecta")
    }
  }

  return (
    <main className="pt-32 px-6 min-h-screen bg-[#fff7fb] flex items-center justify-center">
      <form
        onSubmit={entrar}
        className="bg-white rounded-[35px] shadow-xl p-8 border border-pink-100 w-full max-w-md"
      >
        <h1 className="text-4xl font-black text-pink-600 mb-4">
          Admin Login
        </h1>

        <p className="text-pink-900/60 mb-6">
          Ingresa la contraseña para administrar Peppa Tendencia.
        </p>

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-pink-200 rounded-2xl px-5 py-4 mb-5 outline-none focus:ring-2 focus:ring-pink-300"
        />

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-full font-black shadow-lg"
        >
          Entrar
        </button>
      </form>
    </main>
  )
}

export default AdminLogin