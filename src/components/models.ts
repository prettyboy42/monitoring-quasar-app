import { date } from 'quasar';
import { TIME_RANGE_ENUM } from '../store/layouts/layout-module';

export interface ChartPoint {
  x: number | string;
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

export function calculateTimeRange(val: number) {
  const now = Date.now();
  switch (val) {
    case TIME_RANGE_ENUM.WHOLE_TODAY:
      return {
        from: date.startOfDate(now, 'day').getTime(),
        to: date.endOfDate(now, 'day').getTime()
      };
    case TIME_RANGE_ENUM.TODAY_TO_NOW:
      return {
        from: date.startOfDate(now, 'day').getTime(),
        to: now
      };
    case TIME_RANGE_ENUM.LAST_15_MINUTES:
      return {
        from: date.subtractFromDate(now, { minutes: 15 }).getTime(),
        to: now
      };
    case TIME_RANGE_ENUM.LAST_30_MINUTES:
      return {
        from: date.subtractFromDate(now, { minutes: 30 }).getTime(),
        to: now
      };
    case TIME_RANGE_ENUM.LAST_AN_HOUR:
      return {
        from: date.subtractFromDate(now, { hours: 1 }).getTime(),
        to: now
      };
    case TIME_RANGE_ENUM.LAST_2_HOURS:
      return {
        from: date.subtractFromDate(now, { hours: 2 }).getTime(),
        to: now
      };
    case TIME_RANGE_ENUM.LAST_4_HOURS:
      return {
        from: date.subtractFromDate(now, { hours: 4 }).getTime(),
        to: now
      };
    case TIME_RANGE_ENUM.LAST_8_HOURS:
      return {
        from: date.subtractFromDate(now, { hours: 8 }).getTime(),
        to: now
      };
    case TIME_RANGE_ENUM.LAST_12_HOURS:
      return {
        from: date.subtractFromDate(now, { hours: 12 }).getTime(),
        to: now
      };
    case TIME_RANGE_ENUM.LAST_24_HOURS:
      return {
        from: date.subtractFromDate(now, { hours: 24 }).getTime(),
        to: now
      };
    case TIME_RANGE_ENUM.LAST_7_DAYS:
      return {
        from: date.subtractFromDate(now, { days: 7 }).getTime(),
        to: now
      };
    default:
      return {
        from: date.startOfDate(now, 'day').getTime(),
        to: date.endOfDate(now, 'day').getTime()
      };
  }
}
