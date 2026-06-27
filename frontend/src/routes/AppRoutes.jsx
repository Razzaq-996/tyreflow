import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Inventory from "../pages/Inventory"
import Customers from "../pages/Customers"
import Retreading from "../pages/Retreading"
import Billing from "../pages/Billing"
import Dealers from "../pages/Dealers"
import NotFound from "../pages/NotFound"
import MainLayout from "../layouts/MainLayout"
import ProtectedRoute from "../components/ProtectedRoute"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/retreading" element={<Retreading />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/dealers" element={<Dealers />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes