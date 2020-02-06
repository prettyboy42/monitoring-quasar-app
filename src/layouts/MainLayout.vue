<template>
  <q-layout view="lHh Lpr lFf">
    <the-header :headline="headline" />

    <the-side-bar-left :essentialLinks="essentialLinks" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <the-footer :headline="footerline" />
  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TheHeader from './fragments/TheHeader.vue';
import TheFooter from './fragments/TheFooter.vue';
import TheSideBarLeft from './fragments/TheSideBarLeft.vue';

@Component({
  components: {
    TheHeader,
    TheFooter,
    TheSideBarLeft
  }
})
export default class MainLayout extends Vue {
  public headline = 'Income Tax Calculator';
  footerline = 'Pacific Ocean, copyright © 2019. All rights reserved.';
  essentialLinks = [
    {
      title: 'ZaloGit',
      caption: 'zalo social team',
      icon: 'build',
      link: 'https://zalogit2.zing.vn/zalo-social'
    },
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
}
</script>
