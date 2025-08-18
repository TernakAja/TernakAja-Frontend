"use client";

import { useState, useEffect } from "react";
import { gettAllNotifDetail } from "@/services/livestockService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  Clock,
  Thermometer,
  Heart,
  Activity,
} from "lucide-react";
import LoadingScreenPage from "../../utility/LoadingScreen";
import { useAuth } from "@/context/auth-context";
import { INotificationData } from "@/types/dataSchema";

export default function NotificationList() {
  const [notifications, setNotifications] = useState<INotificationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<
    "all" | "warning" | "critical" | "unread"
  >("all");
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchNotifications();
    } else {
      setLoading(false);
      setError("User not authenticated");
    }
  }, [user, isAuthenticated]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await gettAllNotifDetail(user!.id);
      if (response.data) {
        setNotifications(response.data);
      } else if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      setError("Failed to fetch notifications");
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    switch (filter) {
      case "warning":
        return notif.notification.type === "warning";
      case "critical":
        return notif.notification.type === "critical";
      case "unread":
        return !notif.notification.read;
      default:
        return true;
    }
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Warning
          </Badge>
        );
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatSensorValue = (value: number | null, unit: string) => {
    return value != null ? `${value}${unit}` : "N/A";
  };

  if (loading) {
    return <LoadingScreenPage />;
  }

  if (error || !isAuthenticated) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {error || "Not authenticated"}
              </h3>
              <p className="text-muted-foreground">
                {error
                  ? "An error occurred while fetching notifications."
                  : "Please log in to view notifications."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Livestock Notifications</h1>
        <p className="text-muted-foreground">
          Monitor alerts and updates for your livestock
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          size="sm"
        >
          All ({notifications.length})
        </Button>
        <Button
          variant={filter === "critical" ? "default" : "outline"}
          onClick={() => setFilter("critical")}
          size="sm"
        >
          Critical (
          {
            notifications.filter((n) => n.notification.type === "critical")
              .length
          }
          )
        </Button>
        <Button
          variant={filter === "warning" ? "default" : "outline"}
          onClick={() => setFilter("warning")}
          size="sm"
        >
          Warning (
          {
            notifications.filter((n) => n.notification.type === "warning")
              .length
          }
          )
        </Button>
        <Button
          variant={filter === "unread" ? "default" : "outline"}
          onClick={() => setFilter("unread")}
          size="sm"
        >
          Unread ({notifications.filter((n) => !n.notification.read).length})
        </Button>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No notifications found
              </h3>
              <p className="text-muted-foreground">
                {filter === "all"
                  ? "You don't have any notifications yet."
                  : `No ${filter} notifications found.`}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((item) => (
            <Card
              key={item.notification.id}
              className={`transition-all hover:shadow-md ${
                !item.notification.read
                  ? "border-l-4 border-l-primary bg-muted/20"
                  : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getNotificationIcon(item.notification.type)}
                    <div>
                      <CardTitle className="text-lg">
                        {item.livestock.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {item.livestock.species} • {item.livestock.breed}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getNotificationBadge(item.notification.type)}
                    {!item.notification.read && (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700"
                      >
                        New
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Notification Message */}
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium">{item.notification.message}</p>
                  </div>

                  {/* Sensor Data */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 p-3 bg-card border rounded-lg">
                      <Thermometer className="h-4 w-4 text-red-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Temperature
                        </p>
                        <p className="font-semibold">
                          {formatSensorValue(
                            item.sensor_data?.temperature ?? null,
                            "°C"
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-card border rounded-lg">
                      <Heart className="h-4 w-4 text-pink-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Heart Rate
                        </p>
                        <p className="font-semibold">
                          {formatSensorValue(
                            item.sensor_data?.heartRate ?? null,
                            " BPM"
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-card border rounded-lg">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">SpO2</p>
                        <p className="font-semibold">
                          {formatSensorValue(
                            item.sensor_data?.sp02 ?? null,
                            "%"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Sent: {formatDate(item.notification.sentAt)}</span>
                    <span>•</span>
                    <span>
                      Recorded:{" "}
                      {item.sensor_data?.timestamp
                        ? formatDate(item.sensor_data.timestamp)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
