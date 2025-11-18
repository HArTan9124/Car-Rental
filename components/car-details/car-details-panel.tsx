"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star, Heart } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface CarDetailsPanelProps {
  car: any
}

export function CarDetailsPanel({ car }: CarDetailsPanelProps) {
  const router = useRouter()
  const [pickup, setPickup] = useState<string>("")
  const [dropoff, setDropoff] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [displayedPriceBreakdown, setDisplayedPriceBreakdown] = useState(() => {
    const dailyRate = car.priceBreakdown?.dailyRate ?? car.price ?? 0
    const days = car.priceBreakdown?.days ?? 1
    const subtotal = dailyRate * days
    const tax = Math.round(subtotal * 0.18)
    const insurance = car.priceBreakdown?.insurance ?? 0
    const total = subtotal + tax + insurance
    return { dailyRate, days, subtotal, tax, insurance, total }
  })
  return (
    <div className="sticky top-6 bg-white rounded-lg border border-gray-200 p-6">
      {/* Similar Cars Carousel */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 mb-4">Similar Cars</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative h-24 rounded bg-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <Image src="/sleek-car-thumbnail.png" alt="Similar car" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Car Title and Badge */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{car.name}</h2>
            <p className="text-sm text-gray-600">{car.status === "available" ? "Available" : "Booked"}</p>
          </div>
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${car.status === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {car.status === "available" ? "Available" : "Booked"}
          </span>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < Math.floor(car.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}
            />
          ))}
        </div>
        <span className="font-bold text-gray-900">{car.rating}</span>
        <span className="text-sm text-gray-600">({car.reviews} reviews)</span>
      </div>

      {/* Specs */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200 text-sm">
        <div className="flex items-center gap-1">
          <span className="text-gray-600">⚙️ {car.transmission}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-600">⛽ {car.fuelType}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-600">👥 {car.seating} Seats</span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-4">
        <span className="text-3xl font-bold text-gray-900">₹{car.price}</span>
        <span className="text-gray-600"> /day</span>
      </div>

      {/* Pickup Location and Dates */}
      <div className="mb-6 space-y-3">
        <div>
          <label className="text-xs font-semibold text-gray-600">Pickup Location</label>
          <p className="text-gray-900">{car.pickupLocation}</p>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Pickup Date</label>
          <input
            type="date"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Return Date</label>
          <input
            type="date"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              setError(null)
              if (!pickup || !dropoff) {
                setError('Please select pickup and return date')
                return
              }
              const p = new Date(pickup)
              const d = new Date(dropoff)
              if (isNaN(p.getTime()) || isNaN(d.getTime()) || d <= p) {
                setError('Return must be after pickup')
                return
              }
              const diffMs = d.getTime() - p.getTime()
              const days = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
              const dailyRate = car.priceBreakdown?.dailyRate ?? car.price ?? 0
              const subtotal = dailyRate * days
              const tax = Math.round(subtotal * 0.18)
              const insurance = car.priceBreakdown?.insurance ?? 0
              const total = subtotal + tax + insurance
              setDisplayedPriceBreakdown({ dailyRate, days, subtotal, tax, insurance, total })
            }}
            className="px-4 py-2 bg-gray-200 rounded-md text-sm"
          >
            Done
          </button>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="mb-6 space-y-2 pb-6 border-b border-gray-200 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">₹{displayedPriceBreakdown.dailyRate} × {displayedPriceBreakdown.days} days</span>
          <span className="font-semibold text-gray-900">₹{displayedPriceBreakdown.subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Taxes & Fees (GST)</span>
          <span className="font-semibold text-gray-900">₹{displayedPriceBreakdown.tax}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Insurance</span>
          <span className="font-semibold text-gray-900">₹{displayedPriceBreakdown.insurance}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span className="font-bold text-gray-900">Total</span>
          <span className="font-bold text-gray-900">₹{displayedPriceBreakdown.total}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
            setError(null)
            if (!pickup || !dropoff) {
              setError('Please select pickup and return date')
              return
            }
            const p = new Date(pickup)
            const d = new Date(dropoff)
            if (isNaN(p.getTime()) || isNaN(d.getTime()) || d <= p) {
              setError('Return must be after pickup')
              return
            }
            // build query params and navigate to checkout, include price breakdown so checkout shows identical numbers
            const params = new URLSearchParams()
            params.set('carId', String(car.id || car.id))
            params.set('pickup', p.toISOString())
            params.set('drop', d.toISOString())
            // attach breakdown
            try {
              params.set('dailyRate', String(displayedPriceBreakdown.dailyRate || car.price || 0))
              params.set('days', String(displayedPriceBreakdown.days || 1))
              params.set('subtotal', String(displayedPriceBreakdown.subtotal || 0))
              params.set('tax', String(displayedPriceBreakdown.tax || 0))
              params.set('insurance', String(displayedPriceBreakdown.insurance || 0))
              params.set('total', String(displayedPriceBreakdown.total || 0))
            } catch (e) {}
            router.push('/checkout?' + params.toString())
          }}
        >
          Book Now
        </Button>
        
        <Button variant="outline" size="icon" className="flex-shrink-0 bg-transparent">
          <Heart size={20} />
        </Button>
      </div>
    </div>
  )
}
