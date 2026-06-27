import { useState } from "react"

const initialStock = [
  { id: 1, brand: "MRF", model: "ZLX", size: "185/65 R15", category: "Car", price: 4200, stock: 45, status: "In Stock" },
  { id: 2, brand: "Apollo", model: "Alnac 4G", size: "195/55 R16", category: "Car", price: 4800, stock: 12, status: "Low Stock" },
  { id: 3, brand: "CEAT", model: "Milaze X3", size: "175/70 R13", category: "Car", price: 3900, stock: 0, status: "Out of Stock" },
  { id: 4, brand: "JK", model: "Vectra", size: "205/65 R15", category: "Car", price: 5100, stock: 30, status: "In Stock" },
  { id: 5, brand: "Bridgestone", model: "B250", size: "165/80 R14", category: "Car", price: 4500, stock: 8, status: "Low Stock" },
  { id: 6, brand: "MRF", model: "ZVTS", size: "155/80 R13", category: "Car", price: 3500, stock: 60, status: "In Stock" },
  { id: 7, brand: "Apollo", model: "Amazer XP", size: "215/60 R16", category: "SUV", price: 6200, stock: 5, status: "Low Stock" },
  { id: 8, brand: "CEAT", model: "CrossDrive", size: "235/65 R17", category: "SUV", price: 7800, stock: 20, status: "In Stock" },
]

function getStatusStyle(status) {
  if (status === "In Stock") return "bg-green-100 text-green-700"
  if (status === "Low Stock") return "bg-yellow-100 text-yellow-700"
  return "bg-red-100 text-red-700"
}

function Inventory() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [stock, setStock] = useState(initialStock)
  const [form, setForm] = useState({
    brand: "", model: "", size: "", category: "", price: "", stock: ""
  })

  const filtered = stock.filter((item) =>
    item.brand.toLowerCase().includes(search.toLowerCase()) ||
    item.model.toLowerCase().includes(search.toLowerCase()) ||
    item.size.toLowerCase().includes(search.toLowerCase())
  )

  function handleAdd() {
    if (!form.brand || !form.model || !form.size) return
    const newItem = {
      id: stock.length + 1,
      brand: form.brand,
      model: form.model,
      size: form.size,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      status: Number(form.stock) === 0 ? "Out of Stock" : Number(form.stock) <= 10 ? "Low Stock" : "In Stock"
    }
    setStock([...stock, newItem])
    setForm({ brand: "", model: "", size: "", category: "", price: "", stock: "" })
    setShowForm(false)
  }

  return (
    <div className="space-y-6">

      {/* Header */}
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

      {/* Add Form */}
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
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search by brand, model or size..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400">{item.id}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{item.brand}</td>
                <td className="px-4 py-3 text-gray-600">{item.model}</td>
                <td className="px-4 py-3 text-gray-600">{item.size}</td>
                <td className="px-4 py-3 text-gray-600">{item.category}</td>
                <td className="px-4 py-3 text-gray-600">₹{item.price.toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-600">{item.stock}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-400">No tyres found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Inventory