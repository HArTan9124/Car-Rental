import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CarDetailsHeader } from "@/components/car-details/car-details-header"
import { CarDetailsGallery } from "@/components/car-details/car-details-gallery"
import { CarDetailsPanel } from "@/components/car-details/car-details-panel"
import { CarSpecifications } from "@/components/car-details/car-specifications"
import { CarReviews } from "@/components/car-details/car-reviews"
import { SimilarCars } from "@/components/car-details/similar-cars"

async function getCarDetails(carId: string) {
  try {
    const response = await fetch(`http://localhost:8080/api/cars/${carId}`, { cache: 'no-store' })
    if (!response.ok) {
      const text = await response.text().catch(() => '')
      throw new Error(`Failed to fetch car details: ${response.status} ${response.statusText} ${text}`)
    }
    return response.json()
  } catch (err) {
    console.error('getCarDetails error:', err)
    throw err
  }
}

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // params may be a Promise in some Next runtimes; await if necessary
  const resolvedParams = (typeof params === 'object' && 'then' in params) ? await params : params
  const carId = (resolvedParams as { id?: string }).id

  if (!carId) {
    throw new Error('Missing car id in route params')
  }

  let car
  try {
    car = await getCarDetails(carId)
    if (!car) {
      throw new Error(`No car returned from API for id=${carId}`)
    }
  } catch (err) {
    // Throw a server error with a helpful message so Next shows the error overlay during development
    throw new Error(`Failed to fetch car details for id=${carId}: ${err instanceof Error ? err.message : String(err)}`)
  }

  // Adapt car object to match expected structure for components
  const adaptedCar = {
    id: car.id,
    ...car,
    description: car.description || "Reliable, comfortable, and built for your next adventure.",
    brand: car.brand || car.name.split(' ')[0],
    type: car.vehicleType || car.vehicleType || "Sedan",
    price: car.price,
    rating: car.rating || 4.5,
    reviews: car.reviews || 0,
    status: car.status || "available",
    transmission: car.transmission,
    fuelType: car.fuelType,
    seating: car.seatingCapacity,
    images: car.image ? [car.image, car.image, car.image] : ["/placeholder.jpg"],
    specifications: {
      brand: car.brand || car.name.split(' ')[0],
      vehicleType: car.vehicleType || "Sedan",
      engineCapacity: car.engineCapacity || "N/A",
      transmission: car.transmission,
      fuelType: car.fuelType,
      seatingCapacity: String(car.seatingCapacity),
      airbags: car.airbags || "N/A",
      mileage: car.mileage || "N/A",
      bootSpace: car.bootSpace || "N/A",
      gpsNavigation: car.gpsNavigation || "N/A",
      bluetooth: car.bluetooth || "N/A",
      sunroof: car.sunroof || "N/A",
    },
    features: [
      "Zero Hidden Charges",
      "Comprehensive Insurance",
      "Free Cancellation within 24 hours",
      "GPS Included",
      "Full Tank at Pickup",
      "24/7 Roadside Assistance",
    ],
    customerReviews: [],
    pickupLocation: car.pickupLocation || car.location,
    pickupDate: car.pickupDate || "N/A",
    returnDate: car.returnDate || "N/A",
    priceBreakdown: {
      dailyRate: car.price,
      days: 1,
      subtotal: car.price,
      tax: Math.round(car.price * 0.18),
      insurance: 500,
      total: car.price + Math.round(car.price * 0.18) + 500,
    },
  }
  console.log("Adapted car for components:", adaptedCar) // Log adapted data

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="bg-white border-b border-gray-200">
        <CarDetailsHeader car={adaptedCar} />
      </div>

      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Gallery and Details */}
            <div className="lg:col-span-2">
              <CarDetailsGallery car={adaptedCar} />
              <CarSpecifications car={adaptedCar} />
              <CarReviews car={adaptedCar} />
              <SimilarCars currentCarId={adaptedCar.id} />
            </div>

            {/* Right Column - Booking Panel */}
            <div className="lg:col-span-1">
              <CarDetailsPanel car={adaptedCar} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
