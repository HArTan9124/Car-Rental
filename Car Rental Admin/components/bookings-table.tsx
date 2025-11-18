"use client"

import { CheckCircle, X } from "lucide-react"

const bookings = [
  {
    id: "#89431",
    customer: "Robert Fox",
    car: "Tesla Model 3",
    pickup: "Nov 03, 14:00 | JFK",
    return: "Nov 08, 14:00 | JFK",
    amount: "$650.00",
  },
  {
    id: "#89430",
    customer: "Esther Howard",
    car: "Honda Civic",
    pickup: "Nov 04, 09:00 | LAX",
    return: "Nov 06, 09:00 | LAX",
    amount: "$180.00",
  },
  {
    id: "#89429",
    customer: "Brooklyn Simmons",
    car: "BMW X5",
    pickup: "Nov 05, 11:30 | Downtown",
    return: "Nov 10, 11:30 | Downtown",
    amount: "$920.00",
  },
]

export function BookingsTable() {
  return (
    <div className="bg-[#2a2a3e] rounded-lg border border-[#3a3a4e] overflow-hidden">
      <div className="p-6 border-b border-[#3a3a4e]">
        <h2 className="text-lg font-semibold text-white">Pending Confirmation Bookings</h2>
      </div>

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
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">Car</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                Pickup
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                Return
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="border-b border-[#3a3a4e] hover:bg-[#3a3a4e]/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-white">{booking.id}</td>
                <td className="px-6 py-4 text-sm text-white">{booking.customer}</td>
                <td className="px-6 py-4 text-sm text-white">{booking.car}</td>
                <td className="px-6 py-4 text-sm text-[#a0aec0]">{booking.pickup}</td>
                <td className="px-6 py-4 text-sm text-[#a0aec0]">{booking.return}</td>
                <td className="px-6 py-4 text-sm font-semibold text-white">{booking.amount}</td>
                <td className="px-6 py-4 text-sm flex gap-3">
                  <button className="text-green-400 hover:text-green-300 transition-colors flex items-center gap-1">
                    <CheckCircle size={18} />
                    <span>Confirm</span>
                  </button>
                  <button className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1">
                    <X size={18} />
                    <span>Cancel</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
