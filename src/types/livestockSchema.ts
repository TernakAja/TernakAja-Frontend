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
  l_name: string | null;
  l_species: string | null;
}
  