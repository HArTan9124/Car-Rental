"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface CheckoutFormProps {
  car: any
  setCar: (c: any) => void
  addOns?: { [key: string]: boolean }
  setAddOns?: (s: { [key: string]: boolean }) => void
}

export function CheckoutForm({ car, setCar, addOns = { gps: false, childSeat: false, insurance: true, additionalDriver: false }, setAddOns }: CheckoutFormProps) {
  const [formData, setFormData] = useState<{ fullName: string; email: string; phone: string; licenseNumber: string; licenseImage: File | null; dlNumber: string; dlName: string; dlAddress: string; dlFrontImage: File | null; dlBackImage: File | null }>({
    fullName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    licenseImage: null,
    dlNumber: "",
    dlName: "",
    dlAddress: "",
    dlFrontImage: null,
    dlBackImage: null,
  })

  const [selectedAddOns, setSelectedAddOns] = useState(addOns)

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  // Trip selection: rely on car.pickupISO / car.dropISO provided from earlier selection
  const [days, setDays] = useState<number>(car.days || 1)

  // compute days and pricing whenever pickup/drop or add-ons change
  useEffect(() => {
    const pIso = car.pickupISO
    const dIso = car.dropISO
    if (pIso && dIso) {
      const p = new Date(pIso)
      const d = new Date(dIso)
      if (!isNaN(p.getTime()) && !isNaN(d.getTime()) && d > p) {
        const diffMs = d.getTime() - p.getTime()
        const computedDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
        setDays(computedDays)
        // update parent booking summary including add-ons
        const subtotal = computedDays * (car.dailyRate || car.price || 0)
        const addOnPrices: { [key: string]: number } = { gps: 150, childSeat: 100, insurance: 400, additionalDriver: 250 }
        const addOnTotal = Object.entries(selectedAddOns).reduce((sum, [k, v]) => (v ? sum + (addOnPrices[k] || 0) * computedDays : sum), 0)
        const baseInsurance = car.insurance ?? 400
        const insuranceTotal = baseInsurance + (selectedAddOns.insurance ? addOnPrices.insurance * computedDays : 0)
        const tax = Math.round(subtotal * 0.18)
        const total = subtotal + insuranceTotal + tax + addOnTotal
        setCar({ ...car, pickupDate: p.toLocaleString(), returnDate: d.toLocaleString(), pickupISO: p.toISOString(), dropISO: d.toISOString(), days: computedDays, subtotal, tax, insurance: insuranceTotal, total })
      }
    }
  }, [car.pickupISO, car.dropISO, selectedAddOns])

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setError(null)
    // pickup/drop should come from previous selection stored in car
    const pIso = car.pickupISO
    const dIso = car.dropISO
    if (!pIso || !dIso) {
      setError("Please select pickup and return date & time on the car details page before continuing")
      return
    }
    const p = new Date(pIso)
    const d = new Date(dIso)
    if (d <= p) {
      setError("Return must be after pickup")
      return
    }

    setLoading(true)
    try {
      // if DL files or DL fields provided, upload them first to user profile endpoint
      if (formData.dlFrontImage || formData.dlBackImage || formData.dlNumber || formData.dlName || formData.dlAddress) {
        const fd = new FormData()
        if (formData.dlNumber) fd.append('dlNumber', formData.dlNumber)
        if (formData.dlName) fd.append('dlName', formData.dlName)
        if (formData.dlAddress) fd.append('dlAddress', formData.dlAddress)
        if (formData.dlFrontImage) fd.append('front', formData.dlFrontImage)
        if (formData.dlBackImage) fd.append('back', formData.dlBackImage)

        // placeholder user id 1 -- replace with authenticated user id when available
        // Debug: list FormData entries to ensure files/fields are present
        try {
          for (const pair of (fd as any).entries()) {
            // pair is [key, value]
            if (pair[1] instanceof File) console.log('[DL upload] formdata', pair[0], (pair[1] as File).name, (pair[1] as File).size)
            else console.log('[DL upload] formdata', pair[0], pair[1])
          }
        } catch (e) {
          console.log('[DL upload] unable to list FormData entries', e)
        }

  const backendBase = (typeof window !== 'undefined' && window.location.hostname === 'localhost') ? 'http://localhost:8080' : ''
  const up = await fetch((backendBase || '') + '/api/users/1/dl', { method: 'POST', body: fd })
        if (!up.ok) {
          const text = await up.text().catch(()=>'<no body>')
          console.error('[DL upload] server responded', up.status, text)
          throw new Error('Failed to upload driving license: ' + text)
        }
      }

      // Build booking payload: userId is placeholder (1)
      const bookingPayload = {
        userId: 1,
        carId: car.id,
        pickupAt: p.toISOString(),
        dropoffAt: d.toISOString(),
        days,
        // include explicit pickup/drop locations so confirmation can show exact user-selected places
        pickupLocation: car.pickupLocation || car.pickupPlace || null,
        dropoffLocation: car.dropoffLocation || car.returnPlace || null,
        priceBreakdown: {
          dailyRate: car.dailyRate || car.price || null,
          subtotal: car.subtotal || (days * (car.dailyRate || car.price || 0)),
          tax: car.tax || Math.round((car.subtotal || (days * (car.dailyRate || car.price || 0))) * 0.18),
          insurance: car.insurance || 0,
          total: car.total || ( (car.subtotal || (days * (car.dailyRate || car.price || 0))) + (car.insurance || 0) + (car.tax || 0) ),
        },
        status: 'COMPLETED'
      }

  const apiBase = (typeof window !== 'undefined' && window.location.hostname === 'localhost') ? 'http://localhost:8080' : ''
  const res = await fetch((apiBase || '') + '/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      })

      if (!res.ok) throw new Error('Booking failed')
      const data = await res.json()
      // mark completed for testing and navigate to confirmation
      // navigate to confirmation page
      if (typeof window !== 'undefined') {
        window.location.href = `/booking/confirmation?bookingId=${data.id}`
      }
    } catch (err) {
      console.error(err)
      setError('Failed to place booking')
    } finally {
      setLoading(false)
    }
  }

  const addOnsData = [
    { id: "gps", label: "GPS Navigation", price: 150 },
    { id: "childSeat", label: "Child Seat", price: 100 },
    { id: "insurance", label: "Comprehensive Insurance", price: 400, selected: true },
    { id: "additionalDriver", label: "Additional Driver", price: 250 },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const name = e.target.name
    if (file) {
      if (name === 'dlFront') setFormData((prev) => ({ ...prev, dlFrontImage: file }))
      else if (name === 'dlBack') setFormData((prev) => ({ ...prev, dlBackImage: file }))
      else if (name === 'licenseImage') setFormData((prev) => ({ ...prev, licenseImage: file }))
    }
  }

  // previews for selected images
  // removed single license image upload/preview per request
  const [dlFrontPreview, setDlFrontPreview] = useState<string | null>(null)
  const [dlBackPreview, setDlBackPreview] = useState<string | null>(null)

  // generate object URLs when files change
  // licenseImage removed

  useEffect(() => {
    if (formData.dlFrontImage) {
      const url = URL.createObjectURL(formData.dlFrontImage)
      setDlFrontPreview(url)
      return () => { URL.revokeObjectURL(url); setDlFrontPreview(null) }
    }
  }, [formData.dlFrontImage])

  useEffect(() => {
    if (formData.dlBackImage) {
      const url = URL.createObjectURL(formData.dlBackImage)
      setDlBackPreview(url)
      return () => { URL.revokeObjectURL(url); setDlBackPreview(null) }
    }
  }, [formData.dlBackImage])

  // JSX additions: render pickup/drop inputs near the top of the form

  const handleAddOnChange = (addOnId: string) => {
  const updated = { ...selectedAddOns, [addOnId]: !selectedAddOns[addOnId] }
  setSelectedAddOns(updated)
  if (setAddOns) setAddOns(updated)
  }

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

  {/* pickup/drop shown in Booking Summary on the right */}

  <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Driver's License Number</label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              placeholder="DL0123456789"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

  {/* single license upload removed - DL uploads remain */}

        {/* Driving License Front & Back */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">DL Holder Name</label>
            <input type="text" name="dlName" value={formData.dlName} onChange={(e)=>setFormData(prev=>({...prev, dlName: e.target.value}))} placeholder="Name on DL" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">DL Number</label>
            <input type="text" name="dlNumber" value={formData.dlNumber} onChange={(e)=>setFormData(prev=>({...prev, dlNumber: e.target.value}))} placeholder="DL0123456789" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">DL Address</label>
          <input type="text" name="dlAddress" value={formData.dlAddress} onChange={(e)=>setFormData(prev=>({...prev, dlAddress: e.target.value}))} placeholder="Address as on DL" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload DL Front</label>
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-sm text-blue-600 font-semibold">Upload front side</p>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
              <input type="file" name="dlFront" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>
            {dlFrontPreview && <img src={dlFrontPreview} alt="DL front" className="mt-3 w-full h-32 object-cover rounded" />}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload DL Back</label>
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-sm text-blue-600 font-semibold">Upload back side</p>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
              <input type="file" name="dlBack" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>
            {dlBackPreview && <img src={dlBackPreview} alt="DL back" className="mt-3 w-full h-32 object-cover rounded" />}
          </div>
        </div>
      </div>

      {/* Add-ons & Insurance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Add-ons & Insurance</h2>

        <div className="grid grid-cols-2 gap-6">
          {addOnsData.map((addOn) => (
            <label
              key={addOn.id}
              className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                selectedAddOns[addOn.id as keyof typeof selectedAddOns]
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedAddOns[addOn.id as keyof typeof selectedAddOns]}
                onChange={() => handleAddOnChange(addOn.id)}
                className="w-5 h-5 text-blue-600"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{addOn.label}</p>
                <p className="text-sm text-gray-600">₹{addOn.price}/day</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>

        <div className="space-y-4">
          {/* Credit/Debit Card */}
          <label
            className="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition"
            style={{
              borderColor: paymentMethod === "card" ? "#2563eb" : "#e5e7eb",
              backgroundColor: paymentMethod === "card" ? "#eff6ff" : "transparent",
            }}
          >
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 text-blue-600 mt-1"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 mb-3">Credit/Debit Card</p>
              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <input
                    placeholder="Cardholder Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-400"
                  />
                  <input
                    placeholder="Card Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-400"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="Expiry Date (MM/YY)"
                      className="px-3 py-2 border border-gray-300 rounded text-sm text-gray-400"
                    />
                    <input
                      placeholder="CVV"
                      className="px-3 py-2 border border-gray-300 rounded text-sm text-gray-400"
                    />
                  </div>
                </div>
              )}
            </div>
          </label>

          {/* UPI */}
          <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition">
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 text-blue-600"
            />
            <p className="font-semibold text-gray-900">UPI (Google Pay, PhonePe, Paytm)</p>
          </label>

          {/* Net Banking */}
          <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition">
            <input
              type="radio"
              name="payment"
              value="netbanking"
              checked={paymentMethod === "netbanking"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 text-blue-600"
            />
            <p className="font-semibold text-gray-900">Net Banking</p>
          </label>

          {/* Pay at Pickup */}
          <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition">
            <input
              type="radio"
              name="payment"
              value="payatpickup"
              checked={paymentMethod === "payatpickup"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 text-blue-600"
            />
            <p className="font-semibold text-gray-900">Pay at Pickup</p>
          </label>
        </div>
      </div>

      {/* Bottom Actions */}
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      <div className="flex items-center justify-between pt-4">
        <a href="/catalog/1" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
          ← Cancel / Go Back
        </a>
        <Button onClick={handleConfirm} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold">
          {loading ? 'Processing...' : 'Confirm & Pay'}
        </Button>
      </div>
    </div>
  )
}
