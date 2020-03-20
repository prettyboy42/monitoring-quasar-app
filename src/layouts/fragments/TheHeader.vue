<template>
  <q-header v-if="!isMobilePlatform()" elevated v-model="headerState">
    <q-toolbar row no-wrap items-center class="glossy bg-primary">
      <q-btn flat dense round aria-label="Menu" @click="toggleLeftDrawer()">
        <q-icon name="menu" />
      </q-btn>

      <q-btn class="quasar-logo" flat no-caps no-wrap stretch to="/">
        <q-avatar icon="img:https://cdn.quasar.dev/logo/svg/quasar-logo.svg"></q-avatar>
        <q-toolbar-title shrink>{{ headline }}</q-toolbar-title>
      </q-btn>

      <q-space />

      <!-- <div class="q-pa-sm">Quasar v{{ $q.version }}</div> -->
      <q-btn icon="refresh" flat stretch color="bg-primary" @click="onClickRefreshFn">
        <q-tooltip>Refresh now</q-tooltip>
      </q-btn>
      <q-separator dark vertical />
      <q-btn-dropdown
        flat
        stretch
        no-caps
        color="bg-primary"
        :icon="refreshIcon"
        :label="refreshLabel"
      >
        <q-list>
          <q-item
            :key="index"
            v-for="(item, index) in refreshMenuList"
            clickable
            v-close-popup
            @click="onAutoRefreshClickFn"
          >
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn-dropdown
        v-if="authenticated"
        flat
        stretch
        no-caps
        color="bg-primary"
        icon="flash_on"
        :label="tickTimeLabel"
      >
        <q-list>
          <q-item
            :key="index"
            v-for="(item, index) in tickTimeMenuList"
            clickable
            v-close-popup
            @click="onTickTimeClickFn"
          >
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn-dropdown
        v-if="authenticated"
        flat
        stretch
        no-caps
        color="bg-primary"
        icon="access_time"
        :label="timeRangeLabel"
      >
        <q-list>
          <q-item
            :key="index"
            v-for="(item, index) in timeRangeMenuList"
            clickable
            v-close-popup
            @click="onTimeRangeClickFn"
          >
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-separator dark vertical />
      <q-btn-group flat stretch>
        <q-btn
          flat
          @click="$q.fullscreen.toggle()"
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        >
          <q-tooltip>{{ $q.fullscreen.isActive ? 'Exit zen mode' : 'Enter zen mode' }}</q-tooltip>
        </q-btn>
        <q-btn flat @click="$q.dark.toggle()" :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'">
          <q-tooltip>{{$q.dark.isActive ? 'Click to switch off dark' : 'Click to switch on Dark'}}</q-tooltip>
        </q-btn>
      </q-btn-group>
      <q-separator dark vertical />
      <q-btn-dropdown flat stretch no-caps label="Account" icon="mdi-account">
        <q-list>
          <t-avatar-box></t-avatar-box>
          <q-separator />
          <q-item v-if="authenticated" to="/profile" clickable v-ripple>
            <q-item-section>
              <q-item-label>View profile</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="!authenticated" to="/login" clickable v-close-popup>
            <q-item-section>
              <q-item-label>Login</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="!authenticated" to="/register" clickable v-close-popup>
            <q-item-section>
              <q-item-label>Register</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="authenticated" clickable v-close-popup @click="logout()">
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
  </q-header>
  <q-header v-else elevated v-model="headerState">
    <q-toolbar row no-wrap items-center class="glossy bg-primary">
      <q-btn flat dense round aria-label="Menu" @click="toggleLeftDrawer()">
        <q-icon name="menu" />
      </q-btn>
      <q-space />
      <q-btn
        flat
        @click="$q.dark.toggle()"
        :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        :label="$q.dark.isActive ? 'Dark' : 'Light'"
      />
      <q-btn flat dense round aria-label="Menu" @click="toggleRightDrawer()">
        <q-icon name="settings" />
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Inject } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import LayoutModule, {
  AUTO_REFRESH_INTERVAL,
  TICK_TIME_INTERVAL,
  TIME_RANGE_INTERVAL
} from '../../store/layouts/layout-module';
import AuthService from '../../boot/services/auth.service';

@Component({
  components: {
    TAvatarBox: () => import('../../components/TAvatarBox.vue')
  }
})
export default class TheHeader extends Vue {
  store = getModule(LayoutModule, this.$store);
  @Inject('authService')
  private readonly auth!: () => AuthService;

  @Prop({ default: 'No headline' }) readonly headline!: string;
  private readonly defaultRefreshLabel: string = 'Off';
  private readonly defaultRefreshIcon: string = 'autorenew';
  public readonly refreshMenuList = AUTO_REFRESH_INTERVAL;
  public readonly tickTimeMenuList = TICK_TIME_INTERVAL;
  public readonly timeRangeMenuList = TIME_RANGE_INTERVAL;
  public refreshLabel: string = this.defaultRefreshLabel;
  public refreshIcon: string = this.defaultRefreshIcon;

  get tickTimeLabel() {
    const found = TICK_TIME_INTERVAL.find(
      it => it.value == this.store.tickTimeInterval
    );
    return found ? this.formatDisplayTickTime(found.label) : '';
  }

  get timeRangeLabel() {
    const found = TIME_RANGE_INTERVAL.find(
      it => it.value == this.store.timeRangeInterval
    );
    return found ? found.label : '';
  }

  get headerState() {
    return this.store.headerState;
  }

  set headerState(value: boolean) {
    this.store.setHeaderState(value);
  }

  public toggleLeftDrawer(): void {
    this.store.toggleLeftDrawer();
  }

  public toggleRightDrawer(): void {
    this.store.toggleRightDrawer();
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public logout() {
    this.auth().logOut();
  }

  public isMobilePlatform(): boolean {
    return this.$q.platform.is.mobile || false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onAutoRefreshClickFn(e: any) {
    const found = AUTO_REFRESH_INTERVAL.find(
      it => it.label == e.target.innerText
    );
    if (found) {
      //Trigger auto-refresh mode
      this.store.setRefreshTimeInterval(found.value);
      //Update label
      this.refreshLabel = found.label;
      this.refreshIcon = found.value == 0 ? this.defaultRefreshIcon : 'pause';
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onTimeRangeClickFn(e: any) {
    const found = TIME_RANGE_INTERVAL.find(
      it => it.label == e.target.innerText
    );

    if (found) {
      this.store.setTimeRangeInterval(found.value);
    }
  }

  public onClickRefreshFn() {
    this.store.setForceRefresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onTickTimeClickFn(e: any) {
    const found = TICK_TIME_INTERVAL.find(it => it.label == e.target.innerText);
    if (found) {
      this.store.setTickTimeInterval(found.value);
    }
  }

  private formatDisplayTickTime(val: string) {
    return `Interval ${val}`;
  }
}
</script>
<style lang="sass">
.quasar-logo
  img
    transform: rotate(0deg)
    transition: transform .8s ease-in-out
  &:hover img
    transform: rotate(-360deg)
</style>