<template>
  <q-card flat style="width:100%;">
    <q-card-section class="q-pa-xs">
      <div class="row q-col-gutter-sm justify-end">
        <div class="col-2">
          <dashboard-smon-filter-app-name />
        </div>
        <div class="col" style="max-width:140px;">
          <dashboard-smon-filter-metric-type />
        </div>
        <div class="col-auto" style="max-width:400px;">
          <dashboard-smon-filter-metric-value />
        </div>
        <div class="col-auto" style="max-width:650px;">
          <dashboard-smon-filter-profiler v-if="smonStore.isProfilerType" style="min-width:350px;" />
          <dashboard-smon-filter-executor v-if="smonStore.isZExecutorType" />
          <dashboard-smon-filter-client-pool v-if="smonStore.isTClientPoolType" />
        </div>
        <div class="col-auto" style="max-width:350px;">
          <dashboard-smon-filter-client-pool-ip v-if="smonStore.isTClientPoolType" />
        </div>
        <q-space />
        <div class="col self-end" style="max-width:120px;">
          <dashboard-smon-chart-preset />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
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
      import('components/DashboardSmonFilterProfiler.vue'),
    DashboardSmonFilterExecutor: () =>
      import('components/DashboardSmonFilterExecutor.vue'),
    DashboardSmonChartPreset: () =>
      import('components/DashboardSmonChartPreset.vue'),
    DashboardSmonFilterClientPool: () =>
      import('components/DashboardSmonFilterClientPool.vue'),
    DashboardSmonFilterClientPoolIp: () =>
      import('components/DashboardSmonFilterClientPoolIp.vue')
  }
})
export default class DashboardSmonFilter extends Vue {
  private readonly smonStore = getModule(SmonModule, this.$store);
}
</script>
