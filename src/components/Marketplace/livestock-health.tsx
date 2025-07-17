import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components";
import {
  Activity,
  Calendar,
  FileText,
  Heart,
  Shield,
  Stethoscope,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default function LivestockHealth({ id }: { id: string }) {
export default function LivestockHealth() {
  // Mock data - in a real app, this would come from an API based on the ID
  const healthData = {
    vitalSigns: {
      temperature: {
        current: "101.5°F",
        normal: "101.5°F",
        status: "normal",
      },
      heartRate: {
        current: "65 BPM",
        normal: "60-70 BPM",
        status: "normal",
      },
      respiratoryRate: {
        current: "28 breaths/min",
        normal: "26-30 breaths/min",
        status: "normal",
      },
      weight: {
        current: "1,200 lbs",
        trend: "+50 lbs in 6 months",
        status: "normal",
      },
    },
    vaccinations: [
      {
        name: "Bovine Viral Diarrhea (BVD)",
        date: "January 15, 2023",
        nextDue: "January 15, 2024",
      },
      {
        name: "Infectious Bovine Rhinotracheitis (IBR)",
        date: "January 15, 2023",
        nextDue: "January 15, 2024",
      },
      {
        name: "Leptospirosis",
        date: "January 15, 2023",
        nextDue: "January 15, 2024",
      },
      {
        name: "Clostridial Diseases",
        date: "June 10, 2022",
        nextDue: "June 10, 2023",
      },
    ],
    medicalHistory: [
      {
        event: "Routine Check-up",
        date: "January 10, 2023",
        notes: "All vital signs normal. No issues detected.",
      },
      {
        event: "Hoof Trimming",
        date: "November 5, 2022",
        notes: "Routine maintenance. No issues detected.",
      },
      {
        event: "Vaccination",
        date: "June 10, 2022",
        notes: "Annual vaccinations administered. No adverse reactions.",
      },
      {
        event: "Routine Check-up",
        date: "January 12, 2022",
        notes: "All vital signs normal. No issues detected.",
      },
    ],
    productionData: {
      milkProduction: {
        average: "22 liters per day",
        trend: "Stable over past 12 months",
        quality: "High butterfat content",
      },
      reproductiveHistory: {
        calvings: 2,
        lastCalving: "May 2022",
        fertility: "Good",
      },
    },
  };

  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Health & Monitoring Data"
          subtitle="Complete health records and monitoring data from TernakAja's livestock tracking system"
        />

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="vitals" className="mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="vitals" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Vital Signs</span>
              </TabsTrigger>
              <TabsTrigger
                value="vaccinations"
                className="flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                <span>Vaccinations</span>
              </TabsTrigger>
              <TabsTrigger value="medical" className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                <span>Medical History</span>
              </TabsTrigger>
              <TabsTrigger
                value="production"
                className="flex items-center gap-2"
              >
                <Activity className="h-4 w-4" />
                <span>Production Data</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vitals">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-800">
                  Current Vital Signs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(healthData.vitalSigns).map(
                    ([key, data], index) => (
                      <AnimatedDiv
                        key={key}
                        className="bg-gray-50 rounded-xl p-4"
                        direction="up"
                        delay={index * 0.1}
                      >
                        <div className="text-gray-500 capitalize mb-1">
                          {key}
                        </div>
                        <div className="text-2xl font-bold text-gray-800 mb-1">
                          {data.current}
                        </div>
                        {/* <div className="text-sm text-gray-500">Normal range: {data.normal}</div> */}
                        <div
                          className={`text-sm mt-2 ${
                            data.status === "normal"
                              ? "text-green-500"
                              : "text-yellow-500"
                          }`}
                        >
                          Status: {data.status}
                        </div>
                      </AnimatedDiv>
                    )
                  )}
                </div>
                <div className="mt-6 text-center text-sm text-gray-500">
                  Data last updated: Today at 8:00 AM
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vaccinations">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-800">
                  Vaccination Records
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-600">
                          Vaccination
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-600">
                          Date Administered
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-600">
                          Next Due
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-600">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {healthData.vaccinations.map((vax, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-4">{vax.name}</td>
                          <td className="py-3 px-4">{vax.date}</td>
                          <td className="py-3 px-4">{vax.nextDue}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Up to date
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 text-center text-sm text-gray-500">
                  All vaccinations are up to date and documented
                </div>
              </div>
            </TabsContent>

            <TabsContent value="medical">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-800">
                  Medical History
                </h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-6">
                    {healthData.medicalHistory.map((event, index) => (
                      <AnimatedDiv
                        key={index}
                        className="relative pl-10"
                        direction="up"
                        delay={index * 0.1}
                      >
                        <div className="absolute left-0 top-1 w-8 h-8 bg-[#328E6E] rounded-full flex items-center justify-center text-white">
                          {event.event.includes("Check") ? (
                            <Stethoscope className="h-4 w-4" />
                          ) : event.event.includes("Vaccination") ? (
                            <Shield className="h-4 w-4" />
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
                          <p className="text-gray-600">{event.notes}</p>
                        </div>
                      </AnimatedDiv>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="production">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-800">
                  Production Data
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatedDiv
                    className="bg-gray-50 rounded-xl p-6"
                    direction="right"
                  >
                    <h4 className="font-bold text-lg mb-4 text-gray-800">
                      Milk Production
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-gray-500 text-sm">
                          Daily Average
                        </div>
                        <div className="font-medium">
                          {healthData.productionData.milkProduction.average}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-sm">Trend</div>
                        <div className="font-medium">
                          {healthData.productionData.milkProduction.trend}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-sm">Quality</div>
                        <div className="font-medium">
                          {healthData.productionData.milkProduction.quality}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                      Milk Production Chart
                    </div>
                  </AnimatedDiv>

                  <AnimatedDiv
                    className="bg-gray-50 rounded-xl p-6"
                    direction="left"
                  >
                    <h4 className="font-bold text-lg mb-4 text-gray-800">
                      Reproductive History
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-gray-500 text-sm">
                          Number of Calvings
                        </div>
                        <div className="font-medium">
                          {
                            healthData.productionData.reproductiveHistory
                              .calvings
                          }
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-sm">
                          Last Calving Date
                        </div>
                        <div className="font-medium">
                          {
                            healthData.productionData.reproductiveHistory
                              .lastCalving
                          }
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-sm">
                          Fertility Status
                        </div>
                        <div className="font-medium">
                          {
                            healthData.productionData.reproductiveHistory
                              .fertility
                          }
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                      Reproductive Timeline
                    </div>
                  </AnimatedDiv>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AnimatedSection>
  );
}
