import { AxiosResponse } from 'axios';
import { Notify } from 'quasar';
import Vue from 'vue';
import { ApiResult } from '../boot/services/api.service';
import ProfilerService from '../boot/services/monitor-profiler.service';

export const CONST_METRIC_TYPE = [
  'Profiler',
  'TServers',
  'HServers',
  'ComWorker',
  'ZExecutors'
];
export const CONST_METRICS_BY_TYPE = [
  {
    name: 'Profiler',
    value: [
      'proc_rate',
      'req_rate',
      'peek_rate',
      'pending_req',
      'peek_pending',
      'proc_time',
      'peek_time'
    ]
  },
  {
    name: 'TServer',
    value: [
      'n_waiting',
      'n_active',
      'n_idle',
      'n_largest',
      'buffer_alloc',
      'frame_size_count'
    ]
  },
  { name: 'HServer', value: ['n_waiting', 'n_active', 'n_idle'] },
  {
    name: 'ZComWorker',
    value: ['in_rate', 'out_rate', 'in_packet', 'out_packet']
  },
  {
    name: 'ZExecutors',
    value: [
      'n_waiting',
      'n_active',
      'n_idle',
      'n_largest',
      'n_uncomplete',
      'n_reject'
    ]
  },
  {
    name: 'ZWatcher',
    value: [
      'n_waiting',
      'n_active',
      'n_idle',
      'n_largest',
      'n_uncomplete',
      'n_reject'
    ]
  }
];

export enum LEGEND_TYPE {
  TIME_RANGE = 'time-range',
  BY_DAY = 'by-day'
}

interface FilterOption {
  appName: string;
  metricType: string;
  metricValue: string[];
  threadApiName: string;
  showLegend: boolean;
  legendType: LEGEND_TYPE;
  metricGroupType: string;
  appNameList: string[];
  metricTypeList: string[];
  serverIpList: string[];
  threadApiList: string[];
  metricValueList: TMetricItem[];
  syncChart: boolean;
}

interface TMetricByTypeItem {
  name: string;
  value: string[];
}
export interface TMetricItem {
  label: string;
  value: string;
}

export default class SmonObservable {
  private stateObs: FilterOption = Vue.observable({
    appName: '',
    metricType: '',
    metricValue: [],
    threadApiName: '',
    showLegend: true,
    legendType: LEGEND_TYPE.TIME_RANGE,
    metricGroupType: 'checkbox',
    appNameList: [],
    metricTypeList: [],
    serverIpList: [],
    threadApiList: [],
    metricValueList: [],
    syncChart: true
  });
  public isFetchingData = false;
  public requireRenderChart = false;
  private readonly apiCaller = new ProfilerService();

  public toogleChartRender(val: boolean) {
    this.requireRenderChart = val;
  }

  public get appName(): string {
    return this.stateObs.appName;
  }

  public set appName(newAppName: string) {
    if (newAppName === null || newAppName === '') {
      throw new Error('appName must not null or empty');
    }
    this.stateObs.appName = newAppName;
  }

  public get metricType(): string {
    return this.stateObs.metricType;
  }

  public set metricType(newMetricType: string) {
    if (newMetricType === null || newMetricType === '') {
      throw new Error('metricType must not null or empty');
    }
    this.stateObs.metricType = newMetricType;
  }

  public get metricValue(): string[] {
    return this.stateObs.metricValue;
  }

  public set metricValue(newMetricType: string[]) {
    if (newMetricType === null || newMetricType === []) {
      throw new Error('metricType must not null or empty');
    }
    this.stateObs.metricValue = newMetricType;
  }

  public get metricGroupType(): string {
    return this.stateObs.metricGroupType;
  }

  public set metricGroupType(newMetricType: string) {
    if (newMetricType === null || newMetricType === '') {
      throw new Error('metricGroupType must not null or empty');
    }
    this.stateObs.metricGroupType = newMetricType;
  }

  public get showLegend(): boolean {
    return this.stateObs.showLegend;
  }

  public set showLegend(newVal: boolean) {
    if (newVal === null || newVal === undefined) {
      throw new Error('showLegend must not null or empty');
    }
    this.stateObs.showLegend = newVal;
  }

  public get legendType(): LEGEND_TYPE {
    return this.stateObs.legendType;
  }

  public set legendType(newVal: LEGEND_TYPE) {
    if (newVal === null || newVal === undefined) {
      throw new Error('legendType must not null or empty');
    }
    this.stateObs.legendType = newVal;
  }

  public get threadApiName(): string {
    return this.stateObs.threadApiName;
  }

  public set threadApiName(threadApiName: string) {
    if (threadApiName === null || threadApiName === '') {
      throw new Error('threadApiName must not null or empty');
    }
    this.stateObs.threadApiName = threadApiName;
  }

  public get metricTypeList(): string[] {
    return this.stateObs.metricTypeList;
  }

  public set metricTypeList(newList: string[]) {
    this.stateObs.metricTypeList = newList;
  }

