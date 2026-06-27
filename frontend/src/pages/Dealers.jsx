import { useState } from "react"

const initialDealers = [
  { id: 1, name: "Srinivas Tyres", owner: "Srinivas Rao", phone: "9848011111", city: "Vijayawada", brands: ["MRF", "Apollo"], orders: 12, status: "Active" },
  { id: 2, name: "Raju Tyre House", owner: "Raju Reddy", phone: "9676522222", city: "Guntur", brands: ["CEAT", "JK"], orders: 8, status: "Active" },
  { id: 3, name: "Balaji Wheels", owner: "Balaji", phone: "9912333333", city: "Nellore", brands: ["MRF", "Bridgestone"], orders: 5, status: "Inactive" },
  { id: 4, name: "Lakshmi Tyres", owner: "Lakshmi Prasad", phone: "9700444444", city: "Ongole", brands: ["Apollo", "CEAT"], orders: 15, status: "Active" },
]

const initialOrders = [
  { id: "DO001", dealer: "Srinivas Tyres", items: "MRF ZLX x20", date: "2024-06-20", amount: 84000, status: "Delivered" },
  { id: "DO002", dealer: "Raju Tyre House", items: "CEAT Milaze x15", date: "2024-06-18", amount: 58500, status: "Pending" },
  { id: "DO003", dealer: "Lakshmi Tyres", items: "Apollo Alnac x25", date: "2024-06-15", amount: 120000, status: "Processing" },
  { id: "DO004", dealer: "Srinivas Tyres", items: "Apollo Amazer x10", date: "2024-06-10", amount: 62000, status: "Delivered" },
]

function getStatusStyle(status) {
  if (status === "Active" || status === "Delivered") return "bg-green-100 text-green-700"
  if (status === "Processing") return "bg-blue-100 text-blue-700"
  if (status === "Inactive") return "bg-red-100 text-red-700"
  return "bg-yellow-100 text-yellow-700"
}

function Dealers() {
  const [dealers, setDealers] = useState(initialDealers)
  const [orders, setOrders] = useState(initialOrders)
  const [selected, setSelected] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [tab, setTab] = useState("dealers")
  const [form, setForm] = useState({
    name: "", owner: "", phone: "", city: "", brands: ""
  })

  function handleAddDealer() {
    if (!form.name || !form.owner) return
    const newDealer = {
      id: dealers.length + 1,
      name: form.name,
      owner: form.owner,
      phone: form.phone,
      city: form.city,
      brands: form.brands.split(",").map((b) => b.trim()),
      orders: 0,
      status: "Active"
    }
    setDealers([...dealers, newDealer])
    setForm({ name: "", owner: "", phone: "", city: "", brands: "" })
    setShowForm(false)
  }

  function handleOrderStatus(id, newStatus) {
    setOrders(orders.map((o) => o.id === id ? { ...o, status: newStatus } : o))
  }

  const dealerOrders = selected
    ? orders.filter((o) => o.dealer === selected.name)
    : []

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dealers</h1>
          <p className="text-sm text-gray-500">Manage wholesale dealer network</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setSelected(null) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + Add Dealer
        </button>
      </div>

      {/* Add Dealer Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Add New Dealer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { field: "name", label: "Shop Name" },
              { field: "owner", label: "Owner Name" },
              { field: "phone", label: "Phone" },
              { field: "city", label: "City" },
              { field: "brands", label: "Brands (comma separated)" },
            ].map(({ field, label }) => (
              <div key={field}>
                <label className="text-xs text-gray-500">{label}</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={label}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddDealer}
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

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("dealers")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "dealers" ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}
        >
          Dealers
        </button>
        <button
          onClick={() => setTab("orders")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "orders" ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}
        >
          Dealer Orders
        </button>
      </div>

      {/* Dealers Tab */}
      {tab === "dealers" && (
        <div className="flex gap-4">
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-left">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Shop Name</th>
                  <th className="px-4 py-3">Owner</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Brands</th>
                  <th className="px-4 py-3">Orders</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {dealers.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-400">{d.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{d.name}</td>
                    <td className="px-4 py-3 text-gray-600">{d.owner}</td>
                    <td className="px-4 py-3 text-gray-600">{d.city}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {d.brands.map((b) => (
                          <span key={b} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">{b}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{d.orders}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(d.status)}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelected(d)}
                        className="text-blue-600 text-xs font-medium hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Dealer Detail */}
          {selected && (
            <div className="w-72 bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-700">Dealer Details</h2>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                  {selected.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{selected.name}</p>
                  <p className="text-sm text-gray-500">{selected.city}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Owner</span>
                  <span className="font-medium text-gray-800">{selected.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="text-gray-800">{selected.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Orders</span>
                  <span className="text-gray-800">{selected.orders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(selected.status)}`}>
                    {selected.status}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500 mb-2">Brands</p>
                <div className="flex gap-1 flex-wrap">
                  {selected.brands.map((b) => (
                    <span key={b} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">{b}</span>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500 mb-2">Recent Orders</p>
                {dealerOrders.length === 0
                  ? <p className="text-xs text-gray-400">No orders found</p>
                  : dealerOrders.map((o) => (
                    <div key={o.id} className="flex justify-between text-xs text-gray-600 py-1">
                      <span>{o.items}</span>
                      <span className={`px-1.5 py-0.5 rounded-full font-medium ${getStatusStyle(o.status)}`}>{o.status}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {tab === "orders" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Dealer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-700">{o.id}</td>
                  <td className="px-4 py-3 text-gray-600">{o.dealer}</td>
                  <td className="px-4 py-3 text-gray-600">{o.items}</td>
                  <td className="px-4 py-3 text-gray-600">{o.date}</td>
                  <td className="px-4 py-3 text-gray-600">₹{o.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => handleOrderStatus(o.id, e.target.value)}
                      className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none"
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  )
}

export default Dealers