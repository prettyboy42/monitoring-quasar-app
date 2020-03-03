import { AxiosPromise } from 'axios';
import { axiosMain } from '../axios';
import ApiService, { ApiResult } from './api.service';

const BASE_URL = '/monitor-profiler';
const API_GET_ALL_TYPE_BY_APP = BASE_URL + '/get-monitor-type-support';
const API_GET_ALL_SERVER_IP_BY_APP = BASE_URL + '/get-all-ip-by-app-name';
const API_GET_ALL_APP_NAME = BASE_URL + '/get-all-app-name';
const API_GET_ALL_PROFILER_BY_APP = BASE_URL + '/get-all-profiler-by-app-name';
const API_GET_CHART_DATA = BASE_URL + '/get-chart-profiler';

export default class MonitorProfilerService {
  private readonly apiCaller = new ApiService();

  public getAllTypeByApp(appName: string): AxiosPromise<ApiResult> {
    return axiosMain.get(API_GET_ALL_TYPE_BY_APP, {
      params: {
        appName: appName
      }
    });
  }

  public getAllServerIpByApp(appName: string): AxiosPromise<ApiResult> {
    return axiosMain.get(API_GET_ALL_SERVER_IP_BY_APP, {
      params: {
        appName: appName
      }
    });
  }

  public getAllAppName(): AxiosPromise<ApiResult> {
    return axiosMain.get(API_GET_ALL_APP_NAME);
  }

  public getAllProfilerByApp(appName: string): AxiosPromise<ApiResult> {
    return axiosMain.get(API_GET_ALL_PROFILER_BY_APP, {
      params: {
        appName: appName
      }
    });
  }

  public getChartData(
    appName: string,
    apiName: string,
    profilerType: string,
    serverIp: string,
    startTime: number,
    endTime: number,
    dayRange: string,
    timeInterval: number,
    chartType: string
  ): AxiosPromise<ApiResult> {
    return axiosMain.get(API_GET_CHART_DATA, {
      params: {
        chartType: chartType,
        timeInterval: timeInterval,
        listDays: dayRange,
        from: startTime,
        to: endTime,
        appName: appName,
        serverIp: serverIp,
        profilerApiName: apiName,
        profilerType: profilerType,
        multiProfilerType: profilerType
      }
    });
  }
}
