import LivestockDetails from "@/components/Marketplace/livestock-details"
import LivestockGallery from "@/components/Marketplace/livestock-gallery"
import LivestockHealth from "@/components/Marketplace/livestock-health"
import LivestockRelated from "@/components/Marketplace/livestock-related"

// export default function LivestockDetailsPage({ params }: { params: { id: string } }) {
export default function LivestockDetailsPage() {
  return (
    <main className="overflow-hidden">
      <div className="pt-32 pb-20 bg-gradient-to-b from-[#E1EEBC]/30 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* <LivestockGallery id={params.id} /> */}
            {/* <LivestockDetails id={params.id} /> */}
            <LivestockGallery/>
            <LivestockDetails/>
          </div>
        </div>
      </div>
      {/* <LivestockHealth id={params.id} /> */}
      {/* <LivestockRelated id={params.id} /> */}
      <LivestockHealth/>
      <LivestockRelated />
    </main>
  )
}
