import { HasSsrBootParams } from 'quasar';
import { VueConstructor } from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import LayoutModule from './layouts/layout-module';
import { LayoutState } from './layouts/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
type StoreBootParams = {
  Vue: VueConstructor;
} & HasSsrBootParams;

export interface RootState {
  version: string;
  currentLanguage: string;
  languages?: object;
  // Define your own store structure, using submodules if needed
  // example: typeof exampleState;
  layout?: LayoutState;
}

//https://codeburst.io/vuex-and-typescript-3427ba78cfa8
const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0', // a simple property
    currentLanguage: 'en',
    languages: {
      en: { name: 'English' },
      vi: { name: 'Tiếng Việt' }
    }
  },
  // getters: getters,
  // mutations: mutations,
  // actions: actions,
  modules: {
    layout: LayoutModule
  },
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: !!process.env.DEV
};
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
export default function({ Vue }: StoreBootParams) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<RootState>(store);
  return Store;
}
