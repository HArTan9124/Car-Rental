"use client"

import { Search, Bell, ChevronDown } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"

export function Header() {
  return (
    <header className="bg-[#1a1a2e] border-b border-[#2a2a3e] px-8 py-4 flex items-center justify-between">
      {/* Search */}
      <div className="flex items-center gap-3 bg-[#2a2a3e] rounded-lg px-4 py-2 max-w-md flex-1">
        <Search size={18} className="text-[#a0aec0]" />
        <input
          type="text"
          placeholder="Search bookings, customers, cars..."
          className="bg-transparent text-white placeholder-[#a0aec0] outline-none w-full text-sm"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 ml-8">
        {/* Notification */}
        <button className="text-[#a0aec0] hover:text-white transition-colors">
          <Bell size={20} />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-[#2a2a3e]">
          <div className="text-right">
            <p className="text-sm font-semibold text-white">Alexia Smith</p>
            <p className="text-xs text-[#a0aec0]">SUPER_ADMIN</p>
          </div>
          <Avatar className="h-10 w-10 bg-[#7c3aed] text-white flex items-center justify-center">
            <span className="font-semibold">AS</span>
          </Avatar>
          <ChevronDown size={18} className="text-[#a0aec0]" />
        </div>
      </div>
    </header>
  )
}
