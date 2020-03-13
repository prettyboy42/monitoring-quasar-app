import hello from 'hellojs';
import { boot } from 'quasar/wrappers';
import { VueConstructor } from 'vue';

export default boot(async ({ Vue }: { Vue: VueConstructor }) => {
  hello.init({
    facebook: '2666877530210403'
  });
  Vue.prototype.$hello = hello;
});
