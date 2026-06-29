import { useState, useEffect } from "react"
import api from "../utils/api"

function getStatusStyle(status) {
  if (status === "In Stock") return "bg-green-100 text-green-700"
  if (status === "Low Stock") return "bg-yellow-100 text-yellow-700"
  return "bg-red-100 text-red-700"
}

function getStatus(stock) {
  if (stock === 0) return "Out of Stock"
  if (stock <= 10) return "Low Stock"
  return "In Stock"
}

function Inventory() {
  const [stock, setStock] = useState([])
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    brand: "", model: "", size: "", category: "", price: "", stock: ""
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const res = await api.get("/inventory")
      setStock(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleAdd() {
    if (!form.brand || !form.model || !form.size) return
    try {
      const res = await api.post("/inventory", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      })
      setStock([res.data, ...stock])
      setForm({ brand: "", model: "", size: "", category: "", price: "", stock: "" })
      setShowForm(false)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/inventory/${id}`)
      setStock(stock.filter((item) => item._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const filtered = stock.filter((item) =>
    item.brand.toLowerCase().includes(search.toLowerCase()) ||
    item.model.toLowerCase().includes(search.toLowerCase()) ||
    item.size.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory</h1>
          <p className="text-sm text-gray-500">Manage your tyre stock</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + Add Tyre
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Add New Tyre</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["brand", "model", "size", "category", "price", "stock"].map((field) => (
              <div key={field}>
                <label className="text-xs text-gray-500 capitalize">{field}</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={field}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Save</button>
            <button onClick={() => setShowForm(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">Cancel</button>
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Search by brand, model or size..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-80 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <p className="text-center py-10 text-gray-400">Loading...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Model</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{item.brand}</td>
                  <td className="px-4 py-3 text-gray-600">{item.model}</td>
                  <td className="px-4 py-3 text-gray-600">{item.size}</td>
                  <td className="px-4 py-3 text-gray-600">{item.category}</td>
                  <td className="px-4 py-3 text-gray-600">₹{item.price.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-600">{item.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(getStatus(item.stock))}`}>
                      {getStatus(item.stock)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-400 text-xs font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-6 text-center text-gray-400">No tyres found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Inventory