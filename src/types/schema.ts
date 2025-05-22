export interface Livestock {
  id?: number;
  farmId: number;
  userId?: number;
  name: string;
  species: string;
  breed?: string;
  gender?: string;
  birthDate?: string;
  photoUrl?: string;
  status?: string;
  height?: number;
  weight?: number;
  bodyConditionScore?: number;
  notes?: string;
  recordedAt?: string | null;
}

export interface Farm {
  id: number;
  name: string;
  location: string;
  address: string;
  type: string;
  createdAt: string;
}

export interface SensorData {
  id: number;
  livestockId: number;
  temperature: number;
  heartRate: number;
  motionLevel: number;
  timestamp: string;
}

export interface Anomaly {
  type: string;
  severity: string;
  notes: string | null;
  detectedAt: string;
  resolved: boolean;
  livestockId: number;
}
