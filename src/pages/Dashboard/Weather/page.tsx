import DashboardLayout from "@/components/Dashboard/dashboard-layout"
import WeatherDashboard from "@/components/Dashboard/Weather/weather-dashboard"

export default function WeatherPage() {
  return (
    <DashboardLayout>
      <WeatherDashboard />
    </DashboardLayout>
  )
}