  public get appNameList(): string[] {
    return this.stateObs.appNameList;
  }

  public set appNameList(newList: string[]) {
    this.stateObs.appNameList = newList;
  }

  public get serverIpList(): string[] {
    return this.stateObs.serverIpList;
  }

  public set serverIpList(newList: string[]) {
    this.stateObs.serverIpList = newList;
  }

  public get threadApiList(): string[] {
    return this.stateObs.threadApiList;
  }

  public set threadApiList(newList: string[]) {
    this.stateObs.threadApiList = newList;
  }

  public get metricValueList(): TMetricItem[] {
    return this.stateObs.metricValueList;
  }
  public set metricValueList(newList: TMetricItem[]) {
    this.stateObs.metricValueList = newList;
  }

  public get syncChart(): boolean {
    return this.stateObs.syncChart;
  }

  public set syncChart(newVal: boolean) {
    if (newVal === null || newVal === undefined) {
      throw new Error('syncChart must not null or empty');
    }
    this.stateObs.syncChart = newVal;
  }

  public filterAppListByName(val: string): string[] {
    if (val === '') return this.stateObs.appNameList;
    const needle = val.toLowerCase();
    return this.stateObs.appNameList.filter(
      v => v.toLowerCase().indexOf(needle) > -1
    );
  }

  public fetchMetricByType(metricType: string) {
    if (metricType === undefined || metricType === '') {
      throw new Error('Invalid metric type!');
    }
    const result = CONST_METRICS_BY_TYPE.filter(
      (it: TMetricByTypeItem) => it.name === metricType
    )
      .flatMap((it: TMetricByTypeItem) => it.value)
      .map((it: string) => ({ label: it, value: it }));

    if (result === undefined || result.length === 0) {
      return new Promise<boolean>(reject => reject(true));
    }
    this.metricValueList = result;
    this.metricValue = [result[0].value];
    return new Promise<boolean>(resolve => resolve(true));
  }

  public async fetchAllMetricTypeByApp(appName: string) {
    try {
      const res: AxiosResponse<ApiResult> = await this.apiCaller.getAllTypeByApp(
        appName
      );
      const result: string[] = res.data.data.result;
      this.metricType = result[0];
      this.metricTypeList = result;

      return new Promise<string[]>(resolve => resolve(result));
    } catch (error) {
      Notify.create({
        color: 'negative',
        position: 'top',
        message: 'Loading failed',
        icon: 'report_problem'
      });
    }
  }

  public async fetchAllServerIpByApp(appName: string) {
    try {
      const res: AxiosResponse<ApiResult> = await this.apiCaller.getAllServerIpByApp(
        appName
      );
      const result: string[] = res.data.data.result;
      this.serverIpList = result;

      return new Promise<string[]>(resolve => resolve(result));
    } catch (error) {
      Notify.create({
        color: 'negative',
        position: 'top',
        message: 'Loading failed',
        icon: 'report_problem'
      });
    }
  }

  public async fetchAllAppName() {
    try {
      const res: AxiosResponse<ApiResult> = await this.apiCaller.getAllAppName();
      const listAppName: string[] = res.data.data.result;
      this.appName = listAppName[0];
      this.appNameList = listAppName;

      return new Promise<string[]>(resolve => resolve(listAppName));
    } catch (error) {
      Notify.create({
        color: 'negative',
        position: 'top',
        message: 'Loading failed',
        icon: 'report_problem'
      });
    }
  }

  public async fetchAllProfilerByApp(appName: string) {
    try {
      const res: AxiosResponse<ApiResult> = await this.apiCaller.getAllProfilerByApp(
        appName
      );
      const result: string[] = (res.data.data.result as [
        { name: string; isThreadStats: boolean }
      ]).map(it => it.name);
      this.threadApiName = result[0];
      this.threadApiList = result;
      return new Promise<string[]>(resolve => resolve(result));
    } catch (error) {
      Notify.create({
        color: 'negative',
        position: 'top',
        message: 'Loading failed',
        icon: 'report_problem'
      });
    }
  }

  public async fetchDataForFirst(): Promise<boolean> {
    this.isFetchingData = true;
    await this.fetchAllAppName();
    await this.fetchAllServerIpByApp(this.appName);
    await this.fetchAllMetricTypeByApp(this.appName);
    await this.fetchAllProfilerByApp(this.appName);
    this.fetchMetricByType(this.metricType);
    this.isFetchingData = false;
    return new Promise<boolean>(resolve => resolve(!this.isFetchingData));
  }

  public async fetchDataOnChangedAppName(): Promise<boolean> {
    this.isFetchingData = true;
    await this.fetchAllServerIpByApp(this.appName);
    await this.fetchAllMetricTypeByApp(this.appName);
    await this.fetchAllProfilerByApp(this.appName);
    this.fetchMetricByType(this.metricType);
    this.isFetchingData = false;
    return new Promise<boolean>(resolve => resolve(!this.isFetchingData));
  }
}
