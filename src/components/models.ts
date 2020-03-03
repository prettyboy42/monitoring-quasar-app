export interface ChartPoint {
  x: number|string;
  y: number;
}

export interface ChartSeries {
  name: string;
  data: ChartPoint[];
  color?: string;
  visible?: boolean;
}

export function isNullOrEmpty(val: string): boolean {
  return val === undefined || val === null || val === '';
}
