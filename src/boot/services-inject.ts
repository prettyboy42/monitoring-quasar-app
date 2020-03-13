import { boot } from 'quasar/wrappers';
import AuthService from './services/auth.service';

export default boot(async ({ app, router, store, Vue }) => {
  const authService = new AuthService(store, router);
  const provide = {
    authService: () => authService
  };
  app.provide = provide;
  // Router authentication
  router.beforeEach((to, from, next) => {
    if (!to.matched.length) {
      next('/not-found');
    }

    if (to.meta && to.meta.authorities && to.meta.authorities.length > 0) {
      if (!authService.hasAnyAuthority(to.meta.authorities)) {
        sessionStorage.setItem('requested-url', to.fullPath);
        next('/forbidden');
      } else {
        next();
      }
    } else {
      // no authorities, so just proceed
      next();
    }
  });
});
