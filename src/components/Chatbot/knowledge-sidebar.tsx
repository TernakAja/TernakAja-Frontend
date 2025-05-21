import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function KnowledgeSidebar() {
  return (
    <motion.div
      className="hidden lg:block w-80 border-l border-gray-200 bg-white/90 overflow-y-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="p-4">
        <h2 className="font-semibold text-lg text-[#328E6E] mb-4">Knowledge Base</h2>

        <Tabs defaultValue="guides">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="docs">Docs</TabsTrigger>
          </TabsList>

          <TabsContent value="guides" className="space-y-4">
            <div className="bg-[#E1EEBC]/20 rounded-lg p-3 cursor-pointer hover:bg-[#E1EEBC]/30">
              <h3 className="font-medium text-[#328E6E]">Getting Started</h3>
              <p className="text-sm text-gray-600 mt-1">
                Complete guide to setting up your first livestock monitoring system
              </p>
            </div>
            <div className="bg-[#E1EEBC]/20 rounded-lg p-3 cursor-pointer hover:bg-[#E1EEBC]/30">
              <h3 className="font-medium text-[#328E6E]">Health Monitoring</h3>
              <p className="text-sm text-gray-600 mt-1">Understanding vital signs and health indicators</p>
            </div>
            <div className="bg-[#E1EEBC]/20 rounded-lg p-3 cursor-pointer hover:bg-[#E1EEBC]/30">
              <h3 className="font-medium text-[#328E6E]">Seasonal Care</h3>
              <p className="text-sm text-gray-600 mt-1">Adapting livestock management to seasonal changes</p>
            </div>
            <div className="bg-[#E1EEBC]/20 rounded-lg p-3 cursor-pointer hover:bg-[#E1EEBC]/30">
              <h3 className="font-medium text-[#328E6E]">Device Maintenance</h3>
              <p className="text-sm text-gray-600 mt-1">Keeping your Moorgan devices in optimal condition</p>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-4">
            <div className="border-b border-gray-200 pb-3">
              <h3 className="font-medium text-[#328E6E]">How often should I charge the collar?</h3>
              <p className="text-sm text-gray-600 mt-1">
                Moorgan collars typically last 2-3 weeks on a single charge, depending on usage.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-3">
              <h3 className="font-medium text-[#328E6E]">What's the range of the collar?</h3>
              <p className="text-sm text-gray-600 mt-1">
                The standard range is up to 5 miles in open terrain, less in areas with obstacles.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-3">
              <h3 className="font-medium text-[#328E6E]">Is the collar waterproof?</h3>
              <p className="text-sm text-gray-600 mt-1">
                Yes, Moorgan collars are IP67 rated, making them fully waterproof in up to 1 meter of water.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-3">
              <h3 className="font-medium text-[#328E6E]">How accurate is the health monitoring?</h3>
              <p className="text-sm text-gray-600 mt-1">
                Our sensors are 95-98% accurate compared to veterinary equipment in controlled tests.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="docs" className="space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
              <div className="bg-[#328E6E]/10 p-2 rounded">
                <Download className="h-4 w-4 text-[#328E6E]" />
              </div>
              <div>
                <h3 className="font-medium text-[#328E6E]">Technical Specifications</h3>
                <p className="text-xs text-gray-500">PDF • 2.4 MB</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
              <div className="bg-[#328E6E]/10 p-2 rounded">
                <Download className="h-4 w-4 text-[#328E6E]" />
              </div>
              <div>
                <h3 className="font-medium text-[#328E6E]">API Documentation</h3>
                <p className="text-xs text-gray-500">PDF • 3.7 MB</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
              <div className="bg-[#328E6E]/10 p-2 rounded">
                <Download className="h-4 w-4 text-[#328E6E]" />
              </div>
              <div>
                <h3 className="font-medium text-[#328E6E]">User Manual</h3>
                <p className="text-xs text-gray-500">PDF • 5.1 MB</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  )
}
