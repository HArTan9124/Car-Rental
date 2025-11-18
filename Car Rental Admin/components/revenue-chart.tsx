"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { BarChart3 } from "lucide-react"

const data = [
  { day: "Day 1", revenue: 4000, bookings: 24 },
  { day: "Day 5", revenue: 6000, bookings: 35 },
  { day: "Day 10", revenue: 7500, bookings: 42 },
  { day: "Day 15", revenue: 9000, bookings: 51 },
  { day: "Day 20", revenue: 11000, bookings: 65 },
  { day: "Day 25", revenue: 12500, bookings: 72 },
  { day: "Day 30", revenue: 15000, bookings: 85 },
]

export function RevenueChart() {
  return (
    <div className="bg-[#2a2a3e] rounded-lg p-6 border border-[#3a3a4e]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">Revenue & Bookings Trend</h2>
        </div>
        <button className="text-[#a0aec0] hover:text-white">
          <BarChart3 size={20} />
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3a3a4e" />
          <XAxis dataKey="day" stroke="#a0aec0" />
          <YAxis stroke="#a0aec0" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a2e",
              border: "1px solid #3a3a4e",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#a0aec0" }}
          />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#7c3aed" dot={false} strokeWidth={2} name="Revenue" />
          <Line type="monotone" dataKey="bookings" stroke="#3b82f6" dot={false} strokeWidth={2} name="Bookings" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
