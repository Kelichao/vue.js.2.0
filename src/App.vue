<template  class="f-h100p">
  <div id="app" class="f-h100p main">
    <!-- <img src="./assets/logo.png" />-->
    <header class="f-fs14 head" v-show="showCD">


      <el-button v-if='env.NODE_ENV == "development"' @click="drawer = true" type="primary" style="margin-left: 16px"
        >打开菜单</el-button
      >
    </header>

    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <div class="body">
      <router-view class="f-h100p"></router-view>

      <el-drawer direction="rtl" class="f-mt20"  title="我是标题" :visible.sync="drawer" :with-header="false" size="20%">
          <template class="f-mt20" v-for="item in editableTabs">
                       <el-button type="primary"  @click="handleClick(item)"  :key="item.title">{{item.title}}</el-button>
                      <el-divider  :key="item.title"></el-divider>

          </template>
          <!-- <el-button
            @click="handleClick"
            v-for="item in editableTabs"
            :key="item.title"
            :label="item.title"
            :name="item.path"
            ><span>{{ item.label }}</span>
          </el-button> -->
  
      </el-drawer>


      <keep-alive> </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCD:process.env.NODE_ENV == "development",  // development
      drawer: false,
      hideMenus: eval(this.$route.query.hideMenus),
      editableTabsValue: "person",
      editableTabs: window.routerMap,// [],,
      // [
      //   {
      //     title: "个人门户",
      //     name: "person",
      //   }],
      tabIndex: 2,
    };
  },
  mounted() {
    console.log(this)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab)
      this.$router.push(tab.path);
      // console.log()
    },
    startHacking() {
      this.$notify({
        title: "It works!",
        type: "success",
        message:
          "We've laid the ground work for you. It's time for you to build something epic!",
        duration: 5000,
      });
    },

    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
    },
  },
};
</script>

<style>
.main {
  background: #f0f0f0;
  height: 100%;
  box-sizing: border-box;
  /* padding: 10px; */
  height: 100%;
}

.body {
  height: calc(100%);
  /* min-height: 800px; */
}

.el-tabs--card > .el-tabs__header .el-tabs__item {
  border: none;
}
.el-tabs--card > .el-tabs__header {
  border-bottom: 1px solid #e4e7ed;
  border: none;
}

.el-tabs--card > .el-tabs__header .el-tabs__item {
  border-left: none;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}
.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  width: 125px;
  height: 30px;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px 6px 0px 0px;
}

.el-tabs__item {
  height: 30px;
  width: 125px;
  line-height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background: #f5f5f5;
  margin-right: 4px;
  border-radius: 6px 6px 0px 0px;
}

.el-tabs__content {
  display: none;
}

.el-icon-my-export:before {
  content: "\66ff";
  visibility: hidden;
}

.el-tabs__nav .el-tabs__item:nth-child(1) .el-icon-close {
  display: none;
}

.head {
  position: absolute;
  right:0;
  opacity: 0.8;
  z-index: 100000;
}
</style>
