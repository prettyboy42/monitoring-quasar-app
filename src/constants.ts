export const TOKEN_KEY = 'jhi-authenticationToken';
export const REFRESH_TOKEN_KEY = 'jhi-authenticationRefreshToken';

export const KEY_OAUTH_CODE = 'oauthCode';
export const KEY_ACCESS_TOKEN = 'accessToken';

export const ZALO_APP = {
  appId: '952810569795803533',
  redirectUri: 'https://monitor.zaloapp.com/auth/callback_url',
  state: process.env.DEV
    ? 'http://localhost:8080/login'
    : 'https://monitoring-quasar-app.now.sh/login'
};
