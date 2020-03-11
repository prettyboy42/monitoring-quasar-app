import { Platform } from 'quasar';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

export const AUTO_REFRESH_INTERVAL = [
  { label: 'Off', value: 0 },
  { label: '5 secs', value: 5000 },
  { label: '10 secs', value: 10000 },
  { label: '15 secs', value: 15000 },
  { label: '30 secs', value: 30000 },
  { label: '1 min', value: 60000 },
  { label: '5 mins', value: 300000 }
];
export const TICK_TIME_INTERVAL = [
  { label: '1 min', value: 1 },
  { label: '2 mins', value: 2 },
  { label: '5 mins', value: 5 },
  { label: '10 mins', value: 10 },
  { label: '20 mins', value: 20 },
  { label: '30 mins', value: 30 }
];
export enum TIME_RANGE_ENUM {
  WHOLE_TODAY,
  TODAY_TO_NOW,
  LAST_15_MINUTES,
  LAST_30_MINUTES,
  LAST_AN_HOUR,
  LAST_2_HOURS,
  LAST_4_HOURS,
  LAST_8_HOURS,
  LAST_12_HOURS,
  LAST_24_HOURS,
  LAST_7_DAYS
}
export const TIME_RANGE_INTERVAL = [
  { label: 'Whole today', value: TIME_RANGE_ENUM.WHOLE_TODAY },
  { label: 'Today to now', value: TIME_RANGE_ENUM.TODAY_TO_NOW },
  { label: 'Last 15 minutes', value: TIME_RANGE_ENUM.LAST_15_MINUTES },
  { label: 'Last 30 minutes', value: TIME_RANGE_ENUM.LAST_30_MINUTES },
  { label: 'Last an hour', value: TIME_RANGE_ENUM.LAST_AN_HOUR },
  { label: 'Last 2 hours', value: TIME_RANGE_ENUM.LAST_2_HOURS },
  { label: 'Last 4 hours', value: TIME_RANGE_ENUM.LAST_4_HOURS },
  { label: 'Last 8 hours', value: TIME_RANGE_ENUM.LAST_8_HOURS },
  { label: 'Last 12 hours', value: TIME_RANGE_ENUM.LAST_12_HOURS },
  { label: 'Last 24 hours', value: TIME_RANGE_ENUM.LAST_24_HOURS },
  { label: 'Last 7 days', value: TIME_RANGE_ENUM.LAST_7_DAYS }
];
@Module({
  name: LayoutModule.MODULE_NAME,
  namespaced: true,
  stateFactory: true,
  preserveState: true
})
export default class LayoutModule extends VuexModule {
  public static readonly MODULE_NAME = 'layout';
  public leftDrawerOpen = false;
  public rightDrawerOpen = false;
  public headerState: boolean = true;
  public footerState: boolean = Platform.is.desktop || false;
  public forceRefresh: boolean = false;
  public refreshTimeInterval: number = 0;
  public tickTimeInterval: number = 30;
  public timeRangeInterval: number = TIME_RANGE_ENUM.WHOLE_TODAY;

  @Mutation
  public SET_LEFT_DRAWER_OPEN(value: boolean) {
    this.leftDrawerOpen = value;
  }

  @Action
  public setLeftDrawerOpen(value: boolean) {
    this.SET_LEFT_DRAWER_OPEN(value);
  }

  @Action
  public toggleLeftDrawer() {
    this.SET_LEFT_DRAWER_OPEN(!this.leftDrawerOpen);
  }

  @Mutation
  public SET_RIGHT_DRAWER_OPEN(value: boolean) {
    this.rightDrawerOpen = value;
  }

  @Action
  public setRightDrawerOpen(value: boolean) {
    this.SET_RIGHT_DRAWER_OPEN(value);
  }

  @Action
  public toggleRightDrawer() {
    this.SET_RIGHT_DRAWER_OPEN(!this.rightDrawerOpen);
  }

  @Mutation
  public SET_HEADER_STATE(value: boolean) {
    this.headerState = value;
  }

  @Action
  public setHeaderState(value: boolean) {
    this.SET_HEADER_STATE(value);
  }

  @Mutation
  public SET_FOOTER_STATE(value: boolean) {
    this.footerState = value;
  }

  @Action
  public setFooterState(value: boolean) {
    this.SET_FOOTER_STATE(value);
  }

  @Mutation
  public SET_FORCE_REFRESH(val: boolean) {
    this.forceRefresh = val;
  }

  @Action
  public setForceRefresh(val: boolean) {
    this.SET_FORCE_REFRESH(val);
  }

  @Mutation
  public SET_REFRESH_TIME_INTERVAL(value: number) {
    this.refreshTimeInterval = value;
  }

  @Action
  public setRefreshTimeInterval(value: number) {
    this.SET_REFRESH_TIME_INTERVAL(value);
  }

  @Mutation
  public SET_TICK_TIME_INTERVAL(value: number) {
    this.tickTimeInterval = value;
  }

  @Action
  public setTickTimeInterval(value: number) {
    this.SET_TICK_TIME_INTERVAL(value);
  }

  @Mutation
  public SET_TIME_RANGE_INTERVAL(value: number) {
    this.timeRangeInterval = value;
  }

  @Action
  public setTimeRangeInterval(value: number) {
    this.SET_TIME_RANGE_INTERVAL(value);
  }
}
