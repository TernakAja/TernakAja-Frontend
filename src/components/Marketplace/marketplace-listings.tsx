import { AnimatedDiv, AnimatedSection } from "../ui-components"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Star } from "lucide-react"

export default function MarketplaceListings() {
  const listings = [
    {
      id: "1",
      title: "Holstein Dairy Cow - 4 Years Old",
      image: "/placeholder.svg?height=400&width=600",
      price: 2500,
      location: "Madison, WI",
      seller: {
        name: "Green Valley Farms",
        rating: 4.8,
        verified: true,
      },
      details: {
        type: "Cattle",
        breed: "Holstein",
        age: 4,
        gender: "Female",
        weight: "1,200 lbs",
        health: "Excellent",
      },
      description:
        "Healthy Holstein dairy cow with excellent milk production history. Complete health records available. Monitored with Moorgan system for the past 2 years.",
      featured: true,
    },
    {
      id: "2",
      title: "Angus Beef Cattle - Breeding Pair",
      image: "/placeholder.svg?height=400&width=600",
      price: 4800,
      location: "Austin, TX",
      seller: {
        name: "Texas Ranch Supply",
        rating: 4.6,
        verified: true,
      },
      details: {
        type: "Cattle",
        breed: "Angus",
        age: 3,
        gender: "Male & Female",
        weight: "2,400 lbs (pair)",
        health: "Excellent",
      },
      description:
        "Premium Angus breeding pair with excellent genetics. Both animals have been monitored with Moorgan health tracking system since birth.",
      featured: false,
    },
    {
      id: "3",
      title: "Merino Sheep - Flock of 5",
      image: "/placeholder.svg?height=400&width=600",
      price: 1800,
      location: "Boise, ID",
      seller: {
        name: "Mountain View Farm",
        rating: 4.9,
        verified: true,
      },
      details: {
        type: "Sheep",
        breed: "Merino",
        age: 2,
        gender: "Mixed",
        weight: "500 lbs (total)",
        health: "Excellent",
      },
      description:
        "Healthy Merino sheep with high-quality wool. All sheep have been monitored with Moorgan health tracking and have complete vaccination records.",
      featured: true,
    },
    {
      id: "4",
      title: "Nubian Goats - Mother and Kids",
      image: "/placeholder.svg?height=400&width=600",
      price: 1200,
      location: "Portland, OR",
      seller: {
        name: "Willamette Valley Farms",
        rating: 4.7,
        verified: true,
      },
      details: {
        type: "Goat",
        breed: "Nubian",
        age: "3 (mother), 0.5 (kids)",
        gender: "Female & Mixed",
        weight: "180 lbs (total)",
        health: "Excellent",
      },
      description:
        "Healthy Nubian goat with two kids. Mother has excellent milk production history. All animals have been monitored with Moorgan health tracking.",
      featured: false,
    },
    {
      id: "5",
      title: "Berkshire Pigs - Breeding Pair",
      image: "/placeholder.svg?height=400&width=600",
      price: 1500,
      location: "Des Moines, IA",
      seller: {
        name: "Heartland Farms",
        rating: 4.5,
        verified: true,
      },
      details: {
        type: "Pig",
        breed: "Berkshire",
        age: 2,
        gender: "Male & Female",
        weight: "600 lbs (total)",
        health: "Excellent",
      },
      description:
        "Healthy Berkshire breeding pair with excellent genetics. Both pigs have been monitored with Moorgan health tracking system.",
      featured: false,
    },
    {
      id: "6",
      title: "Jersey Dairy Cow - 3 Years Old",
      image: "/placeholder.svg?height=400&width=600",
      price: 2200,
      location: "Burlington, VT",
      seller: {
        name: "Green Mountain Dairy",
        rating: 4.9,
        verified: true,
      },
      details: {
        type: "Cattle",
        breed: "Jersey",
        age: 3,
        gender: "Female",
        weight: "900 lbs",
        health: "Excellent",
      },
      description:
        "Healthy Jersey dairy cow with excellent milk production history. Complete health records available. Monitored with Moorgan system for the past 2 years.",
      featured: true,
    },
  ]

  return (
    <AnimatedSection className="py-20 bg-[#E1EEBC]/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Featured Livestock</h2>
          <div className="text-gray-600">Showing {listings.length} results</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing, index) => (
            <AnimatedDiv
              key={listing.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              direction="up"
              delay={index * 0.05}
            >
              <a href={`/marketplace/${listing.id}`} className="block">
                <div className="relative">
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-full h-64 object-cover object-center"
                  />
                  {listing.featured && <Badge className="absolute top-4 left-4 bg-[#328E6E]">Featured</Badge>}
                  <button className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors">
                    <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                    <div className="text-2xl font-bold">${listing.price.toLocaleString()}</div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Badge variant="outline" className="text-[#328E6E] border-[#328E6E]/30">
                      {listing.details.type}
                    </Badge>
                    <Badge variant="outline" className="text-[#328E6E] border-[#328E6E]/30">
                      {listing.details.breed}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-[#328E6E] transition-colors">
                    {listing.title}
                  </h3>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.location}</span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{listing.description}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <div className="text-sm font-medium">{listing.seller.name}</div>
                      {listing.seller.verified && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#328E6E"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[#328E6E]">
                      <Star className="h-4 w-4 fill-[#328E6E]" />
                      <span>{listing.seller.rating}</span>
                    </div>
                  </div>
                </div>
              </a>
            </AnimatedDiv>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-[#328E6E] hover:bg-[#67AE6E] text-white px-6">Load More Listings</Button>
        </div>
      </div>
    </AnimatedSection>
  )
}
