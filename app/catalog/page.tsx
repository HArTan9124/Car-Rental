'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CatalogHeader } from '@/components/catalog/catalog-header'
import { CatalogFilters } from '@/components/catalog/catalog-filters'
import { CarGrid } from '@/components/catalog/car-grid'
import { useState, useEffect } from 'react'

export default function CatalogPage() {
  const [filters, setFilters] = useState({
    sortBy: 'popularity',
    priceRange: [1000, 10000],
    transmission: 'all',
    seatingCapacity: 'all',
    fuelType: [],
    location: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
  })

  // Read URL search params on the client only to initialize filters without using useSearchParams
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search)
      setFilters((prev) => ({
        ...prev,
        location: sp.get('location') || '',
        pickupDate: sp.get('pickupDate') || '',
        pickupTime: sp.get('pickupTime') || '',
        dropoffDate: sp.get('dropoffDate') || '',
      }))
    } catch (e) {
      // ignore in non-browser environments
    }
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="bg-white">
        <CatalogHeader />
      </div>
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            <div className="w-64 flex-shrink-0">
              <CatalogFilters filters={filters} setFilters={setFilters} />
            </div>
            {/* Main content grid */}
            <div className="flex-1">
              <CarGrid filters={filters} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
