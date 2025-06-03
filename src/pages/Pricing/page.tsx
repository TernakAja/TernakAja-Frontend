import { PricingHero } from "@/components/Pricing/pricing-hero"
import { PricingPlans } from "@/components/Pricing/pricing-plans"
import { PricingComparison } from "@/components/Pricing/pricing-comparison"
import { PricingFAQ } from "@/components/Pricing/pricing-faq"

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <PricingHero />
      <PricingPlans />
      <PricingComparison />
      <PricingFAQ />
    </main>
  )
}
