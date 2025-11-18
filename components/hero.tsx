"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function Hero() {
  const [location, setLocation] = useState("")
  const [pickupDate, setPickupDate] = useState("")
  const [pickupTime, setPickupTime] = useState("")
  const [dropoffDate, setDropoffDate] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.append("location", location)
    if (pickupDate) params.append("pickupDate", pickupDate)
    if (pickupTime) params.append("pickupTime", pickupTime)
    if (dropoffDate) params.append("dropoffDate", dropoffDate)

    router.push(`/catalog?${params.toString()}`)
  }

  return (
    <section className="relative h-screen flex items-stretch overflow-hidden">
      {/* Left side - Car image */}
      <div className="w-1/2 relative">
        <Image
          src="/images/hero-car.jpg"
          alt="Luxury sports car on coastal road"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right side - Content overlay */}
      <div className="w-1/2 bg-gradient-to-r from-gray-800 to-gray-700 flex flex-col justify-center px-16 py-32">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            YOUR DREAM CAR, JUST A CLICK AWAY
          </h1>
          <p className="text-lg text-gray-200 mb-12 leading-relaxed">
            Premium cars for any occasion. Seamless booking, unbeatable prices,
            and unforgettable journeys.
          </p>

          {/* Search Form */}
          <div className="bg-gray-700 bg-opacity-60 backdrop-blur rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1">
                <label className="text-white text-sm font-medium block mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City, Air"
                  className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <label className="text-white text-sm font-medium block mb-2">
                  Pick-up
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-lg bg-white text-gray-900"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <label className="text-white text-sm font-medium block mb-2">
                  Time
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-2 rounded-lg bg-white text-gray-900"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <label className="text-white text-sm font-medium block mb-2">
                  Drop-off
                </label>♥
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-lg bg-white text-gray-900"
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                />
              </div>
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              onClick={handleSearch}
            >
              🔍 Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
