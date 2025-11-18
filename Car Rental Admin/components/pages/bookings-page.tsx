"use client"

import { Filter, Download, Plus } from "lucide-react"

const allBookings = [
  {
    id: "#89435",
    customer: "Alice Johnson",
    car: "BMW X5",
    status: "Confirmed",
    pickup: "Nov 03, 14:00 | JFK",
    return: "Nov 08, 14:00 | JFK",
    amount: "$920.00",
  },
  {
    id: "#89434",
    customer: "Mark Wilson",
    car: "Tesla Model S",
    status: "In Progress",
    pickup: "Nov 02, 10:00 | LAX",
    return: "Nov 07, 10:00 | LAX",
    amount: "$1,200.00",
  },
  {
    id: "#89433",
    customer: "Sarah Davis",
    car: "Honda Accord",
    status: "Completed",
    pickup: "Oct 28, 09:00 | Downtown",
    return: "Oct 31, 09:00 | Downtown",
    amount: "$480.00",
  },
  {
    id: "#89432",
    customer: "John Martinez",
    car: "Ford Mustang",
    status: "Pending",
    pickup: "Nov 05, 15:00 | JFK",
    return: "Nov 10, 15:00 | JFK",
    amount: "$750.00",
  },
]

export function BookingsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500/20 text-green-400"
      case "In Progress":
        return "bg-blue-500/20 text-blue-400"
      case "Completed":
        return "bg-gray-500/20 text-gray-400"
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <main className="flex-1 overflow-auto p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">All Bookings</h1>
          <p className="text-[#a0aec0]">Manage and track all customer bookings</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-[#2a2a3e] hover:bg-[#3a3a4e] text-white px-4 py-2 rounded-lg font-medium transition-colors border border-[#3a3a4e]">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-[#2a2a3e] hover:bg-[#3a3a4e] text-white px-4 py-2 rounded-lg font-medium transition-colors border border-[#3a3a4e]">
            <Download size={18} />
            Export
          </button>
          <button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            <Plus size={18} />
            New Booking
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#2a2a3e] rounded-lg border border-[#3a3a4e] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#3a3a4e] bg-[#1a1a2e]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                  Pickup
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                  Return
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {allBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-[#3a3a4e] hover:bg-[#3a3a4e]/50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 text-sm font-medium text-[#7c3aed]">{booking.id}</td>
                  <td className="px-6 py-4 text-sm text-white">{booking.customer}</td>
                  <td className="px-6 py-4 text-sm text-white">{booking.car}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#a0aec0]">{booking.pickup}</td>
                  <td className="px-6 py-4 text-sm text-[#a0aec0]">{booking.return}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">{booking.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
