import { HasSsrBootParams } from 'quasar';
import { User } from 'src/boot/services/types';
import { VueConstructor } from 'vue';
import Vuex, { ActionTree, GetterTree, MutationTree, StoreOptions } from 'vuex';
import {
  ACT_AUTHENTICATED,
  ACT_LOGOUT,
  SET_IS_AUTHENTICATED,
  SET_USER_INFO
} from './constants';
import LayoutModule from './layouts/layout-module';
import { LayoutState } from './layouts/state';
import SmonModule from './smon/smon-module';

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
  authenticated: boolean;
  logon: boolean;
  user: User | undefined;
  // Define your own store structure, using submodules if needed
  // example: typeof exampleState;
  layout?: LayoutState;
}

const mutations: MutationTree<RootState> = {
  [SET_IS_AUTHENTICATED]: state => {
    state.authenticated = true;
  },
  [SET_USER_INFO]: (state, payload) => {
    state.user = payload;
  },
  [ACT_AUTHENTICATED]: (state, identity) => {
    state.user = Object.assign({}, state.user, identity);
    state.authenticated = true;
    state.logon = true;
  },
  [ACT_LOGOUT]: state => {
    state.authenticated = false;
    state.user = undefined;
    state.logon = false;
  }
};
const actions: ActionTree<RootState, RootState> = {
  setAuthenticated: ({ commit }) => {
    commit(SET_IS_AUTHENTICATED);
  },
  saveUserInfo: ({ commit }, user: User) => {
    if (user) {
      commit(ACT_AUTHENTICATED, user);
      return Promise.resolve(user);
    }
    return Promise.reject(user);
  }
};
const getters: GetterTree<RootState, RootState> = {
  authenticated: state => state.authenticated,
  currentUser: state => state.user,
  logon: state => state.logon
};

//https://codeburst.io/vuex-and-typescript-3427ba78cfa8
const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0', // a simple property
    currentLanguage: 'en',
    languages: {
      en: { name: 'English' },
      vi: { name: 'Tiếng Việt' }
    },
    authenticated: false,
    logon: false,
    user: undefined
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
    layout: LayoutModule,
    smon: SmonModule
  },
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: !!process.env.DEV
};

/*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */

// if (process.env.DEV && (module as any).hot) {
//   (module as any).hot.accept(
//     ['./layouts/layout-module', './smon/smon-module'],
//     () => {
//       const newLayout = require('./layouts/layout-module').default;
//       const newSmon = require('./smon/smon-module').default;
//       (store as any).hotUpdate({
//         modules: {
//           layout: newLayout,
//           smon: newSmon
//         }
//       });
//     }
//   );
// }

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
  return new Vuex.Store<RootState>(store);
}
