import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { ProcessSteps } from "@/components/process-steps"
import { FeaturedFleet } from "@/components/featured-fleet"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ProcessSteps />
      <FeaturedFleet />
      <Testimonials />
      <Footer />
    </main>
  )
}
