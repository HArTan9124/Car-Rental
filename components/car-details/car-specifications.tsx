import { Check } from "lucide-react"

interface CarSpecificationsProps {
  car: any
}

export function CarSpecifications({ car }: CarSpecificationsProps) {
  return (
    <div className="bg-white rounded-lg p-8 mb-8">
      <div className="grid grid-cols-2 gap-12">
        {/* Key Specifications */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Key Specifications</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Brand / Model:</span>
              <span className="font-semibold text-gray-900">{car.specifications.brand}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Engine Capacity:</span>
              <span className="font-semibold text-gray-900">{car.specifications.engineCapacity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fuel Type:</span>
              <span className="font-semibold text-gray-900">{car.specifications.fuelType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Airbags:</span>
              <span className="font-semibold text-gray-900">{car.specifications.airbags}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Mileage:</span>
              <span className="font-semibold text-gray-900">{car.specifications.mileage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bluetooth:</span>
              <span className="font-semibold text-gray-900">{car.specifications.bluetooth}</span>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Feature Highlights</h3>
          <div className="space-y-3">
            {car.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <Check size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column Specs */}
      <div className="grid grid-cols-2 gap-12 mt-12 border-t border-gray-200 pt-8">
        <div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Vehicle Type:</span>
              <span className="font-semibold text-gray-900">{car.specifications.vehicleType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transmission:</span>
              <span className="font-semibold text-gray-900">{car.specifications.transmission}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Seating Capacity:</span>
              <span className="font-semibold text-gray-900">{car.specifications.seatingCapacity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Boot Space:</span>
              <span className="font-semibold text-gray-900">{car.specifications.bootSpace}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">GPS Navigation:</span>
              <span className="font-semibold text-gray-900">{car.specifications.gpsNavigation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sunroof:</span>
              <span className="font-semibold text-gray-900">{car.specifications.sunroof}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
