<template>
  <q-card style="width:100%;">
    <q-separator inset />
    <q-card-section>
      <div class="row q-col-gutter-sm justify-end">
        <div class="col">
          <dashboard-smon-filter-app-name />
        </div>
        <div class="col-md-3">
          <dashboard-smon-filter-profiler />
        </div>
        <div class="col-md-1">
          <dashboard-smon-filter-metric-value />
        </div>
        <div class="col-md-1">
          <dashboard-smon-filter-metric-type />
        </div>
        <div class="col-md-1" style="max-width:50px;">
          <div class="q-pa-sm">
            <q-btn-dropdown dense flat no-caps color="default" dropdown-icon="more_vert" size="md">
              <div class="row q-gutter-md justify-end">
                <q-toggle class="col" v-model="syncChart" color="green" label="Sync" />
                <q-toggle v-model="showLegend" color="green" label="Legend">
                  <q-tooltip>Show ON or OFF legend</q-tooltip>
                </q-toggle>
                <!-- <q-btn-toggle
              v-model="legendType"
              no-caps
              toggle-color="green"
              size="md"
              :options="legendTypeOptions"
                />-->
                <q-select
                  class="col"
                  dense
                  color="orange"
                  v-model="legendType"
                  :options="legendTypeOptions"
                  size="md"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" />
                  </template>
                </q-select>
              </div>
            </q-btn-dropdown>
          </div>
        </div>
      </div>

      <!-- <div class="row q-col-gutter-sm items-start">
        <div class="col" style="max-width: 300px;">
          <dashboard-smon-filter-app-name />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-1">
          <dashboard-smon-filter-metric-type />
        </div>
        <div :class="smonStore.isProfilerType||smonStore.isZExecutorType?'col':'col q-pa-md'">
          <div class="q-gutter-sm items-start">
            <dashboard-smon-filter-profiler />
            <div v-if="smonStore.isZExecutorType" class="column">
              <label
                class="q-field__label no-pointer-events ellipsis"
                style="font-size:13px;"
              >Executor</label>
              <q-option-group
                v-model="zexecutorName"
                :options="smonStore.zexecutorNameList"
                type="radio"
                color="primary"
                size="md"
                inline
              />
            </div>
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
      </div>-->
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
import SmonObservable, { LEGEND_TYPE } from '../store/observable-smon';
import { isNullOrEmpty } from './models';
import { getModule } from 'vuex-module-decorators';
import SmonModule from '../store/smon/smon-module';
import { ACT_UPD_ZEXECUTORS_NAME } from '../store/smon/constants';
import { Mutation } from 'vuex-class';

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
  @Mutation(ACT_UPD_ZEXECUTORS_NAME) updateZExecutorName: any;

  public legendTypeOptions: object[] = [
    LEGEND_TYPE.TIME_RANGE,
    LEGEND_TYPE.BY_DAY
  ].map(it =>
    Object.assign({}, { label: it.toString(), value: it.toString() })
  );

  get zexecutorName() {
    return this.smonStore.zexecutorName;
  }

  set zexecutorName(val: string) {
    this.updateZExecutorName(val);
  }
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

  set legendType(newVal: any) {
    this.smonStore.setLegendType(newVal.value);
  }
}
</script>
