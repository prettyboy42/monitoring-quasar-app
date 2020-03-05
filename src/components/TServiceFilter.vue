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
        <div :class="smonStore.metricType==='Profiler'?'col':'col q-pa-md'">
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
            <q-toggle class="col" v-model="smonStore.syncChart" color="green" label="Sync" />
            <q-toggle v-model="smonStore.showLegend" color="green" label="Legend">
              <q-tooltip>Show ON or OFF legend</q-tooltip>
            </q-toggle>
            <q-btn-toggle
              v-model="smonStore.legendType"
              no-caps
              toggle-color="green"
              size="md"
              @input="handleChangedLegendTypeFn"
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
import SmonObservable, {
  LEGEND_TYPE
} from '../pages/dashboard-smon-observable';
import { isNullOrEmpty } from './models';

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
export default class TServiceFilter extends Vue {
  @Inject('storeObservable') readonly smonStore!: SmonObservable;
  public legendTypeOptions: object[] = [
    LEGEND_TYPE.TIME_RANGE,
    LEGEND_TYPE.BY_DAY
  ].map(it =>
    Object.assign({}, { label: it.toString(), value: it.toString() })
  );

  public handleChangedLegendTypeFn(val: string) {
    if (isNullOrEmpty(val)) return;
    this.smonStore.toogleChartRender(true);
  }
}
</script>
