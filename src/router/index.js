import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'

import UserBar from '@/components/frame/UserBar'


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
    }
  ]
})
