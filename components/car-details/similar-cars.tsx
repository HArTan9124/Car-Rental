import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface SimilarCarsProps {
  currentCarId: number
}

const similarCars = [
  {
    id: 2,
    name: "Kia Seltos",
    description: "A stylish and tech-savvy choice",
    price: 2350,
    image: "/kia-seltos.jpg",
  },
  {
    id: 3,
    name: "MG Hector",
    description: "Spacious interior, premium feel",
    price: 2600,
    image: "/mg-hector.jpg",
  },
  {
    id: 4,
    name: "Tata Harrier",
    description: "Bold design with a powerful engine",
    price: 2550,
    image: "/tata-harrier.jpg",
  },
  {
    id: 5,
    name: "Mahindra XUV700",
    description: "Packed with futuristic technology",
    price: 2800,
    image: "/mahindra-xuv700.jpg",
  },
]

export function SimilarCars({ currentCarId }: SimilarCarsProps) {
  return (
    <div className="bg-white rounded-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Similar Cars You Might Like</h3>
      <div className="grid grid-cols-4 gap-4">
        {similarCars.map((car) => (
          <div key={car.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/catalog/${car.id}`}>
              <div className="relative h-40 bg-gray-200 cursor-pointer">
                <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
              </div>
            </Link>
            <div className="p-4">
              <h4 className="font-bold text-gray-900 mb-1">{car.name}</h4>
              <p className="text-xs text-gray-600 mb-3">{car.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-gray-900">₹{car.price}</span>
                  <span className="text-xs text-gray-600">/day</span>
                </div>
                <Link href={`/catalog/${car.id}`}>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700 text-xs h-auto p-0">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
