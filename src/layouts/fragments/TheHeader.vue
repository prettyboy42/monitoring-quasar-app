<template>
  <q-header v-if="!isMobilePlatform()" elevated v-model="headerState">
    <q-toolbar row no-wrap items-center class="glossy bg-green-9">
      <q-btn flat dense round aria-label="Menu" @click="toggleLeftDrawer()">
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>{{ headline }}</q-toolbar-title>
      <q-space />

      <!-- <div class="q-pa-sm">Quasar v{{ $q.version }}</div> -->
      <q-btn
        icon="refresh"
        label="Refresh"
        flat
        stretch
        color="bg-green-9"
        @click="onClickRefreshFn"
      />
      <q-btn-dropdown flat stretch color="bg-green-9" :icon="refreshIcon" :label="refreshLabel">
        <q-list>
          <q-item
            :key="index+1"
            v-for="(itemLabel, index) in refreshMenuList"
            clickable
            v-close-popup
            @click="onItemClick"
          >
            <q-item-section>
              <q-item-label>{{ itemLabel }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn-dropdown flat stretch color="bg-green-9" icon="access_time" :label="timeRangeLabel">
        <q-list>
          <q-item
            :key="index+1"
            v-for="(itemLabel, index) in timeRangeMenuList"
            clickable
            v-close-popup
            @click="onTimeRangeClickFn"
          >
            <q-item-section>
              <q-item-label>{{ itemLabel }}</q-item-label>
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
          :label="$q.fullscreen.isActive ? 'Exit Fullscreen' : 'Go Fullscreen'"
        />
        <q-btn
          flat
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
          :label="$q.dark.isActive ? 'Dark' : 'Light'"
        />
      </q-btn-group>
      <q-separator dark vertical />
      <q-btn-dropdown flat stretch no-caps label="Account" icon="mdi-account">
        <q-list>
          <t-avatar-box></t-avatar-box>
          <q-separator />
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
    <q-toolbar row no-wrap items-center class="glossy bg-green-9">
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import LayoutStoreModule from './../LayoutStoreModule';

@Component({
  components: {
    TAvatarBox: () => import('../../components/TAvatarBox.vue')
  }
})
export default class TheHeader extends Vue {
  store = getModule(LayoutStoreModule);
  @Prop({ default: 'No headline' }) readonly headline!: string;
  private readonly defaultRefreshLabel: string = 'Auto refresh';
  private readonly defaultRefreshIcon: string = 'autorenew';
  public readonly refreshMenuList: string[] = [
    'Off',
    '5 seconds',
    '10 seconds',
    '15 seconds',
    '30 seconds',
    '1 minute',
    '5 minutes'
  ];
  public readonly timeRangeMenuList: string[] = [
    'Whole today',
    'Today to now',
    'Last 15 minutes',
    'Last 30 minutes',
    'Last an hour',
    'Last 2 hours',
    'Last 4 hours',
    'Last 8 hours',
    'Last 12 hours',
    'Last 24 hours',
    'Last 7 days'
  ];
  public refreshLabel: string = this.defaultRefreshLabel;
  public refreshIcon: string = this.defaultRefreshIcon;
  public timeRangeLabel: string = this.timeRangeMenuList[0];

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
    return false;
  }

  public isMobilePlatform(): boolean {
    return this.$q.platform.is.mobile || false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onItemClick(e: any) {
    this.refreshLabel =
      e.target.innerText === this.refreshMenuList[0]
        ? this.defaultRefreshLabel
        : e.target.innerText;
    this.refreshIcon =
      e.target.innerText === this.refreshMenuList[0]
        ? this.defaultRefreshIcon
        : 'pause';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onTimeRangeClickFn(e: any) {
    this.timeRangeLabel = e?.target?.innerText || this.timeRangeMenuList[0];
  }

  public onClickRefreshFn() {
    this.store.setForceRefresh(true);
  }
}
</script>
