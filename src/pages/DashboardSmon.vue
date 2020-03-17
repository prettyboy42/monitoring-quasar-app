<template>
  <q-page :class="$q.platform.is.desktop===true?'q-pa-md':'q-pa-xs'">
    <div class="row q-pb-sm">
      <div class="col">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" to="/" />
          <q-breadcrumbs-el label="Smon Apexcharts" icon="widgets" to="/dashboard-smon" />
        </q-breadcrumbs>
      </div>
    </div>
    <div v-show="$q.platform.is.desktop === true" class="row q-pb-md">
      <div class="col-12">
        <dashboard-smon-filter2 />
      </div>
    </div>
    <div
      :class="$q.platform.is.desktop===true?'row q-col-gutter-sm justify-start':'column q-col-gutter-xs justify-center'"
    >
      <div :class="chartGridClass" v-for="item in smonStore.chartList" :key="item.id">
        <dashboard-smon-chart
          :chart-id="item.id"
          :chart-title="item.title"
          :chart-group="chartGroup"
          :server-ip="item.serverIp"
        />
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
import { Vue, Component, Provide, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import SmonModule from '../store/smon/smon-module';

@Component({
  components: {
    DashboardSmonFilter2: () => import('components/DashboardSmonFilter2.vue'),
    DashboardSmonChart: () => import('../components/DashboardSmonChart.vue')
  }
})
export default class DashboardSmon extends Vue {
  private readonly smonStore = getModule(SmonModule, this.$store);

  private refreshChartInterval!: NodeJS.Timeout;
  public chartGroup: string = 'serviceMon';

  async created() {
    if (!this.smonStore.isInitialized) {
      await this.smonStore.fetchOrInitStoreByApp();
    }
  }

  beforeDestroy() {
    clearInterval(this.refreshChartInterval);
  }

  get charts() {
    return this.smonStore.charts;
  }

  public get chartGridClass(): string {
    let gridClass: string[] = ['col-xs-12', 'col-sm-6'];
    if (this.smonStore.chartList.length == 0) return gridClass.join(' ');

    if (this.smonStore.chartList.length <= 2) {
      gridClass.push('col-md');
    } else if (this.smonStore.chartList.length <= 4) {
      gridClass.push('col-md-6');
    } else {
      gridClass.push('col-md-4');
    }
    return gridClass.join(' ');
  }

  private registerRefreshChartInterval(val: number) {
    if (val > 0) {
      this.refreshChartInterval = setInterval(() => {
        //Trigger render chart
        this.smonStore.setToggleRenderChart(true);
      }, val);
    }
  }

  @Watch('$store.state.layout.refreshTimeInterval')
  private onChangedRefreshTimeInterval(newVal: number) {
    if (newVal == 0) {
      clearInterval(this.refreshChartInterval);
    } else {
      this.registerRefreshChartInterval(newVal);
    }
  }
}
</script>
