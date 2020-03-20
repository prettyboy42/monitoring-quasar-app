<template>
  <q-select
    dense
    options-dense
    outlined
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    color="orange"
    v-model="appName"
    :options="appNameOptions"
    @filter="filterFnAutoselect"
    @filter-abort="abortFilterFn"
    @input="handleChangedAppNameFn"
    size="md"
  >
    <q-tooltip>Choose app to view</q-tooltip>
  </q-select>
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import SmonModule from '../store/smon/smon-module';

import SmonObservable from '../store/observable-smon';
import { isNullOrEmpty } from './models';

@Component
export default class DashboardSmonFilterAppName extends Vue {
  // @Inject('storeObservable') readonly smonStore!: SmonObservable;
  private readonly smonStore = getModule(SmonModule, this.$store);

  public readonly REFRESH_INTERVAL_IN_MS: number = 300;
  public filterFnAutoselectInterval!: NodeJS.Timeout;
  public appNameOptions: string[] = this.smonStore.profilerApis;

  get appName() {
    return this.smonStore.currentAppName;
  }
  set appName(newVal: string) {
    this.smonStore.setAppName(newVal);
  }

  beforeDestroy() {
    clearInterval(this.filterFnAutoselectInterval);
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  /* eslint-disable  @typescript-eslint/no-unused-vars*/
  public filterFnAutoselect(val: any, update: any, abort: any) {
    // call abort() at any time if you can't retrieve data somehow
    this.filterFnAutoselectInterval = setTimeout(() => {
      update(
        () => {
          this.appNameOptions = this.filterAppListByName(val);
        },
        // next function is available in Quasar v1.7.4+;
        // "ref" is the Vue reference to the QSelect
        (ref: any) => {
          if (val !== '' && ref.options.length > 0 && ref.optionIndex === -1) {
            ref.moveOptionSelection(1, true); // focus the first selectable option and do not update the input-value
            ref.toggleOption(ref.options[ref.optionIndex], true); // toggle the focused option
          }
        }
      );
    }, this.REFRESH_INTERVAL_IN_MS);
  }

  public abortFilterFn() {
    // console.log('delayed filter aborted')
  }

  public async handleChangedAppNameFn(newVal: string) {
    if (isNullOrEmpty(newVal)) return;
    try {
      const res = await this.smonStore.fetchOrInitStoreByApp(newVal);
      //Trigger render chart
      this.smonStore.setToggleRenderChart(true);
    } catch (error) {
      this.$q.notify({
        color: 'negative',
        position: 'top',
        message: 'Error while fetching data belongs to app name.',
        icon: 'report_problem'
      });
    }
  }

  public filterAppListByName(val: string): string[] {
    if (val === '') return this.smonStore.appNames;
    const needle = val.toLowerCase();
    return this.smonStore.appNames.filter(
      v => v.toLowerCase().indexOf(needle) > -1
    );
  }
}
</script>
