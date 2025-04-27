import { useState } from "react"
import { motion } from "framer-motion"
import {
  Cloud,
  Droplets,
  Thermometer,
  Wind,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Bell,
  Calendar,
  ArrowRight,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock weather data
const mockWeatherData = {
  current: {
    temperature: 24,
    feelsLike: 26,
    humidity: 65,
    windSpeed: 12,
    windDirection: "NE",
    pressure: 1012,
    uvIndex: 6,
    visibility: 10,
    condition: "Partly Cloudy",
    icon: "cloud-sun",
  },
  forecast: [
    { day: "Today", high: 26, low: 18, condition: "Partly Cloudy", icon: "cloud-sun", precipitation: 10 },
    { day: "Tomorrow", high: 28, low: 19, condition: "Sunny", icon: "sun", precipitation: 0 },
    { day: "Wed", high: 27, low: 20, condition: "Sunny", icon: "sun", precipitation: 0 },
    { day: "Thu", high: 25, low: 19, condition: "Cloudy", icon: "cloud", precipitation: 20 },
    { day: "Fri", high: 23, low: 17, condition: "Rain", icon: "cloud-rain", precipitation: 80 },
    { day: "Sat", high: 22, low: 16, condition: "Rain", icon: "cloud-rain", precipitation: 60 },
    { day: "Sun", high: 24, low: 18, condition: "Partly Cloudy", icon: "cloud-sun", precipitation: 30 },
  ],
  alerts: [
    {
      id: 1,
      type: "Heat",
      title: "Heat Advisory",
      description: "High temperatures expected between 12:00-16:00. Ensure adequate shade and water for livestock.",
      severity: "moderate",
      time: "12:00 - 16:00",
    },
    {
      id: 2,
      type: "Rain",
      title: "Heavy Rain Expected",
      description: "Heavy rainfall expected on Friday. Consider moving sensitive livestock to covered areas.",
      severity: "high",
      time: "Friday",
    },
  ],
  recommendations: [
    {
      id: 1,
      title: "Increase Water Supply",
      description: "Due to high temperatures, increase water supply by 20% for all livestock.",
      priority: "high",
      animalTypes: ["All"],
    },
    {
      id: 2,
      title: "Provide Extra Shade",
      description: "Ensure adequate shade is available during peak sun hours (12:00-16:00).",
      priority: "medium",
      animalTypes: ["Cattle", "Sheep"],
    },
    {
      id: 3,
      title: "Prepare for Rain",
      description: "Heavy rain expected on Friday. Ensure proper drainage and shelter.",
      priority: "medium",
      animalTypes: ["All"],
    },
  ],
}

// Weather icon component
const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return <Sun className="h-8 w-8 text-yellow-500" />
    case "partly cloudy":
    case "cloud-sun":
      return <Cloud className="h-8 w-8 text-gray-400" />
    case "cloudy":
    case "cloud":
      return <Cloud className="h-8 w-8 text-gray-500" />
    case "rain":
    case "cloud-rain":
      return <CloudRain className="h-8 w-8 text-blue-500" />
    case "snow":
    case "cloud-snow":
      return <CloudSnow className="h-8 w-8 text-blue-200" />
    case "thunderstorm":
    case "cloud-lightning":
      return <CloudLightning className="h-8 w-8 text-purple-500" />
    case "fog":
    case "cloud-fog":
      return <CloudFog className="h-8 w-8 text-gray-300" />
    default:
      return <Cloud className="h-8 w-8 text-gray-400" />
  }
}

