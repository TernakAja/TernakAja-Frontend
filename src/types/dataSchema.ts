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
  avg_heart_rate: number;
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
