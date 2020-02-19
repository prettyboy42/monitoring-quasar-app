<template>
  <q-card class="my-card" :style="{backgroundImage: bgColor}">
    <q-card-section style="padding: 5px;">
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class CardBase extends Vue {
  // @Prop({ default: 'linear-gradient( 135deg, #343E59 10%, #2B2D3E 40%)' })
  @Prop({ default: '' })
  public readonly bgColor!: string;
}
</script>
