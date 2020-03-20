<template>
  <q-btn-dropdown
    outline
    no-caps
    color="primary"
    dropdown-icon="insert_chart"
    label="Preset"
    align="left"
    size="md"
  >
    <q-list dense padding>
      <q-item>
        <q-item-section>
          <q-toggle v-model="syncChart" color="green" label="Sync mode" dense />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-toggle v-model="showLegend" color="green" label="On/Off Legend" dense />
        </q-item-section>
      </q-item>
      <q-separator inset />
      <q-item>
        <q-item-section>
          <div class="q-pa-sm">
            Chart types:
            <q-option-group
              v-model="legendType"
              :options="legendTypeOptions"
              type="radio"
              color="primary"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import SmonModule from '../store/smon/smon-module';
import { LEGEND_TYPE } from '../store/smon/constants';

@Component
export default class DashboardSmonChartPreset extends Vue {
  private readonly smonStore = getModule(SmonModule, this.$store);

  public legendTypeOptions: object[] = [
    LEGEND_TYPE.TIME_RANGE,
    LEGEND_TYPE.BY_DAY
  ].map(it =>
    Object.assign({}, { label: it.toString(), value: it.toString() })
  );

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
    this.smonStore.setLegendType(newVal);
  }
}
</script>
