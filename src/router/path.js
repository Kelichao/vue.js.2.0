import VueRouter from 'vue-router'
import Hello from '~/view/Hello.vue'  //引入根目录下的Hello.vue组件

// 2. 定义路由
const router = new VueRouter({
  routes:[
    { path: '/foo', component: Hello },
    { path: '/bar'}
  ]
})

export default router;