"use client"

import Image from "next/image"
import { useState } from "react"

interface CarDetailsGalleryProps {
  car: any
}

export function CarDetailsGallery({ car }: CarDetailsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div className="bg-white rounded-lg overflow-hidden mb-8">
      {/* Main Image */}
      <div className="relative h-96 bg-gray-100 mb-4">
        <Image
          src={car.images[selectedImage] || "/placeholder.svg"}
          alt={car.name}
          fill
          className="object-cover w-full h-full"
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-2 p-4">
        {car.images.map((image: string, index: number) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative w-20 h-20 rounded border-2 overflow-hidden flex-shrink-0 ${
              selectedImage === index ? "border-blue-600" : "border-gray-200"
            }`}
          >
            <Image src={image || "/placeholder.svg"} alt={`${car.name} ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
