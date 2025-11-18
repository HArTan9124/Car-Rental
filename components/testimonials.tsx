import Image from "next/image"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "The booking process was incredibly smooth and the car was in pristine condition. RentWheels made our family vacation so much better. Highly recommended!",
      author: "Jessica M.",
      role: "Family Vacationer",
      avatar: "/images/avatar-jessica.jpg",
    },
    {
      quote:
        "As a frequent business traveler, I need reliability. RentWheels delivers every time with professional service and high-quality vehicles. They are my go-to for car rentals.",
      author: "David Chen",
      role: "Business Traveler",
      avatar: "/images/avatar-david.jpg",
    },
    {
      quote:
        "I rented a sports car for a special weekend and it was an absolute dream. The car was immaculate and the team was incredibly helpful. An unforgettable experience!",
      author: "Michael R.",
      role: "Weekend Adventurer",
      avatar: "/images/avatar-michael.jpg",
    },
  ]

  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600">
            We pride ourselves on providing an exceptional experience. Here&apos;s what our clients think.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-8">
              {/* Quote Mark */}
              <div className="text-4xl font-bold text-blue-600 mb-4">"</div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.quote}</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
