import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Heart, Thermometer, Activity, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { roundToTwoDecimals } from "@/utility/util";

interface LastHourMetricsProps {
  heartRateAverage: string | undefined;
  temperatureAverage: number | undefined;
  sp02Average: number | undefined;
}

export default function LastHourMetrics({
  heartRateAverage,
  temperatureAverage,
  sp02Average,
}: LastHourMetricsProps) {
  // Static data except average
  const heartRate = {
    average: Number(heartRateAverage),
    min: 40,
    max: 100,
    unit: "bpm",
    status: "normal",
  };

  const temperature = {
    average: Math.round((temperatureAverage ?? 0) * 100) / 100,
    min: 38.0,
    max: 39.5,
    unit: "°C",
    status: "normal",
  };

  const sp02 = {
    average: Math.round((sp02Average ?? 0) * 100) / 100,
    min: 95,
    max: 100,
    unit: "%",
    status: "active",
  };

  if (!heartRate.average || !temperature.average || !sp02.average) {
    return (
      <motion.div
        className="lg:col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Last Hour Averages</CardTitle>
              <CardDescription>
                Average health metrics in the last hour
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[300px] text-center text-gray-500">
            <AlertCircle className="h-12 w-12 mb-3 text-[#328E6E]" />
            <p className="text-xl font-semibold mb-1">
              Missing metric data in the last hour
            </p>
            <p className="text-sm">
              Try checking the IoT devices.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Helper function to determine status color
  const getStatusColor = (status: string) => {
    if (status === "normal" || status === "active") return "text-[#67AE6E]";
    if (status === "high") return "text-amber-500";
    if (status === "low") return "text-red-500";
    return "text-gray-500";
  };

  function determineBPM(average: number): "low" | "normal" | "high" {
    if (average < 60) return "low";
    if (average > 84) return "high";
    return "normal";
  }

  function determineResp(average: number): "low" | "normal" | "high" {
    if (average < 26) return "low";
    if (average > 50) return "high";
    return "normal";
  }

  function determineTemp(average: number): "low" | "normal" | "high" {
    if (average < 37.8) return "low";
    if (average > 39.2) return "high";
    return "normal";
  }

  // Calculate progress percentage
  const getProgressPercentage = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <motion.div
      className="lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
    >
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Last Hour Averages</CardTitle>
            <CardDescription>
              Average health metrics in the last hour
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[300px]">
            <div className="flex flex-col justify-between bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-[#328E6E]/10 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-[#328E6E]" />
                  </div>
                  <h3 className="font-medium text-gray-700">Heart Rate</h3>
                </div>
              </div>

              <div className="my-4 flex flex-col items-center justify-center">
                <div className="flex items-end">
                  <span
                    className={`text-4xl font-bold ${getStatusColor(
                      determineBPM(heartRate.average)
                    )}`}
                  >
                    {roundToTwoDecimals(heartRate.average)}
                  </span>
                  <span className="text-lg text-gray-500 ml-1 mb-1">
                    {heartRate.unit}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Range: {heartRate.min} - {heartRate.max} {heartRate.unit}
                </p>
              </div>

              <div>
                <Progress
                  value={getProgressPercentage(
                    heartRate.average,
                    heartRate.min,
                    heartRate.max
                  )}
                  className="h-2 bg-[#E1EEBC]"
                  indicatorClassName="bg-[#328E6E]"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">{heartRate.min}</span>
                  <span className="text-xs text-gray-500">{heartRate.max}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-[#328E6E]/10 p-2 rounded-full">
                    <Thermometer className="h-5 w-5 text-[#328E6E]" />
                  </div>
                  <h3 className="font-medium text-gray-700">Temperature</h3>
                </div>
              </div>

              <div className="my-4 flex flex-col items-center justify-center">
                <div className="flex items-end">
                  <span
                    className={`text-4xl font-bold ${getStatusColor(
                      determineTemp(temperature.average)
                    )}`}
                  >
                    {temperature.average}
                  </span>
                  <span className="text-lg text-gray-500 ml-1 mb-1">
                    {temperature.unit}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Range: {temperature.min} - {temperature.max}{" "}
                  {temperature.unit}
                </p>
              </div>

              <div>
                <Progress
                  value={getProgressPercentage(
                    temperature.average,
                    temperature.min,
                    temperature.max
                  )}
                  className="h-2 bg-[#E1EEBC]"
                  indicatorClassName="bg-[#328E6E]"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">
                    {temperature.min}
                  </span>
                  <span className="text-xs text-gray-500">
                    {temperature.max}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-[#328E6E]/10 p-2 rounded-full">
                    <Activity className="h-5 w-5 text-[#328E6E]" />
                  </div>
                  <h3 className="font-medium text-gray-700">Oxygen Saturation</h3>
                </div>
              </div>

              <div className="my-4 flex flex-col items-center justify-center">
                <div className="flex items-end">
                  <span
                    className={`text-4xl font-bold ${getStatusColor(
                      determineResp(sp02.average)
                    )}`}
                  >
                    {sp02.average}
                  </span>
                  <span className="text-lg text-gray-500 ml-1 mb-1">
                    {sp02.unit}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Range: {sp02.min} - {sp02.max}{" "}
                  {sp02.unit}
                </p>
              </div>

              <div>
                <Progress
                  value={getProgressPercentage(
                    sp02.average,
                    sp02.min,
                    sp02.max
                  )}
                  className="h-2 bg-[#E1EEBC]"
                  indicatorClassName="bg-[#328E6E]"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">
                    {sp02.min}
                  </span>
                  <span className="text-xs text-gray-500">
                    {sp02.max}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
