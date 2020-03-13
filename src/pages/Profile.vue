<template>
  <q-page class="flex flex-center">
    <div>
      <div v-if="profile.id">
        <div class="q-title">{{ profile.first_name + ' ' + profile.last_name }}</div>
        <p>
          <img :src="profile.picture" />
        </p>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class profile extends Vue {
  public profile = {};
  mounted() {
    this.getProfile('facebook');
  }

  getProfile(network: any) {
    if (this.$hello.getAuthResponse(network) == null) {
      return;
    }
    this.$hello(network)
      .api('me')
      .then(res => {
        console.log(res);
        this.profile = res;
      });
  }
}
</script>
