"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

export default function ConfirmationPage() {
  const sp = useSearchParams()
  const bookingId = sp?.get('bookingId')

  const [booking, setBooking] = useState<any>(null)
  const [car, setCar] = useState<any>(null)
  const receiptRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!bookingId) return
    fetch(`/api/bookings/${bookingId}`)
      .then(r => r.json())
      .then(b => {
        setBooking(b)
        if (b && b.carId) fetch(`/api/cars/${b.carId}`).then(r=>r.json()).then(setCar).catch(()=>{})
      }).catch(()=>{})
  }, [bookingId])

  if (!booking) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const openReceiptWindow = (bookingData: any, carData: any) => {
    // intentionally left as no-op; we now generate and download PDF in-page
    return
  }


  const loadScript = (src: string) => new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Failed to load ' + src))
    document.head.appendChild(s)
  })

  const downloadReceiptPdf = async (bookingData: any, carData: any) => {
    try {
      // ensure receipt is rendered in DOM
      // load html2canvas and jspdf from CDN
      await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js')
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')

      // give the DOM a tick to render the hidden receipt
      await new Promise((r) => setTimeout(r, 100))

      const el = receiptRef.current
      if (!el) throw new Error('Receipt element not ready')

      // @ts-ignore
      const canvas = await (window as any).html2canvas(el, { scale: 2 })
      const imgData = canvas.toDataURL('image/png')

      // @ts-ignore
      const { jsPDF } = window.jspdf || (window as any).jspdf || (window as any).jspdf ? (window as any).jspdf : (window as any).jspdf
      // Some CDN variants attach under window.jspdf, some under window.jspdf.jsPDF
      const doc = new (jsPDF || (window as any).jspdf?.jsPDF || (window as any).jsPDF)('p', 'pt', 'a4')
      const imgProps = (doc as any).getImageProperties ? (doc as any).getImageProperties(imgData) : { width: canvas.width, height: canvas.height }
      const pdfWidth = doc.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      const filename = `receipt-${bookingData.id || 'booking'}.pdf`
      doc.save(filename)
    } catch (err) {
      console.error('Failed to generate PDF', err)
      alert('Could not generate PDF automatically. The receipt will open in a new window for printing.')
      // fallback: open print window
      openReceiptWindow(bookingData, carData)
    }
  }

  const downloadServerReceipt = async (bookingData: any, carData: any) => {
    try {
      const apiBase = (typeof window !== 'undefined' && window.location.hostname === 'localhost') ? 'http://localhost:8080' : ''
      const url = (apiBase || '') + `/api/bookings/${bookingData.id}/receipt`
      // fetch the PDF and trigger automatic download
      const resp = await fetch(url)
      if (!resp.ok) throw new Error('Server returned ' + resp.status)
      const blob = await resp.blob()
      const link = document.createElement('a')
      const blobUrl = window.URL.createObjectURL(blob)
      link.href = blobUrl
      link.download = `receipt-${bookingData.id}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(blobUrl)
    } catch (err) {
      console.error('server download failed, falling back', err)
      await downloadReceiptPdf(bookingData, carData)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-12 px-6">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex items-start gap-6">
            <div className="w-40 h-36 bg-gray-100 rounded overflow-hidden relative">
              {car?.image ? (
                // image is stored as path or base64; attempt to use it
                <Image src={car.image || '/placeholder.jpg'} alt={car.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-600">Booking ID: <span className="font-mono">#{booking.id}</span></p>
                  <h2 className="text-2xl font-bold">{car?.name || 'Car'}</h2>
                  <p className="text-sm text-gray-600">{car?.brand} · {car?.vehicleType}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-semibold text-green-600">{booking.status || 'COMPLETED'}</p>
                </div>
              </div>
            </div>
          </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Pickup</h3>
        <p className="text-gray-900">{booking.pickupLocation ?? car?.pickupLocation ?? 'Pickup location'}</p>
        <p className="text-sm text-gray-600 mt-2">{new Date(booking.pickupAt).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Drop-off</h3>
        <p className="text-gray-900">{booking.dropoffLocation ?? car?.location ?? 'Return location'}</p>
        <p className="text-sm text-gray-600 mt-2">{new Date(booking.dropoffAt).toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <h4 className="font-semibold mb-3">Payment Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Daily rate</p>
                <p className="font-semibold">₹{booking.priceBreakdown?.dailyRate ?? car?.price ?? '—'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Days</p>
                <p className="font-semibold">{booking.days || car?.days || 1}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-semibold">₹{booking.priceBreakdown?.subtotal ?? '—'}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Insurance</span><span className="font-semibold">₹{booking.priceBreakdown?.insurance ?? '—'}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Tax (GST 18%)</span><span className="font-semibold">₹{booking.priceBreakdown?.tax ?? '—'}</span></div>
              <div className="flex justify-between text-lg pt-2 border-t"><span className="font-bold">Total</span><span className="font-bold">₹{booking.priceBreakdown?.total ?? '—'}</span></div>
            </div>

            <div className="mt-6 flex gap-3">
              <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded">Back to Home</a>
              <button onClick={() => downloadServerReceipt(booking, car)} className="px-4 py-2 border border-gray-200 rounded">Download Receipt</button>
            </div>
          </div>
        </div>

        {/* Hidden receipt element used to render PDF */}
        <div style={{ position: 'fixed', left: -9999, top: 0, width: '800px' }} aria-hidden="true">
          <div ref={receiptRef} style={{ width: '800px', padding: 20, fontFamily: 'Inter, Arial, sans-serif', color: '#111', background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>✓</div>
              <div>
                <div style={{ fontSize: 14, color: '#10b981' }}>Payment received</div>
                <h1 style={{ margin: 0, fontSize: 20 }}>Booking Receipt</h1>
                <div style={{ color: '#6b7280' }}>Booking ID: {booking.id} · {new Date().toLocaleDateString()}</div>
              </div>
            </div>

            <div style={{ border: '1px solid #e6e6e6', padding: 16, borderRadius: 8, marginTop: 12 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 120, height: 80, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
                  {car?.image ? <img src={car.image} style={{ maxWidth: 110, maxHeight: 72, objectFit: 'cover', borderRadius: 4 }} /> : 'No image'}
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{car?.name || 'Car'}</div>
                  <div style={{ color: '#6b7280' }}>{car?.brand || ''} · {car?.vehicleType || ''}</div>
                </div>
              </div>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ color: '#6b7280' }}>Pickup</div>
                  <div>{new Date(booking.pickupAt).toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#6b7280' }}>Return</div>
                  <div>{new Date(booking.dropoffAt).toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div style={{ border: '1px solid #e6e6e6', padding: 16, borderRadius: 8, marginTop: 12 }}>
              <h3 style={{ margin: '0 0 8px 0' }}>Price Breakdown</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ color: '#6b7280' }}>Daily rate</div><div>₹{booking.priceBreakdown?.dailyRate ?? car?.price ?? '—'}</div></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ color: '#6b7280' }}>Days</div><div>{booking.days || car?.days || 1}</div></div>
              <hr style={{ margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ color: '#6b7280' }}>Subtotal</div><div>₹{booking.priceBreakdown?.subtotal ?? '—'}</div></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ color: '#6b7280' }}>Insurance</div><div>₹{booking.priceBreakdown?.insurance ?? '—'}</div></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ color: '#6b7280' }}>Tax (GST)</div><div>₹{booking.priceBreakdown?.tax ?? '—'}</div></div>
              <div style={{ marginTop: 8, borderTop: '1px solid #eee', paddingTop: 8, fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}><div>Total</div><div>₹{booking.priceBreakdown?.total ?? '—'}</div></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
