import { ChevronRight } from "lucide-react"

interface CarDetailsHeaderProps {
  car: any
}

export function CarDetailsHeader({ car }: CarDetailsHeaderProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <a href="/" className="text-blue-600 hover:underline">
          Home
        </a>
        <ChevronRight size={16} className="text-gray-400" />
        <a href="/catalog" className="text-blue-600 hover:underline">
          Explore Cars
        </a>
        <ChevronRight size={16} className="text-gray-400" />
        <span className="text-gray-600">{car.name}</span>
      </div>

      {/* Title and Description */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.name}</h1>
        <p className="text-gray-600">{car.description}</p>
      </div>
    </div>
  )
}
