import { useState } from "react"

const initialCustomers = [
  { id: 1, name: "Ravi Kumar", phone: "9848012345", vehicle: "Honda City", tyresBought: 4, lastVisit: "2024-06-10" },
  { id: 2, name: "Suresh Babu", phone: "9676543210", vehicle: "Maruti Swift", tyresBought: 2, lastVisit: "2024-06-15" },
  { id: 3, name: "Nagaraju", phone: "9912345678", vehicle: "Hyundai i20", tyresBought: 6, lastVisit: "2024-05-28" },
  { id: 4, name: "Venkat Rao", phone: "9700123456", vehicle: "Toyota Innova", tyresBought: 8, lastVisit: "2024-06-01" },
  { id: 5, name: "Ramesh Reddy", phone: "9848098765", vehicle: "Tata Nexon", tyresBought: 4, lastVisit: "2024-06-20" },
  { id: 6, name: "Prasad", phone: "9550012345", vehicle: "Mahindra Scorpio", tyresBought: 10, lastVisit: "2024-04-15" },
]

function Customers() {
  const [search, setSearch] = useState("")
  const [customers, setCustomers] = useState(initialCustomers)
  const [showForm, setShowForm] = useState(false)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({
    name: "", phone: "", vehicle: ""
  })

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.vehicle.toLowerCase().includes(search.toLowerCase())
  )

  function handleAdd() {
    if (!form.name || !form.phone) return
    const newCustomer = {
      id: customers.length + 1,
      name: form.name,
      phone: form.phone,
      vehicle: form.vehicle,
      tyresBought: 0,
      lastVisit: new Date().toISOString().split("T")[0]
    }
    setCustomers([...customers, newCustomer])
    setForm({ name: "", phone: "", vehicle: "" })
    setShowForm(false)
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
          <p className="text-sm text-gray-500">{customers.length} total customers</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setSelected(null) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + Add Customer
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Add New Customer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["name", "phone", "vehicle"].map((field) => (
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
      <input
        type="text"
        placeholder="Search by name, phone or vehicle..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-80 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Two column layout — list + detail */}
      <div className="flex gap-4">

        {/* Customer List */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Tyres Bought</th>
                <th className="px-4 py-3">Last Visit</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400">{c.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{c.name}</td>
                  <td className="px-4 py-3 text-gray-600">{c.phone}</td>
                  <td className="px-4 py-3 text-gray-600">{c.vehicle}</td>
                  <td className="px-4 py-3 text-gray-600">{c.tyresBought}</td>
                  <td className="px-4 py-3 text-gray-600">{c.lastVisit}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(c)}
                      className="text-blue-600 text-xs font-medium hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-400">No customers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Customer Detail Panel */}
        {selected && (
          <div className="w-72 bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-700">Customer Details</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                {selected.name[0]}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{selected.name}</p>
                <p className="text-sm text-gray-500">{selected.phone}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle</span>
                <span className="text-gray-800 font-medium">{selected.vehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tyres Bought</span>
                <span className="text-gray-800 font-medium">{selected.tyresBought}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last Visit</span>
                <span className="text-gray-800 font-medium">{selected.lastVisit}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Purchase History</p>
              <p className="text-xs text-gray-400">Full history will load from database after backend is connected.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Customers