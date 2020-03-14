<template>
  <card-base>
    <apexchart
      ref="realtimeChart"
      type="line"
      height="250"
      :options="chartOptions"
      :series="series"
    />
  </card-base>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import CardBase from 'components/CardBase.vue';
import { ChartSeries } from './models';

@Component({
  components: {
    CardBase
  }
})
export default class ApexLine extends Vue {
  public $refs!: {
    //A new ! post-fix expression operator may be used to assert that its operand is non-null and non-undefined in contexts
    realtimeChart: HTMLFormElement;
  };
  @Prop() chartId!: string;
  @Prop() chartGroup!: string;
  @Prop() chartTitle!: string;
  public updateSeriesInterval!: NodeJS.Timeout;

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
    chart: {
      id: this.chartId,
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
      width: 2
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
      type: 'number',
      // categories: [
      //   'Jan',
      //   'Feb',
      //   'Mar',
      //   'Apr',
      //   'May',
      //   'Jun',
      //   'Jul',
      //   'Aug',
      //   'Sep'
      // ],
      labels: {
        style: {
          colors: '#a35822'
        }
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
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public series: any = [
    {
      name: 'Desktops',
      data: [
        9,
        98,
        34,
        54,
        67,
        45,
        49,
        34,
        73,
        98,
        130,
        32,
        43,
        91,
        65,
        87,
        43,
        51,
        56,
        124,
        26
      ]
    },
    {
      name: 'Android',
      data: [
        4,
        23,
        20,
        51,
        67,
        45,
        49,
        62,
        73,
        98,
        130,
        32,
        43,
        91,
        99,
        41,
        87,
        51,
        75,
        102,
        120
      ]
    },
    {
      name: 'IOS',
      data: [
        4,
        33,
        25,
        51,
        67,
        45,
        13,
        23,
        73,
        54,
        173,
        32,
        89,
        91,
        65,
        41,
        87,
        124,
        57,
        166,
        176
      ]
    }
  ];

  mounted() {
    if (this.$store.state.layout.refreshTimeInterval > 0) {
      this.setDataLineChart(this.$store.state.layout.refreshTimeInterval);
    }
  }

  beforeDestroy() {
    clearInterval(this.updateSeriesInterval);
  }

  public getRandomArbitrary(): number {
    return Math.floor(Math.random() * 99);
  }
  setDataLineChart(refreshInterval: number): void {
    this.updateSeriesInterval = setInterval(() => {
      this.series[0].data.splice(0, 1);
      this.series[0].data.push(this.getRandomArbitrary());
      this.series[1].data.splice(0, 1);
      this.series[1].data.push(this.getRandomArbitrary());
      this.series[2].data.splice(0, 1);
      this.series[2].data.push(this.getRandomArbitrary());
      this.updateSeriesLine();
    }, refreshInterval);
  }
  public updateSeriesLine(): void {
    this.$refs.realtimeChart.updateSeries(
      [
        {
          data: this.series[0].data
        },
        {
          data: this.series[1].data
        },
        {
          data: this.series[2].data
        }
      ],
      false,
      true
    );
  }

  @Watch('$store.state.layout.refreshTimeInterval')
  private onChangedRefreshTimeInterval(newVal: number) {
    if (newVal == 0) {
      clearInterval(this.updateSeriesInterval);
    } else {
      this.setDataLineChart(newVal);
    }
  }

  @Watch('$store.state.layout.forceRefresh')
  onChangedForceRefresh(val: boolean) {
    this.series[0].data.splice(0, 1);
    this.series[0].data.push(this.getRandomArbitrary());
    this.series[1].data.splice(0, 1);
    this.series[1].data.push(this.getRandomArbitrary());
    this.series[2].data.splice(0, 1);
    this.series[2].data.push(this.getRandomArbitrary());
    this.updateSeriesLine();

    this.$store.dispatch('layout/setForceRefresh', false);
  }
}
</script>
