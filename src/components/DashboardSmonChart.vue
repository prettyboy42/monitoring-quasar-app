<template>
  <card-base>
    <apexchart
      ref="realtimeChart"
      type="line"
      :width="chartWidth"
      :height="chartHeight"
      :options="chartOptions"
      :series="chartSeries"
    />
  </card-base>
</template>

<script lang="ts">
import { Vue, Component, Inject, Prop, Watch } from 'vue-property-decorator';
import SmonObservable, { LEGEND_TYPE } from '../store/observable-smon';
import { getModule } from 'vuex-module-decorators';
import LayoutModule, { TIME_RANGE_ENUM } from '../store/layouts/layout-module';
import ProfilerService from '../boot/services/monitor-profiler.service';
import { ChartSeries, isNullOrEmpty } from './models';
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
  @Inject('storeObservable') readonly smonStore!: SmonObservable;
  private store = getModule(LayoutModule, this.$store);

  private readonly apiCaller = new ProfilerService();
  @Prop({ default: '0' }) chartId!: number | string;
  @Prop({ default: 'defaultGroup' }) chartGroup!: string;
  @Prop({ default: '0.0.0.0' }) serverIp!: string;
  @Prop({ default: '100%' }) chartWidth!: number;
  @Prop({ default: '300' }) chartHeight!: number; //auto

  public chartSeries: ChartSeries[] = [];
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
    chart: {
      id: this.formatChartId,
      group: this.chartGroup,
      // height: this.chartHeight,
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
      }
    },
    legend: {
      show: true,
      showForSingleSeries: this.smonStore.metricValue?.length > 1 || false,
      position:
        this.smonStore.legendType == LEGEND_TYPE.BY_DAY ? 'right' : 'bottom',
      inverseOrder: this.smonStore.legendType == LEGEND_TYPE.BY_DAY,
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

  public get formatChartId(): string {
    return `realtimeChart_${this.chartId}`;
  }

  public get chartTitle(): string {
    return this.serverIp || 'No title';
  }

  created() {
    if (this.chartSeries.length == 0 && !this.smonStore.isFetchingData) {
      //Do fetch if chartSeries is empty
      this.fecthChartSeries();
    }
  }

  @Watch('serverIp')
  onChangedServerIp(newVal: string) {
    if (isNullOrEmpty(newVal)) return;

    //Trigger this function in order to change title of chart
    this.$refs.realtimeChart.updateOptions(
      {
        title: {
          text: this.chartTitle
        }
      },
      true,
      true,
      false //Not synchronized all charts
    );
  }

  @Watch('smonStore.showLegend')
  public async handleToogleOnOffLegend(showLegend: boolean) {
    this.chartOptions = Object.assign({}, this.chartOptions, {
      legend: {
        show: showLegend
      }
    });
  }

  @Watch('smonStore.syncChart')
  public handleToogleOnOffSyncChart(syncChart: boolean) {
    this.chartOptions = Object.assign({}, this.chartOptions, {
      chart: {
        group: syncChart ? this.chartGroup : this.chartId
      }
    });
  }

  @Watch('smonStore.legendType')
  public handleToogleLegendType(newVal: LEGEND_TYPE) {
    this.chartOptions = Object.assign({}, this.chartOptions, {
      legend: {
        position: newVal == LEGEND_TYPE.BY_DAY ? 'right' : 'bottom',
        inverseOrder: this.smonStore.legendType == LEGEND_TYPE.BY_DAY
      }
    });
  }

  @Watch('smonStore.requireRenderChart')
  onChangedrequireRenderChart(val: boolean) {
    if (val) {
      this.fecthChartSeries();
    }
  }

  @Watch('store.forceRefresh')
  onChangedForceRefresh(val: boolean) {
    if (val) {
      //Do fetch series when user triggered refresh action
      this.fecthChartSeries().then(() => {
        this.store.setForceRefresh(false);
      });
    }
  }

  @Watch('store.tickTimeInterval')
  onChangedTickInterval(val: number) {
    if (val > 0) {
      //Do fetch series when user triggered refresh action
      this.fecthChartSeries().then(() => {
        this.store.setForceRefresh(false);
      });
    }
  }

  @Watch('store.timeRangeInterval')
  onChangedTimeRangeInterval() {
    //Do fetch series when user triggered refresh action
    this.fecthChartSeries().then(() => {
      this.store.setForceRefresh(false);
    });
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

  private calculateTimeRange(val: number) {
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

  private async fecthChartSeries() {
    // const to = Date.now();
    // const diff = date.subtractFromDate(to, { minutes: 30 });
    // const from = diff.getTime();

    const timeRange = this.calculateTimeRange(this.store.timeRangeInterval);
    const dayRange = [0, 7].join(',');
    const timeInterval = this.store.tickTimeInterval; // [1, 2, 3, 5, 10][0];
    const chartType = this.smonStore.legendType;
    try {
      const chartRes = await this.apiCaller.getChartData(
        this.smonStore.appName,
        this.smonStore.threadApiName,
        this.smonStore.metricValue.join(','),
        this.serverIp,
        timeRange.from,
        timeRange.to,
        dayRange,
        timeInterval,
        chartType
      );
      if (chartRes.data.error < 0) {
        // Render nodata
        this.renderNodataChart();
      }
      this.chartSeries = chartRes.data.data.result?.listSeries || [];
    } catch (error) {
      this.$q.notify({
        color: 'negative',
        position: 'top',
        message: `fecthChartSeries failed. serverIp:${this.serverIp}, chartId:${this.chartId}`,
        icon: 'report_problem'
      });
    }
    this.smonStore.toogleChartRender(false);
  }
}
</script>
