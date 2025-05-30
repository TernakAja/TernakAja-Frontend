import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpDown,
  CheckCircle2,
  ChevronDown,
  Download,
  Filter,
  Heart,
  MoreHorizontal,
  Plus,
  Search,
  Thermometer,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { getAllLivestockByUser } from "@/services/livestockService";
import { SensorDataWithLivestockAndAnomaly } from "@/types/dataSchema";
import { useAuth } from "@/context/auth-context";
import LoadingScreenPage from "../../../utility/LoadingScreen";

export default function LivestockList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [livestock, setLivestock] = useState<SensorDataWithLivestockAndAnomaly[]>([])

  useEffect(() => {
    const fetchLivestock = async () => {
      try {
        if(user){
          const response = await getAllLivestockByUser(user.id);
          console.log(response);
          
          if(response.data){
            setLivestock(response.data)
          }

        }
        // if (response.success) {
        //   setLivestock(response.data);
        // } else {
        //   setError(response.message || "Failed to fetch livestock.");
        // }
      } catch (err) {
        console.log(err);
        // setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLivestock();
  }, []);

  // Sample livestock data
  // const livestock: SensorDataWithLivestockAndAnomaly[] = [
  //   {
  //     sd_id: 101,
  //     sd_livestock_id: 1,
  //     sd_temperature: 101.5,
  //     sd_heart_rate: 65,
  //     sd_motion_level: 3,
  //     sd_timestamp: "2025-05-28T14:30:00Z",
  
  //     l_id: 1,
  //     l_farm_id: 10,
  //     l_user_id: 100,
  //     l_name: "Bella",
  //     l_species: "Cattle",
  //     l_breed: "Holstein",
  //     l_gender: "Female",
  //     l_birth_date: "2019-04-15",
  //     l_photo_url: "/images/bella.jpg",
  //     l_status: "healthy",
  //     l_height: 140,
  //     l_weight: 600,
  //     l_body_condition_score: 3,
  //     l_notes: "No health issues.",
  //     l_recorded_at: "2025-05-28T14:00:00Z",
  //     l_created_at: "2019-04-16T09:00:00Z",
  //     l_updated_at: "2025-05-28T14:15:00Z",
  
  //     a_id: 0,
  //     a_livestock_id: 1,
  //     a_type: "",
  //     a_severity: "",
  //     a_notes: "",
  //     a_detected_at: "",
  //     a_resolved: true,
  //   },
  //   {
  //     sd_id: 102,
  //     sd_livestock_id: 2,
  //     sd_temperature: 102.8,
  //     sd_heart_rate: 72,
  //     sd_motion_level: 5,
  //     sd_timestamp: "2025-05-28T14:32:00Z",
  
  //     l_id: 2,
  //     l_farm_id: 10,
  //     l_user_id: 101,
  //     l_name: "Max",
  //     l_species: "Cattle",
  //     l_breed: "Angus",
  //     l_gender: "Male",
  //     l_birth_date: "2020-06-10",
  //     l_photo_url: "/images/max.jpg",
  //     l_status: "attention",
  //     l_height: 145,
  //     l_weight: 650,
  //     l_body_condition_score: 2.5,
  //     l_notes: "Slight fever detected.",
  //     l_recorded_at: "2025-05-28T14:05:00Z",
  //     l_created_at: "2020-06-11T10:00:00Z",
  //     l_updated_at: "2025-05-28T14:20:00Z",
  
  //     a_id: 201,
  //     a_livestock_id: 2,
  //     a_type: "Fever",
  //     a_severity: "medium",
  //     a_notes: "Monitor temperature closely, possible infection.",
  //     a_detected_at: "2025-05-28T14:25:00Z",
  //     a_resolved: false,
  //   },
  //   {
  //     sd_id: 103,
  //     sd_livestock_id: 3,
  //     sd_temperature: 101.3,
  //     sd_heart_rate: 64,
  //     sd_motion_level: 2,
  //     sd_timestamp: "2025-05-28T14:40:00Z",
  
  //     l_id: 3,
  //     l_farm_id: 10,
  //     l_user_id: 102,
  //     l_name: "Daisy",
  //     l_species: "Cattle",
  //     l_breed: "Jersey",
  //     l_gender: "Female",
  //     l_birth_date: "2018-09-21",
  //     l_photo_url: "/images/daisy.jpg",
  //     l_status: "healthy",
  //     l_height: 135,
  //     l_weight: 580,
  //     l_body_condition_score: 3.2,
  //     l_notes: "Healthy and active.",
  //     l_recorded_at: "2025-05-28T14:10:00Z",
  //     l_created_at: "2018-09-22T08:00:00Z",
  //     l_updated_at: "2025-05-28T14:30:00Z",
  
  //     a_id: 0,
  //     a_livestock_id: 3,
  //     a_type: "",
  //     a_severity: "",
  //     a_notes: "",
  //     a_detected_at: "",
  //     a_resolved: true,
  //   }
  // ];
  

  // const livestock = [
  //   {
  //     id: "1",
  //     name: "Bella",
  //     tag: "HOL-1234",
  //     species: "Cattle",
  //     breed: "Holstein",
  //     gender: "Female",
  //     age: "4 years",
  //     status: "healthy",
  //     location: "Barn A",
  //     heartRate: "65 BPM",
  //     temperature: "101.5°F",
  //     lastUpdated: "10 minutes ago",
  //     image: "/placeholder.svg?height=40&width=40",
  //   },
  //   {
  //     id: "2",
  //     name: "Max",
  //     tag: "ANG-5678",
  //     species: "Cattle",
  //     breed: "Angus",
  //     gender: "Male",
  //     age: "3 years",
  //     status: "attention",
  //     location: "Barn B",
  //     heartRate: "72 BPM",
  //     temperature: "102.8°F",
  //     lastUpdated: "25 minutes ago",
  //     image: "/placeholder.svg?height=40&width=40",
  //   },
  //   {
  //     id: "3",
  //     name: "Daisy",
  //     tag: "JER-9012",
  //     species: "Cattle",
  //     breed: "Jersey",
  //     gender: "Female",
  //     age: "5 years",
  //     status: "healthy",
  //     location: "Barn A",
  //     heartRate: "64 BPM",
  //     temperature: "101.3°F",
  //     lastUpdated: "1 hour ago",
  //     image: "/placeholder.svg?height=40&width=40",
  //   },
  //   {
  //     id: "4",
  //     name: "Rocky",
  //     tag: "HOL-3456",
  //     species: "Cattle",
  //     breed: "Holstein",
  //     gender: "Male",
  //     age: "2 years",
  //     status: "critical",
  //     location: "Barn C",
  //     heartRate: "85 BPM",
  //     temperature: "104.2°F",
  //     lastUpdated: "5 minutes ago",
  //     image: "/placeholder.svg?height=40&width=40",
  //   },
  //   {
  //     id: "5",
  //     name: "Lucy",
  //     tag: "MER-7890",
  //     species: "Sheep",
  //     breed: "Merino",
  //     gender: "Female",
  //     age: "3 years",
  //     status: "healthy",
  //     location: "Pen 1",
  //     heartRate: "75 BPM",
  //     temperature: "102.1°F",
  //     lastUpdated: "30 minutes ago",
  //     image: "/placeholder.svg?height=40&width=40",
  //   },
  //   {
  //     id: "6",
  //     name: "Charlie",
  //     tag: "NUB-1357",
  //     species: "Goat",
  //     breed: "Nubian",
  //     gender: "Male",
  //     age: "2 years",
  //     status: "attention",
  //     location: "Pen 2",
  //     heartRate: "80 BPM",
  //     temperature: "103.0°F",
  //     lastUpdated: "45 minutes ago",
  //     image: "/placeholder.svg?height=40&width=40",
  //   },
  //   {
  //     id: "7",
  //     name: "Wilbur",
  //     tag: "BER-2468",
  //     species: "Pig",
  //     breed: "Berkshire",
  //     gender: "Male",
  //     age: "1 year",
  //     status: "healthy",
  //     location: "Pen 3",
  //     heartRate: "70 BPM",
  //     temperature: "101.8°F",
  //     lastUpdated: "2 hours ago",
  //     image: "/placeholder.svg?height=40&width=40",
  //   },
  // ];

  if (loading) {
    return <LoadingScreenPage />;
  }

  // Filter livestock based on search query and status filter
  const filteredLivestock = livestock.filter((animal) => {
    const matchesSearch =
      animal.livestock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.livestock.species.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || animal.livestock.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Livestock Management
          </h1>
          <p className="text-muted-foreground">
            View and manage all your livestock in one place.
          </p>
        </div>
        <Button
          className="bg-[#328E6E] hover:bg-[#67AE6E]"
          onClick={() => navigate("/dashboard/livestock/add")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Livestock
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Healthy</div>
                <div className="text-2xl font-bold">
                  {
                    livestock.filter((animal) => animal.livestock.status === "healthy")
                      .length
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Needs Attention</div>
                <div className="text-2xl font-bold">
                  {
                    livestock.filter((animal) => animal.livestock.status === "attention")
                      .length
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-red-100 p-2 rounded-full">
                <Heart className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Critical</div>
                <div className="text-2xl font-bold">
                  {
                    livestock.filter((animal) => animal.livestock.status === "critical")
                      .length
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Livestock Inventory</CardTitle>
            <CardDescription>
              Manage and monitor your livestock records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search by name, tag, or breed..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setStatusFilter("healthy")}
                    >
                      Healthy
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setStatusFilter("attention")}
                    >
                      Needs Attention
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setStatusFilter("critical")}
                    >
                      Critical
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="gap-1">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Animal</TableHead>
                    <TableHead>Species/Breed</TableHead>
                    <TableHead>Gender/Age</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        Status
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Vital Signs</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLivestock.map((animal) => (
                    <TableRow
                      key={animal.livestock.id}
                      onClick={() =>
                        navigate(`/dashboard/livestock/${animal.livestock.id}`)
                      }
                    >
                      <TableCell className="font-medium">
                        {animal.livestock.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={animal.livestock.photoUrl || "/placeholder.svg"}
                              alt={animal.livestock.name}
                            />
                            <AvatarFallback>
                              {animal.livestock.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <a
                              href={`/dashboard/livestock/${animal.livestock.id}`}
                              className="font-medium text-blue-600 hover:underline"
                            >
                              {animal.livestock.name}
                            </a>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{animal.livestock.species}</div>
                        <div className="text-gray-500 text-sm">
                          {animal.livestock.breed}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{animal.livestock.gender}</div>
                        <div className="text-gray-500 text-sm">
                          {animal.livestock.birthDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            animal.livestock.status === "healthy"
                              ? "bg-green-500"
                              : animal.livestock.status === "attention"
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }
                        >
                          {animal.livestock.status === "healthy"
                            ? "Healthy"
                            : animal.livestock.status === "attention"
                            ? "Needs Attention"
                            : "Critical"}
                        </Badge>
                      </TableCell>
                      <TableCell>{animal.livestock.farmId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span>{animal.sensor_data.heartRate}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Thermometer className="h-4 w-4 text-amber-500" />
                          <span>{animal.sensor_data.temperature}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {animal.sensor_data.timestamp}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <a
                                href={`/dashboard/livestock/${animal.livestock.id}`}
                                className="w-full"
                              >
                                View Details
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Record</DropdownMenuItem>
                            <DropdownMenuItem>Health History</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
