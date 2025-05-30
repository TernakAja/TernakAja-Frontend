// export interface LivestockSummaryItem {
//   title: string;
//   value: number;
// }

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

interface SensorData {
  livestockId: number;
  temperature: number;
  heartRate: number;
  motionLevel: number;
  timestamp: string; // ISO date string
}

interface Livestock {
  id: number;
  farmId: number;
  userId: number;
  name: string;
  species: string;
  breed: string;
  gender: string;
  birthDate: string; // ISO date string
  photoUrl: string | null;
  status: string;
  height: number;
  weight: number;
  bodyConditionScore: number;
  notes: string;
  recordedAt: string; // ISO date string
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
}

interface Anomaly {
  livestockId: number;
  type: string;
  severity: string;
  notes: string;
  detectedAt: string; // ISO date string
  resolved: boolean;
}

export interface SensorDataWithLivestockAndAnomaly {
  sensor_data: SensorData;
  livestock: Livestock;
  anomaly: Anomaly;
}