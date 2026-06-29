import { useState, useEffect } from "react"
import api from "../utils/api"

const stages = ["Received", "Inspection", "Buffing", "Building", "Curing", "Quality Check", "Ready", "Delivered"]

function getStageColor(stage) {
  if (stage === "Delivered") return "bg-green-100 text-green-700"
  if (stage === "Quality Check" || stage === "Ready") return "bg-blue-100 text-blue-700"
  if (stage === "Received" || stage === "Inspection") return "bg-yellow-100 text-yellow-700"
  return "bg-purple-100 text-purple-700"
}

function Retreading() {
  const [jobs, setJobs] = useState([])
  const [selected, setSelected] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ customer: "", phone: "", tyre: "", remarks: "" })

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs() {
    try {
      const res = await api.get("/retreading")
      setJobs(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleAddJob() {
    if (!form.customer || !form.tyre) return
    try {
      const res = await api.post("/retreading", form)
      setJobs([res.data, ...jobs])
      setForm({ customer: "", phone: "", tyre: "", remarks: "" })
      setShowForm(false)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleStageUpdate(jobId, newStage) {
    try {
      const res = await api.put(`/retreading/${jobId}`, { stage: newStage })
      setJobs(jobs.map((j) => j._id === jobId ? res.data : j))
      setSelected((prev) => prev && prev._id === jobId ? res.data : prev)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/retreading/${id}`)
      setJobs(jobs.filter((j) => j._id !== id))
      setSelected(null)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Retreading</h1>
          <p className="text-sm text-gray-500">Track tyre retreading jobs stage by stage</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setSelected(null) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + New Job
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-700 mb-4">New Retreading Job</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { field: "customer", label: "Customer Name" },
              { field: "phone", label: "Phone" },
              { field: "tyre", label: "Tyre (Brand + Size)" },
              { field: "remarks", label: "Remarks" },
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
            <button onClick={handleAddJob} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Save Job</button>
            <button onClick={() => setShowForm(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">Cancel</button>
          </div>
        </div>
      )}

      {/* Stage Summary */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {stages.map((stage) => {
          const count = jobs.filter((j) => j.stage === stage).length
          return (
            <div key={stage} className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 text-center">
              <p className="text-lg font-bold text-gray-800">{count}</p>
              <p className="text-xs text-gray-500 mt-1">{stage}</p>
            </div>
          )
        })}
      </div>

      <div className="flex gap-4">
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <p className="text-center py-10 text-gray-400">Loading...</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-left">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Tyre</th>
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">{job.customer}</td>
                    <td className="px-4 py-3 text-gray-600">{job.tyre}</td>
                    <td className="px-4 py-3 text-gray-600">{new Date(job.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(job.stage)}`}>
                        {job.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-3">
                      <button onClick={() => setSelected(job)} className="text-blue-600 text-xs font-medium hover:underline">Manage</button>
                      <button onClick={() => handleDelete(job._id)} className="text-red-400 text-xs font-medium hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
                {jobs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-400">No jobs found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {selected && (
          <div className="w-72 bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-700">{selected.customer}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Tyre</span>
                <span className="text-gray-800">{selected.tyre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span className="text-gray-800">{selected.phone}</span>
              </div>
              {selected.remarks && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Remarks</span>
                  <span className="text-gray-800">{selected.remarks}</span>
                </div>
              )}
            </div>
            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-3">Update Stage</p>
              <div className="space-y-2">
                {stages.map((stage, index) => {
                  const currentIndex = stages.indexOf(selected.stage)
                  const isDone = index < currentIndex
                  const isCurrent = stage === selected.stage
                  return (
                    <button
                      key={stage}
                      onClick={() => handleStageUpdate(selected._id, stage)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isCurrent ? "bg-blue-600 text-white" :
                        isDone ? "bg-green-50 text-green-700" :
                        "bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {isDone ? "✓ " : ""}{stage}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Retreading