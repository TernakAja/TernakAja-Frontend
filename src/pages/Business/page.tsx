import { BusinessHero } from "@/components/Business/business-hero"
import { BusinessCanvas } from "@/components/Business/business-canvas"
import { MarketAnalysis } from "@/components/Business/market-analysis"
import { PartnershipOpportunities } from "@/components/Business/partnership-opportunity"
import { RevenueModel } from "@/components/Business/revenue-model"
import { BusinessContact } from "@/components/Business/business-contact"

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-white">
      <BusinessHero />
      <BusinessCanvas />
      <MarketAnalysis />
      <PartnershipOpportunities />
      <RevenueModel />
      <BusinessContact />
    </main>
  )
}
