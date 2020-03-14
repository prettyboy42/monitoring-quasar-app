<template>
  <card-base :style="chartStyle">
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <apexchart
        v-show="showSimulatedReturnData"
        ref="realtimeChart"
        type="line"
        :width="chartWidth"
        :height="chartHeight"
        :options="chartOptions"
        :series="chartSeries"
      />
    </transition>
    <q-inner-loading :showing="visible">
      <q-spinner-ios size="50px" color="yellow" />
    </q-inner-loading>
  </card-base>
</template>

<script lang="ts">
import { Vue, Component, Inject, Prop, Watch } from 'vue-property-decorator';
// import SmonObservable, { LEGEND_TYPE } from '../store/observable-smon';
import { getModule } from 'vuex-module-decorators';
import LayoutModule from '../store/layouts/layout-module';
import SmonModule from '../store/smon/smon-module';
import ProfilerService from '../boot/services/monitor-profiler.service';
import { ChartSeries, isNullOrEmpty, calculateTimeRange } from './models';
import { LEGEND_TYPE, METRIC_TYPE } from '../store/smon/constants';
import { date } from 'quasar';

@Component({
  components: {
    CardBase: () => import('components/CardBase.vue')
  }
})
export default class DashboardSmonChart extends Vue {
  public $refs!: {
    //A new ! post-fix expression operator may be used to assert that its operand is non-null and non-undefined in contexts
    realtimeChart: HTMLFormElement;
  };
  // @Inject('storeObservable') readonly smonStore!: SmonObservable;
  private smonStore = getModule(SmonModule, this.$store);
  private layoutStore = getModule(LayoutModule, this.$store);

  private readonly apiCaller = new ProfilerService();
  @Prop({ default: '0' }) chartId!: number | string;
  @Prop({ default: 'defaultGroup' }) chartGroup!: string;
  @Prop({ default: '0.0.0.0' }) serverIp!: string;
  @Prop({ default: '' }) chartTitle!: string;
  @Prop({ default: '100%' }) chartWidth!: number;

