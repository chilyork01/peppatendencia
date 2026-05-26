import { Routes, Route } from "react-router-dom"

import Home from "../pages/HomePage"
import ProductsPage from "../pages/ProductsPage"
import CartPage from "../pages/CartPage"
import ContactPage from "../pages/ContactPage"
import AdminPage from "../pages/AdminPage"
import AdminLogin from "../pages/AdminLogin"
import AdminProducts from "../pages/AdminProducts"
import ProtectedAdminRoute from "./ProtectedAdminRoute"

function AppRoutes({
  carrito,
  agregarAlCarrito,
  eliminarDelCarrito,
  whatsappNumber,
  whatsappLink,
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            agregarAlCarrito={agregarAlCarrito}
            whatsappNumber={whatsappNumber}
          />
        }
      />

      <Route
        path="/productos"
        element={<ProductsPage agregarAlCarrito={agregarAlCarrito} />}
      />

      <Route
        path="/carrito"
        element={
          <CartPage
            carrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
            whatsappLink={whatsappLink}
          />
        }
      />

      <Route
        path="/contacto"
        element={<ContactPage whatsappNumber={whatsappNumber} />}
      />

      <Route path="/admin-login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminPage />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <ProtectedAdminRoute>
            <AdminProducts />
          </ProtectedAdminRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes