"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { BookingSummary } from "@/components/checkout/booking-summary"
import { CheckoutFAQ } from "@/components/checkout/checkout-faq"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function CheckoutPage() {
  const searchParams = useSearchParams()

  const [selectedCar, setSelectedCar] = useState<any>({
    id: null,
    name: "",
    specs: "",
    image: "/placeholder.jpg",
    pickupLocation: "",
    pickupDate: "",
    returnLocation: "",
    returnDate: "",
    dailyRate: 0,
    days: 1,
    subtotal: 0,
    insurance: 0,
    tax: 0,
    total: 0,
  })

  const [addOns, setAddOns] = useState<{ [key: string]: boolean }>({
    gps: false,
    childSeat: false,
    insurance: true,
    additionalDriver: false,
  })

  useEffect(() => {
    const id = searchParams?.get('carId') || '1'
    // fetch car details from backend
    fetch(`/api/cars/${id}`)
      .then((r) => r.json())
      .then((car) => {
        // initialize computed fields and pickup/drop if provided in query params
        const pickupParam = searchParams?.get('pickup')
        const dropParam = searchParams?.get('drop')
        let pickupDate = car.pickupDate || ''
        let returnDate = car.returnDate || ''
        let pickupISO = ''
        let dropISO = ''
        if (pickupParam) {
          try { pickupISO = pickupParam; pickupDate = new Date(pickupParam).toLocaleString() } catch(e) {}
        }
        if (dropParam) {
          try { dropISO = dropParam; returnDate = new Date(dropParam).toLocaleString() } catch(e) {}
        }

  let days = car.days || 1
  if (pickupISO && dropISO) {
          try {
            const p = new Date(pickupISO)
            const d = new Date(dropISO)
            if (!isNaN(p.getTime()) && !isNaN(d.getTime()) && d > p) {
              days = Math.max(1, Math.ceil((d.getTime() - p.getTime()) / (1000 * 60 * 60 * 24)))
            }
          } catch (e) {}
        }
  // Allow override from query params for exact breakdown (sent from details page)
  const qDaily = searchParams?.get('dailyRate')
  const qDays = searchParams?.get('days')
  const qSubtotal = searchParams?.get('subtotal')
  const qTax = searchParams?.get('tax')
  const qInsurance = searchParams?.get('insurance')
  const qTotal = searchParams?.get('total')

  const dailyRate = qDaily ? Number(qDaily) : (car.dailyRate || car.price || 0)
  const finalDays = qDays ? Number(qDays) : days
  const subtotal = qSubtotal ? Number(qSubtotal) : dailyRate * finalDays
  const insurance = qInsurance ? Number(qInsurance) : (car.insurance ?? 400)
  const tax = qTax ? Number(qTax) : Math.round(subtotal * 0.18)
  const total = qTotal ? Number(qTotal) : subtotal + tax + insurance

  setSelectedCar({ ...car, pickupDate, returnDate, pickupISO, dropISO, days: finalDays, subtotal, tax, insurance, total, dailyRate })
      })
      .catch(() => {})
  }, [searchParams])

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <nav className="flex items-center gap-2 text-sm mb-4">
            <a href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </a>
            <span className="text-gray-400">/</span>
            <a href="/catalog" className="text-gray-600 hover:text-blue-600">
              Explore Cars
            </a>
            <span className="text-gray-400">/</span>
            <a href="/catalog/1" className="text-gray-600 hover:text-blue-600">
              Car Details
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">Booking & Checkout</span>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">Review your details and confirm your rental securely.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm car={selectedCar} setCar={setSelectedCar} addOns={addOns} setAddOns={setAddOns} />
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <BookingSummary car={selectedCar} addOns={addOns} />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutFAQ />
          </div>

          {/* Help Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-fit sticky top-6">
            <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 text-sm mb-4">Our team is here to help you 24/7.</p>
            <a href="tel:+91-1234-567890" className="text-xl font-bold text-blue-600 hover:text-blue-700">
              +91-1234-567890
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
