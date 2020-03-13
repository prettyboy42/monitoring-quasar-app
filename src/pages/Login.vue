<template>
  <q-page class="docs-input row justify-center">
    <q-card class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-xl dark">
      <q-card-section class="text-center" style="color:white">
        <img src="https://stc-zaloprofile.zdn.vn/pc/v1/images/logo.svg" width="130em" />
        <p
          class="q-display-1 text-weight-bolder q-pt-lg"
          v-text="$t('login.title')"
        >Quasar + Hello.js</p>
        <!-- <p class="q-title text-weight-bold q-ma-none">Social Login</p> -->
      </q-card-section>
      <q-card-section>
        <div class="q-mt-xl q-gutter-md">
          <q-btn
            color="primary"
            glossy
            push
            class="full-width"
            label="Login with Zalo"
            size="md"
            @click="onClickZaloLoginFn"
          />
          <q-btn
            color="default"
            glossy
            push
            class="full-width"
            icon="fab fa-facebook-f"
            label="Login with Facebook"
            size="md"
            @click="auth('facebook')"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import DialogLoginZalo from '../components/DialogLoginZalo.vue';
import { storageUtils } from '../boot/services/storage-utils';

@Component
export default class Login extends Vue {
  created() {
    this.checkRedirect();
  }

  public auth(network: any) {
    this.$hello(network)
      .login({ scope: 'friends' })
      .then(() => {
        this.$router.push('profile');
      });
    // .then((res: any) => {
    //   console.log(res);
    // });
  }

  private onClickZaloLoginFn(e: any) {
    this.$q
      .dialog({
        component: DialogLoginZalo,

        // optional if you want to have access to
        // Router, Vuex store, and so on, in your
        // custom component:
        parent: this, // becomes child of this Vue node
        // ("this" points to your Vue component)
        // (prop was called "root" in < 1.1.0 and
        // still works, but recommending to switch
        // to the more appropriate "parent" name)

        // props forwarded to component
        // (everything except "component" and "parent" props above):
        text: 'Hello'
        // ...more.props...
      })
      .onOk(() => {
        this.$router.push('/');
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Login successully'
        });
      })
      .onCancel(() => {
        console.log('Cancel');
      })
      .onDismiss(() => {
        console.log('Called on OK or Cancel');
      });
  }

  checkRedirect() {
    const query = this.$route.query;
    const oauthCode: string = query.oauthCode as string;
    if (oauthCode) {
      storageUtils.saveOauthCode(oauthCode);
    }
  }
}
</script>
<style scoped>
.dark {
  background: #1817309a;
}
</style>