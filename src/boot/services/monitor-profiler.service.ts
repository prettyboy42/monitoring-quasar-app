import { AxiosPromise, AxiosResponse } from 'axios';
import * as constants from '../../store/smon/constants';
import { axiosMain } from '../axios';
import { ApiResult } from './types';

const BASE_URL = '/monitor-profiler';
const API_GET_ALL_TYPE_BY_APP = BASE_URL + '/get-monitor-type-support';
const API_GET_ALL_SERVER_IP_BY_APP = BASE_URL + '/get-all-ip-by-app-name';
const API_GET_ALL_APP_NAME = BASE_URL + '/get-all-app-name';
const API_GET_ALL_PROFILER_BY_APP = BASE_URL + '/get-all-profiler-by-app-name';
const API_GET_ALL_EXECUTOR_BY_APP = BASE_URL + '/get-all-executor-by-app-name';
const API_GET_ALL_CLIENT_POOL_BY_APP =
  BASE_URL + '/get-all-pool-name-by-app-name';
const API_GET_ALL_CLIENT_POOL_IP_BY_NAME =
  BASE_URL + '/get-all-pool-ip-by-app-name-pool-name';
const API_GET_CHART_DATA = BASE_URL + '/get-chart-profiler';
const API_GET_CHART_TSERVER = BASE_URL + '/get-chart-tserver';
const API_GET_CHART_HSERVER = BASE_URL + '/get-chart-hserver';
const API_GET_CHART_COMSERVER = BASE_URL + '/get-chart-comworker';
const API_GET_CHART_ZEXECUTOR = BASE_URL + '/get-chart-executor';
const API_GET_CHART_TCLIENTPOOL = BASE_URL + '/get-chart-tclientpool';

export default class MonitorProfilerService {
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

  public async fetchAllExecutorByApp(appName: string) {
    let result: string[] = [];
    const res: AxiosResponse<ApiResult> = await axiosMain.get(
      API_GET_ALL_EXECUTOR_BY_APP,
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

  public async fetchAllClientPoolByApp(appName: string) {
    let result: string[] = [];
    const res: AxiosResponse<ApiResult> = await axiosMain.get(
      API_GET_ALL_CLIENT_POOL_BY_APP,
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

  public async fetchAllClientIPByPool(appName: string, poolName: string) {
    let result: string[] = [];
    const res: AxiosResponse<ApiResult> = await axiosMain.get(
      API_GET_ALL_CLIENT_POOL_IP_BY_NAME,
      {
        params: {
          appName: appName,
          poolName: poolName
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
      .map(it => ({ label: it.display, value: it.rawValue }));

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

  public getChartDataTServer(
    appName: string,
    profilerType: string,
    serverIp: string,
    startTime: number,
    endTime: number,
    dayRange: string,
    timeInterval: number,
    chartType: string
  ): AxiosPromise<ApiResult> {
    return axiosMain.get(API_GET_CHART_TSERVER, {
      params: {
        chartType: chartType,
        timeInterval: timeInterval,
        listDays: dayRange,
        from: startTime,
        to: endTime,
        appName: appName,
        serverIp: serverIp,
        multiTServerType: profilerType
      }
    });
  }

  public getChartDataHServer(
    appName: string,
    profilerType: string,
    serverIp: string,
    startTime: number,
    endTime: number,
    dayRange: string,
    timeInterval: number,
    chartType: string
  ): AxiosPromise<ApiResult> {
    return axiosMain.get(API_GET_CHART_HSERVER, {
      params: {
        chartType: chartType,
        timeInterval: timeInterval,
        listDays: dayRange,
        from: startTime,
        to: endTime,
        appName: appName,
        serverIp: serverIp,
        multiHServerType: profilerType
      }
    });
  }

  public getChartDataExecutor(
    appName: string,
    executorName: string,
    profilerType: string,
    serverIp: string,
    startTime: number,
    endTime: number,
    dayRange: string,
    timeInterval: number,
    chartType: string
  ): AxiosPromise<ApiResult> {
    return axiosMain.get(API_GET_CHART_ZEXECUTOR, {
      params: {
        chartType: chartType,
        timeInterval: timeInterval,
        listDays: dayRange,
        from: startTime,
        to: endTime,
        appName: appName,
        serverIp: serverIp,
        executorName: executorName,
        multiExecutorType: profilerType
      }
    });
  }

  public getChartDataComServer(
    appName: string,
    comWorkerId: string,
    comWorkerName: string,
    profilerType: string,
    serverIp: string,
    startTime: number,
    endTime: number,
    dayRange: string,
    timeInterval: number,
    chartType: string
  ): AxiosPromise<ApiResult> {
    return axiosMain.get(API_GET_CHART_COMSERVER, {
      params: {
        chartType: chartType,
        timeInterval: timeInterval,
        listDays: dayRange,
        from: startTime,
        to: endTime,
        appName: appName,
        comWorkerId: comWorkerId,
        comWorkerName: comWorkerName,
        serverIp: serverIp,
        multiComWorkerType: profilerType
      }
    });
  }

  public getChartDataTClientPool(
    appName: string,
    poolName: string,
    poolIp: string,
    multiPoolType: string,
    serverIp: string,
    startTime: number,
    endTime: number,
    dayRange: string,
    timeInterval: number,
    chartType: string
  ): AxiosPromise<ApiResult> {
    return axiosMain.get(API_GET_CHART_TCLIENTPOOL, {
      params: {
        chartType: chartType,
        timeInterval: timeInterval,
        listDays: dayRange,
        from: startTime,
        to: endTime,
        appName: appName,
        poolName: poolName,
        poolIp: poolIp,
        serverIp: serverIp,
        poolType: multiPoolType,
        multiPoolType: multiPoolType
      }
    });
  }
}
