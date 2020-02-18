<template>
  <q-list padding>
    <q-item>
      <q-item-section top avatar>
        <q-avatar size="90px">
          <img
            src="https://s120-ava-talk.zadn.vn/b/e/5/e/101/120/729745bf63985da9a6b0610949891c69.jpg"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>Tam Nguyen</q-item-label>
        <q-item-label caption>@tamnd</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="primary" name="dashboard" />
      </q-item-section>

      <q-item-section>Main Dashboard</q-item-section>
    </q-item>
    <q-expansion-item
      group="somegroup"
      icon="home_work"
      label="First"
      caption="First caption"
      default-opened
      header-class="text-primary"
    >
      <q-item clickable v-ripple>
        <!-- <q-item-section avatar>
          <q-icon color="primary" name="dashboard" />
        </q-item-section>-->

        <q-item-section avatar></q-item-section>
        <q-item-section>Dashboard</q-item-section>
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
import EssentialLink from './EssentialLink.vue';

@Component({
  components: {
    EssentialLink
  }
})
export default class TMenu extends Vue {
  @Prop({ default: [] }) readonly essentialLinks!: object;
}
</script>
