"use client"

import { MetricsCards } from "./metrics-cards"
import { RevenueChart } from "./revenue-chart"
import { RecentActivity } from "./recent-activity"
import { BookingsTable } from "./bookings-table"

export function Dashboard() {
  return (
    <main className="flex-1 overflow-auto p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-[#a0aec0]">Welcome back, Alexia. Here's what's happening today.</p>
        </div>
        <button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <span>+</span> Create Booking
        </button>
      </div>

      {/* Metrics Cards */}
      <MetricsCards />

      {/* Charts and Activity */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <RevenueChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Bookings Table */}
      <BookingsTable />
    </main>
  )
}
