import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { ServiceCategories } from "@/components/sections/service-categories"
import { ProfessionalProfiles } from "@/components/sections/professional-profiles"
import { HowItWorks } from "@/components/sections/how-it-works"
import { SubscriptionPlans } from "@/components/sections/subscription-plans"
import { Testimonials } from "@/components/sections/testimonials"
import { ProfessionalDashboard } from "@/components/sections/professional-dashboard"
import { BusinessModel } from "@/components/sections/business-model"
import { CTA } from "@/components/sections/cta"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Service Categories with Search */}
      <ServiceCategories />
      
      {/* Featured Professionals */}
      <ProfessionalProfiles />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Subscription Plans */}
      <SubscriptionPlans />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Professional Dashboard Demo */}
      <ProfessionalDashboard />
      
      {/* Business Model Section */}
      <BusinessModel />
      
      {/* Call to Action */}
      <CTA />
      
      {/* Footer */}
      <Footer />
    </main>
  )
}
