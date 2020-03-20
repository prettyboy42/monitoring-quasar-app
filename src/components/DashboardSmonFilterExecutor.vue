<template>
  <q-option-group
    v-model="zexecutorName"
    :options="smonStore.zexecutorNameList"
    type="radio"
    color="primary"
    size="md"
    inline
  />
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import SmonModule from '../store/smon/smon-module';
import { ACT_UPD_ZEXECUTORS_NAME } from '../store/smon/constants';

@Component
export default class DashboardSmonFilterExecutor extends Vue {
  private readonly smonStore = getModule(SmonModule, this.$store);
  @Mutation(ACT_UPD_ZEXECUTORS_NAME) updateZExecutorName: any;

  get zexecutorName() {
    return this.smonStore.zexecutorName;
  }

  set zexecutorName(val: string) {
    this.updateZExecutorName(val);
  }
}
</script>
