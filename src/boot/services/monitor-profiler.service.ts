import { AxiosPromise, AxiosResponse } from 'axios';
import * as constants from '../../store/smon/constants';
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

  public async fetchAllAppName() {
    let listAppName: string[] = [];
    const res: AxiosResponse<ApiResult> = await axiosMain.get(
      API_GET_ALL_APP_NAME
    );
    if (res.status == 200 && res.data.error >= 0) {
      listAppName = res.data.data.result;
    }
    return listAppName;
  }

  public async fetchAllServerIpByApp(appName: string) {
    let result: string[] = [];
    const res: AxiosResponse<ApiResult> = await axiosMain.get(
      API_GET_ALL_SERVER_IP_BY_APP,
      {
        params: {
          appName: appName
        }
      }
    );
    if (res.status == 200 && res.data.error >= 0) {
      result = res.data.data.result;
    }
    return result;
  }

  public async fetchAllMetricTypeByApp(appName: string) {
    let result: string[] = [];
    const res: AxiosResponse<ApiResult> = await axiosMain.get(
      API_GET_ALL_TYPE_BY_APP,
      {
        params: {
          appName: appName
        }
      }
    );
    if (res.status == 200 && res.data.error >= 0) {
      result = res.data.data.result;
    }
    return result;
  }

  public async fetchAllProfilerByApp(appName: string) {
    let result: string[] = [];
    const res: AxiosResponse<ApiResult> = await axiosMain.get(
      API_GET_ALL_PROFILER_BY_APP,
      {
        params: {
          appName: appName
        }
      }
    );
    if (res.status == 200 && res.data.error >= 0) {
      result = res.data.data.result;
    }
    return result;
  }

  public fetchMetricByType(metricType: string) {
    if (metricType === undefined || metricType === '') {
      return [];
    }
    const result = constants.CONST_METRICS_BY_TYPE.filter(
      it => it.name === metricType
    )
      .flatMap(it => it.value)
      .map((it: string) => ({ label: it, value: it }));

    return result || [];
  }

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
