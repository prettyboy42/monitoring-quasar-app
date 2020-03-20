<template>
  <q-select
    dense
    options-dense
    outlined
    color="orange"
    v-model="metricType"
    :options="smonStore.metricTypeList"
    @input="handleChangedMetricFn"
    size="md"
  >
    <q-tooltip>Metric type</q-tooltip>
  </q-select>
  <!-- <q-option-group
    v-model="metricType"
    :options="smonStore.metricTypeList"
    @input="handleChangedMetricFn"
    type="radio"
    color="primary"
    size="md"
    inline
    dense
  />-->
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
import SmonObservable from '../store/observable-smon';
import { getModule } from 'vuex-module-decorators';
import SmonModule from '../store/smon/smon-module';
import { TMetricItem } from '../store/smon/types';
import { isNullOrEmpty } from './models';

@Component
export default class DashboardSmonFilterMetricType extends Vue {
  // @Inject('storeObservable') readonly smonStore!: SmonObservable;
  private readonly smonStore = getModule(SmonModule, this.$store);

  get metricType() {
    return this.smonStore.currentMetricType;
  }
  set metricType(newVal: TMetricItem) {
    this.smonStore.setMetricType(newVal);
  }

  public async handleChangedMetricFn(val: TMetricItem) {
    if (isNullOrEmpty(val.value)) return;
    const res = await this.smonStore.fetchMetricByType(val);
    // if (res) {
    //   this.smonStore.toogleChartRender(true);
    // }
    this.smonStore.setToggleRenderChart(true);
  }
}
</script>
