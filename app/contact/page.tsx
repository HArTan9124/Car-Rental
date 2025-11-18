'use client'

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="bg-white py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-8">
            We'd love to hear from you! Whether you have a question about our services, need assistance with a booking, or just want to provide feedback, please don't hesitate to get in touch.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Send us a message</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                </div>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Send Message</Button>
              </form>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <p className="text-gray-600 mb-2">Feel free to reach out to us via email.</p>
              <p className="text-gray-800 font-semibold">sparshsharma0825@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
