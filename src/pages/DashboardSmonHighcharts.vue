<template>
  <q-page :class="$q.platform.is.desktop===true?'q-pa-md':'q-pa-xs'">
    <div class="row q-pb-sm">
      <div class="col">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" to="/" />
          <q-breadcrumbs-el label="Smon Highcharts" icon="widgets" to="/dashboard-smon-highcharts" />
        </q-breadcrumbs>
      </div>
    </div>
    <div v-show="$q.platform.is.desktop === true" class="row q-pb-md">
      <div class="col-12">
        <dashboard-smon-filter />
      </div>
    </div>
    <div
      :class="$q.platform.is.desktop===true?'row q-col-gutter-sm justify-start':'column q-col-gutter-xs justify-center'"
    >
      <div :class="chartGridClass" v-for="item in smonStore.chartList" :key="item.id">
        <dashboard-smon-highcharts
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
import Highcharts from 'highcharts';
import { LEGEND_TYPE } from '../store/smon/constants';

@Component({
  components: {
    DashboardSmonFilter: () => import('components/DashboardSmonFilter.vue'),
    DashboardSmonHighcharts: () =>
      import('components/DashboardSmonHighcharts.vue')
  }
})
export default class DashboardSmon extends Vue {
  private readonly smonStore = getModule(SmonModule, this.$store);

  private refreshChartInterval!: NodeJS.Timeout;

  public chartGroup: string = 'serviceMon';

  created() {
    if (!this.smonStore.isInitialized) {
      this.smonStore.fetchOrInitStoreByApp();
    }
  }

  mounted() {
    this.onChangedSyncChartMode(this.smonStore.enableChartSync);
  }

  beforeDestroy() {
    clearInterval(this.refreshChartInterval);
    this.onChangedSyncChartMode(false);
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

  @Watch('smonStore.chartLegendType')
  public handleToogleLegendType(newVal: string) {
    if (newVal == LEGEND_TYPE.BY_DAY) {
      this.removeSyncChart();
      this.registerSyncChart();
    }
  }

  @Watch('smonStore.enableChartSync')
  private onChangedSyncChartMode(newVal: boolean) {
    if (newVal) {
      this.registerSyncChart();
    } else {
      this.removeSyncChart();
    }
  }

  private registerSyncChart() {
    /**
     * In order to synchronize tooltips and crosshairs, override the
     * built-in events with handlers defined on the parent element.
     */
    ['mousemove', 'mouseleave', 'touchmove', 'touchstart'].forEach(
      eventType => {
        this.$el.addEventListener(eventType, this.handleSynchronizedChart);
      }
    );
  }

  private removeSyncChart() {
    ['mousemove', 'mouseleave', 'touchmove', 'touchstart'].forEach(
      eventType => {
        this.$el.removeEventListener(eventType, this.handleSynchronizedChart);
      }
    );
  }

  private handleSynchronizedChart(e: any) {
    for (let i = 0; i < Highcharts.charts.length; ++i) {
      let chart = Highcharts.charts[i];
      if (chart) {
        let event = chart.pointer.normalize(e.originalEvent || e.target); // Find coordinates within the chart
        event.chartX = e.offsetX;
        let point: any;
        for (let j = 0; j < chart.series.length && !point; ++j) {
          point = chart.series[j].searchPoint(event, true);
        }
        if (!point) {
          return;
        }
        if (e.type === 'mousemove') {
          if (typeof point.highlight === 'function') {
            point.highlight(event);
          }
        } else {
          if (typeof point.highlight === 'function') {
            point.onMouseOut();
          }

          chart.tooltip.hide(point);
          chart.xAxis[0].hideCrosshair();
        }
      }
    }
  }
}
</script>
