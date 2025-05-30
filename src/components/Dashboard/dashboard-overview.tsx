import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ChevronDown,
  MilkIcon as Cow,
  Heart,
  MoreHorizontal,
  RefreshCw,
  Utensils,
  BarChart3,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LineChart, BarChart, DonutChart } from "@/components/Dashboard/charts";
import { getRecentNotifs, getSpeciesCount, getStatusCount } from "@/services/livestockService";
import { DailySensorStats, LivestockStatusCounts, NotificationWithLivestockFlat, SpeciesCount } from "@/types/dataSchema";
import StatsCards from "./stats-cards";
import { useAuth } from "@/context/auth-context";
import LoadingScreenPage from "../../utility/LoadingScreen";

const dailySensorStats: DailySensorStats[] = [
  { day: "Mon", avg_temperature: 101.5, avg_heart_rate: 65 },
  { day: "Tue", avg_temperature: 101.3, avg_heart_rate: 68 },
  { day: "Wed", avg_temperature: 101.6, avg_heart_rate: 64 },
  { day: "Thu", avg_temperature: 101.8, avg_heart_rate: 66 },
  { day: "Fri", avg_temperature: 101.4, avg_heart_rate: 67 },
  { day: "Sat", avg_temperature: 101.2, avg_heart_rate: 65 },
  { day: "Sun", avg_temperature: 101.5, avg_heart_rate: 63 },
];


