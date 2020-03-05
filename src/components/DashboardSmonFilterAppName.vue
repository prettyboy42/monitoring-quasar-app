<template>
  <q-select
    tabindex="0"
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    color="orange"
    v-model="smonStore.appName"
    :options="appNameOptions"
    @filter="filterFnAutoselect"
    @filter-abort="abortFilterFn"
    @input="handleChangedAppNameFn"
    size="md"
    label="App name"
  />
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
import SmonObservable from '../store/observable-smon';
import { isNullOrEmpty } from './models';

@Component
export default class DashboardSmonFilterAppName extends Vue {
  @Inject('storeObservable') readonly smonStore!: SmonObservable;

  public readonly REFRESH_INTERVAL_IN_MS: number = 300;
  public filterFnAutoselectInterval!: NodeJS.Timeout;
  public appNameOptions: string[] = this.smonStore.appNameList;

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
          this.appNameOptions = this.smonStore.filterAppListByName(val);
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
      const res = await this.smonStore.fetchDataOnChangedAppName();
      if (res) {
        //Trigger render chart
        this.smonStore.toogleChartRender(true);
      }
    } catch (error) {
      this.$q.notify({
        color: 'negative',
        position: 'top',
        message: 'Error while fetching data belongs to app name.',
        icon: 'report_problem'
      });
    }
  }
}
</script>
