import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import global from "./global"// 全局调用
import Vuex from 'vuex'
// import VueI18n from 'vue-i18n' 
import router from "./router/index.js"
import store from "./store.js"

import './css/reset.css';
import './css/swiper.css';
import "./images/assets/leaflet/leaflet.css"
import './css/skin/theme/index.css';// 饿了么定制皮肤

import UmyUi from 'umy-ui'
import 'umy-ui/lib/theme-chalk/index.css';// 引入样式
import simpleTable from "src/components/simpleTable/index";

// 京东移动UI库,不好用
// import NutUI from '@nutui/nutui';
// import '@nutui/nutui/dist/nutui.css';
// NutUI.install(Vue);

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.use(UmyUi);

console.warn("当前模式",process.env.TYPE)
console.log(`%c打包时间:  ${process.env.DATE}`, "color:blue;");
Vue.use(ElementUI);
Vue.component('simple-table', simpleTable)

// Vue.extend(process)

// 环境变量, 注意,这个process不能整个获取
Vue.prototype.env = process.env;
Vue.prototype.moment = moment;
Vue.prototype.$$ = window.$$;

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