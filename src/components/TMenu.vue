<template>
  <q-list padding>
    <t-avatar-box></t-avatar-box>
    <q-separator />
    <q-item clickable v-ripple to="/">
      <q-item-section avatar>
        <q-icon color="primary" name="dashboard" />
      </q-item-section>

      <q-item-section>Demo ApexCharts</q-item-section>
    </q-item>
    <q-expansion-item
      v-if="authenticated"
      group="somegroup"
      icon="home_work"
      label="Dashboard"
      caption="Manage dashboards"
      default-opened
      header-class="text-primary"
    >
      <q-item clickable v-ripple to="/dashboard-smon">
        <q-item-section avatar></q-item-section>
        <q-item-section>Smon Apexcharts</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/dashboard-smon-highcharts">
        <q-item-section avatar></q-item-section>
        <q-item-section>Smon Highcharts</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/dashboard">
        <!-- <q-item-section avatar>
          <q-icon color="primary" name="dashboard" />
        </q-item-section>-->

        <q-item-section avatar></q-item-section>
        <q-item-section>Dashboard Draggable</q-item-section>
      </q-item>
    </q-expansion-item>

    <q-separator />

    <q-expansion-item
      group="somegroup"
      icon="menu_book"
      label="Essential Links"
      header-class="text-teal"
      :default-opened="!authenticated"
    >
      <essential-link v-for="link in essentialLinks" :key="link.title" v-bind="link" />
    </q-expansion-item>
  </q-list>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component({
  components: {
    EssentialLink: () => import('./EssentialLink.vue'),
    TAvatarBox: () => import('./TAvatarBox.vue')
  }
})
export default class TMenu extends Vue {
  @Prop({ default: [] }) readonly essentialLinks!: object;
  @Getter('authenticated') authenticated: any;
}
</script>
