import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Heart,
  Bell,
  Zap,
  Activity,
  MessageSquare,
  Shield,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Feature data with icons
const features = [
  {
    id: 1,
    name: "Real-time Vital Monitoring",
    description:
      "Track heart rate, temperature, and activity levels of your livestock in real-time through smart collars.",
    category: "Monitoring",
    tags: ["Essential"],
    icon: Heart,
    color: "#328E6E",
    link: "/dashboard",
  },
  {
    id: 2,
    name: "Disease Detection",
    description:
      "AI-powered image analysis to detect common livestock diseases from photos and alert farmers to potential health issues.",
    category: "Health",
    tags: ["Premium"],
    icon: Shield,
    color: "#328E6E",
    link: "/disease-detection",
  },
  // {
  //   id: 3,
  //   name: "Health Analytics Dashboard",
  //   description:
  //     "Comprehensive dashboard showing historical health data, trends, and anomalies for individual animals and herds.",
  //   category: "Analytics",
  //   tags: ["Essential"],
  //   icon: BarChart2,
  //   color: "#67AE6E",
  //   link: "/dashboard/livestock",
  // },
  // {
  //   id: 4,
  //   name: "Weather-based Recommendations",
  //   description:
  //     "Receive custom care recommendations based on current and forecasted weather conditions in your area.",
  //   category: "Weather",
  //   tags: ["Premium"],
  //   icon: CloudRain,
  //   color: "#67AE6E",
  //   link: "/dashboard/weather",
  // },
  // {
  //   id: 5,
  //   name: "Feeding Management",
  //   description: "Feeding your livestocks just by clicking one button",
  //   category: "Monitoring",
  //   tags: ["Essential"],
  //   icon: Map,
  //   color: "#90C67C",
  //   link: "/dashboard/feeding",
  // },
  // {
  //   id: 6,
  //   name: "Grazing Analytics",
  //   description:
  //     "Analyze grazing patterns and optimize pasture rotation for improved land management and livestock nutrition.",
  //   category: "Analytics",
  //   tags: ["Advanced"],
  //   icon: Compass,
  //   color: "#90C67C",
  //   link: "/dashboard/analytics",
  // },
  {
    id: 7,
    name: "Health Alerts & Notifications",
    description:
      "Instant alerts when vital signs indicate potential health issues or when animals move outside designated areas.",
    category: "Health",
    tags: ["Essential"],
    icon: Bell,
    color: "#328E6E",
    link: "/dashboard/message",
  },
  {
    id: 8,
    name: "Farchestra [Chatbot]",
    description: "TernakAja Personal Chatbot",
    category: "Communication",
    tags: ["Advanced"],
    icon: Bot,
    color: "#328E6E",
    link: "/chatbot",
  },
  // {
  //   id: 9,
  //   name: "Smart Collar Management",
  //   description:
  //     "Manage device firmware, battery status, and connectivity of your livestock monitoring collars.",
  //   category: "Management",
  //   tags: ["Essential"],
  //   icon: WifiIcon,
  //   color: "#67AE6E",
  //   link: "/dashboard/livestock/add",
  // },
  // {
  //   id: 10,
  //   name: "TernakAja Marketplace",
  //   description:
  //     "Searching or wants to sell livestock? Sell it at TernakAja  Marketplace",
  //   category: "Communication",
  //   tags: ["Essential"],
  //   icon: Upload,
  //   color: "#90C67C",
  //   link: "/",
  // },
  {
    id: 11,
    name: "Article",
    description: "Wants more insight? Just read from these articles",
    category: "Communication",
    tags: ["Essential"],
    icon: Zap,
    color: "#328E6E",
    link: "/",
  },
  {
    id: 12,
    name: "Support Contact",
    description: "Need helps? Just contact TernakAja Support Service!",
    category: "Communication",
    tags: ["Essential"],
    icon: Activity,
    color: "#328E6E",
    link: "/",
  },
  {
    id: 13,
    name: "Community Forum",
    description:
      "Connect with other livestock farmers to share experiences, ask questions, and exchange knowledge.",
    category: "Communication",
    tags: ["Essential"],
    icon: MessageSquare,
    color: "#67AE6E",
    link: "/community",
  },
];

