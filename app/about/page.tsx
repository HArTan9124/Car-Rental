'use client'

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="bg-white py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-lg text-gray-600 mb-8">
            RentWheels is a premier car rental service dedicated to providing our customers with the best vehicles and a seamless rental experience. Our mission is to make car rental simple, affordable, and accessible to everyone.
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sparsh Sharma</h3>
              <p className="text-gray-600">Owner & Founder</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
