import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../utils/api"

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setError("")
    if (!form.email || !form.password) {
      setError("Please enter email and password")
      return
    }

    setLoading(true)

    try {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password
      })
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("user", JSON.stringify(res.data.user))
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleLogin()
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400">TyreFlow</h1>
          <p className="text-gray-400 mt-2 text-sm">ERP for Tyre Dealerships</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Welcome back</h2>
            <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
          </div>
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className="text-sm text-gray-600 font-medium">Email</label>
            <input
              type="email"
              placeholder="admin@tyreflow.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onKeyDown={handleKeyDown}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm mt-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyDown={handleKeyDown}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm mt-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <div className="bg-gray-50 rounded-lg px-4 py-3 text-xs text-gray-500 space-y-1">
            <p className="font-medium text-gray-600">Demo credentials</p>
            <p>Email: admin@tyreflow.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login