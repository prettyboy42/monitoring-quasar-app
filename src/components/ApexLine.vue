<template>
  <card-base>
    <apexchart
      ref="realtimeChart"
      type="line"
      height="250"
      :options="buildChartOptions()"
      :series="series"
    />
  </card-base>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import CardBase from 'components/CardBase.vue';

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
  @Prop() readonly chartId!: string;
  @Prop() readonly chartGroup!: string;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  public series: any = [
    {
      name: 'Desktops',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 99]
    }
  ];

  mounted() {
    this.setDataLineChart();
  }

  public getRandomArbitrary(): number {
    return Math.floor(Math.random() * 99);
  }
  setDataLineChart(): void {
    setInterval(() => {
      this.series[0].data.splice(0, 1);
      this.series[0].data.push(this.getRandomArbitrary());
      this.updateSeriesLine();
    }, 5000);
  }
  public updateSeriesLine(): void {
    // get status
    // console.log('this.$q.dark.isActive:' + this.$q.dark.isActive); // true, false
    // get configured status
    // console.log('this.$q.dark.mode:' + this.$q.dark.mode); // "auto", true, false
    // this.$refs.realtimeChart.updateSeries(
    //   [
    //     {
    //       data: this.series[0].data
    //     }
    //   ],
    //   false,
    //   true
    // );
  }

  public buildChartOptions(): any {
    let chartOptions: any = {
      // colors: ['#FCCF31', '#17ead9', '#f02fc2'],
      theme: {
        mode: 'light',
        palette: 'palette10' // upto palette10
      },
      chart: {
        id: this.chartId,
        group: this.chartGroup,
        height: 350,
        type: 'line',
        toolbar: {
          show: true,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            customIcons: [
              {
                icon: '<button flat round color="red" icon="favorite" />',
                index: 0,
                title: 'tooltip of the icon',
                class: '',
                click: function() {
                  console.log('cliked');
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
        curve: 'smooth'
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
      title: {
        text: 'Line',
        align: 'left',
        style: {
          color: '#131413'
        }
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep'
        ],
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
              mode: 'dark',
              palette: 'palette6' // upto palette10
            }
          }
        }
      ]
    };
    return chartOptions;
  }
}
</script>
