import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#1a1a2e]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Dashboard />
      </div>
    </div>
  )
}
