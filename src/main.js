// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueSocketio from 'vue-socket.io';

Vue.config.productionTip = false
//引入iview样式
import 'iview/dist/styles/iview.css';
//全局引入iview
import iView from 'iview';
Vue.use(iView);
//Vue.use(VueSocketio, socketio('http://localhost:3000'), store);
Vue.use(VueSocketio, 'http://localhost:3000', store);
//Vue.use(VueSocketio, socketio('http://localhost:3000'));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
