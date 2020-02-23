<template>
  <q-page :class="$q.platform.is.desktop===true?'q-pa-md':'q-pa-xs'">
    <div v-show="$q.platform.is.desktop === true" class="row q-col-gutter-sm q-pb-md items-center">
      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-select
          tabindex="0"
          clearable
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          color="orange"
          @input="updatedProfilerByAppName"
          @filter="filterFnAutoselect"
          @filter-abort="abortFilterFn"
          v-model="curAppName"
          :options="appNameOptions"
          size="md"
          label="App name"
        />
      </div>

      <div class="col">
        <q-select
          tabindex="1"
          clearable
          color="orange"
          v-model="curMetricType"
          :options="metricsOptions"
          @input="loadMetricsByType"
          size="md"
          label="Type"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-5">
        <div class="row q-col-gutter-xs items-center">
          <q-select
            tabindex="2"
            v-show="curMetricType==='Profiler'"
            class="col-8"
            clearable
            color="orange"
            v-model="curApiName"
            :options="profilerApiList"
            size="md"
            label="Choose api"
          />
          <q-select
            tabindex="3"
            class="col"
            clearable
            color="orange"
            v-model="curMetric"
            :options="metricByTypeOpt"
            size="md"
            label="Choose metric"
          />
        </div>
      </div>
      <div class="col">
        <q-toggle
          tabindex="4"
          class="float-right"
          v-model="showLegend"
          color="green"
          label="Legend"
        />
      </div>
      <div class="col">
        <q-btn-toggle
          tabindex="5"
          v-model="showType"
          class="my-custom-toggle float-right"
          no-caps
          rounded
          unelevated
          glossy
          toggle-color="orange"
          toggle-text-color="white"
          color="white"
          text-color="primary"
          size="md"
          :options="[
          {label: 'By day', value: 'one'},
          {label: 'Time range', value: 'two'}
        ]"
        />
      </div>
    </div>
    
    <div
      :class="$q.platform.is.desktop===true?'row q-col-gutter-sm justify-center':'column q-col-gutter-xs justify-center'"
    >
      <div class="col-xs-12 col-sm-6 col-md-3" v-for="i in 8" :key="i">
        <apex-line :chart-id="i+1" :chart-group="groupSocial" :bgColorCard="colors[i - 1]"></apex-line>
      </div>
    </div>
    <div class="row q-col-gutter-md q-px-md q-py-md">
      <!-- <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-column></apex-column>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-donut></apex-donut>
      </div>-->
      <!-- <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-line></apex-line>
      </div>-->
      <!-- <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-multiple-radial-bars></apex-multiple-radial-bars>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-heatmap></apex-heatmap>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-radial-bar></apex-radial-bar>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-bubble></apex-bubble>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-radar></apex-radar>
      </div>-->
    </div>
    <!-- place QPageScroller at end of page -->
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="accent" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ApexLine from 'components/ApexLine.vue';

const jwtOauthCode =
  'hmlOi9AsrM2nOEByk-Iu7wDphURSnBKFvaZFxjFaemRORBRXnxs3GDu2rx7sfCPFZ17PhOAtZqgC6EkbY9FqHPX7nDMPrPONYKcIsCdyZoRyJ_ly-kE95VSoXCdEc-aRdaNOkQ7WqaNDJw2a__BQ0wa6ywMqnkP0pHJGmTIvp7AqHOtfdQ3iKEe9WuZYlUnW_osA-us4n7-KMl3NuUhBNCWEYkFYg9DWhrsYsxtTloQh5uwtgfBzHOeq-TgdrR8BrZf8rkcXD6JLAHsNzuqNFyOVJV-Uq2Djyb49lRQjwwg9DxTqbTxQy91__0gCcV-Gkbpn5TwKyfMCKlzTzkpnffyAXLEODb9Nb9g4RW';
