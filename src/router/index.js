
import Hello from '@/components/Hello'
import Index from '@/components/Index'
import aaa from '@/components/aaa'// 新添加的路由页面

const routes = [
    { path: '/', component: Hello },
    { path: '/aaa', component: aaa },// 新添加的路由配置
    { path: '/index', component: Index }
]

export default routes
