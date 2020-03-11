<template>
  <q-option-group
    v-model="metricValue"
    :options="smonStore.metricValueList"
    :type="smonStore.metricGroup"
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
    //Check and re-render chart
    this.smonStore.setToggleRenderChart(true);
  }

  @Watch('smonStore.chartLegendType')
  public onChangedlegendType(val: string): void {
    const values = [this.smonStore.metricValueList[0].value];
    this.smonStore.setMetricValues(values);
    this.smonStore.setToggleRenderChart(true);
  }
}
</script>
