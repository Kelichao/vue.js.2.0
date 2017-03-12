# 前端MVVM框架VUE
> 由于前端所做的业务越来越复杂，现在越来越多的单页应用，渐渐的前端MVC框架确实对我们前端开发者来讲是有必要深入学习的，但是前端的此类框架**不像jquery,不是必须的**，所以个人感觉此类框架有以下特点：

[什么是MVC](https://github.com/Kelichao/vue.js.2.0/issues/2)

[kit中的mvc架构](https://github.com/Kelichao/kit.js/issues/3)
- 无法完全流行，只是针对某些特定业务，特定需求才需要用到。
- 需要整个前端开发团队拥护，大家都必须会使用这个框架，这就加大了学习成本。
- 从我目前接触过的backbone来说，里面确实有给我非常大的惊喜，举个例子：Route模块，路由模块对单页引用很重要，而且此属性会加在地址栏里面，非常的直观，很方便调试。

vue注意点


//vue.watch函数

//<li class="u-info" v-if="(market == 2) && ()">  导致不渲染，而且无提示
// v-model:stockType> 导致不渲染，而且无提示
// vue  tab切换

//<template v-if="(marketType == 2)">里面的语句不可以用if
// template中的v-if 不能使用在普通标签里面使用，仍然要template
// 组件中的模板只会有一个闭合的大标签
//  props: ["title", "stockName", "stockCode", "inputNum", "changedPrice"]不要用大写
// v-bind:stock-name="stockName"

// local有Bug

// toFixed会转化成字符串，要重新parseFloat
// 看下filters
