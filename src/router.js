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
import xizhongdao from '~/view/xizhongdao/index.vue'  
import huanbaoguanli from '~/view/xizhongdao/huanbaoguanli.vue'  

import yingjiguanli from '~/view/xizhongdao/yingjiguanli.vue'  
import fengbihuaguanli from '~/view/xizhongdao/fengbihuaguanli.vue'  
import yunyinguanli from '~/view/xizhongdao/yunyinguanli.vue'  


var arr = [
  {
    
    path: '/xizhongdao', 
    component: xizhongdao,
    title: "西中岛介绍页",
    meta: { keepAlive: true }
  },
  
  {
    
    path: '/huanbaoguanli', 
    component: huanbaoguanli,
    title: "环保管理",
    meta: { keepAlive: true }
  },
  {
    
    path: '/yingjiguanli', 
    component: yingjiguanli,
    title: "应急管理",
    meta: { keepAlive: true }
  },
  {
    
    path: '/fengbihuaguanli', 
    component: fengbihuaguanli,
    title: "封闭化管理",
    meta: { keepAlive: true }
  },
  {
    
    path: '/yunyinguanli', 
    component: yunyinguanli,
    title: "运营管理",
    meta: { keepAlive: true }
  },
  {
    path: '/hello', 
    component: Hello,
    title: "tab组件效率demo",
    meta: { keepAlive: true }
  },
  { path: '/bar', meta: { keepAlive: true }  },
  { path: '/person', meta: { keepAlive: true },component: person,    title: "个人门户", },
  {
    title:"tab组件",
    path: "/vuex", component: vuex,
    meta: { keepAlive: true },//当前的.vue文件需要缓存
  },
  {
    title: "XX水库",
    path: "/shuiku", component: shuiku,
  },
  {
    title: "编辑信息",
    path: "/edit", component: edit,
  },
  {
    title: "轮播图",
    path: "/lunbotu", component: lunbotu,
  },
  {
    title: "地图选择器",
    path: "/maps", component: maps,
  },
  {
    title: "地图选择器2",
    path: "/mapSelect", component: mapSelect,
  },
  {
    title: "表格demo",
    path: "/tableDemo", component: tableDemo,
  }
]
// 2. 定义路由
const router = new VueRouter({routes: arr})

// 插件
Vue.use(VueRouter)

window.routerMap = arr;

// router.push('foo')
export default router;