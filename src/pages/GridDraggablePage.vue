<template>
  <q-page class="q-pa-sm">
    <grid-layout
      class="row q-col-gutter-sm items-start"
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[0, 0]"
      :use-css-transforms="true"
    >
      <grid-item
        class="col-md-3"
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
      >
        <q-card style="min-width:100%;min-height:100%">
          <q-card-section>
            <div class="text-h6">Item {{item.i}}</div>
            <div class="text-subtitle2">x: {{item.x}}, y: {{item.y}}</div>
            <div class="text-subtitle2">w: {{item.w}}, h: {{item.h}}</div>
          </q-card-section>
        </q-card>
      </grid-item>
    </grid-layout>
    <!-- place QPageScroller at end of page -->
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="accent" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import VueGridLayout from 'vue-grid-layout';
import { GridItemData } from 'vue-grid-layout';

var testLayout: GridItemData[] = [
  { x: 0, y: 0, w: 2, h: 4, i: '0' },
  { x: 2, y: 0, w: 2, h: 5, i: '1' },
  { x: 4, y: 0, w: 2, h: 5, i: '2' },
  { x: 6, y: 0, w: 2, h: 4, i: '3' },
  { x: 8, y: 0, w: 2, h: 4, i: '4' },
  { x: 10, y: 0, w: 2, h: 4, i: '5' },
  { x: 0, y: 5, w: 2, h: 5, i: '6' },
  { x: 2, y: 5, w: 2, h: 5, i: '7' },
  { x: 4, y: 5, w: 2, h: 5, i: '8' },
  { x: 6, y: 3, w: 2, h: 4, i: '9' },
  { x: 8, y: 4, w: 2, h: 4, i: '10' },
  { x: 10, y: 4, w: 2, h: 5, i: '11' },
  { x: 0, y: 10, w: 2, h: 5, i: '12' },
  { x: 2, y: 10, w: 2, h: 6, i: '13' },
  { x: 4, y: 8, w: 2, h: 5, i: '14' },
  { x: 6, y: 8, w: 2, h: 4, i: '15' },
  { x: 8, y: 10, w: 2, h: 6, i: '16' },
  { x: 10, y: 4, w: 2, h: 4, i: '17' },
  { x: 0, y: 9, w: 2, h: 4, i: '18' },
  { x: 2, y: 6, w: 2, h: 4, i: '19' }
];

@Component({
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  }
})
export default class GridGraggablePage extends Vue {
  public layout = testLayout;
}
</script>
