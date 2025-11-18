"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarReviewsProps {
  car: any
}

export function CarReviews({ car }: CarReviewsProps) {
  return (
    <div className="bg-white rounded-lg p-8 mb-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Reviews & Ratings</h3>
        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={
                  i < Math.floor(car.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-2xl font-bold text-gray-900">{car.rating}</span>
          <span className="text-gray-600">({car.reviews} reviews)</span>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {car.customerReviews.map((review: any) => (
          <div key={review.id} className="pb-6 border-b border-gray-200 last:border-b-0">
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image src={review.avatar || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <span className="text-xs text-gray-600">{review.date}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}
                    />
                  ))}
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-6">
        <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
          Load More Reviews
        </Button>
      </div>
    </div>
  )
}
