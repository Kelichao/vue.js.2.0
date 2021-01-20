import VueRouter from 'vue-router'
import Hello from '~/view/Hello.vue'  //引入根目录下的Hello.vue组件
import vuex from '~/view/vuex.vue'
import person from '~/view/person.vue'  
import shuiku from '~/view/shuiku.vue'  
import edit from '~/view/edit.vue'  
import lunbotu from '~/view/lunbotu.vue'  
import maps from '~/view/maps/demo.vue'  
import mapSelect from '~/view/demo/mapSelect.vue'  
import Vue from 'vue'
import tableDemo from '~/view/tableDemo.vue'  

// 2. 定义路由
const router = new VueRouter({
  routes: [
    {
      path: '/hello', component: Hello,
      meta: { keepAlive: true }
    },
    { path: '/bar', meta: { keepAlive: true } },
    { path: '/person', meta: { keepAlive: true },component: person, },
    {
      path: "/vuex", component: vuex,
      meta: { keepAlive: true },//当前的.vue文件需要缓存
    },
    {
      path: "/shuiku", component: shuiku,
    },
    {
      path: "/edit", component: edit,
    },
    {
      path: "/lunbotu", component: lunbotu,
    },
    {
      path: "/maps", component: maps,
    },
    {
      path: "/mapSelect", component: mapSelect,
    },
    {
      path: "/tableDemo", component: tableDemo,
    }
  ]
})

// 插件
Vue.use(VueRouter)

// router.push('foo')
export default router;