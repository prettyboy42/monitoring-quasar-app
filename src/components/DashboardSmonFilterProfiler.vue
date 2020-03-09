<template>
  <q-select
    v-if="smonStore.isProfilerType"
    color="orange"
    v-model="currentApi"
    :options="smonStore.profilerApis"
    @input="handleChangedProfilerFn"
    size="md"
    label="Profiler name"
  />
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
import SmonObservable from '../store/observable-smon';
import { isNullOrEmpty } from './models';
import { getModule } from 'vuex-module-decorators';
import SmonModule from '../store/smon/smon-module';

@Component
export default class DashboardSmonFilterProfiler extends Vue {
  // @Inject('storeObservable') readonly smonStore!: SmonObservable;
  private readonly smonStore = getModule(SmonModule, this.$store);

  get currentApi() {
    return this.smonStore.apiName;
  }

  set currentApi(newVal: string) {
    this.smonStore.setProfilerApi(newVal);
  }

  public handleChangedProfilerFn(val: string) {
    if (isNullOrEmpty(val)) return;
    this.smonStore.setToggleRenderChart(true);
  }
}
</script>
