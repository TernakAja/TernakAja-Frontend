import { Button } from "@/components/ui/button"
import { AnimatedDiv } from "../ui-components"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, MessageSquare, Share2, Star, User } from "lucide-react"

// If there is already an API Backend
// export default function LivestockDetails({ id }: { id: string }) {

export default function LivestockDetails() {
  // Mock data - in a real app, this would come from an API based on the ID
  const livestock = {
    id: "1",
    title: "Holstein Dairy Cow - 4 Years Old",
    price: 2500,
    location: "Madison, WI",
    seller: {
      name: "Green Valley Farms",
      rating: 4.8,
      verified: true,
      memberSince: "2019",
      image: "/placeholder.svg?height=40&width=40",
    },
    details: {
      type: "Cattle",
      breed: "Holstein",
      age: 4,
      gender: "Female",
      weight: "1,200 lbs",
      health: "Excellent",
      birthDate: "March 15, 2019",
      id: "MOO-12345",
    },
    description:
      "Healthy Holstein dairy cow with excellent milk production history. Complete health records available. Monitored with Moorgan system for the past 2 years. This cow has consistently produced high-quality milk and has an excellent temperament. All vaccinations are up to date.",
    healthData: {
      vaccinations: "Up to date",
      lastVetCheck: "January 10, 2023",
      medicalHistory: "No significant health issues",
      milkProduction: "22 liters per day average",
    },
    featured: true,
    listedDate: "2 days ago",
  }

  return (
    <AnimatedDiv direction="left" className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-[#328E6E]">Verified</Badge>
          <Badge variant="outline" className="text-[#328E6E] border-[#328E6E]/30">
            {livestock.details.type}
          </Badge>
          <Badge variant="outline" className="text-[#328E6E] border-[#328E6E]/30">
            {livestock.details.breed}
          </Badge>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">{livestock.title}</h1>

        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <MapPin className="h-4 w-4" />
          <span>{livestock.location}</span>
          <span className="text-gray-300">•</span>
          <span>Listed {livestock.listedDate}</span>
        </div>

        <div className="text-3xl font-bold text-[#328E6E] mb-6">${livestock.price.toLocaleString()}</div>

        <div className="flex flex-wrap gap-4 mb-6">
          <Button className="bg-[#328E6E] hover:bg-[#67AE6E] text-white px-8 py-6 text-lg">Contact Seller</Button>
          <Button variant="outline" className="border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white">
            <Heart className="mr-2 h-5 w-5" />
            Save
          </Button>
          <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </Button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-xl font-bold mb-4">Description</h2>
        <p className="text-gray-600 mb-4">{livestock.description}</p>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-xl font-bold mb-4">Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <div className="text-gray-500 text-sm">Breed</div>
            <div className="font-medium">{livestock.details.breed}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Age</div>
            <div className="font-medium">{livestock.details.age} years</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Gender</div>
            <div className="font-medium">{livestock.details.gender}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Weight</div>
            <div className="font-medium">{livestock.details.weight}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Health Status</div>
            <div className="font-medium">{livestock.details.health}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">ID Number</div>
            <div className="font-medium">{livestock.details.id}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Birth Date</div>
            <div className="font-medium">{livestock.details.birthDate}</div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-xl font-bold mb-4">Seller Information</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
            <img
              src={livestock.seller.image || "/placeholder.svg"}
              alt={livestock.seller.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">{livestock.seller.name}</h3>
              {livestock.seller.verified && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
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
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-1 text-[#328E6E]">
                <Star className="h-4 w-4 fill-[#328E6E]" />
                <span>{livestock.seller.rating}</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Member since {livestock.seller.memberSince}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <Button className="bg-[#328E6E] hover:bg-[#67AE6E] text-white">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message
          </Button>
          <Button variant="outline" className="border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white">
            View Profile
          </Button>
        </div>
      </div>
    </AnimatedDiv>
  )
}
