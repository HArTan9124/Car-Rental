import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navigation() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-bold">
        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white">🚗</div>
        <span className="text-gray-900">RentWheels</span>
      </div>

      {/* Menu */}
      <div className="flex items-center gap-8 text-gray-600">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/catalog" className="hover:text-gray-900 transition">
          Catalog
        </Link>
        <Link href="/about" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-gray-900 transition">
          Contact
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium">Login</Link>
        <Link href="/signup">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">Sign Up</Button>
        </Link>
      </div>
    </nav>
  )
}
