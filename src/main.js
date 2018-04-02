// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index'
//import Vuex from 'vuex'
//import VueResource from 'vue-resource'
import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false


//Vue.use(Vuex)
Vue.use(element)
//Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  render: h => h(App),
  components: { App }
})



//
//
// //全局配置vue-resource的请求拦截与响应处理
// Vue.http.interceptors.push(function(request, next) {
//
//   //对请求结果做处理
//   next(function(response) {
//     this.$logHelper.info("[response data]---"+JSON.stringify(response.body),"main")
//     //请求响应成功的全局处理
//     if(response.status == 200){
//       //判断业务结果吗是否正确
//       var code = response.body.code
//       if(code != 200){
//         //根据业务错误码做统一错误处理
//         vm.showErrorMessage(response.body.message)
//         //修改响应状态使得内部不再对响应做其他处理
//         response.status = -1
//         //开启错误Loading
//         this.$Loading.error()
//         switch (code){
//           case 300:
//             this.$router.push('/')
//             break
//         }
//       }else{
//         //结束全局Loading
//         this.$Loading.finish()
//       }
//     }else{
//       //请求响应失败的全局处理
//       vm.showErrorMessage('请求错误或此功能需要搭建后台运行')
//       this.$Loading.error()
//     }
//   })
//
// })

