import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components"
import { MapPin, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// export default function LivestockRelated({ id }: { id: string }) {
export default function LivestockRelated() {

  const relatedListings = [
    {
      id: "2",
      title: "Holstein Dairy Cow - 3 Years Old",
      image: "/images/Livestocks/dairy-cow-2.png",
      price: 2300,
      location: "Madison, WI",
      seller: {
        name: "Green Valley Farms",
        rating: 4.8,
      },
      details: {
        type: "Cattle",
        breed: "Holstein",
      },
    },
    {
      id: "3",
      title: "Lovely Cutest Pig",
      image: "/images/Livestocks/pigs.png",
      price: 1800,
      location: "Milwaukee, WI",
      seller: {
        name: "Dairy Dreams",
        rating: 4.6,
      },
      details: {
        type: "Cattle",
        breed: "Holstein",
      },
    },
    {
      id: "4",
      title: "Jersey Dairy Cow - 4 Years Old",
      image: "/images/Livestocks/dairy-cow-1.png",
      price: 2400,
      location: "Green Bay, WI",
      seller: {
        name: "Sunshine Dairy",
        rating: 4.7,
      },
      details: {
        type: "Cattle",
        breed: "Jersey",
      },
    },
  ]

  return (
    <AnimatedSection className="py-20 bg-[#E1EEBC]/10">
      <div className="container mx-auto px-4">
        <SectionHeading title="Similar Listings" subtitle="You might also be interested in these livestock" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedListings.map((listing, index) => (
            <AnimatedDiv
              key={listing.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              direction="up"
              delay={index * 0.1}
            >
              <a href={`/marketplace/${listing.id}`} className="block">
                <div className="relative">
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-full h-48 object-cover object-center"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                    <div className="text-xl font-bold">${listing.price.toLocaleString()}</div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Badge variant="outline" className="text-[#328E6E] border-[#328E6E]/30">
                      {listing.details.type}
                    </Badge>
                    <Badge variant="outline" className="text-[#328E6E] border-[#328E6E]/30">
                      {listing.details.breed}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-[#328E6E] transition-colors">
                    {listing.title}
                  </h3>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.location}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">{listing.seller.name}</div>
                    <div className="flex items-center gap-1 text-[#328E6E] text-sm">
                      <Star className="h-4 w-4 fill-[#328E6E]" />
                      <span>{listing.seller.rating}</span>
                    </div>
                  </div>
                </div>
              </a>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
