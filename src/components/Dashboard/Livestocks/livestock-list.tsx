import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
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
import { useAuth } from "@/context/auth-context";
import LoadingScreenPage from "../../../utility/LoadingScreen";
import { SensorDataWithLivestock } from "@/types/dataSchema";
import { roundToTwoDecimals } from "@/utility/util";
import { useTranslation } from "react-i18next";

export default function LivestockList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [livestock, setLivestock] = useState<SensorDataWithLivestock[]>([]);

  useEffect(() => {
    const fetchLivestock = async () => {
      if (!user) return;

      try {
        const livestockResponse = await getAllLivestockByUser(user.id);
        if (livestockResponse.data) {
          console.log(livestockResponse.data);
          setLivestock(livestockResponse.data);
        }
      } catch (err) {
        console.log(err);
        // setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLivestock();
  }, [user]);

  if (loading) {
    return <LoadingScreenPage />;
  }

  // Filter livestock based on search query and status filter
  const filteredLivestock = livestock.filter((animal) => {
    const matchesSearch =
      animal.livestock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.livestock.species
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || animal.livestock.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t("dashboard.livestock.list.livestockList.header.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("dashboard.livestock.list.livestockList.header.subtitle")}
          </p>
        </div>
        <Button
          className="bg-[#328E6E] hover:bg-[#67AE6E]"
          onClick={() => navigate("/dashboard/livestock/add")}
        >
          <Plus className="mr-2 h-4 w-4" />
          {t("dashboard.livestock.list.livestockList.addLivestockButton")}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="text-sm text-gray-500">
                  {t(
                    "dashboard.livestock.list.livestockList.statusCards.healthy.label"
                  )}
                </div>
                <div className="text-2xl font-bold">
                  {
                    livestock.filter(
                      (animal) => animal.livestock.status === "Healthy"
                    ).length
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* <motion.div
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
                    livestock.filter(
                      (animal) => animal.livestock.status === "Attention"
                    ).length
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div> */}

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
                <div className="text-sm text-gray-500">
                  {t(
                    "dashboard.livestock.list.livestockList.statusCards.unhealthy.label"
                  )}
                </div>
                <div className="text-2xl font-bold">
                  {
                    livestock.filter(
                      (animal) => animal.livestock.status === "Unhealthy"
                    ).length
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
            <CardTitle>
              {t("dashboard.livestock.list.livestockList.inventory.title")}
            </CardTitle>
            <CardDescription>
              {t(
                "dashboard.livestock.list.livestockList.inventory.description"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder={t(
                    "dashboard.livestock.list.livestockList.inventory.searchPlaceholder"
                  )}
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
                      <span>
                        {t(
                          "dashboard.livestock.list.livestockList.inventory.filterButton"
                        )}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {t(
                        "dashboard.livestock.list.livestockList.inventory.filterByStatusLabel"
                      )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                      {t(
                        "dashboard.livestock.list.livestockList.inventory.statusOptions.all"
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setStatusFilter("Healthy")}
                    >
                      {t(
                        "dashboard.livestock.list.livestockList.inventory.statusOptions.healthy"
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setStatusFilter("Unhealthy")}
                    >
                      {t(
                        "dashboard.livestock.list.livestockList.inventory.statusOptions.unhealthy"
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="gap-1">
                  <Download className="h-4 w-4" />
                  <span>
                    {t(
                      "dashboard.livestock.list.livestockList.inventory.exportButton"
                    )}
                  </span>
                </Button>
              </div>
            </div>

            <div className="rounded-md border overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>
                      {t(
                        "dashboard.livestock.list.livestockList.tableHeaders.animal"
                      )}
                    </TableHead>
                    <TableHead>
                      {t(
                        "dashboard.livestock.list.livestockList.tableHeaders.speciesBreed"
                      )}
                    </TableHead>
                    <TableHead>
                      {t(
                        "dashboard.livestock.list.livestockList.tableHeaders.genderAge"
                      )}
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        {t(
                          "dashboard.livestock.list.livestockList.tableHeaders.status"
                        )}
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      {t(
                        "dashboard.livestock.list.livestockList.tableHeaders.location"
                      )}
                    </TableHead>
                    <TableHead>
                      {t(
                        "dashboard.livestock.list.livestockList.tableHeaders.vitalSigns"
                      )}
                    </TableHead>
                    <TableHead>
                      {t(
                        "dashboard.livestock.list.livestockList.tableHeaders.lastUpdated"
                      )}
                    </TableHead>
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
                              src={
                                animal.livestock.photoUrl || "/placeholder.svg"
                              }
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
                            animal.livestock.status === "Healthy"
                              ? "bg-green-500"
                              : animal.livestock.status === "Attention"
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }
                        >
                          {animal.livestock.status === "Healthy"
                            ? t(
                                "dashboard.livestock.list.livestockList.statusEnum.healthy"
                              )
                            : animal.livestock.status === "Attention"
                            ? t(
                                "dashboard.livestock.list.livestockList.statusEnum.attention"
                              )
                            : t(
                                "dashboard.livestock.list.livestockList.statusEnum.unhealthy"
                              )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {t(
                          "dashboard.livestock.list.livestockList.locationText",
                          {
                            farmId: animal.livestock.farmId,
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        {animal.sensor_data ? (
                          <>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4 text-red-500" />
                              <span>
                                {roundToTwoDecimals(
                                  animal.sensor_data.heartRate
                                ) ?? "N/A"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <Thermometer className="h-4 w-4 text-amber-500" />
                              <span>
                                {roundToTwoDecimals(
                                  animal.sensor_data.temperature
                                ) ?? "N/A"}
                              </span>
                            </div>
                          </>
                        ) : (
                          <span>
                            {t(
                              "dashboard.livestock.list.livestockList.noSensorData"
                            )}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {animal.sensor_data?.timestamp
                          ? new Date(
                              animal.sensor_data.timestamp
                            ).toLocaleDateString()
                          : "N/A"}
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
                                {t(
                                  "dashboard.livestock.list.livestockList.tableActions.viewDetails"
                                )}
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {t(
                                "dashboard.livestock.list.livestockList.tableActions.editRecord"
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {t(
                                "dashboard.livestock.list.livestockList.tableActions.healthHistory"
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              {t(
                                "dashboard.livestock.list.livestockList.tableActions.archive"
                              )}
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
