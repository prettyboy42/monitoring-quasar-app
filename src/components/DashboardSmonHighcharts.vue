<template>
  <card-base :style="chartStyle">
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <highcharts
        v-show="showSimulatedReturnData"
        ref="realtimeChart"
        constructor-type="chart"
        :deepCopyOnUpdate="deepCopyOnUpdate"
        :options="chartOptions"
        :updateArgs="updateArgs"
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
import LayoutModule, { TIME_RANGE_ENUM } from '../store/layouts/layout-module';
import SmonModule from '../store/smon/smon-module';
import ProfilerService from '../boot/services/monitor-profiler.service';
import { ChartSeries, isNullOrEmpty, calculateTimeRange } from './models';
import { LEGEND_TYPE } from '../store/smon/constants';
import Highcharts from 'highcharts';

@Component({
  components: {
    CardBase: () => import('components/CardBase.vue')
  }
})
export default class DashboardSmonHighcharts extends Vue {
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
  @Prop({ default: '300' }) chartHeight!: number; //auto

  public visible: boolean = true;
  public showSimulatedReturnData: boolean = false;
  public deepCopyOnUpdate: boolean = false;
  public updateArgs: any[] = [true, true, { duration: 1000 }];
  public readonly colors: string[] = [
    'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
    'linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)',
    'linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)',
    'linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)'
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public chartOptions: any = {
    chart: {
      type: 'spline',
      zoomType: 'x'
      // height: this.chartHeight
    },
    title: {
      text: this.chartTitle
    },
    subtitle: {
      text: ''
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    xAxis: {
      type: 'datetime',
      accessibility: {
        rangeDescription: 'Range: 2010 to 2017'
      },
      crosshair: true
    },
    legend: {
      layout: 'horizontal',
      horizontalAlign: 'middle'
    },
    tooltip: {
      enabled: true,
      split: false,
      shared: true,
      crosshairs: true
    },
    plotOptions: {
      spline: {
        lineWidth: 2,
        dataLabels: {
          enabled: false
        },
        marker: {
          enabled: false
        }
      },
      series: {
        //https://api.highcharts.com/highcharts/plotOptions.series.turboThreshold
        turboThreshold: 5000
      }
    },
    series: [],
    noData: {
      style: {
        fontWeight: 'bold',
        fontSize: '18px',
        color: '#a87732'
      }
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }
      ]
    }
  };

  get chartStyle() {
    return `min-height:${this.chartHeight}px;max-height:450px;`;
  }

  created() {
    this.fecthChartSeries();
  }

  private toggleOnSpinner() {
    this.visible = true;
    this.showSimulatedReturnData = false;
  }

  private toggleOffSpinner() {
    this.visible = false;
    this.showSimulatedReturnData = true;
  }

  @Watch('layoutStore.leftDrawerOpen')
  public handleOnChangedScreen(newVal: boolean) {
    //Use this trick in order to redraw chart when dashboard size changed
    this.fecthChartSeries().then(() => {
      //this.$refs.realtimeChart.chart.setSize(null,null);
      this.$refs.realtimeChart.chart.reflow();
    });
  }

  @Watch('smonStore.enableChartLegend')
  public handleToogleOnOffLegend(showLegend: boolean) {
    this.chartOptions = Object.assign({}, this.chartOptions, {
      legend: {
        enabled: showLegend
      }
    });
  }

  @Watch('smonStore.chartLegendType')
  public handleToogleLegendType(newVal: LEGEND_TYPE) {
    // this.toggleOnSpinner();
    this.fecthChartSeries().then(() => {
      this.chartOptions = Object.assign({}, this.chartOptions, {
        legend: {
          layout: newVal == LEGEND_TYPE.BY_DAY ? 'vertical' : 'horizontal',
          align: newVal == LEGEND_TYPE.BY_DAY ? 'right' : 'center',
          reversed: newVal == LEGEND_TYPE.BY_DAY,
          verticalAlign: newVal == LEGEND_TYPE.BY_DAY ? 'top' : 'bottom'
        }
      });
    });
  }

  @Watch('smonStore.requireRenderChart')
  onChangedrequireRenderChart(val: boolean) {
    if (val) {
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

  private async fecthChartSeries() {
    this.toggleOnSpinner();

    const timeRange = calculateTimeRange(this.layoutStore.timeRangeInterval);
    const dayRange = [0, 7].join(',');
    const timeInterval = this.layoutStore.tickTimeInterval; // [1, 2, 3, 5, 10][0];
    const chartType = this.smonStore.currentLegendType;
    try {
      const chartRes = await this.apiCaller.getChartData(
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

      const series: ChartSeries[] = chartRes.data.data.result?.listSeries || [];
      this.chartOptions = Object.assign({}, this.chartOptions, {
        series: series
      });
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
}
</script>
