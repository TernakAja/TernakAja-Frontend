import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  MilkIcon as Cow,
  Download,
  Edit,
  FileText,
  Heart,
  History,
  Info,
  Leaf,
  MapPin,
  MoreHorizontal,
  Ruler,
  Scale,
  Thermometer,
  Utensils,
  Weight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { LineChart } from "@/components/Dashboard/charts";
import { useParams } from "react-router-dom";
import { DailySensorStats, SensorDataWithLivestock } from "@/types/dataSchema";
import {
  getLivestockDetailById,
  getSevenDayAverageById,
} from "@/services/livestockService";
import LoadingScreenPage from "../../../utility/LoadingScreen";
import {
  getLivestockAge,
  getTimeSince,
  roundToTwoDecimals,
} from "@/utility/util";
import { ComingSoon } from "@/components/coming-soon";
import { livestockData } from "@/lib/data";

// const dailySensorStats: DailySensorStats[] = [
//   { day: "Mon", avg_temperature: 101.5, avg_heart_rate: 65 },
//   { day: "Tue", avg_temperature: 101.3, avg_heart_rate: 68 },
//   { day: "Wed", avg_temperature: 101.6, avg_heart_rate: 64 },
//   { day: "Thu", avg_temperature: 101.8, avg_heart_rate: 66 },
//   { day: "Fri", avg_temperature: 101.4, avg_heart_rate: 67 },
//   { day: "Sat", avg_temperature: 101.2, avg_heart_rate: 65 },
//   { day: "Sun", avg_temperature: 101.5, avg_heart_rate: 63 },
// ];

