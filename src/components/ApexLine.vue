<template>
  <card-base>
    <apexchart
      ref="realtimeChart"
      type="line"
      height="200"
      :options="chartOptions"
      :series="series"
    />
  </card-base>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import CardBase from 'components/CardBase.vue';

@Component({
  components: {
    CardBase
  }
})
export default class ApexLine extends Vue {
  $refs!: {
    realtimeChart: HTMLFormElement;
  };
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public series: any = [
    {
      name: 'Desktops',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 99]
    }
  ];
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public chartOptions: any = {
    colors: ['#FCCF31', '#17ead9', '#f02fc2'],
    chart: {
      height: 350,
      type: 'line'
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
    }
  };

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
    }, 3000);
  }
  public updateSeriesLine(): void {
    this.$refs.realtimeChart.updateSeries(
      [
        {
          data: this.series[0].data
        }
      ],
      false,
      true
    );
  }
}
</script>
