<template>
  <q-page :class="$q.platform.is.desktop===true?'q-pa-md':'q-pa-xs'">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Home page</div>
        <div class="text-subtitle2">caption here</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <p>This is my page</p>
      </q-card-section>
    </q-card>
    <!-- place QPageScroller at end of page -->
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="accent" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Inject, Watch } from 'vue-property-decorator';
import SmonObservable from '../store/observable-smon';
import ProfilerService from '../boot/services/monitor-profiler.service';

@Component({
  components: {
    ApexLine: () => import('components/ApexLine.vue')
  }
})
export default class PageIndex extends Vue {}
</script>
