import { createRouter, createWebHistory } from 'vue-router'
import LandingView from './views/LandingView.vue'
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import {
  getCurrentUser,
  waitForAuthReady
} from './services/auth.service.js'

const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
  path: '/register',
  component: RegisterView
},
  {
  path: '/',
  component: LandingView
},
{
  path: '/app',
  component: () =>
    import('./views/ResumeView.vue')
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  const user = await waitForAuthReady()

  if (to.path === '/app' && !user) {
  return '/login'
}

  if (
  (to.path === '/login' ||
    to.path === '/register') &&
  user
) {
  return '/app'
}

  return true
})

export default router