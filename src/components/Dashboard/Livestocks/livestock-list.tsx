import { useState } from "react"
import { motion } from "framer-motion"
import {
  AlertTriangle,
  ArrowUpDown,
  CheckCircle2,
  ChevronDown,
  Download,
  Filter,
  Heart,
  MoreHorizontal,
  Plus,
  Search,
  Thermometer,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function LivestockList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Sample livestock data
  const livestock = [
    {
      id: "1",
      name: "Bella",
      tag: "HOL-1234",
      species: "Cattle",
      breed: "Holstein",
      gender: "Female",
      age: "4 years",
      status: "healthy",
      location: "Barn A",
      heartRate: "65 BPM",
      temperature: "101.5°F",
      lastUpdated: "10 minutes ago",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Max",
      tag: "ANG-5678",
      species: "Cattle",
      breed: "Angus",
      gender: "Male",
      age: "3 years",
      status: "attention",
      location: "Barn B",
      heartRate: "72 BPM",
      temperature: "102.8°F",
      lastUpdated: "25 minutes ago",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Daisy",
      tag: "JER-9012",
      species: "Cattle",
      breed: "Jersey",
      gender: "Female",
      age: "5 years",
      status: "healthy",
      location: "Barn A",
      heartRate: "64 BPM",
      temperature: "101.3°F",
      lastUpdated: "1 hour ago",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Rocky",
      tag: "HOL-3456",
      species: "Cattle",
      breed: "Holstein",
      gender: "Male",
      age: "2 years",
      status: "critical",
      location: "Barn C",
      heartRate: "85 BPM",
      temperature: "104.2°F",
      lastUpdated: "5 minutes ago",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "Lucy",
      tag: "MER-7890",
      species: "Sheep",
      breed: "Merino",
      gender: "Female",
      age: "3 years",
      status: "healthy",
      location: "Pen 1",
      heartRate: "75 BPM",
      temperature: "102.1°F",
      lastUpdated: "30 minutes ago",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "6",
      name: "Charlie",
      tag: "NUB-1357",
      species: "Goat",
      breed: "Nubian",
      gender: "Male",
      age: "2 years",
      status: "attention",
      location: "Pen 2",
      heartRate: "80 BPM",
      temperature: "103.0°F",
      lastUpdated: "45 minutes ago",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "7",
      name: "Wilbur",
      tag: "BER-2468",
      species: "Pig",
      breed: "Berkshire",
      gender: "Male",
      age: "1 year",
      status: "healthy",
      location: "Pen 3",
      heartRate: "70 BPM",
      temperature: "101.8°F",
      lastUpdated: "2 hours ago",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Filter livestock based on search query and status filter
  const filteredLivestock = livestock.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || animal.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Livestock Management</h1>
          <p className="text-muted-foreground">View and manage all your livestock in one place.</p>
        </div>
        <Button className="bg-[#328E6E] hover:bg-[#67AE6E]">
          <Plus className="mr-2 h-4 w-4" />
          Add Livestock
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Healthy</div>
                <div className="text-2xl font-bold">
                  {livestock.filter((animal) => animal.status === "healthy").length}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Needs Attention</div>
                <div className="text-2xl font-bold">
                  {livestock.filter((animal) => animal.status === "attention").length}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-red-100 p-2 rounded-full">
                <Heart className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Critical</div>
                <div className="text-2xl font-bold">
                  {livestock.filter((animal) => animal.status === "critical").length}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Livestock Inventory</CardTitle>
            <CardDescription>Manage and monitor your livestock records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search by name, tag, or breed..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("healthy")}>Healthy</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("attention")}>Needs Attention</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("critical")}>Critical</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="gap-1">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Animal</TableHead>
                    <TableHead>Species/Breed</TableHead>
                    <TableHead>Gender/Age</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        Status
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Vital Signs</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLivestock.map((animal) => (
                    <TableRow key={animal.id}>
                      <TableCell className="font-medium">{animal.tag}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={animal.image || "/placeholder.svg"} alt={animal.name} />
                            <AvatarFallback>{animal.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <a
                              href={`/dashboard/livestock/${animal.id}`}
                              className="font-medium text-blue-600 hover:underline"
                            >
                              {animal.name}
                            </a>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{animal.species}</div>
                        <div className="text-gray-500 text-sm">{animal.breed}</div>
                      </TableCell>
                      <TableCell>
                        <div>{animal.gender}</div>
                        <div className="text-gray-500 text-sm">{animal.age}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            animal.status === "healthy"
                              ? "bg-green-500"
                              : animal.status === "attention"
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }
                        >
                          {animal.status === "healthy"
                            ? "Healthy"
                            : animal.status === "attention"
                              ? "Needs Attention"
                              : "Critical"}
                        </Badge>
                      </TableCell>
                      <TableCell>{animal.location}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span>{animal.heartRate}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Thermometer className="h-4 w-4 text-amber-500" />
                          <span>{animal.temperature}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-500">{animal.lastUpdated}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <a href={`/dashboard/livestock/${animal.id}`} className="w-full">
                                View Details
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Record</DropdownMenuItem>
                            <DropdownMenuItem>Health History</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
