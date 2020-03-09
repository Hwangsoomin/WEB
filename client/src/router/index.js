import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import Signup from '@/components/signup'
import Confirm from '@/components/confirm'
import boardWite from '@/components/board/board-write'
import boardView from '@/components/board/board-view'
import Board from '@/components/board/board'
import boardEdit from '@/components/board/board-edit'
import myNInfor from '@/components/information/nicknameInfo'
import myPInfo from '@/components/information/passInfo'

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
    },
    {
      path: '/board/write',
      name: 'boardwrite',
      component: boardWite
    },
    {
      path: '/board/view/:id',
      name: 'boardview',
      component: boardView
    },
    {
      path: '/board',
      name: 'board',
      component: Board
    },
    {
      path: '/board/edit/:id',
      name: 'boardEdit',
      component: boardEdit
    },
    {
      path: '/myinfo/nick',
      name: 'myNInfo',
      component: myNInfor
    },
    {
      path: '/myinfo/pass',
      name: 'myPInfo',
      component: myPInfo
    }
  ]
})
