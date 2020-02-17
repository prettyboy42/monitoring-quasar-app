<template>
  <q-header v-if="!isMobilePlatform()" elevated v-model="headerState">
    <q-toolbar row no-wrap items-center class="glossy bg-green-9">
      <q-btn flat dense round aria-label="Menu" @click="toggleLeftDrawer()">
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>{{ headline }}</q-toolbar-title>
      <q-space />

      <div class="q-pa-sm">Quasar v{{ $q.version }}</div>
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
          :icon="$q.dark.isActive ? 'toggle_on' : 'toggle_off'"
          :label="$q.dark.isActive ? 'Light' : 'Dark'"
        />
      </q-btn-group>
      <q-separator dark vertical />
      <q-btn-dropdown flat stretch no-caps label="Account" icon="mdi-account">
        <q-list>
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
        :icon="$q.dark.isActive ? 'toggle_on' : 'toggle_off'"
        :label="$q.dark.isActive ? 'Light' : 'Dark'"
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

@Component
export default class TheHeader extends Vue {
  store = getModule(LayoutStoreModule);
  @Prop({ default: 'No headline' }) readonly headline!: string;

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
}
</script>
