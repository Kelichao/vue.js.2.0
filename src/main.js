import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import kit from "kit-pro"
import jquery from "jquery"
import _ from "underscore"
import Hello from './view/Hello.vue'  //引入根目录下的Hello.vue组件

// 全局变量
window.kit = kit;
window.jquery = jquery;


// 2. 定义路由
const router = new VueRouter({
  routes:[
    { path: '/foo', component: Hello },
    { path: '/bar'}
  ]
})


// 插件
Vue.use(VueRouter)
Vue.use(ElementUI)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})

// router.push('foo')