  public visible: boolean = true;
  public showSimulatedReturnData: boolean = false;
  public chartSeries: ChartSeries[] = [];
  private readonly parentHeightOffset: number = 15;
  private readonly defaultHeightChart = 300;
  public readonly colors: string[] = [
    'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
    'linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)',
    'linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)',
    'linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)'
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public chartOptions: any = {
    // colors: ['#FCCF31', '#17ead9', '#f02fc2'],
    theme: {
      mode: 'light',
      palette: 'palette1' // upto palette10
    },
    title: {
      text: this.chartTitle,
      align: 'left',
      style: {
        color: '#131413'
      }
    },
    noData: {
      text: 'Loading...',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#a84a32',
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial'
      }
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      x: {
        show: true,
        format: 'dd MMM yyyy HH:mm:ss'
      }
    },
    chart: {
      id: this.chartId,
      group: this.chartGroup,
      parentHeightOffset: this.parentHeightOffset,
      type: 'line',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: true,
          customIcons: [
            {
              icon:
                '<img src="https://img.icons8.com/plasticine/100/000000/download-2.png" width="20">',
              index: 3,
              title: 'tooltip of the icon',
              class: 'custom-icon',
              click: function() {
                // console.log('cliked');
              }
            }
          ]
        }
      },
      animations: {
        enabled: false
      }
    },
    markers: {
      size: 0
    },
    grid: {
      show: true,
      strokeDashArray: 0,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#a35822'
        },
        datetimeUTC: false
      }
    },
    yaxis: {
      labels: {
        minWidth: 40,
        style: {
          // colors: '#FCCF31'
        }
      },
      min: 0
    },
    legend: {
      show: this.smonStore.enableChartLegend,
      showForSingleSeries: this.smonStore.currentMetric?.length > 1 || false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position:
        this.smonStore.currentLegendType == LEGEND_TYPE.BY_DAY
          ? 'right'
          : 'bottom',
      inverseOrder: this.smonStore.currentLegendType == LEGEND_TYPE.BY_DAY,
      offsetY: 5
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          legend: {
            showForSingleSeries: true,
            position: 'bottom'
          },
          theme: {
            mode: 'light',
            palette: 'palette6' // upto palette10
          }
        }
      }
    ]
  };

  get minHeightChart() {
    return this.parentHeightOffset + this.defaultHeightChart;
  }

  get maxHeightChart() {
    const baseH = this.parentHeightOffset * 10 + this.defaultHeightChart;
    return this.smonStore.chartList.length > 1 ? baseH + 180 : baseH;
  }

  get chartHeight() {
    return this.smonStore.chartList.length > 1
      ? 'auto'
      : this.maxHeightChart - this.parentHeightOffset;
  }

  get chartStyle() {
    return `min-height:${this.minHeightChart}px;max-height:${this.maxHeightChart}px;`;
  }

  created() {
    this.fecthChartSeries();
  }

  beforeDestroy() {
    this.$refs.realtimeChart.destroy();
  }

  private toggleOnSpinner() {
    this.visible = true;
    this.showSimulatedReturnData = false;
  }

  private toggleOffSpinner() {
    this.visible = false;
    this.showSimulatedReturnData = true;
  }

  @Watch('smonStore.enableChartLegend')
  public handleToogleOnOffLegend(showLegend: boolean) {
    const first = this.smonStore.getFirstChart;
    if (first.id == this.chartId) {
      this.$refs.realtimeChart.updateOptions(
        {
          legend: {
            show: showLegend
          }
        },
        false,
        false,
        true
      );
    }
  }

  @Watch('smonStore.enableChartSync')
  public handleToogleOnOffSyncChart(syncChart: boolean) {
    this.$refs.realtimeChart.updateOptions(
      {
        chart: {
          group: syncChart ? this.chartGroup : this.chartId
        }
      },
      false,
      false,
      false
    );
    // }
  }

  @Watch('smonStore.chartLegendType')
  public handleToogleLegendType(newVal: LEGEND_TYPE) {
    this.$refs.realtimeChart.updateOptions(
      {
        legend: {
          position: newVal == LEGEND_TYPE.BY_DAY ? 'right' : 'bottom',
          inverseOrder: this.smonStore.currentLegendType == LEGEND_TYPE.BY_DAY
        }
      },
      false,
      false,
      true
    );
  }

  @Watch('smonStore.requireRenderChart')
  onChangedrequireRenderChart(val: boolean) {
    if (val) {
      // this.toggleOnSpinner();
      this.fecthChartSeries();
    }
  }

  @Watch('layoutStore.forceRefresh')
  onChangedForceRefresh(val: boolean) {
    if (val) {
      //Do fetch series when user triggered refresh action
      this.fecthChartSeries().then(() => {
        this.layoutStore.setForceRefresh(false);
      });
    }
  }

  @Watch('layoutStore.tickTimeInterval')
  onChangedTickInterval(val: number) {
    if (val > 0) {
      //Do fetch series when user triggered refresh action
      this.fecthChartSeries();
    }
  }

  @Watch('layoutStore.timeRangeInterval')
  onChangedTimeRangeInterval() {
    //Do fetch series when user triggered refresh action
    this.fecthChartSeries();
  }

  private renderNodataChart() {
    this.$refs.realtimeChart.updateOptions(
      {
        noData: {
          text: 'No available data',
          style: {
            fontSize: '18px'
          }
        }
      },
      false,
      false,
      false //Not synchronized all charts
    );
  }

  private async fecthChartSeries() {
    this.toggleOnSpinner();

    const timeRange = calculateTimeRange(this.layoutStore.timeRangeInterval);
    const dayRange = [0, 7].join(',');
    const timeInterval = this.layoutStore.tickTimeInterval; // [1, 2, 3, 5, 10][0];
    const chartType = this.smonStore.currentLegendType;
    try {
      const chartRes = await this.fetchChartData(
        timeRange,
        dayRange,
        timeInterval,
        chartType
      );
      if (chartRes.data.error < 0) {
        // Render nodata
        this.renderNodataChart();
      }
      const series: ChartSeries[] = chartRes.data.data.result?.listSeries || [];
      this.chartSeries = series;
    } catch (error) {
      this.$q.notify({
        color: 'negative',
        position: 'top',
        message: `fecthChartSeries failed. chartId:${this.chartId}, error:${error}`,
        icon: 'report_problem'
      });
    }
    this.smonStore.setToggleRenderChart(false);
    this.toggleOffSpinner();
  }

  private fetchChartData(
    timeRange: any,
    dayRange: string,
    timeInterval: number,
    chartType: string
  ) {
    switch (this.smonStore.currentMetricType) {
      case METRIC_TYPE.PROFILER:
        return this.apiCaller.getChartData(
          this.smonStore.appName,
          this.smonStore.currentProfilerApi,
          this.smonStore.buildMetricParams,
          this.serverIp,
          timeRange.from,
          timeRange.to,
          dayRange,
          timeInterval,
          chartType
        );
      case METRIC_TYPE.TSERVER:
        return this.apiCaller.getChartDataTServer(
          this.smonStore.appName,
          this.smonStore.buildMetricParams,
          this.serverIp,
          timeRange.from,
          timeRange.to,
          dayRange,
          timeInterval,
          chartType
        );
      case METRIC_TYPE.HSERVER:
        return this.apiCaller.getChartDataHServer(
          this.smonStore.appName,
          this.smonStore.buildMetricParams,
          this.serverIp,
          timeRange.from,
          timeRange.to,
          dayRange,
          timeInterval,
          chartType
        );
      case METRIC_TYPE.ZEXECUTORS:
        return this.apiCaller.getChartDataExecutor(
          this.smonStore.appName,
          this.smonStore.zexecutorName,
          this.smonStore.buildMetricParams,
          this.serverIp,
          timeRange.from,
          timeRange.to,
          dayRange,
          timeInterval,
          chartType
        );
      case METRIC_TYPE.ZCOMWORKER:
        const cmdArr = this.smonStore.currentProfilerApi.split(' ');
        return this.apiCaller.getChartDataComServer(
          this.smonStore.appName,
          cmdArr[0],
          cmdArr[1],
          this.smonStore.buildMetricParams,
          this.serverIp,
          timeRange.from,
          timeRange.to,
          dayRange,
          timeInterval,
          chartType
        );
      default:
        break;
    }
    return Promise.reject();
  }
}
</script>
