"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Search } from "lucide-react"

export function CatalogHeader() {
  const [searchParams, setSearchParams] = useState({
    pickupLocation: "",
    pickupDate: "2025-11-10",
    pickupTime: "10:00 AM",
    returnDate: "2025-11-15",
    returnTime: "10:00 AM",
    carType: "All Types",
  })

  return (
    <div className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <span>Home</span>
          <ChevronRight size={16} />
          <span className="text-blue-600 font-medium">Explore Cars</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Perfect Ride</h1>
        <p className="text-gray-600 mb-8">Browse from our wide range of cars available for every journey and budget.</p>

        {/* Search Bar */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-5 gap-4">
            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
              <input
                type="text"
                placeholder="City, Airport, or Address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchParams.pickupLocation}
                onChange={(e) => setSearchParams({ ...searchParams, pickupLocation: e.target.value })}
              />
            </div>

            {/* Pickup Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
              <input
                type="datetime-local"
                defaultValue="2025-11-10T10:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Return Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
              <input
                type="datetime-local"
                defaultValue="2025-11-15T10:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Car Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Car Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Types</option>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Hatchback</option>
                <option>Luxury</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                <Search size={16} className="mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
