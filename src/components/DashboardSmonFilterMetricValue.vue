<template>
  <q-option-group
    v-model="metricValue"
    :options="smonStore.metricValueList"
    :type="smonStore.metricGroup"
    @input="handleChangedMetricValueFn"
    color="primary"
    size="md"
    inline
    dense
  />
</template>

<script lang="ts">
import { Watch, Component, Inject, Vue } from 'vue-property-decorator';
import SmonObservable, { LEGEND_TYPE } from '../store/observable-smon';
import { getModule } from 'vuex-module-decorators';
import SmonModule from '../store/smon/smon-module';

@Component
export default class DashboardSmonFilterMetricValue extends Vue {
  // @Inject('storeObservable') readonly smonStore!: SmonObservable;
  private readonly smonStore = getModule(SmonModule, this.$store);
  public get metricValue(): string | string[] {
    return this.smonStore.chartLegendType === LEGEND_TYPE.TIME_RANGE
      ? this.smonStore.metricValues
      : this.smonStore.metricValues[0];
  }

  public set metricValue(val: string | string[]) {
    this.smonStore.setMetricValues(typeof val === 'string' ? [val] : val);
  }

  @Watch('smonStore.legendType')
  public onChangedlegendType(val: string): void {
    // if (val === LEGEND_TYPE.TIME_RANGE) {
    //   this.smonStore.metricGroupType = 'checkbox';
    // } else if (val === LEGEND_TYPE.BY_DAY) {
    //   this.smonStore.metricGroupType = 'radio';
    // }
    this.smonStore.setMetricValues([this.smonStore.metricValueList[0].value]);
  }

  public handleChangedMetricValueFn(newVal: string[]) {
    if (typeof newVal == 'undefined' || !newVal || newVal.length == 0) return;

    //Check and re-render chart
    this.smonStore.setToggleRenderChart(true);
  }
}
</script>
