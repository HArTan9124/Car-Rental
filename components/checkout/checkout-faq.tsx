"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function CheckoutFAQ() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const faqItems = [
    {
      id: 1,
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking free of charge up to 24 hours before your pickup time. Cancellations made within 24 hours of pickup may incur a cancellation fee.",
    },
    {
      id: 2,
      question: "What documents do I need?",
      answer:
        "You'll need a valid driver's license, a government-issued ID, and a valid credit/debit card for payment. International travelers should also have their passport and International Driving Permit.",
    },
    {
      id: 3,
      question: "Is there a security deposit?",
      answer:
        "Yes, we hold a security deposit of ₹5,000 which is refunded to your account within 5-7 business days after the rental period ends, subject to no damages or violations.",
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setExpandedFAQ(expandedFAQ === item.id ? null : item.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
            >
              <p className="font-semibold text-gray-900 text-left">{item.question}</p>
              <ChevronDown
                size={20}
                className={`text-gray-600 flex-shrink-0 transition ${expandedFAQ === item.id ? "rotate-180" : ""}`}
              />
            </button>
            {expandedFAQ === item.id && (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-600 text-sm">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
