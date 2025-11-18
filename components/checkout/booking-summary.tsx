"use client"

import Image from "next/image"
import { useState } from "react"

interface BookingSummaryProps {
  car: any
  addOns?: { [key: string]: boolean }
}

export function BookingSummary({ car, addOns = {} }: BookingSummaryProps) {
  const [promoCode, setPromoCode] = useState("")
  const dailyRate = car.dailyRate || car.price || 0
  const days = car.days || 1
  const subtotal = dailyRate * days
  const baseInsurance = car.insurance ?? 400

  // Add-on prices (match checkout form)
  const addOnPrices: { [key: string]: number } = { gps: 150, childSeat: 100, insurance: 400, additionalDriver: 250 }
  const addOnTotal = Object.entries(addOns).reduce((sum, [k, v]) => (v ? sum + (addOnPrices[k] || 0) * days : sum), 0)

  const insurance = baseInsurance + (addOns.insurance ? addOnPrices.insurance * days : 0)
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + insurance + tax + addOnTotal

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h2>

      {/* Car Info */}
      <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
        <div className="relative w-24 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
          <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{car.name}</h3>
          <p className="text-sm text-gray-600">{car.specs}</p>
        </div>
      </div>

      {/* Pickup & Return */}
      <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
        <div>
          <p className="text-sm text-gray-600">Pickup:</p>
          <p className="font-semibold text-gray-900">{car.pickupDate}</p>
          <p className="text-sm text-gray-600">{car.pickupLocation}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Return:</p>
          <p className="font-semibold text-gray-900">{car.returnDate}</p>
          <p className="text-sm text-gray-600">{car.returnLocation}</p>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 mb-6 pb-6 border-b border-gray-200 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Daily Rate (₹{dailyRate} × {days} days)</span>
          <span className="font-semibold text-gray-900">₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Insurance</span>
          <span className="font-semibold text-gray-900">₹{insurance}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Taxes (GST 18%)</span>
          <span className="font-semibold text-gray-900">₹{tax}</span>
        </div>
        <div className="flex justify-between text-lg pt-2 border-t border-gray-200">
          <span className="font-bold text-gray-900">Total Cost</span>
          <span className="font-bold text-blue-600">₹{total}</span>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <label className="text-sm text-gray-600 mb-2 block">Enter Promo Code</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
          />
          <button className="px-4 py-2 bg-gray-900 text-white rounded font-semibold text-sm hover:bg-gray-800">
            Apply
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
        <span className="text-lg">🛡️</span>
        <div>
          <p className="text-sm font-semibold text-green-900">Free cancellation up to 24 hours before pickup</p>
        </div>
      </div>
    </div>
  )
}
