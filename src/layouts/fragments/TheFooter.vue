<template>
  <q-footer v-model="footerState" elevated>
    <q-toolbar class="glossy bg-green-9">
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
import { getModule } from 'vuex-module-decorators';
import LayoutModule from '../../store/layouts/layout-module';

@Component
export default class TheFooter extends Vue {
  store = getModule(LayoutModule, this.$store);
  @Prop({ default: 'No footer headline' }) readonly headline!: string;

  get footerState() {
    return this.store.footerState;
  }

  set footerState(value: boolean) {
    this.store.setFooterState(value);
  }
}
</script>
