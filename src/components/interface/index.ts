export interface baseStation {
  id: number
  name: string
  w4: number
  wYear: number
  priority: number
  alarmCount?: number
  duration: string
  startDate: string
}

export interface Comment {
  text: string
  category: string
}

export interface StationData {
  BS_NAME: string
  CA_4w: number
  CA_52w: number
}

export interface DataResponse {
  data: StationData[];
}

export interface WeekData {
  CA_2G: string | number;
  change_of_battery: string;
  combined_text: string | null;
  count_of_alarms: string;
  time_of_alarms: string;
  weak: string;
  weak_right: string | null;
}


export interface Order {
  Weak: string,
  combined_text: string
}