import { boot } from 'quasar/wrappers';
import { VueConstructor } from 'vue';
import VueApexCharts from 'vue-apexcharts';

export default boot(async ({ Vue }: { Vue: VueConstructor }) => {
  Vue.use(VueApexCharts);
  Vue.component('apexchart', VueApexCharts);
});
