<template>
  <q-drawer
    show-if-above
    v-model="leftDrawerOpen"
    side="left"
    :width="300"
    :breakpoint="700"
    bordered
  >
    <q-scroll-area class="fit">
      <t-menu :essentialLinks="essentialLinks"></t-menu>
      <!-- <q-list>
      <q-item-label header class="text-grey-8">Essential Links</q-item-label>
      <essential-link v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>-->
    </q-scroll-area>
  </q-drawer>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import LayoutStoreModule from './../LayoutStoreModule';
import EssentialLink from '../../components/EssentialLink.vue';
import TMenu from '../../components/TMenu.vue';

@Component({
  components: {
    EssentialLink,
    TMenu
  }
})
export default class TheSideBarLeft extends Vue {
  store = getModule(LayoutStoreModule);
  @Prop({ default: [] }) readonly essentialLinks!: object;

  get leftDrawerOpen() {
    return this.store.leftDrawerOpen;
  }

  set leftDrawerOpen(value: boolean) {
    this.store.setLeftDrawerOpen(value);
  }
}
</script>
