import { NavLink } from "react-router-dom"

const links = [
  { label: "Dashboard", path: "/" },
  { label: "Inventory", path: "/inventory" },
  { label: "Customers", path: "/customers" },
  { label: "Retreading", path: "/retreading" },
  { label: "Billing", path: "/billing" },
  { label: "Dealers", path: "/dealers" },
]

function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold text-blue-400">
        TyreFlow
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar