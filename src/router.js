import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/userList',
      name: 'UserList',
      component: () => import('./components/user/UserList.vue')
    },
    {
      path: '/userEdit',
      name: 'UserEdit',
      component: () => import('./components/user/UserEdit.vue')
    },
    {
      path: '/userAdd',
      name: 'UserAdd',
      component: () => import('./components/user/UserAdd.vue')
    }
  ]
})
