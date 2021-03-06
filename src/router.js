import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/dashboard',
          component: () => import('@/views/dashboardManage/dashboard')
        },
        {
          path: '/index',
          component: () => import('@/views/indexManage')
        },
        {
          path: '/order',
          component: () => import('@/views/orderManage/orderIndex')
        },
        {
          path: '/index/callback',
          component: () => import ('@/views/callbackManage/callback')
        },
        {
          path: '/about',
          component: () => import('@/views/aboutManage/about')
        },
        {
          path: '/about/index',
          component: () => import('@/views/aboutManage/info')
        },
        {
          path: '/enlist',
          component: () => import('@/views/enlistManage/info')
        }
      ]
    },
    {
      path: '/download',
      component: () => import ('@/views/downloadManage/download')
    }
  ]
})
