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

export enum LEGEND_TYPE {
  TIME_RANGE = 'time-range',
  BY_DAY = 'by-day'
}

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