const CONST_METRIC_TYPE = [
  'Profiler',
  'TServers',
  'HServers',
  'ComWorker',
  'ZExecutors'
];
const CONST_METRICS_BY_TYPE = [
  {
    name: 'Profiler',
    value: [
      'proc_rate',
      'req_rate',
      'peek_rate',
      'pending_req',
      'peek_pending',
      'proc_time',
      'peek_time'
    ]
  },
  {
    name: 'TServers',
    value: [
      'n_waiting',
      'n_active',
      'n_idle',
      'n_largest',
      'buffer_alloc',
      'frame_size_count'
    ]
  },
  { name: 'HServers', value: ['n_waiting', 'n_active', 'n_idle'] },
  {
    name: 'ComWorker',
    value: ['in_rate', 'out_rate', 'in_packet', 'out_packet']
  },
  {
    name: 'ZExecutors',
    value: [
      'n_waiting',
      'n_active',
      'n_idle',
      'n_largest',
      'n_uncomplete',
      'n_reject'
    ]
  }
];
interface TMetricItem {
  name: string;
  value: string[];
}
@Component({
  components: {
    ApexLine
  }
})
export default class PageIndex extends Vue {
  public filterFnAutoselectInterval!: NodeJS.Timeout;
  public colors: string[] = [
    'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
    'linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)',
    'linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)',
    'linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)'
  ];
  public groupSocial: string = 'social';
  public curAppName: string = '';
  public curApiName: string = '';
  public curMetric: string = '';
  public showLegend: boolean = true;
  public curMetricType: string = CONST_METRIC_TYPE[0];
  public showType: string = 'two';
  public appNameOptions: string[] = [];
  public appNameList: string[] = [];
  public metricsOptions = CONST_METRIC_TYPE;
  public profilerApiList: string[] = [];
  public metricByTypeOpt: string[] = [];

  mounted() {
    //loadAppNameList
    this.loadAppNameList().then(() => {
      this.updatedProfilerByAppName(this.curAppName);
    });
    this.loadMetricsByType(this.curMetricType);
  }

  beforeDestroy() {
    clearInterval(this.filterFnAutoselectInterval);
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  public loadAppNameList(): Promise<any> {
    return this.$axios
      .get(
        'https://monitor.zaloapp.com/api/monitor-profiler/get-all-app-name',
        {
          headers: {
            'content-Type': 'application/json',
            oauthCode: `Bearer ${jwtOauthCode}`
            // Authorization: `Bearer ${jwtToken}`
          }
        }
      )
      .then((response: any) => {
        // console.log('List of app: ' + JSON.stringify(response));
        this.appNameOptions = response.data.data.result;
        this.appNameList = this.appNameOptions;
        this.curAppName = this.appNameOptions[0];
      })
      .catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        });
      });
  }

  public loadProfilerApiList(appName: string): Promise<any> {
    return this.$axios
      .get(
        'https://monitor.zaloapp.com/api/monitor-profiler/get-all-profiler-by-app-name?appName=' +
          appName,
        {
          headers: {
            'content-Type': 'application/json',
            oauthCode: `Bearer ${jwtOauthCode}`
            // Authorization: `Bearer ${jwtToken}`
          }
        }
      )
      .then((response: any) => {
        const result = response.data.data.result;
        this.profilerApiList = result.map((it: any) => it.name);
        this.curApiName = this.profilerApiList[0];
      })
      .catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        });
      });
  }

  public loadMetricsByType(metricType: string): void {
    if (metricType === undefined || metricType === '' || metricType === null)
      return; //Do nothing
    this.metricByTypeOpt = CONST_METRICS_BY_TYPE.filter(
      (it: TMetricItem) => it.name === metricType
    ).flatMap((it: TMetricItem) => it.value);
    this.curMetric = this.metricByTypeOpt[0];
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  /* eslint-disable  @typescript-eslint/no-unused-vars*/
  public filterFnAutoselect(val: any, update: any, abort: any) {
    // call abort() at any time if you can't retrieve data somehow

    this.filterFnAutoselectInterval = setTimeout(() => {
      update(
        () => {
          if (val === '') {
            this.appNameOptions = this.appNameList;
          } else {
            const needle = val.toLowerCase();
            this.appNameOptions = this.appNameList.filter(
              v => v.toLowerCase().indexOf(needle) > -1
            );
          }
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
    }, 300);
  }

  public abortFilterFn() {
    // console.log('delayed filter aborted')
  }

  public updatedProfilerByAppName(appName: string): void {
    if (appName === undefined || appName === '' || appName === null) return; //Do nothing
    // console.log('updatedProfilerByAppName changed {}', appName);
    this.loadProfilerApiList(appName);
  }
}
</script>
