import { VueConstructor } from 'vue';
import VueApexCharts from 'vue-apexcharts';

export default async ({ Vue }: { Vue: VueConstructor }) => {
  Vue.use(VueApexCharts);
  Vue.component('apexchart', VueApexCharts);
};
