import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const stats = [
  { label: "Total Sales", value: "₹2,45,000", change: "+12% this month" },
  { label: "Pending Retreads", value: "18", change: "3 due today" },
  { label: "Low Stock Items", value: "7", change: "Needs reorder" },
  { label: "Total Customers", value: "342", change: "+5 this week" },
]

const monthlySales = [
  { month: "Jan", sales: 120000 },
  { month: "Feb", sales: 95000 },
  { month: "Mar", sales: 180000 },
  { month: "Apr", sales: 140000 },
  { month: "May", sales: 210000 },
  { month: "Jun", sales: 245000 },
]

const brandData = [
  { brand: "MRF", units: 120 },
  { brand: "Apollo", units: 98 },
  { brand: "CEAT", units: 75 },
  { brand: "JK", units: 60 },
  { brand: "Bridgestone", units: 45 },
]

function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
            <p className="text-xs text-blue-500 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Monthly Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Monthly Sales (₹)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Brand Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Units Sold by Brand</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={brandData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="brand" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="units" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Recent Retread Jobs */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <h2 className="text-base font-semibold text-gray-700 mb-4">Recent Retreading Jobs</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-2">Job ID</th>
              <th className="pb-2">Customer</th>
              <th className="pb-2">Tyre</th>
              <th className="pb-2">Stage</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { id: "RT001", customer: "Ravi Kumar", tyre: "MRF 185/65 R15", stage: "Buffing", status: "In Progress" },
              { id: "RT002", customer: "Suresh Babu", tyre: "Apollo 195/55 R16", stage: "Curing", status: "In Progress" },
              { id: "RT003", customer: "Nagaraju", tyre: "CEAT 175/70 R13", stage: "Delivered", status: "Completed" },
              { id: "RT004", customer: "Venkat Rao", tyre: "JK 205/65 R15", stage: "Inspection", status: "Pending" },
            ].map((job) => (
              <tr key={job.id} className="py-2">
                <td className="py-2 font-medium text-gray-700">{job.id}</td>
                <td className="py-2 text-gray-600">{job.customer}</td>
                <td className="py-2 text-gray-600">{job.tyre}</td>
                <td className="py-2 text-gray-600">{job.stage}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    job.status === "Completed" ? "bg-green-100 text-green-700" :
                    job.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Dashboard