// Feature categories
const categories = [
  "All Categories",
  "Monitoring",
  "Health",
  "Analytics",
  "Management",
  "Weather",
  "Security",
  "Communication",
  "Mobile App",
];

// Feature tags
// const featureTags = ["Essential", "Premium", "Advanced", "New", "Coming Soon"];

export default function AllFeatures() {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredFeatures, setFilteredFeatures] = useState(features);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const featuresPerPage = 9;

  // Apply filters when search, category, or tags change
  useEffect(() => {
    let result = features;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (feature) =>
          feature.name.toLowerCase().includes(query) ||
          feature.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory !== "All Categories") {
      result = result.filter(
        (feature) => feature.category === selectedCategory
      );
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      result = result.filter((feature) =>
        feature.tags.some((tag) => selectedTags.includes(tag))
      );
    }

    setFilteredFeatures(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory, selectedTags]);

  // Calculate pagination
  const indexOfLastFeature = currentPage * featuresPerPage;
  const indexOfFirstFeature = indexOfLastFeature - featuresPerPage;
  const currentFeatures = filteredFeatures.slice(
    indexOfFirstFeature,
    indexOfLastFeature
  );
  const totalPages = Math.ceil(filteredFeatures.length / featuresPerPage);

  // // Tag toggle handler
  // const toggleTag = (tag: string) => {
  //   setSelectedTags((prev) =>
  //     prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
  //   );
  // };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedTags([]);
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
              TernakAja Features
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Discover all the powerful tools and capabilities that make
              TernakAja the ultimate livestock management platform
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter Bar */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-6 rounded-lg border-gray-300 focus:border-[#328E6E] focus:ring focus:ring-[#328E6E]/20"
                />
              </div>

              <Button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                variant="outline"
                className="md:w-auto py-6 flex items-center gap-2 border-gray-300"
              >
                <Filter className="h-5 w-5" />
                Filters
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {(searchQuery ||
                selectedCategory !== "All Categories" ||
                selectedTags.length > 0) && (
                <Button
                  onClick={resetFilters}
                  variant="ghost"
                  className="md:w-auto py-6"
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Expanded Filter Options */}
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 bg-gray-50 p-6 rounded-lg border border-gray-200"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <button
                            onClick={() => setSelectedCategory(category)}
                            className={`flex items-center text-left w-full px-3 py-2 rounded-md transition-colors ${
                              selectedCategory === category
                                ? "bg-[#328E6E] text-white"
                                : "hover:bg-gray-200 text-gray-700"
                            }`}
                          >
                            <ChevronRight
                              className={`h-4 w-4 mr-2 ${
                                selectedCategory === category
                                  ? "text-white"
                                  : "text-[#328E6E]"
                              }`}
                            />
                            {category}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">
                      Feature Type
                    </h3>
                    {/* <div className="flex flex-wrap gap-2">
                      {featureTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-2 rounded-md transition-colors ${
                            selectedTags.includes(tag)
                              ? "bg-[#328E6E] text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div> */}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Feature Results Summary */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#328E6E]">
              {filteredFeatures.length}{" "}
              {filteredFeatures.length === 1 ? "Feature" : "Features"}
            </h2>

            <div className="text-sm text-gray-500">
              Showing{" "}
              {Math.min(filteredFeatures.length, indexOfFirstFeature + 1)}-
              {Math.min(indexOfLastFeature, filteredFeatures.length)} of{" "}
              {filteredFeatures.length}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {currentFeatures.map((feature, index) => {
              const IconComponent = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${feature.color}20` }}
                        >
                          <IconComponent
                            className="h-6 w-6"
                            style={{ color: feature.color }}
                          />
                        </div>

                        <div className="flex gap-2">
                          {/* {feature.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className={`${
                                tag === "Coming Soon"
                                  ? "border-orange-500 text-orange-600"
                                  : tag === "New"
                                  ? "border-blue-500 text-blue-600"
                                  : tag === "Premium"
                                  ? "border-purple-500 text-purple-600"
                                  : tag === "Advanced"
                                  ? "border-yellow-500 text-yellow-600"
                                  : "border-green-500 text-green-600"
                              }`}
                            >
                              {tag}
                            </Badge>
                          ))} */}
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        {feature.name}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-1">
                        {feature.description}
                      </p>

                      <div className="mt-auto">
                        <div className="flex justify-between items-center">
                          <Badge className="bg-[#E1EEBC] text-[#328E6E] hover:bg-[#E1EEBC]">
                            {feature.category}
                          </Badge>

                          <a href={feature.link}>
                            <Button variant="link" className="text-[#328E6E]">
                              Learn more
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* No Results Message */}
          {filteredFeatures.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4 text-gray-400">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                No matching features found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria to find what you're
                looking for.
              </p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="h-10 w-10 p-0"
                >
                  <span className="sr-only">Previous Page</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      className={`h-10 w-10 p-0 ${
                        currentPage === page
                          ? "bg-[#328E6E] hover:bg-[#277559]"
                          : ""
                      }`}
                    >
                      {page}
                    </Button>
                  )
                )}

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="h-10 w-10 p-0"
                >
                  <span className="sr-only">Next Page</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Feature Categories Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#E1EEBC]/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#328E6E]">
            Explore By Category
          </h2>

          <Tabs defaultValue="monitoring" className="w-full">
            <TabsList className="flex w-full max-w-4xl mx-auto mb-8 overflow-x-auto p-1 bg-white border rounded-lg">
              <TabsTrigger value="monitoring" className="flex-1 py-3">
                Monitoring
              </TabsTrigger>
              <TabsTrigger value="health" className="flex-1 py-3">
                Health
              </TabsTrigger>
              <TabsTrigger value="communication" className="flex-1 py-3">
                Communication
              </TabsTrigger>
            </TabsList>

            {["monitoring", "health", "communication"].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-3 gap-6">
                  {features
                    .filter(
                      (feature) => feature.category.toLowerCase() === category
                    )
                    .slice(0, 3)
                    .map((feature, index) => {
                      const IconComponent = feature.icon;

                      return (
                        <motion.div
                          key={feature.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                            <div className="p-6 flex-1 flex flex-col">
                              <div className="flex items-start justify-between mb-4">
                                <div
                                  className="p-2 rounded-lg"
                                  style={{
                                    backgroundColor: `${feature.color}20`,
                                  }}
                                >
                                  <IconComponent
                                    className="h-6 w-6"
                                    style={{ color: feature.color }}
                                  />
                                </div>

                                {/* <div className="flex gap-2">
                                  {feature.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="outline"
                                      className={`${
                                        tag === "Coming Soon"
                                          ? "border-orange-500 text-orange-600"
                                          : tag === "New"
                                          ? "border-blue-500 text-blue-600"
                                          : tag === "Premium"
                                          ? "border-purple-500 text-purple-600"
                                          : tag === "Advanced"
                                          ? "border-yellow-500 text-yellow-600"
                                          : "border-green-500 text-green-600"
                                      }`}
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div> */}
                              </div>

                              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                {feature.name}
                              </h3>
                              <p className="text-gray-600 flex-1">
                                {feature.description}
                              </p>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                </div>

                <div className="text-center mt-8">
                  <Button
                    onClick={() => {
                      setSelectedCategory(
                        category.charAt(0).toUpperCase() + category.slice(1)
                      );
                      setIsFilterOpen(true);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-[#328E6E] hover:bg-[#277559] text-white"
                  >
                    View All{" "}
                    {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                    Features
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}

      {/* <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#67AE6E] to-[#328E6E] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Livestock Management?</h2>
            <p className="text-xl mb-8">
              Join thousands of farmers using TernakAja's comprehensive suite of features to improve livestock health and
              productivity
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-white text-[#328E6E] hover:bg-gray-100 text-lg px-8 py-6">Get Started</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                Book a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
}
