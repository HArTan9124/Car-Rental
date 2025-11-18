"use client"

import { Plus, Mail, Phone } from "lucide-react"

const customers = [
  {
    id: "C-001",
    name: "Robert Fox",
    email: "robert@example.com",
    phone: "+1 (555) 123-4567",
    totalBookings: 12,
    totalSpent: "$3,840.00",
    status: "Active",
  },
  {
    id: "C-002",
    name: "Esther Howard",
    email: "esther@example.com",
    phone: "+1 (555) 234-5678",
    totalBookings: 8,
    totalSpent: "$2,160.00",
    status: "Active",
  },
  {
    id: "C-003",
    name: "Brooklyn Simmons",
    email: "brooklyn@example.com",
    phone: "+1 (555) 345-6789",
    totalBookings: 15,
    totalSpent: "$5,280.00",
    status: "Active",
  },
  {
    id: "C-004",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 (555) 456-7890",
    totalBookings: 3,
    totalSpent: "$960.00",
    status: "Inactive",
  },
]

export function CustomersPage() {
  return (
    <main className="flex-1 overflow-auto p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Customers</h1>
          <p className="text-[#a0aec0]">Manage and view customer information</p>
        </div>
        <button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-[#2a2a3e] rounded-lg p-6 border border-[#3a3a4e] space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{customer.name}</h3>
                <p className="text-sm text-[#7c3aed]">{customer.id}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  customer.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {customer.status}
              </span>
            </div>

            <div className="space-y-2 border-t border-[#3a3a4e] pt-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-[#a0aec0]" />
                <span className="text-[#a0aec0]">{customer.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-[#a0aec0]" />
                <span className="text-[#a0aec0]">{customer.phone}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-[#3a3a4e] pt-4">
              <div>
                <p className="text-xs text-[#a0aec0] mb-1">Total Bookings</p>
                <p className="text-xl font-bold text-white">{customer.totalBookings}</p>
              </div>
              <div>
                <p className="text-xs text-[#a0aec0] mb-1">Total Spent</p>
                <p className="text-xl font-bold text-white">{customer.totalSpent}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
