function Navbar() {
  return (
    <div className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-700">TyreFlow ERP</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Admin</span>
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
          A
        </div>
      </div>
    </div>
  )
}

export default Navbar