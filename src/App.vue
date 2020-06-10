<template  class="f-h100p">
  <div id="app" class="f-h100p main">
    <!-- <img src="./assets/logo.png" />-->
    <header class="f-fs14 head">


      <!-- <div style="margin-bottom: 20px;">
        <el-button size="small" @click="addTab(editableTabsValue)">add tab</el-button>
      </div> -->
      <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item) in editableTabs"
          :key="item.title"
          :label="item.title"
          :name="item.name"
        ><span slot="label">{{item.title}}</span></el-tab-pane>
      </el-tabs>
    </header>

    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <div class="body">
    <router-view class="f-h100p"></router-view>
    <keep-alive>
      
    </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editableTabsValue: "person",
      editableTabs: [
        {
          title: "个人门户",
          name: "person",
        },
        {
          title: "公司门户",
          name: "hello",
          closable: true,
        }
      ],
      tabIndex: 2
    };
  },
  methods: {
    handleClick(tab, event) {
    this.$router.push(tab.name)
     // console.log()
    },
    startHacking() {
      this.$notify({
        title: "It works!",
        type: "success",
        message:
          "We've laid the ground work for you. It's time for you to build something epic!",
        duration: 5000
      });
    },
    addTab(targetName) {
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: "New Tab",
        name: newTabName,
        content: "New Tab content"
      });
      this.editableTabsValue = newTabName;
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
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
};
</script>

<style>
.main {
  background: #f0f0f0;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  height: 100%;
}

.body {
  height: calc(100% - 44px);
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
  background: #F5F5F5;
  margin-right: 4px;
  border-radius: 6px  6px  0px  0px;
}

.el-tabs__content {
  display: none;
}


.el-icon-my-export:before {
  content: "\66ff";
  visibility: hidden;
}

.el-tabs__nav .el-tabs__item:nth-child(1) .el-icon-close{
    display: none;
}
</style>
