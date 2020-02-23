import axios from 'axios';
import { boot } from 'quasar/wrappers';
import { VueConstructor } from 'vue';

export default boot(async ({ Vue }: { Vue: VueConstructor }) => {
  Vue.prototype.$axios = axios;
  // something to do
  //   await something();
});
