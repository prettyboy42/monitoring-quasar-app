<template>
  <q-select
    dense
    options-dense
    outlined
    color="orange"
    v-model="poolIp"
    :options="smonStore.poolIpList"
    @input="handleChangedFn"
    size="md"
  />
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import SmonModule from '../store/smon/smon-module';
import { ACT_UPD_POOL_NAME, ACT_UPD_POOL_IP } from '../store/smon/constants';
import { isNullOrEmpty } from './models';
import { TMetricItem } from '../store/smon/types';

@Component
export default class DashboardSmonFilterClientPoolIp extends Vue {
  private readonly smonStore = getModule(SmonModule, this.$store);
  @Mutation('smon/' + ACT_UPD_POOL_IP) updatePoolIp: any;

  get poolIp() {
    return this.smonStore.poolIp;
  }

  set poolIp(val: TMetricItem) {
    this.updatePoolIp(val);
  }

  public handleChangedFn(val: TMetricItem) {
    if (!val) return;
    this.smonStore.setToggleRenderChart(true);
  }
}
</script>
