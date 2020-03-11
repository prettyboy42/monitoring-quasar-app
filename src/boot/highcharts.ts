import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
import exportingInit from 'highcharts/modules/exporting';
import noDataInit from 'highcharts/modules/no-data-to-display';
import { boot } from 'quasar/wrappers';
import { VueConstructor } from 'vue';

declare module 'highcharts' {
  interface Series {
    searchPoint(e: PointerEventObject, compareX?: boolean): Point | undefined;
  }
  interface Point {
    highlight: (event: Highcharts.PointerEventObject) => void;
  }
}

export default boot(async ({ Vue }: { Vue: VueConstructor }) => {
  /**
   * Override the reset function, we don't need to hide the tooltips and
   * crosshairs.
   */
  Highcharts.Pointer.prototype.reset = function() {
    return undefined;
  };

  /**
   * Highlight a point by showing tooltip, setting hover state and draw crosshair
   */
  Highcharts.Point.prototype.highlight = function(event) {
    event = this.series.chart.pointer.normalize(event);
    this.onMouseOver(); // Show the hover marker
    // this.series.chart.tooltip.refresh(this); // Show the tooltip
    this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
  };

  exportingInit(Highcharts);
  noDataInit(Highcharts);
  // Set global options
  Highcharts.setOptions({
    lang: {
      noData: 'No available data'
    }
  });

  Vue.use(HighchartsVue);
});
