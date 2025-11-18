"use client"

import { TrendingUp, TrendingDown } from "lucide-react"

const metrics = [
  {
    label: "Daily Revenue",
    value: "$14,280",
    change: "+12.5%",
    isPositive: true,
  },
  {
    label: "Active Bookings",
    change: "-2.1%",
    value: "215",
    isPositive: false,
  },
  {
    label: "Fleet Utilization",
    value: "82%",
    change: "+5.0%",
    isPositive: true,
  },
  {
    label: "Overdue Returns",
    value: "8",
    change: "0%",
    isPositive: true,
  },
]

export function MetricsCards() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-[#2a2a3e] rounded-lg p-6 border border-[#3a3a4e]">
          <p className="text-[#a0aec0] text-sm font-medium mb-3">{metric.label}</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-white">{metric.value}</h3>
            <div className={`flex items-center gap-1 text-sm ${metric.isPositive ? "text-green-400" : "text-red-400"}`}>
              {metric.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{metric.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
