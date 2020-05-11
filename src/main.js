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
import './css/common.css';
import './style/theme/index.css';

Vue.use(ElementUI)
// console.log(aaa)
// var aaa = 1213
// php
// http://dev.oa.zcabc.com/api/v1/micro/web/
// http://dev.oa.zcabc.com/java/
// api/v1/boot
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