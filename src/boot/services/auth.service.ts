import { AxiosResponse } from 'axios';
import { RootState } from 'src/store';
import { ACT_AUTHENTICATED, ACT_LOGOUT } from 'src/store/constants';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { axiosMain } from '../axios';
import { storageUtils } from './storage-utils';

const BASE_URL = '/users';
const API_FETCH_USER_LOGIN = BASE_URL + '/getUserInfoAfterAuthen';
export default class AuthService {
  private readonly DEFAULT_PATH = '/';
  private store: Store<RootState>;
  private router: VueRouter;

  public constructor(store: Store<RootState>, router: VueRouter) {
    this.store = store;
    this.router = router;
    this.init();
  }

  private async init() {
    const token = storageUtils.getOauthCode();
    if (!this.store.getters.currentUser && !this.store.getters.logon && token) {
      try {
        const user = await this.fetchUser();
        if (user) {
          this.store.commit(ACT_AUTHENTICATED, user);
          if (sessionStorage.getItem('requested-url')) {
            this.router.replace(
              sessionStorage.getItem('requested-url') as string
            );
            sessionStorage.removeItem('requested-url');
          }
        } else {
          this.store.commit(ACT_LOGOUT);
          this.router.push('/');
          sessionStorage.removeItem('requested-url');
        }
      } catch (error) {
        this.store.commit(ACT_LOGOUT);
        this.router.push('/');
      }
    }
  }

  public logOut() {
    storageUtils.removeToken();
    this.store.commit(ACT_LOGOUT);
    if (this.router.currentRoute.path !== this.DEFAULT_PATH) {
      this.router.push(this.DEFAULT_PATH);
    }
  }

  public async fetchUser() {
    const res: AxiosResponse<any> = await axiosMain.get(API_FETCH_USER_LOGIN);
    if (res.status == 200 && res.data) {
      return res.data.user;
    }
  }

  public hasAnyAuthority(authorities: string[]) {
    if (!this.authenticated || !this.userAuthorities) {
      return false;
    }
    return this.userAuthorities.some(role =>
      authorities.some(it => it === role)
    );
  }

  public get authenticated(): boolean {
    return this.store.getters.authenticated;
  }

  public get userAuthorities(): string[] {
    return this.store.getters.currentUser?.roles || [];
  }
}
