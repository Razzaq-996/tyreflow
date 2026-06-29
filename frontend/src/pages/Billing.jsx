import { useState, useEffect } from "react"
import api from "../utils/api"

function calcTotal(items) {
  return items.reduce((sum, item) => sum + item.qty * item.price, 0)
}

function calcGST(total) {
  return Math.round(total * 0.18)
}

function Billing() {
  const [invoices, setInvoices] = useState([])
  const [selected, setSelected] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ customer: "", phone: "" })
  const [items, setItems] = useState([{ name: "", qty: 1, price: 0 }])

  useEffect(() => {
    fetchInvoices()
  }, [])

  async function fetchInvoices() {
    try {
      const res = await api.get("/billing")
      setInvoices(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function handleAddItem() {
    setItems([...items, { name: "", qty: 1, price: 0 }])
  }

  function handleItemChange(index, field, value) {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: field === "name" ? value : Number(value) } : item
    )
    setItems(updated)
  }

  function handleRemoveItem(index) {
    setItems(items.filter((_, i) => i !== index))
  }

  async function handleCreateInvoice() {
    if (!form.customer || items.length === 0) return
    try {
      const res = await api.post("/billing", { ...form, items })
      setInvoices([res.data, ...invoices])
      setForm({ customer: "", phone: "" })
      setItems([{ name: "", qty: 1, price: 0 }])
      setShowForm(false)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleMarkPaid(id) {
    try {
      const res = await api.put(`/billing/${id}`, { status: "Paid" })
      setInvoices(invoices.map((inv) => inv._id === id ? res.data : inv))
      setSelected((prev) => prev && prev._id === id ? res.data : prev)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Billing</h1>
          <p className="text-sm text-gray-500">Create and manage invoices</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setSelected(null) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + New Invoice
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
          <h2 className="text-base font-semibold text-gray-700">New Invoice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500">Customer Name</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Customer name"
                value={form.customer}
                onChange={(e) => setForm({ ...form, customer: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Phone</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">Items</p>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Item name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, "name", e.target.value)}
                  />
                  <input
                    className="w-16 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Qty"
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                  />
                  <input
                    className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Price"
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, "price", e.target.value)}
                  />
                  <button onClick={() => handleRemoveItem(index)} className="text-red-400 hover:text-red-600 text-lg font-bold">✕</button>
                </div>
              ))}
            </div>
            <button onClick={handleAddItem} className="mt-2 text-blue-600 text-sm font-medium hover:underline">+ Add Item</button>
          </div>
          <div className="flex gap-3">
            <button onClick={handleCreateInvoice} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Create Invoice</button>
            <button onClick={() => setShowForm(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">Cancel</button>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <p className="text-center py-10 text-gray-400">Loading...</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-left">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoices.map((inv) => {
                  const subtotal = calcTotal(inv.items)
                  const gst = calcGST(subtotal)
                  return (
                    <tr key={inv._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-700">{inv.customer}</td>
                      <td className="px-4 py-3 text-gray-600">{new Date(inv.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-gray-600">₹{(subtotal + gst).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${inv.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setSelected(inv)} className="text-blue-600 text-xs font-medium hover:underline">View</button>
                      </td>
                    </tr>
                  )
                })}
                {invoices.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-400">No invoices found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {selected && (
          <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-700">{selected.customer}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span className="text-gray-800">{selected.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="text-gray-800">{new Date(selected.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-500 mb-2">Items</p>
              <div className="space-y-2">
                {selected.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name} x{item.qty}</span>
                    <span className="text-gray-800">₹{(item.qty * item.price).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-1 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>₹{calcTotal(selected.items).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>GST (18%)</span>
                <span>₹{calcGST(calcTotal(selected.items)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-800 text-base pt-1">
                <span>Total</span>
                <span>₹{(calcTotal(selected.items) + calcGST(calcTotal(selected.items))).toLocaleString()}</span>
              </div>
            </div>
            {selected.status === "Pending" && (
              <button onClick={() => handleMarkPaid(selected._id)} className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700">
                Mark as Paid
              </button>
            )}
            {selected.status === "Paid" && (
              <div className="w-full bg-green-50 text-green-700 py-2 rounded-lg text-sm font-medium text-center">
                ✓ Payment Received
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Billing