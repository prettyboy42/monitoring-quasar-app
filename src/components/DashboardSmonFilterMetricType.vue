<template>
  <q-select
    color="orange"
    v-model="metricType"
    :options="smonStore.metricTypeList"
    @input="handleChangedMetricFn"
    size="md"
    label="Type"
  />
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
import SmonObservable from '../store/observable-smon';
import { getModule } from 'vuex-module-decorators';
import SmonModule from '../store/smon/smon-module';
import { isNullOrEmpty } from './models';

@Component
export default class DashboardSmonFilterMetricType extends Vue {
  // @Inject('storeObservable') readonly smonStore!: SmonObservable;
  private readonly smonStore = getModule(SmonModule, this.$store);

  get metricType() {
    return this.smonStore.currentMetricType;
  }
  set metricType(newVal: string) {
    this.smonStore.setMetricType(newVal);
  }

  public async handleChangedMetricFn(val: string) {
    if (isNullOrEmpty(val)) return;
    const res = await this.smonStore.fetchMetricByType(val);
    // if (res) {
    //   this.smonStore.toogleChartRender(true);
    // }
    this.smonStore.setToggleRenderChart(true);
  }
}
</script>
