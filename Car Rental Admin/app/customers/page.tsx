"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { CustomersPage } from "@/components/pages/customers-page"

export default function CustomersRoute() {
  return (
    <div className="flex min-h-screen bg-[#1a1a2e]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <CustomersPage />
      </div>
    </div>
  )
}
