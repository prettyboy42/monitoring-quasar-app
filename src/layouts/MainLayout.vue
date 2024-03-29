<template>
  <q-layout view="hHh Lpr lff">
    <the-header :headline="headline" />
    <the-side-bar-left :essentialLinks="essentialLinks" />

    <the-side-bar-right v-show="$q.platform.is.mobile||false" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <the-footer :headline="footerline" /> -->
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import LayoutModule from '../store/layouts/layout-module';
import TheHeader from './fragments/TheHeader.vue';
import TheFooter from './fragments/TheFooter.vue';
import TheSideBarLeft from './fragments/TheSideBarLeft.vue';
import TheSideBarRight from './fragments/TheSideBarRight.vue';

@Component({
  components: {
    TheHeader,
    TheFooter,
    TheSideBarLeft,
    TheSideBarRight
  }
})
export default class MainLayout extends Vue {
  store = getModule(LayoutModule, this.$store);

  public headline = 'System Monitoring';
  footerline = 'Pacific Ocean, copyright © 2019. All rights reserved.';
  essentialLinks = [
    {
      title: 'Docs',
      caption: 'quasar.dev',
      icon: 'school',
      link: 'https://quasar.dev'
    },
    {
      title: 'Github',
      caption: 'github.com/quasarframework',
      icon: 'code',
      link: 'https://github.com/quasarframework'
    },
    {
      title: 'Discord Chat Channel',
      caption: 'chat.quasar.dev',
      icon: 'chat',
      link: 'https://chat.quasar.dev'
    },
    {
      title: 'Forum',
      caption: 'forum.quasar.dev',
      icon: 'record_voice_over',
      link: 'https://forum.quasar.dev'
    },
    {
      title: 'Twitter',
      caption: '@quasarframework',
      icon: 'rss_feed',
      link: 'https://twitter.quasar.dev'
    },
    {
      title: 'Facebook',
      caption: '@QuasarFramework',
      icon: 'public',
      link: 'https://facebook.quasar.dev'
    }
  ];

  @Watch('$q.fullscreen.isActive')
  // eslint-disable-next-line
  onChildChanged(val: boolean, oldVal: boolean) {
    this.toogleFullScreen(!val);
  }

  created() {
    if (this.$q.platform.is.desktop === true) {
      this.registerEventFullScreen();
    }
  }

  destroyed() {
    if (this.$q.platform.is.desktop === true) {
      this.removeEventFullScreen();
    }
  }

  public registerEventFullScreen(): void {
    window.addEventListener('resize', this.handlerFullScreen, false);
  }

  public removeEventFullScreen(): void {
    window.removeEventListener('resize', this.handlerFullScreen, false);
  }

  // eslint-disable-next-line
  private handlerFullScreen(event: any): void {
    const maxHeight = window.screen.height,
      maxWidth = window.screen.width,
      curHeight = window.innerHeight,
      curWidth = window.innerWidth;

    const isFullScreen = maxWidth == curWidth && maxHeight == curHeight;
    this.toogleFullScreen(!isFullScreen);
  }

  private toogleFullScreen(val: boolean): void {
    this.store.setLeftDrawerOpen(val);
    this.store.setHeaderState(val);
    this.store.setFooterState(val);
  }
}
</script>
