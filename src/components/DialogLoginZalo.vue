<template>
  <q-dialog ref="myDialog" @hide="onDialogHide">
    <q-card style="min-height:300px;width:100%;">
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <q-card-section class="row items-center">
          <iframe
            v-show="showSimulatedReturnData"
            width="100%"
            height="705"
            frameborder="0"
            :src="oauthUrl"
            @load="handleOnLoadIframeFn"
          />
        </q-card-section>
      </transition>

      <!-- <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>-->
      <q-inner-loading :showing="visible">
        <q-spinner-ios size="50px" color="yellow" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { storageUtils } from '../boot/services/storage-utils';
import { Action } from 'vuex-class';
import { ZALO_APP } from '../constants';

@Component
export default class DialogLoginZalo extends Vue {
  public $refs!: {
    //A new ! post-fix expression operator may be used to assert that its operand is non-null and non-undefined in contexts
    myDialog: HTMLFormElement;
  };
  @Action('saveUserInfo') saveUserInfo: any;

  private readonly oauthUrl = `https://oauth.zaloapp.com/v3/permission?app_id=${ZALO_APP.appId}&redirect_uri=${ZALO_APP.redirectUri}&state=${ZALO_APP.state}`;
  public visible: boolean = true;
  public showSimulatedReturnData: boolean = false;

  private toggleOnSpinner() {
    this.visible = true;
    this.showSimulatedReturnData = false;
  }

  private toggleOffSpinner() {
    this.visible = false;
    this.showSimulatedReturnData = true;
  }

  created() {
    this.toggleOnSpinner();
  }

  // following method is REQUIRED
  // (don't change its name --> "show")
  show() {
    this.$refs.myDialog.show();
  }

  // following method is REQUIRED
  // (don't change its name --> "hide")
  hide() {
    this.$refs.myDialog.hide();
  }

  onDialogHide() {
    // required to be emitted
    // when QDialog emits "hide" event
    this.$emit('hide');
  }

  onOKClick() {
    // on OK, it is REQUIRED to
    // emit "ok" event (with optional payload)
    // before hiding the QDialog
    this.$emit('ok');
    // or with payload: this.$emit('ok', { ... })

    // then hiding dialog
    this.hide();
  }

  onCancelClick() {
    // we just need to hide dialog
    this.hide();
  }

  handleOnLoadIframeFn(e: any) {
    //Check if isAuthenticated to close dialog
    const oauthCode = storageUtils.getOauthCode();
    if (oauthCode) {
      this.$axios
        .get('https://monitor.zaloapp.com/api/users/getUserInfoAfterAuthen', {
          headers: {
            oauthCode: `Bearer ${oauthCode}`
          }
        })
        .then(res => {
          this.saveUserInfo(res.data.user);
          this.onOKClick();
        })
        .catch(error => {
          console.log('error while call api. err:' + error);
        })
        .finally(() => {
          this.toggleOffSpinner();
        });
    } else {
      this.toggleOffSpinner();
    }
  }
}
</script>
