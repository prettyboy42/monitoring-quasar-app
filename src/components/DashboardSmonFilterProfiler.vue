<template>
  <q-select
    v-if="smonStore.metricType==='Profiler'"
    color="orange"
    v-model="smonStore.threadApiName"
    :options="smonStore.threadApiList"
    @input="handleChangedProfilerFn"
    size="md"
    label="Profiler name"
  />
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
import SmonObservable from '../pages/dashboard-smon-observable';
import { isNullOrEmpty } from './models';

@Component
export default class DashboardSmonFilterProfiler extends Vue {
  @Inject('storeObservable') readonly smonStore!: SmonObservable;

  public handleChangedProfilerFn(val: string) {
    if (isNullOrEmpty(val)) return;
    this.smonStore.toogleChartRender(true);
  }
}
</script>
