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