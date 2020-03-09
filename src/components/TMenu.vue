<template>
  <q-list padding>
    <t-avatar-box></t-avatar-box>
    <q-separator />
    <q-item clickable v-ripple to="/">
      <q-item-section avatar>
        <q-icon color="primary" name="dashboard" />
      </q-item-section>

      <q-item-section>Realtime ApexCharts</q-item-section>
    </q-item>
    <q-expansion-item
      group="somegroup"
      icon="home_work"
      label="Dashboard"
      caption="Manage dashboards"
      default-opened
      header-class="text-primary"
    >
      <q-item clickable v-ripple to="/dashboard-smon">
        <q-item-section avatar></q-item-section>
        <q-item-section>Dashboard Smon</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/dashboard">
        <!-- <q-item-section avatar>
          <q-icon color="primary" name="dashboard" />
        </q-item-section>-->

        <q-item-section avatar></q-item-section>
        <q-item-section>Dashboard Draggable</q-item-section>
      </q-item>
      <q-expansion-item :header-inset-level="1" label="Receipts" default-opened>
        <q-expansion-item
          switch-toggle-side
          dense-toggle
          label="Today"
          :header-inset-level="1"
          :content-inset-level="2"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          switch-toggle-side
          dense-toggle
          label="Yesterday"
          :header-inset-level="1"
          :content-inset-level="2"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-expansion-item>
    </q-expansion-item>

    <q-separator />

    <q-expansion-item
      group="somegroup"
      icon="menu_book"
      label="Essential Links"
      header-class="text-teal"
    >
      <essential-link v-for="link in essentialLinks" :key="link.title" v-bind="link" />
    </q-expansion-item>

    <q-separator />

    <q-expansion-item
      group="somegroup"
      icon="shopping_cart"
      label="Third"
      header-class="text-purple"
    >
      <q-card>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
          commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
          eveniet doloribus ullam aliquid.
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-separator />

    <q-expansion-item
      group="somegroup"
      icon="settings"
      label="Fourth"
      header-class="bg-teal text-white"
      expand-icon-class="text-white"
    >
      <q-card class="bg-teal-2">
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
          commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
          eveniet doloribus ullam aliquid.
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  components: {
    EssentialLink: () => import('./EssentialLink.vue'),
    TAvatarBox: () => import('./TAvatarBox.vue')
  }
})
export default class TMenu extends Vue {
  @Prop({ default: [] }) readonly essentialLinks!: object;
}
</script>
