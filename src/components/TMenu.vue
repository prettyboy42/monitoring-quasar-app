<template>
  <q-list bordered>
    <q-item-label header>Essential Links</q-item-label>
    <q-expansion-item
      group="somegroup"
      icon="explore"
      label="First"
      caption="5 unread emails"
      default-opened
      header-class="text-primary"
    >
      <q-expansion-item
        :header-inset-level="1"
        expand-separator
        icon="receipt"
        label="Receipts"
        default-opened
      >
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
      icon="perm_identity"
      label="Second"
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
      icon="bluetooth"
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