export default function WeatherDashboard() {
  const [location, setLocation] = useState("Main Farm")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [weatherData, ] = useState(mockWeatherData)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Weather Monitoring</h1>
          <p className="text-gray-600 mt-1">Real-time weather data and livestock care recommendations</p>
        </div>

        <div className="flex items-center gap-4">
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Main Farm">Main Farm</SelectItem>
              <SelectItem value="North Pasture">North Pasture</SelectItem>
              <SelectItem value="South Field">South Field</SelectItem>
              <SelectItem value="West Grazing Area">West Grazing Area</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
            <Label htmlFor="notifications">Alerts</Label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#328E6E] to-[#67AE6E] text-white">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">Current Weather</CardTitle>
                  <CardDescription className="text-white/80">{location} • Updated just now</CardDescription>
                </div>
                <div className="flex items-center">
                  <WeatherIcon condition={weatherData.current.condition} />
                  <span className="text-4xl ml-2 font-bold">{weatherData.current.temperature}°C</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Thermometer className="h-6 w-6 text-orange-500 mb-1" />
                  <span className="text-sm text-gray-500">Feels Like</span>
                  <span className="text-lg font-medium">{weatherData.current.feelsLike}°C</span>
                </div>

                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Droplets className="h-6 w-6 text-blue-500 mb-1" />
                  <span className="text-sm text-gray-500">Humidity</span>
                  <span className="text-lg font-medium">{weatherData.current.humidity}%</span>
                </div>

                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Wind className="h-6 w-6 text-teal-500 mb-1" />
                  <span className="text-sm text-gray-500">Wind</span>
                  <span className="text-lg font-medium">{weatherData.current.windSpeed} km/h</span>
                </div>

                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Sun className="h-6 w-6 text-yellow-500 mb-1" />
                  <span className="text-sm text-gray-500">UV Index</span>
                  <span className="text-lg font-medium">{weatherData.current.uvIndex}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                Weather Alerts
              </CardTitle>
              <CardDescription>Important weather notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {weatherData.alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border-l-4 ${
                    alert.severity === "high" ? "border-red-500 bg-red-50" : "border-amber-500 bg-amber-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{alert.title}</h4>
                    <Badge variant={alert.severity === "high" ? "destructive" : "outline"}>{alert.time}</Badge>
                  </div>
                  <p className="text-sm mt-1 text-gray-600">{alert.description}</p>
                </div>
              ))}

              {weatherData.alerts.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <Cloud className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p>No active weather alerts</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              7-Day Forecast
            </CardTitle>
            <CardDescription>Weather forecast for the upcoming week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {weatherData.forecast.map((day, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center p-4 rounded-lg ${
                    index === 0 ? "bg-[#E1EEBC]/30 border border-[#90C67C]" : "bg-gray-50"
                  }`}
                >
                  <span className="font-medium mb-2">{day.day}</span>
                  <WeatherIcon condition={day.icon} />
                  <div className="mt-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-medium">{day.high}°</span>
                      <span className="text-gray-400 text-sm">{day.low}°</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {day.precipitation > 0 ? `${day.precipitation}% precip.` : "No precip."}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-[#328E6E]" />
              Livestock Care Recommendations
            </CardTitle>
            <CardDescription>Weather-based recommendations for optimal livestock care</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weatherData.recommendations.map((rec) => (
                <div key={rec.id} className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium flex items-center">
                      <Badge
                        className={`mr-2 ${
                          rec.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : rec.priority === "medium"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                      </Badge>
                      {rec.title}
                    </h4>
                    <div className="text-sm text-gray-500">For: {rec.animalTypes.join(", ")}</div>
                  </div>
                  <p className="text-sm mt-2 text-gray-600">{rec.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50">
            <div className="w-full flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Recommendations based on current and forecasted weather conditions
              </span>
              <Button variant="link" className="text-[#328E6E]">
                View All Recommendations <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8">
        <Tabs defaultValue="temperature">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium">Weather Analytics</h3>
            <TabsList>
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="precipitation">Precipitation</TabsTrigger>
              <TabsTrigger value="humidity">Humidity</TabsTrigger>
            </TabsList>
          </div>

          <Card>
            <TabsContent value="temperature" className="m-0">
              <CardContent className="pt-6">
                <div className="h-[300px] flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-b from-transparent to-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <p>Temperature chart visualization would appear here</p>
                      <p className="text-sm mt-2">Shows temperature trends over time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="precipitation" className="m-0">
              <CardContent className="pt-6">
                <div className="h-[300px] flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-b from-transparent to-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <p>Precipitation chart visualization would appear here</p>
                      <p className="text-sm mt-2">Shows rainfall patterns and forecasts</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="humidity" className="m-0">
              <CardContent className="pt-6">
                <div className="h-[300px] flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-b from-transparent to-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <p>Humidity chart visualization would appear here</p>
                      <p className="text-sm mt-2">Shows humidity levels and trends</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
          </Card>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
