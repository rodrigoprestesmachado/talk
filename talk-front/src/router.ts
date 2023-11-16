import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const AppLayout = () => import('/@src/layouts/AppLayout.vue')
const AuthLayout = () => import('/@src/layouts/AuthLayout.vue')
const LandingLayout = () => import('/@src/layouts/LandingLayout.vue')
const WizardLayout = () => import('/@src/layouts/WizardLayout.vue')

import IndexPage from '/@src/pages/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'auth-login',
        component: () => import('/@src/pages/auth/login.vue'),
      },
      {
        path: 'login-2',
        name: 'auth-login-2',
        component: () => import('/@src/pages/auth/login-2.vue'),
      },
      {
        path: 'signup',
        name: 'auth-signup',
        component: () => import('/@src/pages/auth/signup.vue'),
      },
      {
        path: 'signup-2',
        name: 'auth-signup-2',
        component: () => import('/@src/pages/auth/signup-2.vue'),
      },
      {
        path: 'forgot-password',
        name: 'auth-forgot-password',
        component: () => import('/@src/pages/auth/forgot-password.vue'),
      },
      {
        path: '',
        redirect: '/',
      },
    ],
  },
  {
    path: '/workspace',
    component: WizardLayout,
    children: [
      {
        path: 'create',
        name: 'workspace-create',
        component: () => import('/@src/pages/workspace/create.vue'),
      },
      {
        path: '',
        redirect: '/',
      },
    ],
  },
  {
    path: '/workspace',
    component: AppLayout,
    children: [
      {
        path: ':slug',
        name: 'workspace',
        component: () => import('/@src/pages/workspace/[slug].vue'),
      },
      {
        path: '',
        redirect: '/',
      },
    ],
  },
  {
    path: '/',
    component: LandingLayout,
    children: [
      {
        path: '',
        name: 'index',
        component: IndexPage,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    component: LandingLayout,
    children: [
      {
        path: '',
        name: 'not-found',
        component: () => import('/@src/pages/404.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
