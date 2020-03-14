<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  preFetch() {
    //Do something here
  }
})
export default class App extends Vue {}
</script>
