import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import { DailyAvgSensor, SpeciesCount } from "@/types/dataSchema"

Chart.register(...registerables)

interface LineChartProps {
  dailySensorStats: DailyAvgSensor[];
}

export function LineChart({ dailySensorStats }: LineChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // const respiratoryRateData = [28, 27, 29, 30, 28, 26, 27]

    const labels = dailySensorStats.map((item) => item.day);
    const temperatureData = dailySensorStats.map((item) => item.avg_temperature);
    const heartRateData = dailySensorStats.map(item => Number(item.avg_heart_rate));

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Temperature (°F)",
            data: temperatureData,
            borderColor: "#328E6E",
            backgroundColor: "rgba(50, 142, 110, 0.1)",
            tension: 0.4,
            fill: true,
            yAxisID: "y",
          },
          {
            label: "Heart Rate (BPM)",
            data: heartRateData,
            borderColor: "#E53935",
            backgroundColor: "rgba(229, 57, 53, 0.1)",
            tension: 0.4,
            fill: true,
            yAxisID: "y1",
          },
          // {
          //   label: "Respiratory Rate",
          //   data: respiratoryRateData,
          //   borderColor: "#FFA726",
          //   backgroundColor: "rgba(255, 167, 38, 0.1)",
          //   tension: 0.4,
          //   fill: true,
          //   yAxisID: "y2",
          // },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Temperature (°C)",
            },
            min: 35,
            max: 42,
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Heart Rate (BPM)",
            },
            min: 50,
            max: 80,
            grid: {
              drawOnChartArea: false,
            },
          },
          // y2: {
          //   type: "linear",
          //   display: true,
          //   position: "right",
          //   title: {
          //     display: true,
          //     text: "Respiratory Rate",
          //   },
          //   min: 20,
          //   max: 40,
          //   grid: {
          //     drawOnChartArea: false,
          //   },
          // },
        },
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            mode: "index",
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [dailySensorStats])

  return <canvas ref={chartRef} />
}

export function BarChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Sample data
    const labels = ["Cattle", "Sheep", "Goats", "Pigs"]
    // const morningData = [75, 65, 70, 60]
    const afternoonData = [85, 75, 80, 70]
    // const eveningData = [65, 55, 60, 50]

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          // {
          //   label: "Morning",
          //   data: morningData,
          //   backgroundColor: "#328E6E",
          // },
          {
            label: "Afternoon",
            data: afternoonData,
            backgroundColor: "#67AE6E",
          },
          // {
          //   label: "Evening",
          //   data: eveningData,
          //   backgroundColor: "#90C67C",
          // },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Activity Level (%)",
            },
            max: 100,
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} />
}

interface DonutChartProps {
  speciesData: SpeciesCount[] | undefined;
}

export function DonutChart({ speciesData }: DonutChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Sample data
    if(speciesData){

      const labels = speciesData.map((item) => item.species);
      const data = speciesData.map((item) => item.total);
      const colors = ["#328E6E", "#67AE6E", "#90C67C", "#E1EEBC"]
  
      // Create new chart
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: colors,
              borderColor: "white",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          cutout: "65%",
        },
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [speciesData])

  return <canvas ref={chartRef} />
}
