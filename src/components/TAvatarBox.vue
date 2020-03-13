<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar size="90px">
        <img :src="avatarUrl" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{displayName}}</q-item-label>
      <q-item-label caption>{{caption}}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { User } from '../boot/services/types';

@Component
export default class TAvatarBox extends Vue {
  @Getter('currentUser') currentUser?: User;

  get displayName() {
    return this.currentUser?.name || 'John Doe';
  }
  get caption() {
    return `@${this.currentUser?.name || ''}`;
  }
  get avatarUrl() {
    return (
      this.currentUser?.avatar || 'https://s240.avatar.talk.zdn.vn/default'
    );
  }
}
</script>
