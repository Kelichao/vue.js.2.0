import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import global from "./global"// 全局调用
import Vuex from 'vuex'
import router from "./router.js"
import store from "./store.js"


Vue.use(ElementUI)


new Vue({
  router,// 路由
  store,// vuex
  el: '#app',
  render: h => h(App)
})

