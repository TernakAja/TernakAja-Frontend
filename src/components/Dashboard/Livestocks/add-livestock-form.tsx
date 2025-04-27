import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tag, Wifi, Key, Cpu, Calendar, User, Dna, Save, RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function AddLivestockForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [deviceId, setDeviceId] = useState("")

  // Function to generate a random device ID
  const generateDeviceId = () => {
    const randomId =
      `MOOR-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`.toUpperCase()
    setDeviceId(randomId)
  }

  // Auto-generate device ID on component mount
  useState(() => {
    generateDeviceId()
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSuccess(false)
    }, 3000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Livestock</h1>
        <p className="text-gray-600 mt-2">Register a new animal to your Moorgan monitoring system</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="device" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="device">Device Information</TabsTrigger>
            <TabsTrigger value="animal">Animal Information</TabsTrigger>
          </TabsList>

          <TabsContent value="device">
            <Card>
              <CardHeader>
                <CardTitle>Device Configuration</CardTitle>
                <CardDescription>
                  Configure the Moorgan collar device that will be attached to the animal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="deviceId" className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Device ID <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="deviceId"
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                        placeholder="Unique device identifier"
                        required
                        className="flex-1"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button type="button" variant="outline" size="icon" onClick={generateDeviceId}>
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Generate new ID</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-xs text-gray-500">Unique ID from Azure IoT Hub</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deviceKey" className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      Device Primary Key
                    </Label>
                    <Input id="deviceKey" type="password" placeholder="Leave blank to auto-generate" />
                    <p className="text-xs text-gray-500">Optional. Will be securely generated if left blank.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="deviceType" className="flex items-center gap-2">
                      <Cpu className="h-4 w-4" />
                      Device Type/Model
                    </Label>
                    <Select defaultValue="collar-v1">
                      <SelectTrigger id="deviceType">
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="collar-v1">Moorgan Collar v1.0</SelectItem>
                        <SelectItem value="collar-v2">Moorgan Collar v2.0</SelectItem>
                        <SelectItem value="tag-v1">Moorgan Tag v1.0</SelectItem>
                        <SelectItem value="custom">Custom Device</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">The model of the monitoring device</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="firmware" className="flex items-center gap-2">
                      Firmware Version
                    </Label>
                    <Select defaultValue="latest">
                      <SelectTrigger id="firmware">
                        <SelectValue placeholder="Select firmware version" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="latest">Latest (v2.3.1)</SelectItem>
                        <SelectItem value="v2.3.0">v2.3.0</SelectItem>
                        <SelectItem value="v2.2.5">v2.2.5</SelectItem>
                        <SelectItem value="v2.1.0">v2.1.0</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Device firmware version</p>
                  </div>
                </div>

                <div className="space-y-2 border-t pt-4">
                  <Label className="flex items-center gap-2 mb-2">
                    <Wifi className="h-4 w-4" />
                    Wi-Fi Configuration (Optional)
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="wifiSsid">Wi-Fi SSID</Label>
                      <Input id="wifiSsid" placeholder="Network name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="wifiPassword">Wi-Fi Password</Label>
                      <Input id="wifiPassword" type="password" placeholder="Network password" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Only needed if configuring Wi-Fi from the web. Often handled via mobile app.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="animal">
            <Card>
              <CardHeader>
                <CardTitle>Animal Information</CardTitle>
                <CardDescription>Enter details about the animal that will wear this device</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="animalId" className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Animal ID/Name <span className="text-red-500">*</span>
                    </Label>
                    <Input id="animalId" placeholder="Unique identifier or name" required />
                    <p className="text-xs text-gray-500">Unique name or tag ID of the animal</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="species" className="flex items-center gap-2">
                      <Dna className="h-4 w-4" />
                      Species/Breed <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Select defaultValue="cow">
                        <SelectTrigger id="species">
                          <SelectValue placeholder="Species" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cow">Cow</SelectItem>
                          <SelectItem value="goat">Goat</SelectItem>
                          <SelectItem value="sheep">Sheep</SelectItem>
                          <SelectItem value="pig">Pig</SelectItem>
                          <SelectItem value="horse">Horse</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input id="breed" placeholder="Breed (optional)" />
                    </div>
                    <p className="text-xs text-gray-500">Species and breed of the animal</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date of Birth <span className="text-red-500">*</span>
                    </Label>
                    <Input id="dob" type="date" required />
                    <p className="text-xs text-gray-500">Important for interpreting vitals</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Gender
                    </Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Useful for behavior and vitals analysis</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <textarea
                    id="notes"
                    className="w-full min-h-[100px] p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Any additional information about this animal..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="mt-8 flex justify-end">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-100 text-green-800 px-4 py-2 rounded-md flex items-center gap-2"
              >
                <Check className="h-5 w-5" />
                Livestock added successfully!
              </motion.div>
            ) : (
              <Button type="submit" className="bg-[#328E6E] hover:bg-[#67AE6E] text-white" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Add Livestock
                  </>
                )}
              </Button>
            )}
          </div>
        </Tabs>
      </form>
    </motion.div>
  )
}
