export const UPDATE_APP_NAME = 'updateAppName';
export const UPDATE_APP_LIST = 'updateAppList';
export const UPDATE_API_NAME = 'updateApiName';
export const UPDATE_API_LIST = 'updateApiList';
export const UPDATE_METRIC_TYPE = 'updateMetricType';
export const UPDATE_METRIC_TYPE_LIST = 'updateMetricTypeList';
export const UPDATE_METRIC_VALUE = 'updateMetricValue';
export const UPDATE_METRIC_VALUE_LIST = 'updateMetricValueList';
export const TOGGLE_CHART_SYNC_MODE = 'toggleChartSyncMode';
export const TOGGLE_ON_OFF_LEGEND = 'toggleOnOffLegend';
export const TOGGLE_LEGEND_TYPE = 'toggleLegendType';
export const TOGGLE_RENDER_CHART = 'toggleRenderChart';
export const UPDATE_CHARTS = 'updateCharts';
export const SET_COMPLETE_INIT_STORE = 'setCompleteInitStore';
export const ACT_UPD_ZEXECUTORS = 'updateZExecutors';
export const ACT_UPD_ZEXECUTORS_NAME = 'updateZExecutorsName';

export enum LEGEND_TYPE {
  TIME_RANGE = 'time-range',
  BY_DAY = 'by-day'
}

export enum METRIC_TYPE {
  PROFILER = 'Profiler',
  TSERVER = 'TServer',
  HSERVER = 'HServer',
  ZCOMWORKER = 'ZComWorker',
  ZEXECUTORS = 'ZExecutors',
  ZWATCHER = 'ZWatcher'
}
export const CONST_METRIC_TYPE = [
  METRIC_TYPE.PROFILER,
  METRIC_TYPE.TSERVER,
  METRIC_TYPE.HSERVER,
  METRIC_TYPE.ZCOMWORKER,
  METRIC_TYPE.ZEXECUTORS
];

export const CONST_METRICS_BY_TYPE = [
  {
    name: METRIC_TYPE.PROFILER,
    value: [
      { display: 'proc_rate', rawValue: 'proc_rate' },
      { display: 'req_rate', rawValue: 'req_rate' },
      { display: 'peek_rate', rawValue: 'peek_req_rate' },
      { display: 'pending_req', rawValue: 'pending_req' },
      { display: 'peek_pending', rawValue: 'peek_pending_req' },
      { display: 'proc_time', rawValue: 'last_time_proc' },
      { display: 'peek_time', rawValue: 'peek_last_time_proc' }
    ]
  },
  {
    name: METRIC_TYPE.TSERVER,
    value: [
      { display: 'n_waiting', rawValue: 'executor.nwaiting_job' },
      { display: 'n_active', rawValue: 'executor.nactive_thread' },
      { display: 'n_idle', rawValue: 'executor.nidle_thread' },
      { display: 'n_largest', rawValue: 'executor.nlargest_thread' },
      { display: 'buffer_alloc', rawValue: 'read_buffer_allocated' },
      {
        display: 'frame_size_count',
        rawValue: 'total_frsize_reached_count'
      }
    ]
  },
  {
    name: METRIC_TYPE.HSERVER,
    value: [
      { display: 'n_waiting', rawValue: 'threadpool.nwaiting_job' },
      { display: 'n_active', rawValue: 'threadpool.nactive_thread' },
      { display: 'n_idle', rawValue: 'threadpool.nidle_thread' }
    ]
  },
  {
    name: METRIC_TYPE.ZCOMWORKER,
    value: [
      { display: 'in_rate', rawValue: 'command.in_rate' },
      { display: 'out_rate', rawValue: 'command.out_rate' }
    ]
  },
  {
    name: METRIC_TYPE.ZEXECUTORS,
    value: [
      { display: 'n_waiting', rawValue: 'nwaiting_job' },
      { display: 'n_active', rawValue: 'nactive_thread' },
      { display: 'n_idle', rawValue: 'nidle_thread' },
      { display: 'n_largest', rawValue: 'nlargest_thread' },
      { display: 'n_uncomplete', rawValue: 'not_completed' },
      { display: 'n_reject', rawValue: 'rejected_task_count' }
    ]
  },
  {
    name: METRIC_TYPE.ZWATCHER,
    value: [
      { display: 'n_waiting', rawValue: 'nwaiting_job' },
      { display: 'n_active', rawValue: 'nactive_thread' },
      { display: 'n_idle', rawValue: 'nidle_thread' },
      { display: 'n_largest', rawValue: 'nlargest_thread' },
      { display: 'n_uncomplete', rawValue: 'not_completed' },
      { display: 'n_reject', rawValue: 'rejected_task_count' }
    ]
  }
];
