import { AxiosStatic } from 'axios';
import hello from 'hellojs';
import VueI18n from 'vue-i18n';

declare module 'vue/types/vue' {
  interface Vue {
    i18n?: VueI18n;
    provide?: object | (() => object);
    $axios: AxiosStatic;
    $hello: hello.HelloJSStatic;
  }
}
