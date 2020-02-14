<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class App extends Vue {
  // created() {
  //   this.registerEventFullScreen();
  // }
  // public registerEventFullScreen(): void {
  //   window.addEventListener('fullscreenchange', event => {
  //     this.handlerFullScreen();
  //   });
  //   window.addEventListener('mozfullscreenchange', () => {
  //     this.handlerFullScreen();
  //   });
  //   /* Chrome, Safari and Opera */
  //   window.addEventListener('webkitfullscreenchange', () => {
  //     this.handlerFullScreen();
  //   });
  //   /* IE / Edge */
  //   window.addEventListener('msfullscreenchange', () => {
  //     this.handlerFullScreen();
  //   });
  // }
  // private handlerFullScreen(val?: boolean): void {
  //   console.log(val ? 'In fullscreen now' : 'Exited fullscreen');
  // }
}
</script>
