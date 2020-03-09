export interface ChartItem {
  id: string;
  title: string;
  serverIp: string;
}

export interface SmonState {
  charts: ChartItem[];
}

export interface TMetricItem {
  label: string;
  value: string;
}
