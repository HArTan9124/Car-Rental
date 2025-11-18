'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CarCardProps {
  car: {
    id: number
    name: string
    image: string
    price: number
    transmission: string
    seatingCapacity: number
    fuelType: string
  }
}

export function CarCard({ car }: CarCardProps) {
  return (
    <Link href={`/catalog/${car.id}`}>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden bg-gray-100">
          <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover w-full h-full" />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Car Name */}
          <h3 className="text-lg font-bold text-gray-900 mb-3">{car.name}</h3>

          {/* Features */}
          <div className="flex items-center justify-between text-xs text-gray-600 mb-4 pb-4 border-b border-gray-100">
            <span className="flex items-center gap-1">👥 {car.seatingCapacity} Seats</span>
            <span className="flex items-center gap-1">⚙️ {car.transmission}</span>
            <span className="flex items-center gap-1">⛽ {car.fuelType}</span>
          </div>

          {/* Price and Button */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">₹{car.price}</span>
              <span className="text-xs text-gray-600"> /day</span>
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