export default function DashboardOverview() {
  const [, setTimeRange] = useState("7d");
  // const [, setError] = useState("")
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<LivestockStatusCounts>();
  const [speciesCount, setSpeciesCount] = useState<SpeciesCount[]>([]);
  const [notifications, setNotifications] = useState<NotificationWithLivestockFlat[]>([]);
  const { user } = useAuth()
  const colors = ["#328E6E", "#67AE6E", "#90C67C", "#E1EEBC"];

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
  
      setLoading(true);
      try {
        const [statusResponse, speciesResponse, notifResponse] = await Promise.all([
          getStatusCount(user.id),
          getSpeciesCount(user.id),
          getRecentNotifs(user.id)
        ]);

        if(notifResponse.data){
          setNotifications(notifResponse.data);
        }
  
        setStatus(statusResponse.data);
        if(speciesResponse.data){
          setSpeciesCount(speciesResponse.data);
        }
        // const totalAll = speciesCount.reduce((sum, s) => sum + s.total, 0);
      } catch (err) {
        console.error("Error fetching data:", err);
        // setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [user]);

  const upcomingTasks = [
    {
      id: "1",
      task: "Vaccination - Herd A",
      date: "Today",
      time: "2:00 PM",
      assigned: "Dr. Sarah Chen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      task: "Health Check - Cattle #1234-1245",
      date: "Tomorrow",
      time: "9:00 AM",
      assigned: "Dr. James Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      task: "Feed Delivery - Barn 3",
      date: "May 15, 2023",
      time: "7:30 AM",
      assigned: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  if (loading) {
    return <LoadingScreenPage />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your livestock today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1 text-xs"
            onClick={() => window.location.reload()}
          >
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
              <DropdownMenuItem onClick={() => setTimeRange("24h")}>
                Last 24 hours
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("7d")}>
                Last 7 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("30d")}>
                Last 30 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("90d")}>
                Last 90 days
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats cards */}
      <StatsCards status={status}/>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Health Metrics</CardTitle>
                <CardDescription>
                  Average vital signs across all livestock
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View detailed report</DropdownMenuItem>
                  <DropdownMenuItem>Export data</DropdownMenuItem>
                  <DropdownMenuItem>Set alerts</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <LineChart dailySensorStats={dailySensorStats}/>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Livestock Distribution</CardTitle>
                <CardDescription>
                  Breakdown by species
                </CardDescription>
              </div>
              {/* <Tabs defaultValue="species">
                <TabsList className="grid w-[200px] grid-cols-2">
                  <TabsTrigger value="species">By Species</TabsTrigger>
                  <TabsTrigger value="status">By Status</TabsTrigger>
                </TabsList>
              </Tabs> */}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-7">
                <div className="h-[300px] flex items-center justify-center">
                  <DonutChart speciesData={speciesCount}/>
                </div>
                <div className="space-y-2 px-10 w-2/3">
                  {speciesCount.map(({ species, total }, index) => {
                    const color = colors[index % colors.length];

                    return (
                      <div key={species} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: color }}
                          ></div>
                          <span className="text-md font-medium">{species}</span>
                        </div>
                        <span className="text-md font-medium">{total}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Activity and alerts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Activity Metrics</CardTitle>
                <CardDescription>
                  Daily activity levels by livestock type
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                <span>View All</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <BarChart />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>
                  Notifications requiring attention
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                <span>View All</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3">
                    <div
                      className={`p-1.5 rounded-full mt-0.5 ${
                        alert.type === "critical"
                          ? "bg-red-100 text-red-600"
                          : alert.type === "warning"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {alert.type === "critical" ? (
                        <Heart className="h-4 w-4" />
                      ) : alert.type === "warning" ? (
                        <Activity className="h-4 w-4" />
                      ) : (
                        <Utensils className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm">
                          {alert.l_name}
                        </div>
                        <Badge
                          variant={
                            alert.type === "critical"
                              ? "destructive"
                              : alert.type === "warning"
                              ? "default"
                              : "outline"
                          }
                          className={
                            alert.type === "critical"
                              ? ""
                              : alert.type === "warning"
                              ? "bg-amber-500"
                              : "text-blue-500 border-blue-200"
                          }
                        >
                          {alert.type}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">{alert.message}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {alert.sent_at}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Upcoming tasks section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>
                Scheduled activities and responsibilities
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>View Calendar</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-4">
                  <div className="bg-[#E1EEBC]/30 p-2 rounded-md text-[#328E6E]">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{task.task}</div>
                    <div className="text-sm text-gray-500">
                      {task.date} at {task.time}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={task.avatar || "/placeholder.svg"}
                        alt={task.assigned}
                      />
                      <AvatarFallback>{task.assigned.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm hidden md:block">
                      {task.assigned}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick access section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <a href="/dashboard/livestock">
            <Card className="hover:bg-gray-50 transition-colors cursor-pointer h-full">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#328E6E]/10 p-3 rounded-full mb-3">
                    <Cow className="h-6 w-6 text-[#328E6E]" />
                  </div>
                  <h3 className="font-medium mb-1">Livestock Management</h3>
                  <p className="text-sm text-gray-500">
                    View and manage all livestock records
                  </p>
                  <div className="mt-4 flex items-center text-[#328E6E] text-sm font-medium">
                    <span>View Details</span>
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <a href="/dashboard/health">
            <Card className="hover:bg-gray-50 transition-colors cursor-pointer h-full">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-red-100 p-3 rounded-full mb-3">
                    <Heart className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="font-medium mb-1">Health Monitoring</h3>
                  <p className="text-sm text-gray-500">
                    Track vital signs and health status
                  </p>
                  <div className="mt-4 flex items-center text-[#328E6E] text-sm font-medium">
                    <span>View Details</span>
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.3 }}
        >
          <a href="/dashboard/feeding">
            <Card className="hover:bg-gray-50 transition-colors cursor-pointer h-full">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-amber-100 p-3 rounded-full mb-3">
                    <Utensils className="h-6 w-6 text-amber-500" />
                  </div>
                  <h3 className="font-medium mb-1">Feeding Management</h3>
                  <p className="text-sm text-gray-500">
                    Schedule and track feeding activities
                  </p>
                  <div className="mt-4 flex items-center text-[#328E6E] text-sm font-medium">
                    <span>View Details</span>
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          <a href="/dashboard/analytics">
            <Card className="hover:bg-gray-50 transition-colors cursor-pointer h-full">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-3">
                    <BarChart3 className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="font-medium mb-1">Analytics & Reports</h3>
                  <p className="text-sm text-gray-500">
                    View insights and generate reports
                  </p>
                  <div className="mt-4 flex items-center text-[#328E6E] text-sm font-medium">
                    <span>View Details</span>
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
