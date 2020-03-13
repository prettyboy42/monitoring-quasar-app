import { LocalStorage, SessionStorage } from 'quasar';
import { KEY_ACCESS_TOKEN, KEY_OAUTH_CODE } from '../../constants';

export default class StorageUtils {
  getOauthCode() {
    const token =
      LocalStorage.getItem(KEY_OAUTH_CODE) ||
      SessionStorage.getItem(KEY_OAUTH_CODE);
    return token;
  }

  saveOauthCode(code: string, rememberMe?: boolean): void {
    if (rememberMe) {
      LocalStorage.set(KEY_OAUTH_CODE, code);
    } else {
      SessionStorage.set(KEY_OAUTH_CODE, code);
    }
  }

  removeToken() {
    LocalStorage.remove(KEY_OAUTH_CODE);
    SessionStorage.remove(KEY_OAUTH_CODE);
  }

  getAccessToken() {
    return LocalStorage.getItem(KEY_ACCESS_TOKEN);
  }

  saveAccessToken(refreshToken: string) {
    LocalStorage.set(KEY_ACCESS_TOKEN, refreshToken);
  }

  removeAccessToken() {
    LocalStorage.remove(KEY_ACCESS_TOKEN);
  }
}

const storageUtils = new StorageUtils();
export { storageUtils };
