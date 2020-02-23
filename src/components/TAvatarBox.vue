<template>
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
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TAvatarBox extends Vue {}
</script>
