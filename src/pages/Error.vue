<template>
  <div class="fixed-center text-center">
    <q-card>
      <q-card-section>
        <div class="text-h6" v-text="$t('error.title')">Registration</div>
      </q-card-section>
      <q-separator />
      <q-card-section v-if="errorMessage">
        <div class="alert alert-danger" role="alert">{{ errorMessage }}</div>
      </q-card-section>
      <q-card-section v-if="error403">
        <div
          class="alert alert-danger"
          role="alert"
          v-text="$t('error.http.403')"
        >You are not authorized to access this page.</div>
      </q-card-section>
      <q-card-section v-if="error404">
        <div
          class="alert alert-danger"
          role="alert"
          v-text="$t('error.http.404')"
        >The page you requested does not exist.</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component({
  name: 'Error'
})
export default class Error extends Vue {
  errorMessage: string = '';
  error403 = false;
  error404 = false;

  beforeRouteEnter(
    to: Route,
    from: Route,
    next: (to?: (vm: Error) => void) => void
  ): void {
    next((vm: Error) => {
      let errorMessage = null;
      let error403 = false;
      let error404 = false;

      if (to.meta.errorMessage) {
        errorMessage = to.meta.errorMessage;
      }

      if (to.meta.error403) {
        error403 = to.meta.error403;
      }

      if (to.meta.error404) {
        error404 = to.meta.error404;
      }

      vm.init(errorMessage, error403, error404);
    });
  }

  public init(
    errorMessage: string = '',
    error403: boolean = false,
    error404: boolean = false
  ) {
    this.errorMessage = errorMessage;
    this.error403 = error403;
    this.error404 = error404;

    if (!this.$store.getters.authenticated && this.error403) {
      this.$router.push('/login');
    }
  }
}
</script>
