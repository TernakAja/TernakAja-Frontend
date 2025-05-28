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
  
  