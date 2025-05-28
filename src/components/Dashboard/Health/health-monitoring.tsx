import { useState } from "react"
import { motion } from "framer-motion"
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Filter,
  Heart,
  MoreHorizontal,
  Search,
  Thermometer,
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
import { LineChart } from "@/components/Dashboard/charts"
import { DailySensorStats } from "@/types/livestockSchema"

const dailySensorStats: DailySensorStats[] = [
  { day: "Mon", avg_temperature: 101.5, avg_heart_rate: 65 },
  { day: "Tue", avg_temperature: 101.3, avg_heart_rate: 68 },
  { day: "Wed", avg_temperature: 101.6, avg_heart_rate: 64 },
  { day: "Thu", avg_temperature: 101.8, avg_heart_rate: 66 },
  { day: "Fri", avg_temperature: 101.4, avg_heart_rate: 67 },
  { day: "Sat", avg_temperature: 101.2, avg_heart_rate: 65 },
  { day: "Sun", avg_temperature: 101.5, avg_heart_rate: 63 },
];

export default function HealthMonitoring() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Sample health alerts
  const healthAlerts = [
    {
      id: "1",
      animal: {
        name: "Max",
        tag: "ANG-5678",
        image: "/placeholder.svg?height=40&width=40",
      },
      issue: "Elevated temperature",
      value: "104.2°F",
      normal: "101.5°F",
      time: "10 minutes ago",
      severity: "high",
      location: "Barn B",
    },
    {
      id: "2",
      animal: {
        name: "Rocky",
        tag: "HOL-3456",
        image: "/placeholder.svg?height=40&width=40",
      },
      issue: "Irregular heart rate",
      value: "85 BPM",
      normal: "60-70 BPM",
      time: "25 minutes ago",
      severity: "high",
      location: "Barn C",
    },
    {
      id: "3",
      animal: {
        name: "Charlie",
        tag: "NUB-1357",
        image: "/placeholder.svg?height=40&width=40",
      },
      issue: "Decreased activity",
      value: "45% of normal",
      normal: "90-100%",
      time: "1 hour ago",
      severity: "medium",
      location: "Pen 2",
    },
    {
      id: "4",
      animal: {
        name: "Daisy",
        tag: "JER-9012",
        image: "/placeholder.svg?height=40&width=40",
      },
      issue: "Missed feeding",
      value: "0 lbs consumed",
      normal: "55 lbs/day",
      time: "2 hours ago",
      severity: "medium",
      location: "Barn A",
    },
    {
      id: "5",
      animal: {
        name: "Lucy",
        tag: "MER-7890",
        image: "/placeholder.svg?height=40&width=40",
      },
      issue: "Slight temperature increase",
      value: "102.8°F",
      normal: "102.1°F",
      time: "3 hours ago",
      severity: "low",
      location: "Pen 1",
    },
  ]

  // Filter alerts based on search query and status filter
  const filteredAlerts = healthAlerts.filter((alert) => {
    const matchesSearch =
      alert.animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.animal.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.issue.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSeverity = statusFilter === "all" || alert.severity === statusFilter

    return matchesSearch && matchesSeverity
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Health Monitoring</h1>
          <p className="text-muted-foreground">Monitor the health status of all your livestock.</p>
        </div>
        <Button className="bg-[#328E6E] hover:bg-[#67AE6E]">
          <Bell className="mr-2 h-4 w-4" />
          Configure Alerts
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
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">High Priority</div>
                <div className="text-2xl font-bold">
                  {healthAlerts.filter((alert) => alert.severity === "high").length}
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
                <div className="text-sm text-gray-500">Medium Priority</div>
                <div className="text-2xl font-bold">
                  {healthAlerts.filter((alert) => alert.severity === "medium").length}
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
              <div className="bg-blue-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Low Priority</div>
                <div className="text-2xl font-bold">
                  {healthAlerts.filter((alert) => alert.severity === "low").length}
                </div>
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
              <CardTitle>Health Alerts</CardTitle>
              <CardDescription>Recent health issues requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search by animal, tag, or issue..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Alerts</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("high")}>High Priority</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("medium")}>Medium Priority</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("low")}>Low Priority</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <Card key={alert.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div
                        className={`h-1 ${
                          alert.severity === "high"
                            ? "bg-red-500"
                            : alert.severity === "medium"
                              ? "bg-amber-500"
                              : "bg-blue-500"
                        }`}
                      ></div>
                      <div className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={alert.animal.image || "/placeholder.svg"} alt={alert.animal.name} />
                            <AvatarFallback>{alert.animal.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{alert.animal.name}</div>
                                <div className="text-sm text-gray-500">ID: {alert.animal.tag}</div>
                              </div>
                              <Badge
                                className={
                                  alert.severity === "high"
                                    ? "bg-red-500"
                                    : alert.severity === "medium"
                                      ? "bg-amber-500"
                                      : "bg-blue-500"
                                }
                              >
                                {alert.severity === "high"
                                  ? "High Priority"
                                  : alert.severity === "medium"
                                    ? "Medium Priority"
                                    : "Low Priority"}
                              </Badge>
                            </div>
                            <div className="mt-2">
                              <div className="font-medium text-gray-800">{alert.issue}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <div
                                  className={`text-sm font-medium ${
                                    alert.severity === "high"
                                      ? "text-red-600"
                                      : alert.severity === "medium"
                                        ? "text-amber-600"
                                        : "text-blue-600"
                                  }`}
                                >
                                  Current: {alert.value}
                                </div>
                                <div className="text-sm text-gray-500">Normal: {alert.normal}</div>
                              </div>
                              <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-3.5 w-3.5" />
                                  <span>{alert.time}</span>
                                </div>
                                <div>{alert.location}</div>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex justify-end mt-2">
                          <Button variant="outline" size="sm" className="text-xs">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredAlerts.length > 0 && (
                <div className="mt-4 text-center">
                  <Button variant="outline" className="text-[#328E6E]">
                    View All Alerts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {filteredAlerts.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No matching alerts found</h3>
                  <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle>Health Overview</CardTitle>
              <CardDescription>Current health status of your livestock</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Overall Health Status</div>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Healthy</span>
                      </div>
                      <span className="text-sm text-gray-500">93.5%</span>
                    </div>
                    <Progress value={93.5} className="h-2 bg-gray-100" indicatorClassName="bg-green-500" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span className="text-sm">Needs Attention</span>
                      </div>
                      <span className="text-sm text-gray-500">4.9%</span>
                    </div>
                    <Progress value={4.9} className="h-2 bg-gray-100" indicatorClassName="bg-amber-500" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm">Critical</span>
                      </div>
                      <span className="text-sm text-gray-500">1.6%</span>
                    </div>
                    <Progress value={1.6} className="h-2 bg-gray-100" indicatorClassName="bg-red-500" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Health Issues by Type</div>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <span className="text-sm text-gray-500">42%</span>
                    </div>
                    <Progress value={42} className="h-2 bg-gray-100" indicatorClassName="bg-red-500" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-pink-500" />
                        <span className="text-sm">Heart Rate</span>
                      </div>
                      <span className="text-sm text-gray-500">28%</span>
                    </div>
                    <Progress value={28} className="h-2 bg-gray-100" indicatorClassName="bg-pink-500" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Activity</span>
                      </div>
                      <span className="text-sm text-gray-500">18%</span>
                    </div>
                    <Progress value={18} className="h-2 bg-gray-100" indicatorClassName="bg-blue-500" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <span className="text-sm">Other</span>
                      </div>
                      <span className="text-sm text-gray-500">12%</span>
                    </div>
                    <Progress value={12} className="h-2 bg-gray-100" indicatorClassName="bg-amber-500" />
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Health Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="week">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="month">Month</TabsTrigger>
                      <TabsTrigger value="year">Year</TabsTrigger>
                    </TabsList>
                    <TabsContent value="week" className="pt-4">
                      <div className="h-[150px]">
                        <LineChart dailySensorStats={dailySensorStats}/>
                      </div>
                    </TabsContent>
                    <TabsContent value="month" className="pt-4">
                      <div className="h-[150px]">
                        <LineChart dailySensorStats={dailySensorStats}/>
                      </div>
                    </TabsContent>
                    <TabsContent value="year" className="pt-4">
                      <div className="h-[150px]">
                        <LineChart dailySensorStats={dailySensorStats}/>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
