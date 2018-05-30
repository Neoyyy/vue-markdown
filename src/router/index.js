import Vue from 'vue'
import Router from 'vue-router'
import Friend from '@/components/Friend.vue'
import Editor from '@/components/Editor.vue'
import Main from '@/views/main.vue'
import Login from '@/components/Login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {
          path:'/login'
          ,name:'login'
          ,meta:{title:'登录', noAuth:true}
          ,component:Login
        },
        {
          path:'/friend'
          ,name:'friend'
          ,meta:{title:'好友', noAuth:true}
          ,component:Friend
        },
        {
          path:'/editor'
          ,name:'editor'
          ,meta:{title:'编辑器', noAuth:true}
          ,component:Editor
        }
      ]
    }
  ]
})
