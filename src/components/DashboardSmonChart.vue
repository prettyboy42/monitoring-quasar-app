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
import SmonObservable, {
  LEGEND_TYPE
} from '../pages/dashboard-smon-observable';
import { getModule } from 'vuex-module-decorators';
import LayoutStoreModule from '../layouts/LayoutStoreModule';
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
  private store = getModule(LayoutStoreModule);

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
      text: 'Loading...'
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
      }
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

  public buildChartOptions() {
    return {
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
        text: 'Loading...'
      },
      chart: {
        id: this.formatChartId,
        group: this.chartGroup,
        height: 350,
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
        }
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
            color: '#FCCF31'
          }
        }
      },
      // legend: {
      //   show: false,
      //   showForSingleSeries: false,
      //   position: 'right',
      //   verticalAlign: 'top',
      //   containerMargin: {
      //     left: 35,
      //     right: 60
      //   }
      // },
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
  }

  created() {
    if (this.chartSeries.length == 0) {
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
  public handleToogleOnOffLegend(showLegend: boolean) {
    console.log(`handleToogleOnOffLegend is ${showLegend}`);
    this.chartOptions = Object.assign({}, this.chartOptions, {
      legend: {
        show: showLegend
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

  private async fecthChartSeries() {
    const to = Date.now();
    const diff = date.subtractFromDate(to, { minutes: 30 });
    const from = diff.getTime();
    const dayRange = [0, 7].join(',');
    const timeInterval = [1, 2, 3, 5, 10][0];
    const chartType = this.smonStore.legendType;
    try {
      const chartRes = await this.apiCaller.getChartData(
        this.smonStore.appName,
        this.smonStore.threadApiName,
        this.smonStore.metricValue.join(','),
        this.serverIp,
        from,
        to,
        dayRange,
        timeInterval,
        chartType
      );

      this.chartSeries = chartRes.data.data.result?.listSeries || [];
      this.smonStore.toogleChartRender(false);
    } catch (error) {
      this.$q.notify({
        color: 'negative',
        position: 'top',
        message: `fecthChartSeries failed. serverIp:${this.serverIp}, chartId:${this.chartId}`,
        icon: 'report_problem'
      });
    }
  }
}
</script>
