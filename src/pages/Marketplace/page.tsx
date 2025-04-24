import MarketplaceHero from "@/components/Marketplace/marketplace-hero"
import MarketplaceFilters from "@/components/Marketplace/marketplace-filters"
import MarketplaceListings from "@/components/Marketplace/marketplace-listings"
import MarketplaceCta from "@/components/Marketplace/marketplace-cta"

export default function MarketplacePage() {
  return (
    <main className="overflow-hidden">
      <MarketplaceHero />
      <MarketplaceFilters />
      <MarketplaceListings />
      <MarketplaceCta />
    </main>
  )
}
