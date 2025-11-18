export function ProcessSteps() {
  const steps = [
    {
      icon: "🚗",
      title: "Choose Your Car",
      description: "Browse our extensive catalog of vehicles to find the one that fits your needs and style.",
    },
    {
      icon: "✓",
      title: "Book & Confirm",
      description: "Select your dates, add any extras, and confirm your booking with our secure payment system.",
    },
    {
      icon: "🔑",
      title: "Pick Up & Drive",
      description: "Pick up your keys from the designated location and start your adventure. It's that simple!",
    },
  ]

  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Rent a Car in 3 Easy Steps</h2>
          <p className="text-lg text-gray-600">
            Get on the road faster than ever. Our streamlined process makes renting a car a breeze.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center text-4xl">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
