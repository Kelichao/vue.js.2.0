import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import global from "./global"// 全局调用
import Vuex from 'vuex'
// import VueI18n from 'vue-i18n' 
import router from "./router.js"
import store from "./store.js"

import './css/reset.css';
import './css/swiper.css';
import "./assets/leaflet/leaflet.css"
import './style/theme/index.css';

import UmyUi from 'umy-ui'
import 'umy-ui/lib/theme-chalk/index.css';// 引入样式
Vue.use(UmyUi);

console.warn("当前模式",process.env.TYPE)
// console.log(`%c打包时间:  ${process.env.DATE}`, "color:blue;");
Vue.use(ElementUI)

// Vue.extend(process)

// 环境变量, 注意,这个process不能整个获取
Vue.prototype.env = process.env;

new Vue({
  router,// 路由
  store,// vuex
  el: '#app',
  render: h => h(App)
})


function A(){
  
}

A.prototype.b = {a:123}
window.a = new A()