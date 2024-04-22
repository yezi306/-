import { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { coreRoutes } from './modules/core';
import { isEmpty } from 'lodash-es';
import { App } from 'vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/view/login.vue'),
    meta: {
      locale: 'page.login',
      requiresAuth: false,
      keepAlive: false
    }
  },
  ...coreRoutes
];

/**
 * 路由实例
 */
export let router: ReturnType<typeof createRouter>;

/**
 * 全局白名单
 */
export let whiteList: Array<string> = ['/login'];


/**
 * 初始化
 */
export const setupRouter = async (app: App, customWhiteList: Array<string> = []) => {
    // 初始化路由实例
    router = createRouter({
        routes: routes,
        history: createWebHashHistory(),
        scrollBehavior: () => ({ left: 0, top: 0 }),
    });
    // 设置白名单
    if (!isEmpty(customWhiteList)) {
        whiteList = customWhiteList;
    }
   app.use(router);
};
