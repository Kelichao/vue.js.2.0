import VueRouter from 'vue-router'
import Hello from '~/view/Hello.vue'  //引入根目录下的Hello.vue组件
import Vue from 'vue'
// 2. 定义路由
const router = new VueRouter({
  routes:[
    { path: '/foo', component: Hello },
    { path: '/bar'}
  ]
})

// 插件
Vue.use(VueRouter)

// router.push('foo')
export default router;