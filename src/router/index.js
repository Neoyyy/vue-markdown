import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'

import UserBar from '@/components/frame/UserBar'
import Userfile from '@/components/frame/UserFile'
import dialog from '@/components/frame/dialog'

Vue.use(Router)

export default new Router({
  routes: [

    {
    	path: '/',
    	name: 'main',
    	component: Main
    },
    {
        path: '/login',
    	name: 'login',
    	component: Login
    },
    {
        path: '/bar',
        name: 'bar',
        component: UserBar
    },
    {
      path: '/files',
      name: 'files',
      component: Userfile
    },
    {
      path: '/dialog',
      name: 'dialog',
      component: dialog
    }
  ]
})
