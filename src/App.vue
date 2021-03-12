<template  class="f-h100p">
  <div
    id="app"
    :class="{
      'f-h100p': true,
      main_pc: platformType == 'pc',
      main_mobile: platformType == 'mobile',
    }"
  >
    <!-- <img src="./assets/logo.png" />-->
    <div class="f-fs14 head" v-show="showCD">
      <el-button
        v-if="env.NODE_ENV == 'development'"
        @click="drawer = true"
        type="primary"
        style="margin-left: 16px"
        >打开菜单</el-button
      >
    </div>

    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <div v-if="platformType =='pc'" class="header">
      <img src="/src/images/西中岛/logo@2x.png" class="newImage" />
      <div class="buttons">
        <span><router-link to="/xizhongdao">园区介绍</router-link></span>
        <span><router-link to="/huanbaoguanli">环保管理</router-link></span>
        <span><router-link to="/yingjiguanli">应急管理</router-link></span>
        <span><router-link to="/fengbihuaguanli">封闭化管理</router-link></span>
        <span><router-link to="/yunyinguanli">运营管理</router-link></span>
      </div>

      <el-select
        class="select"
        size="mini"
        v-model="value"
        placeholder="请选择"
        change="change"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <!-- mobile版的头部 -->
    <div v-else>
      <h1>驾驶舱</h1>
       <div class="buttons">
        <span><router-link to="/huanbaoguanli">环保</router-link></span>
        <span><router-link to="/yingjiguanli">应急</router-link></span>
        <span><router-link to="/fengbihuaguanli">封闭化</router-link></span>
        <span><router-link to="/yunyinguanli">运营</router-link></span>
      </div>
    </div>


    <div class="body">
      <router-view class="f-h100p"></router-view>

      <el-drawer
        direction="rtl"
        class="f-mt20"
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false"
        size="20%"
      >
        <template class="f-mt20" v-for="item in editableTabs">
          <el-button
            type="primary"
            @click="handleClick(item)"
            :key="item.title"
            >{{ item.title }}</el-button
          >
          <el-divider :key="item.title"></el-divider>
        </template>
      </el-drawer>

      <keep-alive> </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      platformType: store.state.platformType,
      showCD: process.env.NODE_ENV == "development", // development
      drawer: false,
      hideMenus: eval(this.$route.query.hideMenus),
      editableTabsValue: "person",
      editableTabs: window.routerMap, // [],,
      // [
      //   {
      //     title: "个人门户",
      //     name: "person",
      //   }],
      tabIndex: 2,
      options: [
        {
          value: "西中岛",
          label: "西中岛",
        },
        {
          value: "长兴岛",
          label: "长兴岛",
        },
      ],
      value: "西中岛",
    };
  },
  mounted() {
    console.log(this);
  },
  methods: {
    change() {},
    handleClick(tab, event) {
      console.log(tab);
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
  },
};
</script>

<style lang="less">
#app {
  height: 100%;
}

.body {
  height: calc(100% - 68px);
  /* min-height: 800px; */
}

.head {
  position: fixed;
  right: 0;
  bottom: 0;
  opacity: 0.8;
  z-index: 100000;
}

.main_pc {
  min-height: 940px;
  /* // 背景图写法模板,图片插入模板 */
  background-image: url(/src/images/西中岛/背景.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-width: 1800px;
  box-sizing: border-box;

  .header {
    background-image: url(/src/images/西中岛/top.png);
    background-repeat: no-repeat;
    background-size: cover;
    height: 68px;
    width: 1800px;
    position: relative;
    margin: 0 auto;

    .newImage {
      height: 40px;
      margin-top: 20px;
      margin-left: 41px;
    }
    .buttons {
      width: 800px;
      display: inline-block;
      position: absolute;
      top: 16px;
      margin-left: 174px;

      a {
        margin-right: 20px;
        cursor: pointer;
        width: 122px;
        display: inline-block;
        height: 36px;
        background-color: #00c2ff;
        border-radius: 20px;
        background-color: #0d4e9d;
        border: 1px solid;
        border-color: #2388d9;
        border-radius: 20px;
        color: white;
        font-family: PingFang SC;
        // font-weight: 600;
        font-size: 20px;
        line-height: 36px;
        text-align: center;
      }

      a:hover {
        background: rgba(0, 194, 255, 1);
      }
    }
  }

  .select {
    width: 100px;
    left: 1466px;
    top: 24px;
    position: absolute;
  }

  .select .el-input__inner {
    background: #00569e;
    border: none;
    color: white;
  }

  .h1 {
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    font-size: 16px;
    padding: 16px;
  }

  .box {
    background-color: rgba(0, 32, 88, 0.8);
    border: 1px solid;
    border-color: #00689f;
    border-radius: 8px;
  }

  .p {
    padding: 30px;
    padding-top: 0;
    line-height: 35px;
  }

  .box_on {
    background-color: #003a74;
    border: 2px solid;
    border-color: #00c2ff;
    border-radius: 8px;
  }

  .label {
    height: 56px;
    margin-left: 30px;
    margin-right: 30px;
    line-height: 56px;
    background-color: #05336c;
    /* border: 1px solid;
      border-color: #00689f; */
    border-radius: 8px;
    font-family: PingFang SC;
    color: #ffffff;
    font-size: 16px;
    text-align: left;
    text-indent: 20px;
    cursor: pointer;

    img {
      width: 18px;
      margin-top: 6px;
      vertical-align: text-bottom;
      margin-right: 15px;
    }
  }
}






.main_mobile {
  box-sizing: border-box;

  background: #1a54c9;
  background-image: url(/src/images/西中岛app/背景2@2X.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding:0.8rem; 

  h1 {
    color:white;
    font-size:1rem;
  }
}
</style>





<style lang="less">
</style>








<style  lang="less">
//- .el-tabs--card > .el-tabs__header .el-tabs__item {
//   border: none;
// }
// .el-tabs--card > .el-tabs__header {
//   border-bottom: 1px solid #e4e7ed;
//   border: none;
// }

// .el-tabs--card > .el-tabs__header .el-tabs__item {
//   border-left: none;
// }

// .el-tabs--card > .el-tabs__header .el-tabs__nav {
//   border: none;
// }
// .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
//   width: 125px;
//   height: 30px;
//   background: rgba(255, 255, 255, 1);
//   border-radius: 6px 6px 0px 0px;
// }

// .el-tabs__item {
//   height: 30px;
//   width: 125px;
//   line-height: 30px;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   overflow: hidden;
//   background: #f5f5f5;
//   margin-right: 4px;
//   border-radius: 6px 6px 0px 0px;
// }

// .el-tabs__content {
//   display: none;
// }

// .el-icon-my-export:before {
//   content: "\66ff";
//   visibility: hidden;
// }

// .el-tabs__nav .el-tabs__item:nth-child(1) .el-icon-close {
//   display: none;
// }
</style>
