
import Hello from '@/components/Hello'/* 英文Hello.vue模版，并赋值给变量Hello,这里是“@”相当于“../” */
import Index from '@/components/Index'

const routes = [
    { path: '/', component: Hello },
    { path: '/index', component: Index }
]

export default routes
