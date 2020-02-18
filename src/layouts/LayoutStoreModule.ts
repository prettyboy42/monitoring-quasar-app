import { Platform } from 'quasar';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Store from '../store/index';

@Module({
  dynamic: true,
  name: 'layout',
  namespaced: true,
  store: Store
})
export default class LayoutStoreModule extends VuexModule {
  public leftDrawerOpen = false;
  public rightDrawerOpen = false;
  public headerState: boolean = true;
  public footerState: boolean = Platform.is.desktop || false;

  @Mutation
  public SET_LEFT_DRAWER_OPEN(value: boolean) {
    this.leftDrawerOpen = value;
  }

  @Action
  public setLeftDrawerOpen(value: boolean) {
    this.SET_LEFT_DRAWER_OPEN(value);
  }

  @Action
  public toggleLeftDrawer() {
    this.SET_LEFT_DRAWER_OPEN(!this.leftDrawerOpen);
  }

  @Mutation
  public SET_RIGHT_DRAWER_OPEN(value: boolean) {
    this.rightDrawerOpen = value;
  }

  @Action
  public setRightDrawerOpen(value: boolean) {
    this.SET_RIGHT_DRAWER_OPEN(value);
  }

  @Action
  public toggleRightDrawer() {
    this.SET_RIGHT_DRAWER_OPEN(!this.rightDrawerOpen);
  }

  @Mutation
  public SET_HEADER_STATE(value: boolean) {
    this.headerState = value;
  }

  @Action
  public setHeaderState(value: boolean) {
    this.SET_HEADER_STATE(value);
  }

  @Mutation
  public SET_FOOTER_STATE(value: boolean) {
    this.footerState = value;
  }

  @Action
  public setFooterState(value: boolean) {
    this.SET_FOOTER_STATE(value);
  }
}
