
import Hello from '@/pages/Hello'
import Index from '@/pages/Index'
import aaa from '@/pages/aaa'// 新添加的路由页面
import dialogPage from '@/pages/dialogPage'// 添加新组件

const routes = [
    { path: '/', component: Hello },
    { path: '/aaa', component: aaa },// 新添加的路由配置
    { path: '/index', component: Index },
    { path: '/dialogPage', component: dialogPage}
]

export default routes
