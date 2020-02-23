import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import Signup from '@/components/signup'
import Confirm from '@/components/confirm'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path:'/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/confirmEmail',
      name: 'confirm',
      component: Confirm
    }
  ]
})
