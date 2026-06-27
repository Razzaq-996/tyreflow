import { useState } from "react"

const stages = ["Received", "Inspection", "Buffing", "Building", "Curing", "Quality Check", "Ready", "Delivered"]

const initialJobs = [
  { id: "RT001", customer: "Ravi Kumar", phone: "9848012345", tyre: "MRF 185/65 R15", receivedDate: "2024-06-20", stage: "Buffing", remarks: "Minor sidewall damage" },
  { id: "RT002", customer: "Suresh Babu", phone: "9676543210", tyre: "Apollo 195/55 R16", receivedDate: "2024-06-18", stage: "Curing", remarks: "" },
  { id: "RT003", customer: "Nagaraju", phone: "9912345678", tyre: "CEAT 175/70 R13", receivedDate: "2024-06-10", stage: "Delivered", remarks: "Good condition" },
  { id: "RT004", customer: "Venkat Rao", phone: "9700123456", tyre: "JK 205/65 R15", receivedDate: "2024-06-22", stage: "Inspection", remarks: "" },
  { id: "RT005", customer: "Ramesh Reddy", phone: "9848098765", tyre: "Bridgestone 165/80 R14", receivedDate: "2024-06-23", stage: "Received", remarks: "" },
]

function getStageColor(stage) {
  if (stage === "Delivered") return "bg-green-100 text-green-700"
  if (stage === "Quality Check" || stage === "Ready") return "bg-blue-100 text-blue-700"
  if (stage === "Received" || stage === "Inspection") return "bg-yellow-100 text-yellow-700"
  return "bg-purple-100 text-purple-700"
}

function Retreading() {
  const [jobs, setJobs] = useState(initialJobs)
  const [selected, setSelected] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    customer: "", phone: "", tyre: "", remarks: ""
  })

  function handleAddJob() {
    if (!form.customer || !form.tyre) return
    const newJob = {
      id: `RT00${jobs.length + 1}`,
      customer: form.customer,
      phone: form.phone,
      tyre: form.tyre,
      receivedDate: new Date().toISOString().split("T")[0],
      stage: "Received",
      remarks: form.remarks
    }
    setJobs([...jobs, newJob])
    setForm({ customer: "", phone: "", tyre: "", remarks: "" })
    setShowForm(false)
  }

  function handleStageUpdate(jobId, newStage) {
    setJobs(jobs.map((j) => j.id === jobId ? { ...j, stage: newStage } : j))
    setSelected((prev) => prev && prev.id === jobId ? { ...prev, stage: newStage } : prev)
  }

  return (
    <div className="space-y-6">

      {/* Header */}
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

      {/* Add Form */}
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
            <button
              onClick={handleAddJob}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Save Job
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

      {/* Stage Summary Bar */}
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

      {/* Jobs List + Detail */}
      <div className="flex gap-4">

        {/* Jobs Table */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3">Job ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Tyre</th>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-700">{job.id}</td>
                  <td className="px-4 py-3 text-gray-600">{job.customer}</td>
                  <td className="px-4 py-3 text-gray-600">{job.tyre}</td>
                  <td className="px-4 py-3 text-gray-600">{job.receivedDate}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(job.stage)}`}>
                      {job.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(job)}
                      className="text-blue-600 text-xs font-medium hover:underline"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Job Detail + Stage Updater */}
        {selected && (
          <div className="w-72 bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-700">{selected.id}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Customer</span>
                <span className="text-gray-800 font-medium">{selected.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span className="text-gray-800">{selected.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tyre</span>
                <span className="text-gray-800">{selected.tyre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Received</span>
                <span className="text-gray-800">{selected.receivedDate}</span>
              </div>
              {selected.remarks && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Remarks</span>
                  <span className="text-gray-800">{selected.remarks}</span>
                </div>
              )}
            </div>

            {/* Stage Tracker */}
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
                      onClick={() => handleStageUpdate(selected.id, stage)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isCurrent
                          ? "bg-blue-600 text-white"
                          : isDone
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100"
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