<template>
  <q-item clickable tag="a" target="_blank" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class EssentialLink extends Vue {
  @Prop(String) readonly title: string | undefined;
  @Prop({ default: '' }) readonly caption!: string;
  @Prop({ default: '#' }) readonly link!: string;
  @Prop({ default: '' }) readonly icon!: string;
}
</script>
