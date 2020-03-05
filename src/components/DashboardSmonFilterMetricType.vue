<template>
  <q-select
    color="orange"
    v-model="smonStore.metricType"
    :options="smonStore.metricTypeList"
    @input="handleChangedMetricFn"
    size="md"
    label="Type"
  />
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
import SmonObservable from '../store/observable-smon';
import { isNullOrEmpty } from './models';

@Component
export default class DashboardSmonFilterMetricType extends Vue {
  @Inject('storeObservable') readonly smonStore!: SmonObservable;

  public async handleChangedMetricFn(val: string) {
    if (isNullOrEmpty(val)) return;
    const res = await this.smonStore.fetchMetricByType(val);
    if (res) {
      this.smonStore.toogleChartRender(true);
    }
  }
}
</script>
