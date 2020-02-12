<template>
  <q-page class="container">
    <div class="row q-col-gutter-md q-px-md q-pt-sm justify-center">
      <div class="col-md-3" v-for="i in 8" :key="i">
        <!-- <apex-line-small :bgColorCard="colors[i - 1]"></apex-line-small> -->
        <apex-line :bgColorCard="colors[i - 1]"></apex-line>
      </div>
    </div>
    <div class="row q-col-gutter-md q-px-md q-py-md">
      <!-- <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-column></apex-column>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-donut></apex-donut>
      </div>-->
      <!-- <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-line></apex-line>
      </div>-->
      <!-- <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-multiple-radial-bars></apex-multiple-radial-bars>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-heatmap></apex-heatmap>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-radial-bar></apex-radial-bar>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-bubble></apex-bubble>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-radar></apex-radar>
      </div>-->
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ApexLine from 'components/ApexLine.vue';

@Component({
  components: {
    ApexLine
  }
})
export default class PageIndex extends Vue {
  public colors: string[] = [
    'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
    'linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)',
    'linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)',
    'linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)'
  ];
}
</script>
