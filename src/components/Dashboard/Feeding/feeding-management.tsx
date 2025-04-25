import { useState } from "react"
import { motion } from "framer-motion"
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Download,
  Edit,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Utensils,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FeedingManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Sample feeding schedules
  const feedingSchedules = [
    {
      id: "1",
      name: "Morning Feed - Dairy Cattle",
      time: "06:00 AM",
      location: "Barn A",
      status: "completed",
      assignedTo: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      details: {
        feedType: "High-quality forage with grain supplement",
        quantity: "1,200 lbs total",
        notes: "Ensure fresh water is available",
      },
    },
    {
      id: "2",
      name: "Afternoon Feed - Dairy Cattle",
      time: "02:00 PM",
      location: "Barn A",
      status: "upcoming",
      assignedTo: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      details: {
        feedType: "High-quality forage with grain supplement",
        quantity: "1,200 lbs total",
        notes: "Check water troughs",
      },
    },
    {
      id: "3",
      name: "Morning Feed - Beef Cattle",
      time: "07:00 AM",
      location: "Barn B",
      status: "completed",
      assignedTo: "Emma Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      details: {
        feedType: "Grass hay and grain mix",
        quantity: "800 lbs total",
        notes: "Monitor feed consumption",
      },
    },
    {
      id: "4",
      name: "Afternoon Feed - Beef Cattle",
      time: "03:00 PM",
      location: "Barn B",
      status: "upcoming",
      assignedTo: "Emma Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      details: {
        feedType: "Grass hay and grain mix",
        quantity: "800 lbs total",
        notes: "Check for any leftover feed",
      },
    },
    {
      id: "5",
      name: "Morning Feed - Sheep",
      time: "08:00 AM",
      location: "Pen 1",
      status: "completed",
      assignedTo: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      details: {
        feedType: "Alfalfa hay and sheep feed",
        quantity: "300 lbs total",
        notes: "Ensure all animals have access",
      },
    },
    {
      id: "6",
      name: "Afternoon Feed - Sheep",
      time: "04:00 PM",
      location: "Pen 1",
      status: "upcoming",
      assignedTo: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      details: {
        feedType: "Alfalfa hay and sheep feed",
        quantity: "300 lbs total",
        notes: "Check mineral blocks",
      },
    },
  ]

  // Filter schedules based on search query and status filter
  const filteredSchedules = feedingSchedules.filter((schedule) => {
    const matchesSearch =
      schedule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || schedule.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Feeding Management</h1>
          <p className="text-muted-foreground">Manage feeding schedules and nutrition for your livestock.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Calendar className="h-4 w-4" />
            <span>View Calendar</span>
          </Button>
          <Button className="bg-[#328E6E] hover:bg-[#67AE6E]">
            <Plus className="mr-2 h-4 w-4" />
            New Schedule
          </Button>
        </div>
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
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Completed Today</div>
                <div className="text-2xl font-bold">
                  {feedingSchedules.filter((schedule) => schedule.status === "completed").length}
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
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Upcoming Today</div>
                <div className="text-2xl font-bold">
                  {feedingSchedules.filter((schedule) => schedule.status === "upcoming").length}
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
              <div className="bg-amber-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Feed Inventory Alert</div>
                <div className="text-2xl font-bold">2</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Feeding Schedules</CardTitle>
              <CardDescription>Today's feeding activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search schedules..."
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
                      <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Schedules</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("upcoming")}>Upcoming</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="today">
                <TabsList className="mb-4">
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
                  <TabsTrigger value="week">This Week</TabsTrigger>
                </TabsList>

                <TabsContent value="today" className="space-y-4">
                  {filteredSchedules.map((schedule) => (
                    <Card key={schedule.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div
                          className={`h-1 ${schedule.status === "completed" ? "bg-green-500" : "bg-blue-500"}`}
                        ></div>
                        <div className="p-4">
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-2 rounded-full ${
                                schedule.status === "completed"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              <Utensils className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium">{schedule.name}</div>
                                  <div className="text-sm text-gray-500">{schedule.location}</div>
                                </div>
                                <Badge className={schedule.status === "completed" ? "bg-green-500" : "bg-blue-500"}>
                                  {schedule.status === "completed" ? "Completed" : "Upcoming"}
                                </Badge>
                              </div>
                              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                                <div>
                                  <div className="text-xs text-gray-500">Feed Type</div>
                                  <div className="text-sm">{schedule.details.feedType}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">Quantity</div>
                                  <div className="text-sm">{schedule.details.quantity}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">Notes</div>
                                  <div className="text-sm">{schedule.details.notes}</div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage
                                      src={schedule.avatar || "/placeholder.svg"}
                                      alt={schedule.assignedTo}
                                    />
                                    <AvatarFallback>{schedule.assignedTo.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">{schedule.assignedTo}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>{schedule.time}</span>
                                </div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {schedule.status === "upcoming" ? (
                                  <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem>Mark as Incomplete</DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {filteredSchedules.length === 0 && (
                    <div className="text-center py-8">
                      <Utensils className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No matching schedules found</h3>
                      <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="tomorrow">
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Tomorrow's Schedules</h3>
                    <p className="text-gray-500 mt-1">6 feeding schedules planned</p>
                    <Button variant="outline" className="mt-4">
                      View All
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="week">
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">This Week's Schedules</h3>
                    <p className="text-gray-500 mt-1">42 feeding schedules planned</p>
                    <Button variant="outline" className="mt-4">
                      View All
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-4 text-center">
                <Button variant="outline" className="text-[#328E6E]">
                  View All Schedules
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Feed Inventory</CardTitle>
                <CardDescription>Current feed stock levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-medium">Alfalfa Hay</div>
                    <div className="text-sm text-gray-500">72% remaining</div>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-medium">Grain Mix</div>
                    <div className="text-sm text-gray-500">45% remaining</div>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-medium">Silage</div>
                    <div className="text-sm text-gray-500">83% remaining</div>
                  </div>
                  <Progress value={83} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-medium">Protein Supplement</div>
                    <div className="text-sm text-gray-500">18% remaining</div>
                  </div>
                  <Progress value={18} className="h-2" indicatorClassName="bg-amber-500" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-medium">Mineral Mix</div>
                    <div className="text-sm text-gray-500">9% remaining</div>
                  </div>
                  <Progress value={9} className="h-2" indicatorClassName="bg-red-500" />
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    Manage Inventory
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Nutrition Plans</CardTitle>
                <CardDescription>Active feeding regimens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Dairy Cattle - High Production</div>
                    <Badge className="bg-[#328E6E]">Active</Badge>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Last updated: 2 weeks ago</div>
                  <Button variant="ghost" size="sm" className="mt-2 h-8 text-xs gap-1">
                    <Edit className="h-3.5 w-3.5" />
                    <span>Edit Plan</span>
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Beef Cattle - Growth Phase</div>
                    <Badge className="bg-[#328E6E]">Active</Badge>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Last updated: 1 month ago</div>
                  <Button variant="ghost" size="sm" className="mt-2 h-8 text-xs gap-1">
                    <Edit className="h-3.5 w-3.5" />
                    <span>Edit Plan</span>
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Sheep - Maintenance</div>
                    <Badge className="bg-[#328E6E]">Active</Badge>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Last updated: 3 weeks ago</div>
                  <Button variant="ghost" size="sm" className="mt-2 h-8 text-xs gap-1">
                    <Edit className="h-3.5 w-3.5" />
                    <span>Edit Plan</span>
                  </Button>
                </div>

                <div className="pt-2">
                  <Button className="w-full bg-[#328E6E] hover:bg-[#67AE6E]">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
