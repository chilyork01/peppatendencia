import { Navigate } from "react-router-dom"

function ProtectedAdminRoute({ children }) {
  const adminAuth = localStorage.getItem("adminAuth")

  if (adminAuth !== "true") {
    return <Navigate to="/admin-login" replace />
  }

  return children
}

export default ProtectedAdminRoute