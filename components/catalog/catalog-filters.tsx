'use client'

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface FiltersProps {
  filters: any
  setFilters: (filters: any) => void
}

export function CatalogFilters({ filters, setFilters }: FiltersProps) {
  const handleReset = () => {
    setFilters({
      sortBy: "popularity",
      priceRange: [1000, 10000],
      transmission: "all",
      seatingCapacity: "all",
      fuelType: [],
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        <button onClick={handleReset} className="text-blue-600 text-sm font-medium hover:underline">
          Reset All
        </button>
      </div>

      {/* Sort By */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-900 mb-3">Sort By</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
        >
          <option value="popularity">Popularity</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-900 mb-3">Price Range (/day)</label>
        <Slider
          value={filters.priceRange}
          max={10000}
          min={0}
          step={100}
          onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
          className="mb-3"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>₹{filters.priceRange[0]}</span>
          <span>₹{filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Transmission */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-900 mb-3">Transmission</label>
        <div className="flex gap-2">
          <Button
            variant={filters.transmission === "automatic" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilters({ ...filters, transmission: "automatic" })}
            className="flex-1"
          >
            Automatic
          </Button>
          <Button
            variant={filters.transmission === "manual" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilters({ ...filters, transmission: "manual" })}
            className="flex-1"
          >
            Manual
          </Button>
        </div>
      </div>

      {/* Seating Capacity */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-900 mb-3">Seating Capacity</label>
        <div className="flex gap-2 flex-wrap">
          {["2", "4", "5", "7"].map((capacity) => (
            <Button
              key={capacity}
              variant={filters.seatingCapacity === capacity ? "default" : "outline"}
              size="sm"
              onClick={() => setFilters({ ...filters, seatingCapacity: capacity })}
            >
              {capacity} Seats
            </Button>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">Fuel Type</label>
        <div className="space-y-2">
          {["Petrol", "Diesel", "Electric"].map((fuel) => (
            <label key={fuel} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.fuelType.includes(fuel.toLowerCase())}
                onChange={(e) => {
                  const fuelType = fuel.toLowerCase()
                  if (e.target.checked) {
                    setFilters({ ...filters, fuelType: [...filters.fuelType, fuelType] })
                  } else {
                    setFilters({ ...filters, fuelType: filters.fuelType.filter((f: string) => f !== fuelType) })
                  }
                }}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">{fuel}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
