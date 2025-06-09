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
  toPercentage,
} from "@/utility/util";
import { ComingSoon } from "@/components/coming-soon";
import { livestockData } from "@/lib/data";
import { useTranslation } from "react-i18next";

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
    sp02: 0,
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
  const { t } = useTranslation();
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
            {t("dashboard.livestock.detail.header.title")}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            <span>{t("dashboard.livestock.detail.header.export")}</span>
          </Button>
          <Button variant="outline" className="gap-1">
            <Edit className="h-4 w-4" />
            <span>{t("dashboard.livestock.detail.header.edit")}</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                {t("dashboard.livestock.detail.header.printRecord")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {t("dashboard.livestock.detail.header.shareRecord")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                {t("dashboard.livestock.detail.header.archiveRecord")}
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
                      <span>
                        {t(
                          "dashboard.livestock.detail.profile.details.species"
                        )}
                      </span>
                    </div>
                    <span className="font-medium">
                      {livestock.livestock.species}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Info className="h-4 w-4" />
                      <span>
                        {t("dashboard.livestock.detail.profile.details.breed")}
                      </span>
                    </div>
                    <span className="font-medium">
                      {livestock.livestock.breed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {t(
                          "dashboard.livestock.detail.profile.details.birthDate"
                        )}
                      </span>
                    </div>
                    <span className="font-medium">
                      {livestock.livestock.birthDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>
                        {t("dashboard.livestock.detail.profile.details.age")}
                      </span>
                    </div>
                    <span className="font-medium">
                      {livestock.livestock.birthDate
                        ? getLivestockAge(livestock.livestock.birthDate)
                        : 0}{" "}
                      {t("dashboard.livestock.detail.profile.details.ageUnit")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Weight className="h-4 w-4" />
                      <span>
                        {t("dashboard.livestock.detail.profile.details.weight")}
                      </span>
                    </div>
                    <span className="font-medium">
                      {livestock.livestock.weight}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {t(
                          "dashboard.livestock.detail.profile.details.location"
                        )}
                      </span>
                    </div>
                    <span className="font-medium">
                      {t("dashboard.livestock.detail.profile.details.farm", {
                        farmId: livestock.livestock.farmId,
                      })}
                    </span>
                  </div>
                </div>

                <div className="w-full border-t border-gray-200 mt-6 pt-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {t("dashboard.livestock.detail.profile.lastUpdated", {
                      time: getTimeSince(livestock.sensor_data.timestamp),
                    })}
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
                  <TabsTrigger value="overview">
                    {t("dashboard.livestock.detail.tabs.overview")}
                  </TabsTrigger>
                  <TabsTrigger value="health">
                    {t("dashboard.livestock.detail.tabs.health")}
                  </TabsTrigger>
                  <TabsTrigger value="production">
                    {t("dashboard.livestock.detail.tabs.production")}
                  </TabsTrigger>
                  <TabsTrigger value="genetics">
                    {t("dashboard.livestock.detail.tabs.genetics")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          {t(
                            "dashboard.livestock.detail.overview.vitals.heartRate.title"
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {roundToTwoDecimals(livestock.sensor_data.heartRate)}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            {t(
                              "dashboard.livestock.detail.overview.vitals.heartRate.normal"
                            )}
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
                          {t(
                            "dashboard.livestock.detail.overview.vitals.temperature.title"
                          )}
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
                            {t(
                              "dashboard.livestock.detail.overview.vitals.temperature.normal"
                            )}
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
                          {t(
                            "dashboard.livestock.detail.overview.vitals.oxygenSaturation.title"
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {roundToTwoDecimals(
                            livestock.sensor_data.sp02
                          )}%
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            {t(
                              "dashboard.livestock.detail.overview.vitals.oxygenSaturation.normal"
                            )}
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
                      <CardTitle>
                        {t(
                          "dashboard.livestock.detail.overview.vitalSigns.title"
                        )}
                      </CardTitle>
                      <CardDescription>
                        {t(
                          "dashboard.livestock.detail.overview.vitalSigns.description"
                        )}
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
                              {t(
                                "dashboard.livestock.detail.overview.noSensorData.title"
                              )}
                            </p>
                            <p className="text-sm">
                              {t(
                                "dashboard.livestock.detail.overview.noSensorData.description"
                              )}
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
                          {t(
                            "dashboard.livestock.detail.overview.feedingInfo.title"
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              {t(
                                "dashboard.livestock.detail.overview.feedingInfo.diet"
                              )}
                            </div>
                            <div className="font-medium">
                              {t(
                                "dashboard.livestock.detail.overview.feedingInfo.dietValue"
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              {t(
                                "dashboard.livestock.detail.overview.feedingInfo.schedule"
                              )}
                            </div>
                            <div className="font-medium">
                              {t(
                                "dashboard.livestock.detail.overview.feedingInfo.scheduleValue"
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-500 mb-1">
                                {t(
                                  "dashboard.livestock.detail.overview.feedingInfo.consumption"
                                )}
                              </div>
                              <div className="font-medium">
                                {t(
                                  "dashboard.livestock.detail.overview.feedingInfo.consumptionValue"
                                )}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 mb-1">
                                {t(
                                  "dashboard.livestock.detail.overview.feedingInfo.waterIntake"
                                )}
                              </div>
                              <div className="font-medium">
                                {t(
                                  "dashboard.livestock.detail.overview.feedingInfo.waterIntakeValue"
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-[#328E6E]" />
                          {t("dashboard.livestock.detail.overview.notes.title")}
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
                          {t(
                            "dashboard.livestock.detail.health.vaccinations.title"
                          )}
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
                                    {t(
                                      "dashboard.livestock.detail.health.vaccinations.administered",
                                      {
                                        date: vaccination.date,
                                      }
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {t(
                                      "dashboard.livestock.detail.health.vaccinations.nextDue",
                                      {
                                        date: vaccination.nextDue,
                                      }
                                    )}
                                  </div>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="text-green-500 border-green-200"
                                >
                                  {t(
                                    "dashboard.livestock.detail.health.vaccinations.status"
                                  )}
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
                          {t(
                            "dashboard.livestock.detail.health.medicalHistory.title"
                          )}
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
                          {t(
                            "dashboard.livestock.detail.production.milk.title"
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              {t(
                                "dashboard.livestock.detail.production.milk.dailyAverage"
                              )}
                            </div>
                            <div className="font-medium">
                              {livestockData.production.milkProduction.average}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              {t(
                                "dashboard.livestock.detail.production.milk.trend"
                              )}
                            </div>
                            <div className="font-medium">
                              {livestockData.production.milkProduction.trend}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              {t(
                                "dashboard.livestock.detail.production.milk.quality"
                              )}
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
                          {t(
                            "dashboard.livestock.detail.production.reproduction.title"
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <div className="text-sm text-gray-500 mb-1">
                                {t(
                                  "dashboard.livestock.detail.production.reproduction.status"
                                )}
                              </div>
                              <div className="font-medium">
                                {livestockData.reproduction.status}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 mb-1">
                                {t(
                                  "dashboard.livestock.detail.production.reproduction.breedingDate"
                                )}
                              </div>
                              <div className="font-medium">
                                {livestockData.reproduction.breedingDate}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 mb-1">
                                {t(
                                  "dashboard.livestock.detail.production.reproduction.dueDate"
                                )}
                              </div>
                              <div className="font-medium">
                                {livestockData.reproduction.dueDate}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <div className="text-sm text-gray-500 mb-1">
                                {t(
                                  "dashboard.livestock.detail.production.reproduction.previousCalvings"
                                )}
                              </div>
                              <div className="font-medium">
                                {livestockData.reproduction.previousCalvings}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 mb-1">
                                {t(
                                  "dashboard.livestock.detail.production.reproduction.lastCalvingDate"
                                )}
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
                          {t("dashboard.livestock.detail.genetics.info.title")}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              {t(
                                "dashboard.livestock.detail.genetics.info.sire"
                              )}
                            </div>
                            <div className="font-medium">
                              {livestockData.genetics.sire}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              {t(
                                "dashboard.livestock.detail.genetics.info.dam"
                              )}
                            </div>
                            <div className="font-medium">
                              {livestockData.genetics.dam}
                            </div>
                          </div>
                        </div>
                        <div className="mt-6">
                          <div className="text-sm text-gray-500 mb-3">
                            {t(
                              "dashboard.livestock.detail.genetics.info.traits"
                            )}
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
                          {t("dashboard.livestock.detail.genetics.merit.title")}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-sm font-medium">
                                {t(
                                  "dashboard.livestock.detail.genetics.merit.milkProduction"
                                )}
                              </div>
                              <div className="text-sm text-gray-500">85%</div>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-sm font-medium">
                                {t(
                                  "dashboard.livestock.detail.genetics.merit.fertility"
                                )}
                              </div>
                              <div className="text-sm text-gray-500">75%</div>
                            </div>
                            <Progress value={75} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-sm font-medium">
                                {t(
                                  "dashboard.livestock.detail.genetics.merit.longevity"
                                )}
                              </div>
                              <div className="text-sm text-gray-500">80%</div>
                            </div>
                            <Progress value={80} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-sm font-medium">
                                {t(
                                  "dashboard.livestock.detail.genetics.merit.healthTraits"
                                )}
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
                    <span>
                      {t("dashboard.livestock.detail.upcomingEvents.title")}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    <span>
                      {t("dashboard.livestock.detail.upcomingEvents.viewAll")}
                    </span>
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
                      <div className="font-medium">
                        {t(
                          "dashboard.livestock.detail.upcomingEvents.vaccinationDue.title"
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t(
                          "dashboard.livestock.detail.upcomingEvents.vaccinationDue.date"
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t(
                          "dashboard.livestock.detail.upcomingEvents.vaccinationDue.description"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">
                        {t(
                          "dashboard.livestock.detail.upcomingEvents.expectedCalving.title"
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t(
                          "dashboard.livestock.detail.upcomingEvents.expectedCalving.date"
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t(
                          "dashboard.livestock.detail.upcomingEvents.expectedCalving.description"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-full text-amber-600">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">
                        {t(
                          "dashboard.livestock.detail.upcomingEvents.routineCheckup.title"
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t(
                          "dashboard.livestock.detail.upcomingEvents.routineCheckup.date"
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t(
                          "dashboard.livestock.detail.upcomingEvents.routineCheckup.description"
                        )}
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
                    <span>{t("dashboard.livestock.detail.growth.title")}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    <span>
                      {t("dashboard.livestock.detail.growth.viewAll")}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">
                        {t(
                          "dashboard.livestock.detail.growth.weightProgress.title"
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t(
                          "dashboard.livestock.detail.growth.weightProgress.value",
                          {
                            current: "1,200",
                            target: "1,300",
                          }
                        )}
                      </div>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">
                        {t(
                          "dashboard.livestock.detail.growth.milkProduction.title"
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t(
                          "dashboard.livestock.detail.growth.milkProduction.value",
                          {
                            current: 22,
                            target: 25,
                          }
                        )}
                      </div>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">
                        {t("dashboard.livestock.detail.growth.bcs.title")}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t("dashboard.livestock.detail.growth.bcs.value", {
                          score: 3.5,
                        })}
                      </div>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">
                        {t(
                          "dashboard.livestock.detail.growth.feedEfficiency.title"
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t(
                          "dashboard.livestock.detail.growth.feedEfficiency.value",
                          { ratio: 1.5 }
                        )}
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
