import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'Index', path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/demo-apexcharts',
        component: () => import('pages/DemoApexCharts.vue')
      },
      {
        path: '/dashboard',
        component: () => import('pages/GridDraggablePage.vue')
      },
      {
        path: '/dashboard-smon',
        component: () => import('pages/DashboardSmon.vue'),
        meta: { authorities: ['user'] }
      },
      {
        path: '/dashboard-smon-highcharts',
        component: () => import('pages/DashboardSmonHighcharts.vue'),
        meta: { authorities: ['user'] }
      },
      {
        path: '/profile',
        component: () => import('pages/Profile.vue'),
        meta: { authorities: ['user'] }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/Login.vue') }]
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: () => import('pages/Error.vue'),
    meta: {
      error403: true,
      errorMessage: 'Please contact your admin to grant permission'
    }
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: () => import('pages/Error.vue'),
    meta: { error404: true }
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
