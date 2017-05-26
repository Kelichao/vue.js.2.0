<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <router-link to="/aaa">跳转到aaa路由</router-link>
    <router-link to="/index">跳转到hello路由</router-link>
    <router-link to="/dialogPage">跳转到dialog路由</router-link>
  </div>
</template>

<script>


export default {
  name: 'hello', /* 这个name暂时不知道用啥用，根据官方文档说的是方便排错的 */
  data () {
    return {
      msg: '首页' /* 这个name暂时不知道用啥用，根据官方文档说的是方便排错的 */
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
/*  scoped的意思是这里的样式只对当前页面有效不会影响其他页面，还有可以设置lang="scss"就是支持css预编译，也就是支持sass或者less  */
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
