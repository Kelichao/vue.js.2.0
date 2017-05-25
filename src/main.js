// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'/* 这里是引入vue文件 */
import App from './App'/* 这里是引入同目录下的App.vue模块 */
import vueRouter from 'vue-router'
import routes from './router'/* 这里是引入vue的路由 */

Vue.config.productionTip = false
Vue.use(vueRouter)
console.log(routes)
const router = new vueRouter({
  routes
})
/* eslint-disable no-new */
new Vue({
  el: '#app',/* 定义作用范围就是index.html里的id为app的范围内 */
  router,
  render: h => h(App)
})
