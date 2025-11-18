"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { BookingsPage } from "@/components/pages/bookings-page"

export default function BookingsRoute() {
  return (
    <div className="flex min-h-screen bg-[#1a1a2e]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <BookingsPage />
      </div>
    </div>
  )
}
