<template>
  <q-footer elevated>
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
        </q-avatar>
        {{ headline }}
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TheFooter extends Vue {
  @Prop({ default: 'No footer headline' }) readonly headline!: string;
}
</script>
