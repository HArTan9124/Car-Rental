"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Calendar, Car, Users, BarChart3, Settings, LogOut, HelpCircle } from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Calendar, label: "Bookings", href: "/bookings" },
  { icon: Car, label: "Fleet", href: "/fleet" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#0f0f1e] border-r border-[#2a2a3e] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#2a2a3e]">
        <h1 className="text-xl font-bold text-white">
          Rental<span className="text-[#7c3aed]">Admin</span>
        </h1>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-[#7c3aed] text-white" : "text-[#a0aec0] hover:text-white hover:bg-[#2a2a3e]"
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-[#2a2a3e] space-y-2">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-[#a0aec0] rounded-lg hover:text-white hover:bg-[#2a2a3e] transition-colors">
          <HelpCircle size={20} />
          <span className="text-sm font-medium">Help & Support</span>
        </button>
        <button className="flex items-center gap-3 w-full px-4 py-3 text-[#a0aec0] rounded-lg hover:text-white hover:bg-[#2a2a3e] transition-colors">
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}
