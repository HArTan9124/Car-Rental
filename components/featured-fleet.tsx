import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function FeaturedFleet() {
  const cars = [
    {
      id: 7,
      name: "Prestige Sedan",
      description: "Ideal for business trips or a luxurious weekend getaway.",
      image: "/images/prestige-sedan.jpg",
      specs: [
        { icon: "👥", label: "5 Seats" },
        { icon: "⚙️", label: "Automatic" },
        { icon: "🔋", label: "Hybrid" },
      ],
      price: "$120",
      period: "/day",
    },
    {
      id: 10,
      name: "Adventure SUV",
      description: "Perfect for family adventures and exploring the great outdoors.",
      image: "/images/adventure-suv.jpg",
      specs: [
        { icon: "👥", label: "7 Seats" },
        { icon: "⚙️", label: "Automatic" },
        { icon: "⛽", label: "Gasoline" },
      ],
      price: "$150",
      period: "/day",
    },
    {
      id: 1,
      name: "Eco-Friendly City Car",
      description: "Navigate the city streets with ease in this compact electric.",
      image: "/images/eco-city-car.jpg",
      specs: [
        { icon: "👥", label: "4 Seats" },
        { icon: "⚙️", label: "Automatic" },
        { icon: "⚡", label: "Electric" },
      ],
      price: "$95",
      period: "/day",
    },
  ]

  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Featured Fleet</h2>
          <p className="text-lg text-gray-600">
            Explore a selection of our most popular vehicles, from luxury sedans to spacious SUVs.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {cars.map((car, idx) => (
            <Link href={`/catalog/${car.id}`} key={idx}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer">
                {/* Car Image */}
                <div className="relative h-56 bg-gray-300 overflow-hidden">
                  <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
                </div>

                {/* Car Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{car.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{car.description}</p>

                  {/* Specs */}
                  <div className="flex items-center gap-4 mb-6 text-sm">
                    {car.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-1 text-gray-600">
                        <span>{spec.icon}</span>
                        <span>{spec.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{car.price}</span>
                      <span className="text-gray-600 text-sm">{car.period}</span>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-semibold">Book Now</Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
