# 环境搭建
```bash
# 安装依赖
$ npm install

# 启动热服务
$ npm start

# 开发环境
$ npm run dev

# 输出生产代码
$ npm run build

# 生产环境代码测试
$ npm run build:test
```


## 目录结构

```
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- dev-client.js                // 热重载相关
|   |-- dev-server.js                // 构建本地服务器
|   |-- utils.js                     // 构建工具相关
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|   |-- test.env.js                  // 测试环境变量
|-- src                              // 源码目录
|   |-- components                   // vue公共组件,子模板  
|   |-- store                        // vuex的状态管理
|   |-- assets                       // 图标等资源
|   |-- router                       // 路由配置项
|   |-- App.vue                      // 父模板，页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|   |-- data                         // 群聊分析得到的数据用于数据可视化
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- README.md                        // 项目说明
|-- favicon.ico 
|-- index.html                       // 入口页面，容器
|-- package.json                     // 项目基本信息
```


## 添加路由
1. 在`\src\router\index.js`文件中添加代码

```js

import Hello from '@/components/Hello'
import Index from '@/components/Index'
import aaa from '@/components/aaa'// 新添加的路由页面

const routes = [
    { path: '/', component: Hello },
    { path: '/aaa', component: aaa },// 新添加的路由配置
    { path: '/index', component: Index }
]

export default routes
```

2. 在目录`\src\components`中添加aaa.vue这个文件，内容填写为

```html
<template>
  <div>
    我是aaa的内容
  </div>
</template>

<script>
/*此处添加js，这个export不能省略*/
export default {
  name: 'aaa'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
/*此处添加样式*/
</style>

```
