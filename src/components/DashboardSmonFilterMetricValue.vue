<template>
  <q-option-group
    v-model="metricValue"
    :options="smonStore.metricValueList"
    :type="smonStore.metricGroupType"
    @input="handleChangedMetricValueFn"
    color="primary"
    size="md"
    inline
    dense
  />
</template>

<script lang="ts">
import { Watch, Component, Inject, Vue } from 'vue-property-decorator';
import SmonObservable from '../pages/dashboard-smon-observable';

@Component
export default class DashboardSmonFilterMetricValue extends Vue {
  @Inject('storeObservable') readonly smonStore!: SmonObservable;
  public get metricValue(): string | string[] {
    return this.smonStore.legendType === 'time-range'
      ? this.smonStore.metricValue
      : this.smonStore.metricValue[0];
  }

  public set metricValue(val: string | string[]) {
    this.smonStore.metricValue = typeof val === 'string' ? [val] : val;
  }

  @Watch('smonStore.legendType')
  public onChangedlegendType(val: string): void {
    if (val === 'time-range') {
      this.smonStore.metricGroupType = 'checkbox';
    } else if (val === 'by-day') {
      this.smonStore.metricGroupType = 'radio';
    }
    this.smonStore.metricValue = [this.smonStore.metricValueList[0].value];
  }

  public handleChangedMetricValueFn(newVal: string[]) {
    if (typeof newVal == 'undefined' || !newVal || newVal.length == 0) return;

    //Check and re-render chart
    this.smonStore.toogleChartRender(true);
  }
}
</script>
