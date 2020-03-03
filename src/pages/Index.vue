<template>
  <q-page :class="$q.platform.is.desktop===true?'q-pa-md':'q-pa-xs'">
    <div v-show="$q.platform.is.desktop === true" class="row q-pb-md">
      <div class="col-12">
        <t-service-filter />
      </div>
    </div>
    <div
      :class="$q.platform.is.desktop===true?'row q-col-gutter-sm justify-center':'column q-col-gutter-xs justify-center'"
    >
      <div
        class="col-xs-12 col-sm-6 col-md-3"
        v-for="(serverIp,index) in storeObs.serverIpList"
        :key="index"
      >
        <dashboard-smon-chart :chart-id="index+1" :chart-group="chartGroup" :server-ip="serverIp" />
        <!-- <apex-line
          :chart-id="i+1"
          :chart-group="chartGroup"
          :chart-title="serverIp"
          :chart-series="series"
          :bgColorCard="colors[i - 1]"
        />-->
      </div>
    </div>
    <div class="row q-col-gutter-md q-px-md q-py-md"></div>
    <!-- place QPageScroller at end of page -->
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="accent" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import SmonObservable from './dashboard-smon-observable';
import ProfilerService from '../boot/services/monitor-profiler.service';

@Component({
  components: {
    // ApexLine: () => import('components/ApexLine.vue'),
    TServiceFilter: () => import('components/TServiceFilter.vue'),
    DashboardSmonChart: () => import('../components/DashboardSmonChart.vue')
  }
})
export default class PageIndex extends Vue {
  @Provide('storeObservable') storeObs = new SmonObservable();
  private readonly apiCaller = new ProfilerService();

  public colors: string[] = [
    'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
    'linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)',
    'linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)',
    'linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)'
  ];
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public series: any = [
    {
      name: 'Desktops',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 99]
    },
    {
      name: 'Android',
      data: [4, 23, 20, 51, 67, 45, 75, 102, 120]
    },
    {
      name: 'IOS',
      data: [8, 23, 30, 45, 87, 75, 90, 127, 134]
    }
  ];
  public chartGroup: string = 'serviceMon';

  created() {
    this.initData();
  }

  private async initData() {
    const res = await this.storeObs.fetchDataForFirst();
    if (res) {
      //Trigger render chart
      this.storeObs.toogleChartRender(true);
    }
  }
}
</script>
