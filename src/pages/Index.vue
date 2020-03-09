<template>
  <q-page :class="$q.platform.is.desktop===true?'q-pa-md':'q-pa-xs'">
    <!-- <div v-show="$q.platform.is.desktop === true" class="row q-pb-md">
      <div class="col-12">
        <t-service-filter />
      </div>
    </div>-->
    <div
      :class="$q.platform.is.desktop===true?'row q-col-gutter-sm justify-start':'column q-col-gutter-xs justify-center'"
    >
      <div :class="chartGridClass" v-for="(serverIp,index) in serverIpList" :key="index">
        <apex-line
          :chart-id="index+1"
          :chart-group="chartGroup"
          :chart-title="serverIp"
          :bgColorCard="colors[index - 1]"
        />
      </div>
    </div>
    <div class="row q-col-gutter-md q-px-md q-py-md"></div>
    <!-- place QPageScroller at end of page -->
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="accent" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Inject, Watch } from 'vue-property-decorator';
// import { getModule } from 'vuex-module-decorators';
// import LayoutModule from '../store/layouts/layout-module';
import SmonObservable from '../store/observable-smon';
import ProfilerService from '../boot/services/monitor-profiler.service';

@Component({
  components: {
    ApexLine: () => import('components/ApexLine.vue')
  }
})
export default class PageIndex extends Vue {
  public serverIpList: string[] = [
    '10.30.22.17',
    '10.30.22.18',
    '10.30.22.19',
    '10.30.58.190',
    '10.30.58.191',
    '10.30.58.192',
    '10.30.65.42',
    '10.30.65.43',
    '10.30.65.44'
  ];
  public colors: string[] = [
    'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
    'linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)',
    'linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)',
    'linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)'
  ];
  public chartGroup: string = 'realtimeGroup';

  public get chartGridClass(): string {
    let gridClass: string[] = ['col-xs-12', 'col-sm-6'];
    if (this.serverIpList.length == 0) return gridClass.join(' ');

    if (this.serverIpList.length <= 2) {
      gridClass.push('col-md');
    } else if (this.serverIpList.length <= 4) {
      gridClass.push('col-md-6');
    } else {
      gridClass.push('col-md-4');
    }
    return gridClass.join(' ');
  }
}
</script>
