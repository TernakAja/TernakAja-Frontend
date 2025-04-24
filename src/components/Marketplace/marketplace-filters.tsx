import { useState } from "react"
import { AnimatedDiv, AnimatedSection } from "../ui-components"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown, Filter, MapPin, RefreshCw } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"

export default function MarketplaceFilters() {
  const [priceRange, setPriceRange] = useState([500, 5000])
  const [ageRange, setAgeRange] = useState([1, 10])

  return (
    <AnimatedSection className="py-8 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <AnimatedDiv direction="right" className="flex items-center gap-2 text-gray-600">
            <Filter className="h-5 w-5" />
            <span className="font-medium">Filters:</span>
          </AnimatedDiv>

          <AnimatedDiv direction="up" delay={0.1} className="flex flex-wrap gap-3 justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-200">
                  Livestock Type
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Check className="mr-2 h-4 w-4" />
                    <span>Cattle</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="ml-6">Sheep</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="ml-6">Goats</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="ml-6">Pigs</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="ml-6">Poultry</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-200">
                  Breed
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select Breed</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span>Holstein</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Angus</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Hereford</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Jersey</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Charolais</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-200">
                  <MapPin className="mr-2 h-4 w-4" />
                  Location
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select Location</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span>All Locations</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Within 50 miles</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Within 100 miles</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Within 200 miles</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-200">
                  Price Range
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-4">
                <DropdownMenuLabel>
                  Price: ${priceRange[0]} - ${priceRange[1]}
                </DropdownMenuLabel>
                <div className="py-4">
                  <Slider
                    defaultValue={priceRange}
                    max={10000}
                    min={0}
                    step={100}
                    onValueChange={(value) => setPriceRange(value as number[])}
                  />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-200">
                  Age
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-4">
                <DropdownMenuLabel>
                  Age: {ageRange[0]} - {ageRange[1]} years
                </DropdownMenuLabel>
                <div className="py-4">
                  <Slider
                    defaultValue={ageRange}
                    max={15}
                    min={0}
                    step={1}
                    onValueChange={(value) => setAgeRange(value as number[])}
                  />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </AnimatedDiv>

          <AnimatedDiv direction="left" delay={0.2}>
            <Button variant="ghost" className="text-[#328E6E]">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </AnimatedDiv>
        </div>
      </div>
    </AnimatedSection>
  )
}
