<template>
  <q-select
    dense
    options-dense
    outlined
    multiple
    emit-value
    map-options
    v-model="metricValue"
    :options="smonStore.metricValueList"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
        <q-item-section>
          <q-item-label v-html="scope.opt.label"></q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle
            v-if="smonStore.isTimeRangeLegend"
            v-model="metricValue"
            :val="scope.opt.value"
          />
          <q-radio v-if="smonStore.isByDayLegend" v-model="metricValue" :val="scope.opt.value" />
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-italic text-grey">No options slot</q-item-section>
      </q-item>
    </template>
    <q-tooltip>Metric value</q-tooltip>
  </q-select>
  <!-- <div class="q-pa-sm">
    <q-btn-dropdown
      dense
      flat
      no-caps
      color="primary"
      menu-anchor="bottom left"
      menu-self="top left"
      label="Metrics"
      size="md"
    >
      <div class="row q-pa-sm">
        <q-option-group
          v-model="metricValue"
          :options="smonStore.metricValueList"
          :type="smonStore.metricGroup"
          color="primary"
          size="md"
          dense
        />
      </div>
    </q-btn-dropdown>
  </div>-->
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
