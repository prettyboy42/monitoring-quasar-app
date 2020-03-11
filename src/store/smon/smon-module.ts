import { Notify } from 'quasar';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import ProfilerService from '../../boot/services/monitor-profiler.service';
import SmonObservable from '../observable-smon';
import * as constants from './constants';
import { ChartItem, TMetricItem } from './types';

@Module({
  name: SmonModule.MODULE_NAME,
  namespaced: true,
  stateFactory: true,
  preserveState: true
})
export default class SmonModule extends VuexModule {
  public static readonly MODULE_NAME = 'smon';
  private readonly storeObs = new SmonObservable();
  private readonly apiCaller = new ProfilerService();
  isInitialized: boolean = false;
  appName: string = '';
  apiName: string = '';
  metricType: string = '';
  metricValues: string[] = [];
  chartLegendType: string = constants.LEGEND_TYPE.TIME_RANGE;
  enableChartSync: boolean = true;
  enableChartLegend: boolean = true;
  charts: ChartItem[] = [];
  appNameList: string[] = [];
  apiNameList: string[] = [];
  metricTypeList: string[] = [];
  metricValueList: TMetricItem[] = [];
  requireRenderChart: boolean = false;

  //getters
  get appNames() {
    return this.appNameList;
  }

  get currentAppName() {
    return this.appName;
  }

  get currentMetricType() {
    return this.metricType;
  }

  get metricTypes() {
    return this.metricTypeList;
  }

  get currentMetric() {
    return this.metricValues;
  }

  get buildMetricParams() {
    return this.metricValues.join(',');
  }

  get metricGroup() {
    if (this.chartLegendType === constants.LEGEND_TYPE.TIME_RANGE) {
      return 'checkbox';
    } else if (this.chartLegendType === constants.LEGEND_TYPE.BY_DAY) {
      return 'radio';
    }
  }

  get currentProfilerApi() {
    return this.apiName;
  }

  get profilerApis() {
    return this.apiNameList;
  }

  get chartList() {
    return this.charts;
  }

  get getFirstChart() {
    return this.charts[0];
  }

  get currentLegendType() {
    return this.chartLegendType;
  }

  get isProfilerType() {
    return this.metricType === 'Profiler';
  }

  //Defines mutations
  @Mutation
  public [constants.UPDATE_APP_NAME](val: string) {
    this.appName = val;
  }
  @Mutation
  [constants.UPDATE_METRIC_TYPE](val: string) {
    this.metricType = val;
  }
  @Mutation
  [constants.UPDATE_METRIC_TYPE_LIST](val: string[]) {
    this.metricTypeList = val;
  }

  @Mutation
  [constants.UPDATE_METRIC_VALUE](val: string[]) {
    this.metricValues.splice(0);
    this.metricValues = [...val];
  }

  @Mutation
  [constants.UPDATE_METRIC_VALUE_LIST](val: TMetricItem[]) {
    this.metricValueList = val;
  }

  @Mutation
  [constants.UPDATE_API_NAME](val: string) {
    this.apiName = val;
  }
  @Mutation
  [constants.UPDATE_APP_LIST](val: string[]) {
    this.appNameList = val;
  }

  @Mutation
  [constants.UPDATE_API_LIST](val: string[]) {
    this.apiNameList = val;
  }

  @Mutation
  [constants.UPDATE_CHARTS](val: ChartItem[]) {
    this.charts = val;
  }

  @Mutation
  [constants.TOGGLE_CHART_SYNC_MODE](val: boolean) {
    this.enableChartSync = val;
  }

  @Mutation
  [constants.TOGGLE_ON_OFF_LEGEND](val: boolean) {
    this.enableChartLegend = val;
  }

  @Mutation
  [constants.TOGGLE_LEGEND_TYPE](val: string) {
    this.chartLegendType = val;
  }

  @Mutation
  [constants.TOGGLE_RENDER_CHART](val: boolean) {
    this.requireRenderChart = val;
  }

  @Mutation
  [constants.SET_COMPLETE_INIT_STORE](val: boolean) {
    this.isInitialized = val;
  }

  /**
   * Defines actions
   *
   */
  @Action({ commit: constants.UPDATE_APP_NAME })
  public setAppName(appName: string) {
    return appName;
  }

  @Action({ commit: constants.UPDATE_METRIC_TYPE })
  public setMetricType(newVal: string) {
    return newVal;
  }

  @Action({ commit: constants.UPDATE_METRIC_VALUE })
  public setMetricValues(val: string[]) {
    return val;
  }

  @Action({ commit: constants.UPDATE_API_NAME })
  public setProfilerApi(val: string) {
    return val;
  }

  @Action({ commit: constants.TOGGLE_CHART_SYNC_MODE })
  public setChartSyncMode(val: boolean) {
    return val;
  }

  @Action({ commit: constants.TOGGLE_ON_OFF_LEGEND })
  public setOnOffLegendMode(val: boolean) {
    return val;
  }

  @Action({ commit: constants.TOGGLE_RENDER_CHART })
  public setToggleRenderChart(val: boolean) {
    return val;
  }

  @Action({ commit: constants.TOGGLE_LEGEND_TYPE })
  public setLegendType(val: string) {
    return val;
  }

  @Action
  public async fetchOrInitStoreByApp(newAppName: string = '') {
    try {
      let appName = newAppName;
      if (!newAppName) {
        const res = await this.apiCaller.fetchAllAppName();
        if (res.length == 0) {
          throw new Error('Cannot fetch all App from server!');
        }
        appName = res[0]; //Retrieve first item
        this[constants.UPDATE_APP_LIST](res);
      }
      this[constants.UPDATE_APP_NAME](appName);

      const serverIpsPromise = this.apiCaller.fetchAllServerIpByApp(appName);
      const profilerApisPromise = this.apiCaller.fetchAllProfilerByApp(appName);
      const metricTypesPromise = this.apiCaller.fetchAllMetricTypeByApp(
        appName
      );

      const metricTypes = await metricTypesPromise;
      if (metricTypes.length > 0) {
        const metricType = metricTypes[0];
        const values = this.apiCaller.fetchMetricByType(metricType);
        this[constants.UPDATE_METRIC_TYPE](metricType);
        this[constants.UPDATE_METRIC_TYPE_LIST](metricTypes);
        this[constants.UPDATE_METRIC_VALUE]([values[0].value]);
        this[constants.UPDATE_METRIC_VALUE_LIST](values);
      }

      const profilerApis = (await profilerApisPromise).map(
        (it: any) => it.name
      );
      if (profilerApis.length > 0) {
        this[constants.UPDATE_API_NAME](profilerApis[0]);
        this[constants.UPDATE_API_LIST](profilerApis);
      }

      const chartItems = (await serverIpsPromise).map(it => {
        let item: ChartItem = {
          id: `${appName}_${it.replace('10.30.', '')}`,
          title: it,
          serverIp: it
        };
        return item;
      });
      this[constants.UPDATE_CHARTS](chartItems);
      this[constants.SET_COMPLETE_INIT_STORE](true); //Mark init store is completed
    } catch (error) {
      Notify.create({
        color: 'negative',
        position: 'top',
        message: `fetchAndInitStore failed. error: ${error}`,
        icon: 'report_problem'
      });
    }
  }

  @Action
  public fetchMetricByType(metricType: string) {
    const values = this.apiCaller.fetchMetricByType(metricType);
    this[constants.UPDATE_METRIC_TYPE](metricType);
    this[constants.UPDATE_METRIC_VALUE]([values[0].value]);
    this[constants.UPDATE_METRIC_VALUE_LIST](values);
  }
}
