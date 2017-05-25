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
|   |-- components                     // vue公共组件
|   |-- store                          // vuex的状态管理
|   |-- App.vue                        // 页面入口文件
|   |-- main.js                        // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|   |-- data                           // 群聊分析得到的数据用于数据可视化
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- README.md                        // 项目说明
|-- favicon.ico 
|-- index.html                       // 入口页面，容器
|-- package.json                     // 项目基本信息
```

# 一、前端MVVM框架VUE概要
> 由于前端所做的业务越来越复杂，现在越来越多的单页应用，渐渐的前端MVC框架确实对我们前端开发者来讲是有必要深入学习的，MVVM可以让我们从dom操作中完全解脱，只需要操作数据即可自动渲染dom，可以说是非常高效。

[什么是MVC](https://github.com/Kelichao/vue.js.2.0/issues/2)

[kit中的mvc架构](https://github.com/Kelichao/kit.js/issues/3)
- 无法完全流行，只是针对某些特定业务，特定需求才需要用到。
- 需要整个前端开发团队拥护，大家都必须会使用这个框架，这就加大了学习成本。
- 从我目前接触过的backbone来说，里面确实有给我非常大的惊喜，举个例子：Route模块，路由模块对单页引用很重要，而且此属性会加在地址栏里面，非常的直观，很方便调试。

# 二、环境搭建
- 安装vue-cli，cli介绍是说可以通过工程化打包以及自动化方式生成代码
> 安装cli

```
 $ cnpm install -g vue-cli
```

> 初始化项目，并输入一系列参数

```
$ vue init webpack my-first-vue-project
```
> 会生成一个文件夹

![image](https://cloud.githubusercontent.com/assets/18028533/21955629/168dc196-daaa-11e6-9413-bb2b05fb0305.png)

![image](https://cloud.githubusercontent.com/assets/18028533/21955656/8065219a-daaa-11e6-8b3b-005c4823f001.png)

- 在 first-vue文件夹中，安装node的package依赖模块
```
$ cnpm install
```
![image](https://cloud.githubusercontent.com/assets/18028533/21955705/5c4e8ebc-daab-11e6-8fec-789d0f6df4aa.png)

# 三、启动一个本地热服务
```
cnpm run dev
```
![image](https://cloud.githubusercontent.com/assets/18028533/21955748/230290b2-daac-11e6-84a7-4e285de948b0.png)


# vue-protal

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
