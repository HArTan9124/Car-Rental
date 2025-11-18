"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { FleetPage } from "@/components/pages/fleet-page"

export default function FleetRoute() {
  return (
    <div className="flex min-h-screen bg-[#1a1a2e]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <FleetPage />
      </div>
    </div>
  )
}
