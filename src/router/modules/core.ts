import { RouteRecordRaw } from 'vue-router';

export const coreRoutes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: () => import('@/view/home.vue'),
    meta: {
      description: '首页',
      requiresAuth: true,
      keepAlive: false
    }
  }
];
