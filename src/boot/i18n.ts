import messages from 'src/i18n';
import Vue, { VueConstructor } from 'vue';
import VueI18n from 'vue-i18n';

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n;
  }
}

export default async ({ app, Vue }: { app: Vue; Vue: VueConstructor }) => {
  Vue.use(VueI18n);

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: 'vi-vn',
    fallbackLocale: 'en-us',
    messages
  });
};
