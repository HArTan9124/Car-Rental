'use client'

import { CarCard } from "./car-card"
import { useEffect, useState } from "react"

interface CarGridProps {
  filters: any
}

export function CarGrid({ filters }: CarGridProps) {
  const [cars, setCars] = useState([])

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
  }, [])

  const filteredCars = cars.filter((car: any) => {
    if (filters.transmission !== "all" && car.transmission !== filters.transmission) return false
    if (filters.seatingCapacity !== "all" && car.seatingCapacity !== Number.parseInt(filters.seatingCapacity)) return false
    if (filters.fuelType.length > 0 && !filters.fuelType.includes(car.fuelType.toLowerCase())) return false
    if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) return false
    if (filters.location && !car.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car: any) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      {filteredCars.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No cars match your filters. Try adjusting them.</p>
        </div>
      )}
    </div>
  )
}
