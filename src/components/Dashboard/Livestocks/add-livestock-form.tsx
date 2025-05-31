import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wifi,
  Cpu,
  Calendar,
  User,
  Dna,
  Save,
  RefreshCw,
  Check,
  Scale,
  Ruler,
  Camera,
  HardDrive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";
import { createLivestock } from "@/services/livestockService";
import { useAuth } from "@/context/auth-context";

export default function AddLivestockForm() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    deviceId: "", // New field for Device ID
    deviceType: "collar-v1",
    firmware: "latest",
    wifiSsid: "",
    wifiPassword: "",
    name: "",
    species: "",
    breed: "",
    gender: "",
    birthDate: "",
    photoUrl: "",
    status: "",
    weight: "",
    height: "",
    bodyConditionScore: "", // Added to match livestock table
    notes: "", // Added to match livestock table
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = [
      "deviceId",
      "deviceType",
      "firmware",
      "name",
      "species",
      "breed",
      "gender",
      "birthDate",
      "status",
      "weight",
      "height",
      "bodyConditionScore",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    // Validate numeric fields
    if (formData.weight && isNaN(Number(formData.weight))) {
      newErrors.weight = "Weight must be a valid number";
    }
    if (formData.height && isNaN(Number(formData.height))) {
      newErrors.height = "Height must be a valid number";
    }
    if (
      formData.bodyConditionScore &&
      isNaN(Number(formData.bodyConditionScore))
    ) {
      newErrors.bodyConditionScore =
        "Body Condition Score must be a valid number";
    }

    // Validate deviceId format (e.g., alphanumeric with hyphens)
    if (formData.deviceId && !/^[a-zA-Z0-9-]+$/.test(formData.deviceId)) {
      newErrors.deviceId = "Device ID must be alphanumeric with hyphens";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const generateDeviceId = () => {
    // Auto-generate deviceId based on name and timestamp
    const timestamp = Date.now().toString().slice(-6);
    const baseId = formData.name
      ? formData.name.toLowerCase().replace(/\s+/g, "-")
      : "device";
    const deviceId = `${baseId}-${timestamp}`;
    setFormData((prev) => ({ ...prev, deviceId }));
    if (errors.deviceId) {
      setErrors((prev) => ({ ...prev, deviceId: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.", {
        duration: 4000,
        position: "top-center",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createLivestock(
        Number(user?.id),
        Number(user?.id), // userId === farmId
        Number(formData.deviceId),
        formData.deviceType,
        formData.firmware,
        formData.wifiSsid || null,
        formData.wifiPassword || null,
        formData.name,
        formData.species,
        formData.breed,
        formData.gender,
        formData.birthDate,
        formData.photoUrl || null,
        formData.status,
        Number(formData.height),
        Number(formData.weight),
        Number(formData.bodyConditionScore),
        formData.notes || null
      );

      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success(response.message, {
        duration: 4000,
        position: "top-center",
      });

      // Reset form
      setFormData({
        deviceId: "",
        deviceType: "collar-v1",
        firmware: "latest",
        wifiSsid: "",
        wifiPassword: "",
        name: "",
        species: "",
        breed: "",
        gender: "",
        birthDate: "",
        photoUrl: "",
        status: "",
        weight: "",
        height: "",
        bodyConditionScore: "",
        notes: "",
      });

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      toast.error("Failed to add livestock. Please try again.", {
        duration: 4000,
        position: "top-center",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Livestock</h1>
        <p className="text-gray-600 mt-2">
          Register a new animal and its monitoring device to your Moorgan system
        </p>
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
                  Configure the Moorgan device that will be attached to the
                  animal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="deviceId"
                      className="flex items-center gap-2"
                    >
                      <HardDrive className="h-4 w-4" />
                      Device ID <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="deviceId"
                        name="deviceId"
                        value={formData.deviceId}
                        onChange={handleInputChange}
                        placeholder="e.g., livestock-1-device"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generateDeviceId}
                        disabled={!formData.name}
                      >
                        Generate
                      </Button>
                    </div>
                    {errors.deviceId && (
                      <p className="text-xs text-red-500">{errors.deviceId}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Unique identifier for the device in Azure IoT Hub
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="deviceType"
                      className="flex items-center gap-2"
                    >
                      <Cpu className="h-4 w-4" />
                      Device Type/Model <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.deviceType}
                      onValueChange={(value) =>
                        handleSelectChange("deviceType", value)
                      }
                    >
                      <SelectTrigger id="deviceType">
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="collar-v1">
                          Moorgan Collar v1.0
                        </SelectItem>
                        <SelectItem value="collar-v2">
                          Moorgan Collar v2.0
                        </SelectItem>
                        <SelectItem value="tag-v1">Moorgan Tag v1.0</SelectItem>
                        <SelectItem value="custom">Custom Device</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.deviceType && (
                      <p className="text-xs text-red-500">
                        {errors.deviceType}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      The model of the monitoring device
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firmware"
                      className="flex items-center gap-2"
                    >
                      Firmware Version <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.firmware}
                      onValueChange={(value) =>
                        handleSelectChange("firmware", value)
                      }
                    >
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
                    {errors.firmware && (
                      <p className="text-xs text-red-500">{errors.firmware}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Device firmware version
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Wifi className="h-4 w-4" />
                      Wi-Fi Configuration (Optional)
                    </Label>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="wifiSsid">Wi-Fi SSID</Label>
                        <Input
                          id="wifiSsid"
                          name="wifiSsid"
                          value={formData.wifiSsid}
                          onChange={handleInputChange}
                          placeholder="Network name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="wifiPassword">Wi-Fi Password</Label>
                        <Input
                          id="wifiPassword"
                          name="wifiPassword"
                          type="password"
                          value={formData.wifiPassword}
                          onChange={handleInputChange}
                          placeholder="Network password"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Only needed if configuring Wi-Fi from the web
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="animal">
            <Card>
              <CardHeader>
                <CardTitle>Animal Information</CardTitle>
                <CardDescription>
                  Enter details about the animal that will wear this device
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Animal name"
                      required
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Unique name or tag ID of the animal
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="species"
                      className="flex items-center gap-2"
                    >
                      <Dna className="h-4 w-4" />
                      Species <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.species}
                      onValueChange={(value) =>
                        handleSelectChange("species", value)
                      }
                    >
                      <SelectTrigger id="species">
                        <SelectValue placeholder="Select species" />
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
                    {errors.species && (
                      <p className="text-xs text-red-500">{errors.species}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Species of the animal
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="breed" className="flex items-center gap-2">
                      <Dna className="h-4 w-4" />
                      Breed <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="breed"
                      name="breed"
                      value={formData.breed}
                      onChange={handleInputChange}
                      placeholder="Animal breed"
                      required
                    />
                    {errors.breed && (
                      <p className="text-xs text-red-500">{errors.breed}</p>
                    )}
                    <p className="text-xs text-gray-500">Breed of the animal</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Gender <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        handleSelectChange("gender", value)
                      }
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-xs text-red-500">{errors.gender}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Gender of the animal
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="birthDate"
                      className="flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      Birth Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.birthDate && (
                      <p className="text-xs text-red-500">{errors.birthDate}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Important for interpreting vitals
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="photoUrl"
                      className="flex items-center gap-2"
                    >
                      <Camera className="h-4 w-4" />
                      Photo URL
                    </Label>
                    <Input
                      id="photoUrl"
                      name="photoUrl"
                      value={formData.photoUrl}
                      onChange={handleInputChange}
                      placeholder="URL to animal photo (optional)"
                    />
                    <p className="text-xs text-gray-500">
                      Optional photo URL for the animal
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="status" className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      Status <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        handleSelectChange("status", value)
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Healthy">Healthy</SelectItem>
                        <SelectItem value="Needs Attention">
                          Needs Attention
                        </SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.status && (
                      <p className="text-xs text-red-500">{errors.status}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Current health status of the animal
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight" className="flex items-center gap-2">
                      <Scale className="h-4 w-4" />
                      Weight (kg) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="Weight in kg"
                      required
                      min="0"
                      step="0.1"
                    />
                    {errors.weight && (
                      <p className="text-xs text-red-500">{errors.weight}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Weight of the animal in kilograms
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="height" className="flex items-center gap-2">
                      <Ruler className="h-4 w-4" />
                      Height (cm) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="Height in cm"
                      required
                      min="0"
                      step="0.1"
                    />
                    {errors.height && (
                      <p className="text-xs text-red-500">{errors.height}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Height of the animal in centimeters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="bodyConditionScore"
                      className="flex items-center gap-2"
                    >
                      <Scale className="h-4 w-4" />
                      Body Condition Score{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bodyConditionScore"
                      name="bodyConditionScore"
                      type="number"
                      value={formData.bodyConditionScore}
                      onChange={handleInputChange}
                      placeholder="Score (1-9)"
                      required
                      min="1"
                      max="9"
                      step="1"
                    />
                    {errors.bodyConditionScore && (
                      <p className="text-xs text-red-500">
                        {errors.bodyConditionScore}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Body condition score (1-9)
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Notes
                  </Label>
                  <Input
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Additional notes (optional)"
                  />
                  <p className="text-xs text-gray-500">
                    Any additional information about the animal
                  </p>
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
                Livestock and device added successfully!
              </motion.div>
            ) : (
              <Button
                type="submit"
                className="bg-[#328E6E] hover:bg-[#67AE6E] text-white"
                disabled={isSubmitting}
              >
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
  );
}
