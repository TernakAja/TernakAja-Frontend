import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
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
import { useTranslation } from "react-i18next";

export default function AddLivestockForm() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    deviceId: "", // New field for Device ID
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
        Number(formData.deviceId),
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
      toast.error(t("dashboard.livestock.add.notifications.error.submission"), {
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
        <h1 className="text-3xl font-bold text-gray-900">
          {t("dashboard.livestock.add.page.title")}
        </h1>
        <p className="text-gray-600 mt-2">
          {t("dashboard.livestock.add.page.description")}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="device" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="device">
              {t("dashboard.livestock.add.tabs.device")}
            </TabsTrigger>
            <TabsTrigger value="animal">
              {t("dashboard.livestock.add.tabs.animal")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="device">
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("dashboard.livestock.add.deviceForm.title")}
                </CardTitle>
                <CardDescription>
                  {t("dashboard.livestock.add.deviceForm.description")}
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
                      {t(
                        "dashboard.livestock.add.deviceForm.fields.deviceId.label"
                      )}{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="deviceId"
                        name="deviceId"
                        value={formData.deviceId}
                        onChange={handleInputChange}
                        placeholder={t(
                          "dashboard.livestock.add.deviceForm.fields.deviceId.placeholder"
                        )}
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generateDeviceId}
                        disabled={!formData.name}
                      >
                        {t(
                          "dashboard.livestock.add.deviceForm.fields.deviceId.generate"
                        )}
                      </Button>
                    </div>
                    {errors.deviceId && (
                      <p className="text-xs text-red-500">{errors.deviceId}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {t(
                        "dashboard.livestock.add.deviceForm.fields.deviceId.description"
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="animal">
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("dashboard.livestock.add.animalForm.title")}
                </CardTitle>
                <CardDescription>
                  {t("dashboard.livestock.add.animalForm.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t(
                        "dashboard.livestock.add.animalForm.fields.name.label"
                      )}{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t(
                        "dashboard.livestock.add.animalForm.fields.name.placeholder"
                      )}
                      required
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {t(
                        "dashboard.livestock.add.animalForm.fields.name.description"
                      )}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="species"
                      className="flex items-center gap-2"
                    >
                      <Dna className="h-4 w-4" />
                      {t(
                        "dashboard.livestock.add.animalForm.fields.species.label"
                      )}{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.species}
                      onValueChange={(value) =>
                        handleSelectChange("species", value)
                      }
                    >
                      <SelectTrigger id="species">
                        <SelectValue
                          placeholder={t(
                            "dashboard.livestock.add.animalForm.fields.species.placeholder"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cow">
                          {t(
                            "dashboard.livestock.add.animalForm.fields.species.options.cow"
                          )}
                        </SelectItem>
                        <SelectItem value="goat">
                          {t(
                            "dashboard.livestock.add.animalForm.fields.species.options.goat"
                          )}
                        </SelectItem>
                        <SelectItem value="sheep">
                          {t(
                            "dashboard.livestock.add.animalForm.fields.species.options.sheep"
                          )}
                        </SelectItem>
                        <SelectItem value="pig">
                          {t(
                            "dashboard.livestock.add.animalForm.fields.species.options.pig"
                          )}
                        </SelectItem>
                        <SelectItem value="horse">
                          {t(
                            "dashboard.livestock.add.animalForm.fields.species.options.horse"
                          )}
                        </SelectItem>
                        <SelectItem value="other">
                          {t(
                            "dashboard.livestock.add.animalForm.fields.species.options.other"
                          )}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.species && (
                      <p className="text-xs text-red-500">{errors.species}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {t(
                        "dashboard.livestock.add.animalForm.fields.species.description"
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="breed" className="flex items-center gap-2">
                      <Dna className="h-4 w-4" />
                      {t(
                        "dashboard.livestock.add.animalForm.fields.breed.label"
                      )}{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="breed"
                      name="breed"
                      value={formData.breed}
                      onChange={handleInputChange}
                      placeholder={t(
                        "dashboard.livestock.add.animalForm.fields.breed.placeholder"
                      )}
                      required
                    />
                    {errors.breed && (
                      <p className="text-xs text-red-500">{errors.breed}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {t(
                        "dashboard.livestock.add.animalForm.fields.breed.description"
                      )}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t(
                        "dashboard.livestock.add.animalForm.fields.gender.label"
                      )}{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        handleSelectChange("gender", value)
                      }
                    >
                      <SelectTrigger id="gender">
                        <SelectValue
                          placeholder={t(
                            "dashboard.livestock.add.animalForm.fields.gender.placeholder"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">
                          {t(
                            "dashboard.livestock.add.animalForm.fields.gender.options.male"
                          )}
                        </SelectItem>
                        <SelectItem value="female">
                          {t(
                            "dashboard.livestock.add.animalForm.fields.gender.options.female"
                          )}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-xs text-red-500">{errors.gender}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {t(
                        "dashboard.livestock.add.animalForm.fields.gender.description"
                      )}
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
                      {t(
                        "dashboard.livestock.add.animalForm.fields.birthDate.label"
                      )}{" "}
                      <span className="text-red-500">*</span>
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
                      {t(
                        "dashboard.livestock.add.animalForm.fields.birthDate.description"
                      )}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="photoUrl"
                      className="flex items-center gap-2"
                    >
                      <Camera className="h-4 w-4" />
                      {t(
                        "dashboard.livestock.add.animalForm.fields.photoUrl.label"
                      )}
                    </Label>
                    <Input
                      id="photoUrl"
                      name="photoUrl"
                      value={formData.photoUrl}
                      onChange={handleInputChange}
                      placeholder={t(
                        "dashboard.livestock.add.animalForm.fields.photoUrl.placeholder"
                      )}
                    />
                    <p className="text-xs text-gray-500">
                      {t(
                        "dashboard.livestock.add.animalForm.fields.photoUrl.description"
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="status" className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      {t(
                        "dashboard.livestock.add.animalForm.fields.status.label"
                      )}{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        handleSelectChange("status", value)
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue
                          placeholder={t(
                            "dashboard.livestock.add.animalForm.fields.status.placeholder"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="healthy">
                          {t(
                            "dashboard.livestock.add.animalForm.fields.status.options.healthy"
                          )}
                        </SelectItem>
                        <SelectItem value="unhealthy">
                          {t(
                            "dashboard.livestock.add.animalForm.fields.status.options.unhealthy"
                          )}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.status && (
                      <p className="text-xs text-red-500">{errors.status}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {t(
                        "dashboard.livestock.add.animalForm.fields.status.description"
                      )}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight" className="flex items-center gap-2">
                      <Scale className="h-4 w-4" />
                      {t(
                        "dashboard.livestock.add.animalForm.fields.weight.label"
                      )}{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder={t(
                        "dashboard.livestock.add.animalForm.fields.weight.placeholder"
                      )}
                      required
                      min="0"
                      step="0.1"
                    />
                    {errors.weight && (
                      <p className="text-xs text-red-500">{errors.weight}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {t(
                        "dashboard.livestock.add.animalForm.fields.weight.description"
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="height" className="flex items-center gap-2">
                      <Ruler className="h-4 w-4" />
                      {t(
                        "dashboard.livestock.add.animalForm.fields.height.label"
                      )}{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder={t(
                        "dashboard.livestock.add.animalForm.fields.height.placeholder"
                      )}
                      required
                      min="0"
                      step="0.1"
                    />
                    {errors.height && (
                      <p className="text-xs text-red-500">{errors.height}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {t(
                        "dashboard.livestock.add.animalForm.fields.height.description"
                      )}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="bodyConditionScore"
                      className="flex items-center gap-2"
                    >
                      <Scale className="h-4 w-4" />
                      {t(
                        "dashboard.livestock.add.animalForm.fields.bcs.label"
                      )}{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bodyConditionScore"
                      name="bodyConditionScore"
                      type="number"
                      value={formData.bodyConditionScore}
                      onChange={handleInputChange}
                      placeholder={t(
                        "dashboard.livestock.add.animalForm.fields.bcs.placeholder"
                      )}
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
                      {t(
                        "dashboard.livestock.add.animalForm.fields.bcs.description"
                      )}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {t("dashboard.livestock.add.animalForm.fields.notes.label")}
                  </Label>
                  <Input
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder={t(
                      "dashboard.livestock.add.animalForm.fields.notes.placeholder"
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    {t(
                      "dashboard.livestock.add.animalForm.fields.notes.description"
                    )}
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
                {t("dashboard.livestock.add.notifications.success")}
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
                    {t("dashboard.livestock.add.buttons.submitting")}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {t("dashboard.livestock.add.buttons.submit")}
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
