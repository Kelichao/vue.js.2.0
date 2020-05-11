import VueRouter from 'vue-router'
import Hello from '~/view/Hello.vue'  //引入根目录下的Hello.vue组件
import vuex from '~/view/vuex.vue'
import person from '~/view/person.vue'  
import Vue from 'vue'
// 2. 定义路由
const router = new VueRouter({
  routes: [
    {
      path: '/foo', component: Hello,
      meta: { keepAlive: true }
    },
    { path: '/bar', meta: { keepAlive: true } },
    { path: '/person', meta: { keepAlive: true },component: person, },
    {
      path: "/vuex", component: vuex,
      meta: { keepAlive: true },//当前的.vue文件需要缓存
    }
  ]
})

// 插件
Vue.use(VueRouter)

// router.push('foo')
export default router;