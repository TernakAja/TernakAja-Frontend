// export interface LivestockSummaryItem {
//   title: string;
//   value: number;
// }

import { Livestock, SensorData } from "./schema";

export interface LivestockStatusCounts {
  total: string;
  healthy: string;
  needs_attention: string;
  critical: string;
}

export interface SpeciesCount {
  species: string;
  total: number;
}

export interface DailySensorStats {
  day: string;
  avg_temperature: number;
  avg_heart_rate: string;
}

export interface NotificationWithLivestockFlat {
  id: number;
  livestock_id: number;
  message: string;
  type: string;
  read: boolean;
  sent_at: string;
  l_id: number;
  l_name: string;
  l_species: string;
}

export interface SensorDataWithLivestock {
  sensor_data: SensorData;
  livestock: Livestock;
}

interface INotification {
  id: number;
  userId: number;
  livestockId: number;
  message: string;
  type: string; // Or string if there can be other types
  read: boolean;
  sentAt: string;
}

export interface INotificationData {
  notification: INotification;
  livestock: Livestock;
  sensor_data: SensorData;
}

interface SensorData2 {
  livestockId: number;
  temperature: number;
  heartRate: number;
  respiratoryRate: number;
  timestamp: string;
}

interface Livestock2 {
  id: number;
  farmId: number;
  userId: number;
  name: string;
  species: string;
  breed: string;
  gender: string;
  birthDate: string;
  photoUrl: string | null;
  status: string;
  height: number;
  weight: number;
  bodyConditionScore: number;
  notes: string;
  recordedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface Anomaly {
  livestockId: number;
  type: string;
  severity: string;
  notes: string;
  detectedAt: string;
  resolved: boolean;
}

export interface SensorDataWithLivestockAndAnomaly {
  sensor_data: SensorData2;
  livestock: Livestock2;
  anomaly: Anomaly;
}

export interface RecentAvgSensorData {
  avgHeartRate: string;
  avgTemperature: number;
  avgRespiratoryRate: number;
};