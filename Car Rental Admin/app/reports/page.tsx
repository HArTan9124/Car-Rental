"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ReportsPage } from "@/components/pages/reports-page"

export default function ReportsRoute() {
  return (
    <div className="flex min-h-screen bg-[#1a1a2e]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <ReportsPage />
      </div>
    </div>
  )
}
