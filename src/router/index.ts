import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { RouteName, RoutePath } from '@/constants'
import { tokenStorage } from '@/utils/tokenStorage'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: RoutePath.ACCOUNTS,
  },
  {
    path: RoutePath.LOGIN,
    name: RouteName.LOGIN,
    component: () => import('@/views/LoginView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: RoutePath.ACCOUNTS,
    name: RouteName.ACCOUNTS,
    component: () => import('@/views/AccountsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: RoutePath.ACCOUNTS,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const isAuthenticated = Boolean(tokenStorage.getToken())

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: RouteName.LOGIN }
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return { name: RouteName.ACCOUNTS }
  }

  return true
})
