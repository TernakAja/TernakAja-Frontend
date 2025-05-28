export interface LivestockSummaryItem {
  title: string;
  value: number;
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

export interface SensorDataWithLivestockAndAnomaly {
  sd_id: number;
  sd_livestock_id: number;
  sd_temperature: number;
  sd_heart_rate: number;
  sd_motion_level: number;
  sd_timestamp: string; // ISO timestamp

  l_id: number;
  l_farm_id: number;
  l_user_id: number;
  l_name: string;
  l_species: string;
  l_breed: string;
  l_gender: string;
  l_birth_date: string; // ISO date string
  l_photo_url: string;
  l_status: string;
  l_height: number;
  l_weight: number;
  l_body_condition_score: number;
  l_notes: string;
  l_recorded_at: string; // ISO timestamp
  l_created_at: string;  // ISO timestamp
  l_updated_at: string;  // ISO timestamp

  a_id: number;
  a_livestock_id: number;
  a_type: string;
  a_severity: string;
  a_notes: string;
  a_detected_at: string; // ISO timestamp
  a_resolved: boolean;
}
