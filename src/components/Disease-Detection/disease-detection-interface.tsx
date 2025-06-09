import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Assuming shadcn/ui components
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Upload,
  UploadCloud,
  Layers,
  Search,
  RefreshCw,
  X,
  Image as ImageIcon,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

// Define the API response structure
interface Prediction {
  probability: number;
  tagId: string;
  tagName: string;
}

interface DiseaseInterface {
  id: string;
  project: string;
  iteration: string;
  created: string;
  predictions: Prediction[];
  hasDisease: boolean;
  disease?: {
    name: string;
    probability: number;
    description: string;
    symptoms: string[];
    recommendations: string[];
  };
}

// Define history item structure
interface HistoryItem {
  id: string;
  thumbnail: string;
  filename: string;
  date: string;
  status: string;
  result: string;
}

export default function DiseaseDetectionInterface() {
  const { t } = useTranslation();

  const DISEASE_DETAILS: Record<
    string,
    {
      name: string;
      description: string;
      symptoms: string[];
      recommendations: string[];
    }
  > = {
    fmd: {
      name: t("detection.diseaseDetails.fmd.name"),
      description: t("detection.diseaseDetails.fmd.description"),
      symptoms: [
        t("detection.diseaseDetails.fmd.symptoms.salivation"),
        t("detection.diseaseDetails.fmd.symptoms.lameness"),
        t("detection.diseaseDetails.fmd.symptoms.fever"),
        t("detection.diseaseDetails.fmd.symptoms.blisters"),
        t("detection.diseaseDetails.fmd.symptoms.reducedMilk"),
      ],
      recommendations: [
        t("detection.diseaseDetails.fmd.recommendations.quarantine"),
        t("detection.diseaseDetails.fmd.recommendations.contactVet"),
        t("detection.diseaseDetails.fmd.recommendations.biosecurity"),
        t("detection.diseaseDetails.fmd.recommendations.vaccinate"),
        t("detection.diseaseDetails.fmd.recommendations.disinfect"),
      ],
    },
    normal: {
      name: t("detection.diseaseDetails.normal.name"),
      description: t("detection.diseaseDetails.normal.description"),
      symptoms: [],
      recommendations: [
        t("detection.diseaseDetails.normal.recommendations.regularMonitoring"),
        t("detection.diseaseDetails.normal.recommendations.nutritionHydration"),
        t(
          "detection.diseaseDetails.normal.recommendations.vaccinationSchedule"
        ),
        t(
          "detection.diseaseDetails.normal.recommendations.physicalExaminations"
        ),
        t("detection.diseaseDetails.normal.recommendations.behavioralChanges"),
      ],
    },
  };

  const [activeTab, setActiveTab] = useState("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [detectionResults, setDetectionResults] =
    useState<DiseaseInterface | null>(null);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validImageTypes.includes(file.type)) {
      console.error(
        "Invalid file type. Please upload a JPEG, PNG, or WEBP image."
      );
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      console.error("File size exceeds 10MB limit.");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        setUploadedImage(e.target.result);
      }
    };
    reader.onerror = () => {
      console.error("Error reading file.");
    };
    reader.readAsDataURL(file);
  };

  const simulateAnalysis = async () => {
    if (!imageFile) {
      console.error("No image file selected.");
      return;
    }

    setIsAnalyzing(true);
    try {
      const endpoint =
        "https://eastus2.api.cognitive.microsoft.com/customvision/v3.0/Prediction/c558bbf0-b2bf-4625-948a-b1dc87dd4de0/classify/iterations/Iteration1/image";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Prediction-Key": "e35e258ae74a4077a66e87d6f652230b",
          "Content-Type": "application/octet-stream",
        },
        body: imageFile,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const result: DiseaseInterface = await response.json();
      // Process predictions to determine disease
      const topPrediction = result.predictions.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
      );
      const hasDisease =
        topPrediction.tagName !== "normal" && topPrediction.probability > 0.5;

      const processedResult: DiseaseInterface = {
        ...result,
        hasDisease,
        disease: DISEASE_DETAILS[topPrediction.tagName]
          ? {
              ...DISEASE_DETAILS[topPrediction.tagName],
              probability: topPrediction.probability,
            }
          : undefined,
      };

      setDetectionResults(processedResult);
      setAnalysisComplete(true);

      // Add to history
      setHistoryItems((prev) => [
        {
          id: result.id,
          thumbnail: uploadedImage || "/placeholder.svg",
          filename: imageFile.name,
          date: new Date(result.created).toLocaleString(),
          status: hasDisease ? "detected" : "healthy",
          result: hasDisease
            ? DISEASE_DETAILS[topPrediction.tagName].name
            : t("detection.history.result.healthy"),
        },
        ...prev,
      ]);
    } catch (error) {
      console.error("Error during analysis:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetDetection = () => {
    setImageFile(null);
    setUploadedImage(null);
    setAnalysisComplete(false);
    setDetectionResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#328E6E] to-[#67AE6E] py-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("detection.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              {t("detection.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="upload" className="text-lg py-3">
                <UploadCloud className="mr-2 h-5 w-5" />
                {t("detection.tabs.uploadDetect")}
              </TabsTrigger>
              <TabsTrigger value="history" className="text-lg py-3">
                <Layers className="mr-2 h-5 w-5" />
                {t("detection.tabs.detectionHistory")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Upload Area */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="p-6 h-full">
                    <div className="flex flex-col h-full">
                      <h2 className="text-2xl font-semibold mb-4 text-[#328E6E]">
                        {t("detection.uploadArea.title")}
                      </h2>

                      {!uploadedImage ? (
                        <div
                          className={`flex-1 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-8 transition-colors ${
                            isDragging
                              ? "border-[#328E6E] bg-[#E1EEBC]/20"
                              : "border-gray-300"
                          }`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          <Upload className="h-16 w-16 text-[#67AE6E] mb-4" />
                          <p className="text-lg text-center mb-2">
                            {t("detection.uploadArea.dragDropText")}
                          </p>
                          <p className="text-gray-500 text-center mb-6">
                            {t("detection.uploadArea.orText")}
                          </p>
                          <Button
                            onClick={triggerFileInput}
                            className="bg-[#328E6E] hover:bg-[#277559] text-white"
                          >
                            {t("detection.uploadArea.browseFilesButton")}
                          </Button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                          />
                          <p className="text-sm text-gray-500 mt-4">
                            {t("detection.uploadArea.supportedFormats")}
                          </p>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col">
                          <div className="relative flex-1 min-h-[300px] mb-4">
                            <img
                              src={uploadedImage || "/placeholder.svg"}
                              alt="Uploaded livestock image"
                              className="object-contain rounded-lg w-full h-full"
                            />
                            <button
                              onClick={resetDetection}
                              className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-gray-700 hover:bg-white"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                          {!isAnalyzing && !analysisComplete && (
                            <Button
                              onClick={simulateAnalysis}
                              className="bg-[#328E6E] hover:bg-[#277559] text-white w-full"
                            >
                              <Search className="mr-2 h-5 w-5" />
                              {t("detection.uploadArea.analyzeImageButton")}
                            </Button>
                          )}
                          {isAnalyzing && (
                            <Button disabled className="w-full">
                              <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                              {t("detection.uploadArea.analyzingButton")}
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>

                {/* Results Area */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="p-6 h-full">
                    <h2 className="text-2xl font-semibold mb-4 text-[#328E6E]">
                      {t("detection.resultsArea.title")}
                    </h2>

                    {!analysisComplete ? (
                      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
                        <ImageIcon className="h-16 w-16 mb-4 text-gray-300" />
                        <p className="text-lg">
                          {isAnalyzing
                            ? t("detection.resultsArea.analyzingMessage")
                            : t("detection.resultsArea.uploadImageMessage")}
                        </p>
                        {isAnalyzing && (
                          <div className="mt-4 w-full max-w-xs bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <motion.div
                              className="h-full bg-[#328E6E]"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 3, ease: "easeInOut" }}
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      detectionResults && (
                        <div className="flex-1">
                          <div
                            className={`p-4 rounded-lg mb-6 flex items-start ${
                              detectionResults.hasDisease
                                ? "bg-red-50 text-red-800 border border-red-200"
                                : "bg-green-50 text-green-800 border border-green-200"
                            }`}
                          >
                            {detectionResults.hasDisease ? (
                              <>
                                <AlertTriangle className="h-6 w-6 mr-3 flex-shrink-0" />
                                <div>
                                  <p className="font-medium">
                                    {t(
                                      "detection.resultsArea.diseaseDetected.title"
                                    )}
                                  </p>
                                  <p>
                                    {t(
                                      "resultsArea.diseaseDetected.description"
                                    )}
                                  </p>
                                </div>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                                <div>
                                  <p className="font-medium">
                                    {t(
                                      "detection.resultsArea.noDiseaseDetected.title"
                                    )}
                                  </p>
                                  <p>
                                    {t(
                                      "resultsArea.noDiseaseDetected.description"
                                    )}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>

                          {detectionResults.hasDisease &&
                            detectionResults.disease && (
                              <div className="space-y-6">
                                <div>
                                  <h3 className="text-xl font-medium text-[#328E6E] mb-2">
                                    {t(
                                      "detection.resultsArea.detectedDisease.title"
                                    )}
                                  </h3>
                                  <div className="bg-[#E1EEBC]/30 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                      <span className="font-semibold text-lg">
                                        {detectionResults.disease.name}
                                      </span>
                                      <span className="bg-[#328E6E] text-white px-2 py-1 rounded text-sm">
                                        {Math.round(
                                          detectionResults.disease.probability *
                                            100
                                        )}
                                        {t(
                                          "detection.resultsArea.probabilityText"
                                        )}
                                      </span>
                                    </div>
                                    <p className="text-gray-700 mb-4">
                                      {detectionResults.disease.description}
                                    </p>

                                    <div className="mb-4">
                                      <h4 className="font-medium text-[#328E6E] mb-2">
                                        {t(
                                          "detection.resultsArea.commonSymptoms.title"
                                        )}
                                      </h4>
                                      <ul className="list-disc pl-5 text-gray-700 grid grid-cols-2 gap-x-4 gap-y-1">
                                        {detectionResults.disease.symptoms.map(
                                          (symptom, index) => (
                                            <li key={index}>{symptom}</li>
                                          )
                                        )}
                                      </ul>
                                    </div>

                                    <div>
                                      <h4 className="font-medium text-[#328E6E] mb-2">
                                        {t(
                                          "detection.resultsArea.recommendations.title"
                                        )}
                                      </h4>
                                      <ul className="list-disc pl-5 text-gray-700">
                                        {detectionResults.disease.recommendations.map(
                                          (rec, index) => (
                                            <li key={index}>{rec}</li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                  <p className="text-gray-500 text-sm">
                                    <strong>
                                      {t("detection.resultsArea.noteBold")}:
                                    </strong>{" "}
                                    {t(
                                      "detection.resultsArea.diseaseDisclaimer"
                                    )}
                                  </p>
                                </div>
                              </div>
                            )}

                          {!detectionResults.hasDisease &&
                            detectionResults.disease && (
                              <div className="space-y-6">
                                <div className="bg-[#E1EEBC]/30 p-4 rounded-lg">
                                  <h3 className="text-xl font-medium text-[#328E6E] mb-2">
                                    {t(
                                      "detection.resultsArea.healthyLivestock.title"
                                    )}
                                  </h3>
                                  <p className="text-gray-700 mb-4">
                                    {detectionResults.disease.description}
                                  </p>

                                  <h4 className="font-medium text-[#328E6E] mb-2">
                                    {t(
                                      "detection.resultsArea.recommendations.title"
                                    )}
                                  </h4>
                                  <ul className="list-disc pl-5 text-gray-700">
                                    {detectionResults.disease.recommendations.map(
                                      (rec, index) => (
                                        <li key={index}>{rec}</li>
                                      )
                                    )}
                                  </ul>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                  <p className="text-gray-500 text-sm">
                                    <strong>
                                      {t("detection.resultsArea.noteBold")}:
                                    </strong>{" "}
                                    {t(
                                      "detection.resultsArea.healthyDisclaimer"
                                    )}
                                  </p>
                                </div>
                              </div>
                            )}
                        </div>
                      )
                    )}
                  </Card>
                </motion.div>
              </div>

              {/* How It Works Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-6 text-[#328E6E]">
                    {t("detection.howItWorks.title")}
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-[#E1EEBC] flex items-center justify-center mb-4">
                        <Upload className="h-8 w-8 text-[#328E6E]" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">
                        {t("detection.howItWorks.step1.title")}
                      </h3>
                      <p className="text-gray-600">
                        {t("detection.howItWorks.step1.description")}
                      </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-[#E1EEBC] flex items-center justify-center mb-4">
                        <Search className="h-8 w-8 text-[#328E6E]" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">
                        {t("detection.howItWorks.step2.title")}
                      </h3>
                      <p className="text-gray-600">
                        {t("detection.howItWorks.step2.description")}
                      </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-[#E1EEBC] flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-[#328E6E]" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">
                        {t("detection.howItWorks.step3.title")}
                      </h3>
                      <p className="text-gray-600">
                        {t("detection.howItWorks.step3.description")}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="history">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-6 text-[#328E6E]">
                    {t("detection.historyTable.title")}
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="py-3 px-4 text-left font-medium text-gray-600">
                            {t("detection.historyTable.headers.image")}
                          </th>
                          <th className="py-3 px-4 text-left font-medium text-gray-600">
                            {t("detection.historyTable.headers.filename")}
                          </th>
                          <th className="py-3 px-4 text-left font-medium text-gray-600">
                            {t("detection.historyTable.headers.date")}
                          </th>
                          <th className="py-3 px-4 text-left font-medium text-gray-600">
                            {t("detection.historyTable.headers.result")}
                          </th>
                          <th className="py-3 px-4 text-left font-medium text-gray-600">
                            {t("detection.historyTable.headers.actions")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyItems.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4">
                              <div className="w-12 h-12 relative rounded overflow-hidden">
                                <img
                                  src={item.thumbnail}
                                  alt={item.filename}
                                  className="object-cover"
                                />
                              </div>
                            </td>
                            <td className="py-3 px-4 font-medium">
                              {item.filename}
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {item.date}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded text-sm ${
                                  item.status === "detected"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {item.result}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  {t("detection.historyTable.actions.view")}
                                </Button>
                                <Button variant="outline" size="sm">
                                  {t("detection.historyTable.actions.download")}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {historyItems.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>{t("detection.historyTable.noHistory")}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Tips and Education Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#E1EEBC]/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-[#328E6E]">
              {t("detection.tipsEducation.title")}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-[#67AE6E]">
                  {t("detection.tipsEducation.sanitation.title")}
                </h3>
                <p className="text-gray-700">
                  {t("detection.tipsEducation.sanitation.description")}
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-[#67AE6E]">
                  {t("detection.tipsEducation.vaccination.title")}
                </h3>
                <p className="text-gray-700">
                  {t("detection.tipsEducation.vaccination.description")}
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-[#67AE6E]">
                  {t("detection.tipsEducation.biosecurity.title")}
                </h3>
                <p className="text-gray-700">
                  {t("detection.tipsEducation.biosecurity.description")}
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-[#67AE6E]">
                  {t("detection.tipsEducation.nutrition.title")}
                </h3>
                <p className="text-gray-700">
                  {t("detection.tipsEducation.nutrition.description")}
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-[#67AE6E]">
                  {t("detection.tipsEducation.monitoring.title")}
                </h3>
                <p className="text-gray-700">
                  {t("detection.tipsEducation.monitoring.description")}
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-[#67AE6E]">
                  {t("detection.tipsEducation.guidance.title")}
                </h3>
                <p className="text-gray-700">
                  {t("detection.tipsEducation.guidance.description")}
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
