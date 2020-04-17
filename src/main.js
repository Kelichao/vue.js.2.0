import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import global from "./global"// 全局调用
import Vuex from 'vuex'
import path from "./router/path.js"

// 插件
Vue.use(VueRouter)
Vue.use(ElementUI)

new Vue({
  router: path,
  el: '#app',
  render: h => h(App)
})

// router.push('foo')