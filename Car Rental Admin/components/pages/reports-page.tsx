"use client"

import { Download } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 42000, bookings: 240 },
  { month: "Feb", revenue: 38000, bookings: 221 },
  { month: "Mar", revenue: 51000, bookings: 229 },
  { month: "Apr", revenue: 62000, bookings: 290 },
  { month: "May", revenue: 48000, bookings: 200 },
  { month: "Jun", revenue: 71000, bookings: 320 },
]

const vehicleUsageData = [
  { vehicle: "Tesla Model 3", usage: 85 },
  { vehicle: "BMW X5", usage: 72 },
  { vehicle: "Honda Civic", usage: 68 },
  { vehicle: "Ford Mustang", usage: 90 },
  { vehicle: "Audi A4", usage: 65 },
]

export function ReportsPage() {
  return (
    <main className="flex-1 overflow-auto p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
          <p className="text-[#a0aec0]">View detailed business reports and analytics</p>
        </div>
        <button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* Report Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-[#2a2a3e] rounded-lg p-6 border border-[#3a3a4e]">
          <p className="text-[#a0aec0] text-sm font-medium mb-2">Total Revenue</p>
          <h3 className="text-3xl font-bold text-white">$312,000</h3>
          <p className="text-sm text-green-400 mt-2">+12.5% vs last month</p>
        </div>
        <div className="bg-[#2a2a3e] rounded-lg p-6 border border-[#3a3a4e]">
          <p className="text-[#a0aec0] text-sm font-medium mb-2">Total Bookings</p>
          <h3 className="text-3xl font-bold text-white">1,500</h3>
          <p className="text-sm text-green-400 mt-2">+8.2% vs last month</p>
        </div>
        <div className="bg-[#2a2a3e] rounded-lg p-6 border border-[#3a3a4e]">
          <p className="text-[#a0aec0] text-sm font-medium mb-2">Avg Booking Value</p>
          <h3 className="text-3xl font-bold text-white">$208</h3>
          <p className="text-sm text-green-400 mt-2">+4.1% vs last month</p>
        </div>
        <div className="bg-[#2a2a3e] rounded-lg p-6 border border-[#3a3a4e]">
          <p className="text-[#a0aec0] text-sm font-medium mb-2">Fleet Utilization</p>
          <h3 className="text-3xl font-bold text-white">76%</h3>
          <p className="text-sm text-green-400 mt-2">+3.5% vs last month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-[#2a2a3e] rounded-lg p-6 border border-[#3a3a4e]">
          <h2 className="text-lg font-semibold text-white mb-6">Monthly Revenue & Bookings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3a3a4e" />
              <XAxis dataKey="month" stroke="#a0aec0" />
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

        {/* Vehicle Usage Chart */}
        <div className="bg-[#2a2a3e] rounded-lg p-6 border border-[#3a3a4e]">
          <h2 className="text-lg font-semibold text-white mb-6">Vehicle Usage Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vehicleUsageData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3a3a4e" />
              <XAxis dataKey="vehicle" stroke="#a0aec0" />
              <YAxis stroke="#a0aec0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a2e",
                  border: "1px solid #3a3a4e",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#a0aec0" }}
              />
              <Bar dataKey="usage" fill="#7c3aed" name="Usage %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  )
}
