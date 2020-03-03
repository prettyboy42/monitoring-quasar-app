import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { boot } from 'quasar/wrappers';
import { VueConstructor } from 'vue';

const TIMEOUT = 1000000;
const onRequestSuccess = (config: AxiosRequestConfig) => {
  const jwtOauthCode =
    'hmlOi9AsrM2nOEByk-Iu7wDphURSnBKFvaZFxjFaemRORBRXnxs3GDu2rx7sfCPFZ17PhOAtZqgC6EkbY9FqHPX7nDMPrPONYKcIsCdyZoRyJ_ly-kE95VSoXCdEc-aRdaNOkQ7WqaNDJw2a__BQ0wa6ywMqnkP0pHJGmTIvp7AqHOtfdQ3iKEe9WuZYlUnW_osA-us4n7-KMl3NuUhBNCWEYkFYg9DWhrsYsxtTloQh5uwtgfBzHOeq-TgdrR8BrZf8rkcXD6JLAHsNzuqNFyOVJV-Uq2Djyb49lRQjwwg9DxTqbTxQy91__0gCcV-Gkbpn5TwKyfMCKlzTzkpnffyAXLEODb9Nb9g4RW';

  const token = jwtOauthCode;
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.oauthCode = `Bearer ${token}`;
  }
  config.timeout = TIMEOUT;
  config.url = `${config.url}`;
  return config;
};

// We create our own axios instance and set a custom base URL.
// Note that if we wouldn't set any config here we do not need
// a named export, as we could just `import axios from 'axios'`
const axiosMain = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API
});
const onResponseError = (err: AxiosError) => {
  const status = err.response && err.response.status;
  if (status === 403 || status === 401) {
    console.log('Unauthorized!');
  }
  return Promise.reject(err);
};
if (axiosMain.interceptors) {
  axiosMain.interceptors.request.use(onRequestSuccess);
  axiosMain.interceptors.response.use(res => res, onResponseError);
}

export default boot(async ({ Vue }: { Vue: VueConstructor }) => {
  Vue.prototype.$axios = axios;
  // something to do
  //   await something();
});

export { axiosMain };
