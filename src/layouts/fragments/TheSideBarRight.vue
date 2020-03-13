<template>
  <q-drawer show-if-above side="right" v-model="rightDrawerOpen" bordered :width="180" overlay>
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item-label header class="text-subtitle1 text-grey-8">Settings</q-item-label>
        <q-item>
          <q-item-section class="text-primary">Quasar v{{ $q.version }}</q-item-section>
        </q-item>
        <q-separator />
        <q-expansion-item group="somegroup" label="Account" caption="First caption" default-opened>
          <q-item v-if="authenticated" to="/profile" clickable v-ripple>
            <q-item-section>
              <q-item-label>View profile</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="!authenticated" to="/login" clickable v-ripple>
            <q-item-section>
              <q-item-label>Login</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="!authenticated" to="/register" clickable v-ripple>
            <q-item-section>
              <q-item-label>Register</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="authenticated" clickable v-ripple @click="logout()">
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import LayoutModule from '../../store/layouts/layout-module';

@Component
export default class TheSideBarRight extends Vue {
  store = getModule(LayoutModule, this.$store);

  get rightDrawerOpen() {
    return this.store.rightDrawerOpen;
  }

  set rightDrawerOpen(value: boolean) {
    this.store.setRightDrawerOpen(value);
  }

  public get authenticated(): boolean {
    return false;
  }
}
</script>
