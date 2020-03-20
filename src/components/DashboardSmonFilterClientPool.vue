<template>
  <q-select
    dense
    options-dense
    outlined
    color="orange"
    v-model="poolName"
    :options="smonStore.poolNameList"
    @input="handleChangedPoolNameFn"
    size="md"
  />
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import SmonModule from '../store/smon/smon-module';
import { ACT_UPD_POOL_NAME } from '../store/smon/constants';
import { TMetricItem } from '../store/smon/types';
import { isNullOrEmpty } from './models';

@Component
export default class DashboardSmonFilterClientPool extends Vue {
  private readonly smonStore = getModule(SmonModule, this.$store);
  @Mutation('smon/' + ACT_UPD_POOL_NAME) updatePoolName: any;

  get poolName() {
    return this.smonStore.poolName;
  }

  set poolName(val: TMetricItem) {
    this.updatePoolName(val);
  }

  public handleChangedPoolNameFn(val: TMetricItem) {
    if (!val) return;
    this.smonStore.setToggleRenderChart(true);
  }
}
</script>
