import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'home',
        meta: {
          keepAlive: true,
        },
      },
      {
        path: 'authentication',
        children: [
          {
            path: 'login',
            component: () => import('pages/authentication/LoginPage.vue'),
            name: 'login',
          },
          {
            path: 'createAccount',
            component: () =>
              import('pages/authentication/CreateAccountPage.vue'),
            name: 'createAccount',
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
