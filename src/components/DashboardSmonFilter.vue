<template>
  <q-card style="width:100%;">
    <q-separator inset />
    <q-card-section>
      <div class="row q-col-gutter-sm items-start">
        <div class="col" style="max-width: 300px;">
          <dashboard-smon-filter-app-name />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-1">
          <dashboard-smon-filter-metric-type />
        </div>
        <div :class="smonStore.isProfilerType?'col':'col q-pa-md'">
          <div class="q-gutter-sm items-start">
            <dashboard-smon-filter-profiler />
            <div class="column">
              <div
                class="q-field__label no-pointer-events ellipsis"
                style="font-size:13px;"
              >Metric type</div>
              <dashboard-smon-filter-metric-value />
            </div>
          </div>
        </div>

        <div class="col" style="max-width: 390px;">
          <div class="row q-gutter-md justify-end">
            <q-toggle class="col" v-model="syncChart" color="green" label="Sync" />
            <q-toggle v-model="showLegend" color="green" label="Legend">
              <q-tooltip>Show ON or OFF legend</q-tooltip>
            </q-toggle>
            <q-btn-toggle
              v-model="legendType"
              no-caps
              toggle-color="green"
              size="md"
              :options="legendTypeOptions"
            />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
import SmonObservable, { LEGEND_TYPE } from '../store/observable-smon';
import { isNullOrEmpty } from './models';
import { getModule } from 'vuex-module-decorators';
import SmonModule from '../store/smon/smon-module';

@Component({
  components: {
    DashboardSmonFilterAppName: () =>
      import('components/DashboardSmonFilterAppName.vue'),
    DashboardSmonFilterMetricType: () =>
      import('components/DashboardSmonFilterMetricType.vue'),
    DashboardSmonFilterMetricValue: () =>
      import('components/DashboardSmonFilterMetricValue.vue'),
    DashboardSmonFilterProfiler: () =>
      import('components/DashboardSmonFilterProfiler.vue')
  }
})
export default class DashboardSmonFilter extends Vue {
  // @Inject('storeObservable') readonly smonStore!: SmonObservable;
  private readonly smonStore = getModule(SmonModule, this.$store);

  public legendTypeOptions: object[] = [
    LEGEND_TYPE.TIME_RANGE,
    LEGEND_TYPE.BY_DAY
  ].map(it =>
    Object.assign({}, { label: it.toString(), value: it.toString() })
  );
  public get showLegend() {
    return this.smonStore.enableChartLegend;
  }
  public set showLegend(newVal: boolean) {
    this.smonStore.setOnOffLegendMode(newVal);
  }

  get syncChart() {
    return this.smonStore.enableChartSync;
  }
  set syncChart(val: boolean) {
    this.smonStore.setChartSyncMode(val);
  }

  get legendType() {
    return this.smonStore.chartLegendType;
  }

  set legendType(newVal: string) {
    this.smonStore.setLegendType(newVal);
  }
}
</script>
