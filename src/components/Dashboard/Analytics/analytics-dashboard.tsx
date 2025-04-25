import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  ChevronDown,
  Download,
  Filter,
  LineChart,
  PieChart,
  RefreshCw,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
  LineChart as LineChartComponent,
  BarChart as BarChartComponent,
  DonutChart,
} from "@/components/Dashboard/charts"

export default function AnalyticsDashboard() {
  const [, setTimeRange] = useState("7d")

  const performanceMetrics = [
    {
      title: "Average Milk Production",
      value: "22.5",
      unit: "liters/day",
      change: "+2.3%",
      status: "increase",
    },
    {
      title: "Feed Conversion Ratio",
      value: "1.5",
      unit: "milk:feed",
      change: "+0.2%",
      status: "increase",
    },
    {
      title: "Average Weight Gain",
      value: "1.2",
      unit: "lbs/day",
      change: "-0.3%",
      status: "decrease",
    },
    {
      title: "Health Incidents",
      value: "12",
      unit: "this month",
      change: "-25%",
      status: "increase",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive analytics and insights for your livestock operation.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1 text-xs" onClick={() => window.location.reload()}>
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                <span>Last 7 days</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTimeRange("24h")}>Last 24 hours</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("7d")}>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("30d")}>Last 30 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("90d")}>Last 90 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("1y")}>Last year</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Performance metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metric.value} <span className="text-sm font-normal text-gray-500">{metric.unit}</span>
                </div>
                <div className="flex items-center pt-1 text-xs">
                  {metric.status === "increase" ? (
                    <ArrowUpRight
                      className={`h-3.5 w-3.5 mr-1 ${
                        metric.title === "Health Incidents" ? "text-red-500" : "text-green-500"
                      }`}
                    />
                  ) : (
                    <ArrowDownRight
                      className={`h-3.5 w-3.5 mr-1 ${
                        metric.title === "Health Incidents" ? "text-green-500" : "text-red-500"
                      }`}
                    />
                  )}
                  <span
                    className={
                      (metric.status === "increase" && metric.title !== "Health Incidents") ||
                      (metric.status === "decrease" && metric.title === "Health Incidents")
                        ? "text-green-500 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {metric.change}
                  </span>
                  <span className="text-gray-500 ml-1">from last period</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main analytics section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-[#328E6E]" />
                    Production Trends
                  </CardTitle>
                  <CardDescription>Milk production and feed consumption over time</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                      <Filter className="h-3.5 w-3.5" />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>View By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All Livestock</DropdownMenuItem>
                    <DropdownMenuItem>Cattle Only</DropdownMenuItem>
                    <DropdownMenuItem>Dairy Cows</DropdownMenuItem>
                    <DropdownMenuItem>Beef Cattle</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="milk">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="milk">Milk Production</TabsTrigger>
                  <TabsTrigger value="feed">Feed Consumption</TabsTrigger>
                </TabsList>
                <TabsContent value="milk" className="pt-4">
                  <div className="h-[300px]">
                    <LineChartComponent />
                  </div>
                </TabsContent>
                <TabsContent value="feed" className="pt-4">
                  <div className="h-[300px]">
                    <LineChartComponent />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-[#328E6E]" />
                    Comparative Analysis
                  </CardTitle>
                  <CardDescription>Performance metrics by livestock group</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>This Month</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <BarChartComponent />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-[#328E6E]" />
                Health Distribution
              </CardTitle>
              <CardDescription>Current health status of livestock</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] flex items-center justify-center">
                <DonutChart />
              </div>
              <div className="space-y-4 mt-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">Healthy</span>
                    </div>
                    <span className="text-sm font-medium">231</span>
                  </div>
                  <Progress value={93.5} className="h-2 bg-gray-100" indicatorClassName="bg-green-500" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm font-medium">Needs Attention</span>
                    </div>
                    <span className="text-sm font-medium">12</span>
                  </div>
                  <Progress value={4.9} className="h-2 bg-gray-100" indicatorClassName="bg-amber-500" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm font-medium">Critical</span>
                    </div>
                    <span className="text-sm font-medium">4</span>
                  </div>
                  <Progress value={1.6} className="h-2 bg-gray-100" indicatorClassName="bg-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-[#328E6E]" />
                Performance Insights
              </CardTitle>
              <CardDescription>Key performance indicators by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Milk Production Efficiency</div>
                    <div className="text-sm text-gray-500">22.5 liters/day (avg)</div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm">Holstein</div>
                        <div className="text-sm text-gray-500">28.3 liters/day</div>
                      </div>
                      <Progress value={94} className="h-2 bg-gray-100" indicatorClassName="bg-[#328E6E]" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm">Jersey</div>
                        <div className="text-sm text-gray-500">18.7 liters/day</div>
                      </div>
                      <Progress value={62} className="h-2 bg-gray-100" indicatorClassName="bg-[#67AE6E]" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm">Brown Swiss</div>
                        <div className="text-sm text-gray-500">20.5 liters/day</div>
                      </div>
                      <Progress value={68} className="h-2 bg-gray-100" indicatorClassName="bg-[#90C67C]" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Feed Conversion Ratio</div>
                    <div className="text-sm text-gray-500">1.5 milk:feed (avg)</div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm">Holstein</div>
                        <div className="text-sm text-gray-500">1.6 milk:feed</div>
                      </div>
                      <Progress value={80} className="h-2 bg-gray-100" indicatorClassName="bg-[#328E6E]" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm">Jersey</div>
                        <div className="text-sm text-gray-500">1.4 milk:feed</div>
                      </div>
                      <Progress value={70} className="h-2 bg-gray-100" indicatorClassName="bg-[#67AE6E]" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm">Brown Swiss</div>
                        <div className="text-sm text-gray-500">1.5 milk:feed</div>
                      </div>
                      <Progress value={75} className="h-2 bg-gray-100" indicatorClassName="bg-[#90C67C]" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Reproductive Efficiency</div>
                    <div className="text-sm text-gray-500">85% success rate (avg)</div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm">Holstein</div>
                        <div className="text-sm text-gray-500">82% success rate</div>
                      </div>
                      <Progress value={82} className="h-2 bg-gray-100" indicatorClassName="bg-[#328E6E]" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm">Jersey</div>
                        <div className="text-sm text-gray-500">88% success rate</div>
                      </div>
                      <Progress value={88} className="h-2 bg-gray-100" indicatorClassName="bg-[#67AE6E]" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm">Brown Swiss</div>
                        <div className="text-sm text-gray-500">85% success rate</div>
                      </div>
                      <Progress value={85} className="h-2 bg-gray-100" indicatorClassName="bg-[#90C67C]" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
