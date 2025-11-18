"use client"

import { Plus, RotateCw, AlertCircle, DollarSign, Calendar } from "lucide-react"

const activities = [
  {
    icon: Plus,
    title: "New Booking",
    description: "#89343 created.",
    time: "2 mins ago",
    author: "John Doe",
    color: "#7c3aed",
  },
  {
    icon: RotateCw,
    title: "Car returned",
    description: "Toyota Camry returned.",
    time: "10 mins ago",
    location: "JFK Branch",
    color: "#10b981",
  },
  {
    icon: Calendar,
    title: "Maintenance scheduled",
    description: "Ford Mustang.",
    time: "1 hour ago",
    color: "#f59e0b",
  },
  {
    icon: AlertCircle,
    title: "Overdue return",
    description: "#89122.",
    time: "3 hours ago",
    color: "#ef4444",
  },
  {
    icon: DollarSign,
    title: "Payment processed",
    description: "$250.00 for #89334.",
    time: "5 hours ago",
    color: "#3b82f6",
  },
]

export function RecentActivity() {
  return (
    <div className="bg-[#2a2a3e] rounded-lg p-6 border border-[#3a3a4e]">
      <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <div key={index} className="flex gap-3 items-start">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                style={{ backgroundColor: activity.color }}
              >
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">
                  {activity.title} <span className="text-[#7c3aed]">{activity.description}</span>
                </p>
                <p className="text-xs text-[#a0aec0] mt-1">
                  {activity.time} {activity.author && `by ${activity.author}`}{" "}
                  {activity.location && `at ${activity.location}`}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