const defaultSensorDataWithLivestockAndAnomaly: SensorDataWithLivestock = {
  sensor_data: {
    id: 0,
    livestockId: 0,
    temperature: 0,
    heartRate: 0,
    respiratoryRate: 0,
    timestamp: new Date().toISOString(),
  },
  livestock: {
    id: 0,
    farmId: 0,
    userId: 0,
    name: "",
    species: "",
    breed: "",
    gender: "",
    birthDate: new Date().toISOString(),
    photoUrl: "",
    status: "",
    height: 0,
    weight: 0,
    bodyConditionScore: 0,
    notes: "",
    recordedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

export default function LivestockDetail() {
  const { id } = useParams<{ id: string }>();
  const [livestock, setLivestock] = useState<SensorDataWithLivestock>(
    defaultSensorDataWithLivestockAndAnomaly
  );
  const [avgMetrics, setAvgMetrics] = useState<DailySensorStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLivestockDetail = async () => {
      try {
        if (!id) {
          return;
        }

        const livestockResponse = await getLivestockDetailById(parseInt(id));
        const metricsResponse = await getSevenDayAverageById(parseInt(id));
        if (livestockResponse.data) {
          setLivestock(livestockResponse.data);
        }
        if (metricsResponse.data) {
          setAvgMetrics(metricsResponse.data);
        }
      } catch (err) {
        console.log(err);
        // setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLivestockDetail();
  }, [id]);

  const [, setActiveTab] = useState("overview");

  if (loading && !livestock) {
    return <LoadingScreenPage />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <a href="/dashboard/livestock">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </a>
          <h1 className="text-2xl font-bold tracking-tight">
            Livestock Details
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" className="gap-1">
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Print Record</DropdownMenuItem>
              <DropdownMenuItem>Share Record</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Archive Record
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage
                      src={livestock.livestock.photoUrl || "/placeholder.svg"}
                      alt={livestock.livestock.name}
                    />
                    <AvatarFallback className="text-4xl">
                      {livestock.livestock.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 p-1 rounded-full ${
                      livestock.livestock.status === "Healthy"
                        ? "bg-green-500"
                        : livestock.livestock.status === "Attention"
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                  >
                    {livestock.livestock.status === "Healthy" ? (
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    ) : livestock.livestock.status === "Attention" ? (
                      <AlertTriangle className="h-5 w-5 text-white" />
                    ) : (
                      <Heart className="h-5 w-5 text-white" />
                    )}
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-1">
                  {livestock.livestock.name}
                </h2>
                <div className="text-gray-500 mb-2">
                  ID: {livestock.livestock.id}
                </div>
                <Badge
                  className={
                    livestock.livestock.status === "Healthy"
                      ? "bg-green-500"
                      : livestock.livestock.status === "Attention"
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }
                >
                  {livestock.livestock.status === "Healthy"
                    ? "Healthy"
                    : livestock.livestock.status === "Attention"
                    ? "Needs Attention"
                    : "Unhealthy"}
                </Badge>

                <div className="w-full mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Cow className="h-4 w-4" />
                      <span>Species</span>
                    </div>
                    <span className="font-medium">
                      {livestock.livestock.species}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Info className="h-4 w-4" />
                      <span>Breed</span>
                    </div>
                    <span className="font-medium">
                      {livestock.livestock.breed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>Birth Date</span>
                    </div>
                    <span className="font-medium">
                      {livestock.livestock.birthDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>Age</span>
                    </div>
                    <span className="font-medium">
                      {livestock.livestock.birthDate
                        ? getLivestockAge(livestock.livestock.birthDate)
                        : 0}{" "}
                      years old
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Weight className="h-4 w-4" />
                      <span>Weight</span>
                    </div>
                    <span className="font-medium">
                      {livestock.livestock.weight}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>Location</span>
                    </div>
                    <span className="font-medium">
                      Farm {livestock.livestock.farmId}
                    </span>
                  </div>
                </div>

                <div className="w-full border-t border-gray-200 mt-6 pt-6">
                  <div className="text-sm text-gray-500 mb-2">
                    Last updated {getTimeSince(livestock.sensor_data.timestamp)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <Tabs defaultValue="overview" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="health">Health</TabsTrigger>
                  <TabsTrigger value="production">Production</TabsTrigger>
                  <TabsTrigger value="genetics">Genetics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          Heart Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {roundToTwoDecimals(livestock.sensor_data.heartRate)}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            Normal: 48-84 beats per minute
                          </span>
                          {/* <Badge
                            variant="outline"
                            className="text-green-500 border-green-200"
                          >
                            Normal
                          </Badge> */}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-amber-500" />
                          Temperature
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {roundToTwoDecimals(
                            livestock.sensor_data.temperature
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            Normal: 38.5-39.5°C
                          </span>
                          {/* <Badge
                            variant="outline"
                            className="text-green-500 border-green-200"
                          >
                            Normal
                          </Badge> */}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Activity className="h-4 w-4 text-blue-500" />
                          Respiratory Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {roundToTwoDecimals(
                            livestock.sensor_data.respiratoryRate
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            Normal: 26-50 breaths per minute
                          </span>
                          {/* <Badge variant="outline" className="text-green-500 border-green-200">
                            Normal
                          </Badge> */}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Vital Signs Trend</CardTitle>
                      <CardDescription>
                        Last 7 days monitoring data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        {avgMetrics ? (
                          <LineChart dailySensorStats={avgMetrics} />
                        ) : (
                          <div className="h-[300px] flex flex-col items-center justify-center text-center text-gray-500 p-8">
                            <Activity className="h-12 w-12 mb-3 text-[#328E6E]" />
                            <p className="text-xl font-semibold mb-1">
                              No Sensor Data
                            </p>
                            <p className="text-sm">
                              Sensor statistics will appear here once available.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Utensils className="h-5 w-5 text-[#328E6E]" />
                          Feeding Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              Diet
                            </div>
                            <div className="font-medium">Forage</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              Feeding Schedule
                            </div>
                            <div className="font-medium">Twice Daily</div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-500 mb-1">
                                Daily Consumption
                              </div>
                              <div className="font-medium">22.6 kg/day</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 mb-1">
                                Water Intake
                              </div>
                              <div className="font-medium">25 gallons/day</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-[#328E6E]" />
                          Notes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          {livestock.livestock.notes}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="health" className="space-y-6">
                  <ComingSoon>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          Vaccination Records
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {livestockData.health.vaccinations.map(
                            (vaccination, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-4 pb-4 border-b border-gray-100"
                              >
                                <div className="bg-green-100 p-2 rounded-full text-green-600">
                                  <CheckCircle2 className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">
                                    {vaccination.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Administered: {vaccination.date}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Next Due: {vaccination.nextDue}
                                  </div>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="text-green-500 border-green-200"
                                >
                                  Up to date
                                </Badge>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </ComingSoon>

                  <ComingSoon>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <History className="h-5 w-5 text-[#328E6E]" />
                          Medical History
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                          <div className="space-y-6">
                            {livestockData.health.medicalHistory.map(
                              (event, index) => (
                                <div key={index} className="relative pl-10">
                                  <div className="absolute left-0 top-1 w-8 h-8 bg-[#328E6E] rounded-full flex items-center justify-center text-white">
                                    {event.event.includes("Check") ? (
                                      <CheckCircle2 className="h-4 w-4" />
                                    ) : event.event.includes("Vaccination") ? (
                                      <CheckCircle2 className="h-4 w-4" />
                                    ) : (
                                      <FileText className="h-4 w-4" />
                                    )}
                                  </div>
                                  <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <h4 className="font-bold text-gray-800">
                                        {event.event}
                                      </h4>
                                      <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {event.date}
                                      </div>
                                    </div>
                                    <p className="text-gray-600">
                                      {event.notes}
                                    </p>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ComingSoon>
                </TabsContent>

                <TabsContent value="production" className="space-y-6">
                  <ComingSoon>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Leaf className="h-5 w-5 text-[#328E6E]" />
                          Milk Production
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              Daily Average
                            </div>
                            <div className="font-medium">
                              {livestockData.production.milkProduction.average}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              Trend
                            </div>
                            <div className="font-medium">
                              {livestockData.production.milkProduction.trend}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              Quality
                            </div>
                            <div className="font-medium">
                              {livestockData.production.milkProduction.quality}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ComingSoon>

                  <ComingSoon>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-[#328E6E]" />
                          Reproduction Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <div className="text-sm text-gray-500 mb-1">
                                Status
                              </div>
                              <div className="font-medium">
                                {livestockData.reproduction.status}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 mb-1">
                                Breeding Date
                              </div>
                              <div className="font-medium">
                                {livestockData.reproduction.breedingDate}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 mb-1">
                                Due Date
                              </div>
                              <div className="font-medium">
                                {livestockData.reproduction.dueDate}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <div className="text-sm text-gray-500 mb-1">
                                Previous Calvings
                              </div>
                              <div className="font-medium">
                                {livestockData.reproduction.previousCalvings}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 mb-1">
                                Last Calving Date
                              </div>
                              <div className="font-medium">
                                {livestockData.reproduction.lastCalvingDate}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ComingSoon>
                </TabsContent>

                <TabsContent value="genetics" className="space-y-6">
                  <ComingSoon>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Cow className="h-5 w-5 text-[#328E6E]" />
                          Genetic Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              Sire
                            </div>
                            <div className="font-medium">
                              {livestockData.genetics.sire}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              Dam
                            </div>
                            <div className="font-medium">
                              {livestockData.genetics.dam}
                            </div>
                          </div>
                        </div>
                        <div className="mt-6">
                          <div className="text-sm text-gray-500 mb-3">
                            Genetic Traits
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {livestockData.genetics.geneticTraits.map(
                              (trait, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-[#328E6E] border-[#328E6E]/30"
                                >
                                  {trait}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ComingSoon>

                  <ComingSoon>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Scale className="h-5 w-5 text-[#328E6E]" />
                          Genetic Merit
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-sm font-medium">
                                Milk Production
                              </div>
                              <div className="text-sm text-gray-500">85%</div>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-sm font-medium">
                                Fertility
                              </div>
                              <div className="text-sm text-gray-500">75%</div>
                            </div>
                            <Progress value={75} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-sm font-medium">
                                Longevity
                              </div>
                              <div className="text-sm text-gray-500">80%</div>
                            </div>
                            <Progress value={80} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-sm font-medium">
                                Health Traits
                              </div>
                              <div className="text-sm text-gray-500">90%</div>
                            </div>
                            <Progress value={90} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ComingSoon>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <ComingSoon>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[#328E6E]" />
                    <span>Upcoming Events</span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    <span>View All</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">Vaccination Due</div>
                      <div className="text-sm text-gray-500">
                        January 15, 2024
                      </div>
                      <div className="text-sm text-gray-500">
                        Bovine Viral Diarrhea (BVD)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">Expected Calving</div>
                      <div className="text-sm text-gray-500">July 24, 2023</div>
                      <div className="text-sm text-gray-500">
                        Third pregnancy
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-full text-amber-600">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">Routine Check-up</div>
                      <div className="text-sm text-gray-500">June 10, 2023</div>
                      <div className="text-sm text-gray-500">
                        Quarterly health assessment
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ComingSoon>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <ComingSoon>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-[#328E6E]" />
                    <span>Growth & Development</span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    <span>View All</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">Weight Progress</div>
                      <div className="text-sm text-gray-500">
                        1,200 lbs (target: 1,300 lbs)
                      </div>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">Milk Production</div>
                      <div className="text-sm text-gray-500">
                        22 liters/day (target: 25 liters/day)
                      </div>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">
                        Body Condition Score
                      </div>
                      <div className="text-sm text-gray-500">3.5 out of 5</div>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">Feed Efficiency</div>
                      <div className="text-sm text-gray-500">
                        1.5 (milk:feed ratio)
                      </div>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </ComingSoon>
        </motion.div>
      </div>
    </div>
  );
}
