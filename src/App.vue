<template  class="f-h100p">
  <div
    id="app"
    :class="{
      
      main_pc: platformType == 'pc',
      main_mobile: platformType == 'mobile',
    }"
  >
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
    <div v-if="platformType == 'pc'" class="header">
      
       <div class="router">
         <span
          class="f-f1 f-m5 f-tac"
          @click="item = 1"
          :class="{ on: $route.path==='/xizhongdao' }"
          ><router-link to="/xizhongdao">执法记录管理</router-link></span
        >
        <span
          class="f-f1 f-m5 f-tac"
          @click="item = 2"
          :class="{ on: $route.path==='/tongjifenxi' }"
          ><router-link to="/tongjifenxi">统计分析</router-link></span
        >
       </div>
      <img class="touxiang" src="/src/images/西中岛/头像@2x.png" />
    </div>
    
    <!-- mobile版的头部 -->
    <div v-else>
      <h1>驾驶舱</h1>
      <div class="buttons head2 f-mt20">
        <span
          class="f-f1 f-m5 f-tac"
          @click="item = 1"
          :class="{ on: item == 1 }"
          ><router-link to="/huanbaoguanli">环保</router-link></span
        >
        <span
          class="f-f1 f-m5 f-tac"
          @click="item = 2"
          :class="{ on: item == 2 }"
          ><router-link to="/yingjiguanli">应急</router-link></span
        >
        <span
          class="f-f1 f-m5 f-tac"
          @click="item = 3"
          :class="{ on: item == 3 }"
          ><router-link to="/fengbihuaguanli">封闭化</router-link></span
        >
        <span
          class="f-f1 f-m5 f-tac"
          @click="item = 4"
          :class="{ on: item == 4 }"
          ><router-link to="/yunyinguanli">运营</router-link></span
        >
      </div>
    </div>

    <div class="body">
      <router-view class="f-h100p"></router-view>

      <!-- 内存消耗太大 -->
      <!-- <keep-alive>
        <router-view class="f-h100p"></router-view>
      </keep-alive> -->

      <el-drawer
        direction="rtl"
        class="f-mt20"
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false"
        size="20%"
      >
      <div class="f-mt20 f-oa" style="height:600px;">
         <template v-for="item in editableTabs">
          <el-button
            type="primary"
            @click="handleClick(item)"
            :key="item.title"
            >{{ item.title }}</el-button
          >
          <el-divider :key="item.title"></el-divider>
        </template>
      </div>
       
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: 1,
      activeName: 'second',
      platformType: store.state.platformType,
      showCD: process.env.NODE_ENV == "development", // development
      drawer: false,
      hideMenus: eval(this.$route.query.hideMenus),
      editableTabsValue: "person",
      editableTabs: window.routerMap, // [],,
      options: [
        {
          value: "西中岛",
          label: "西中岛",
        },
        // {g
        //   value: "长兴岛",
        //   label: "长兴岛",
        // },
      ],
      value: "西中岛",
    };
  },
  mounted() {
    console.log(this.$route);
    // /fpi/air/points
    // this.$r

    // 空路由定位
    if (this.$route.fullPath == "/") {
      this.$router.push({
        path:"xizhongdao"
      })
    }
  },
  methods: {
     handleClick(tab, event) {
        console.log(tab, event);
      },
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
  // height: 100%;
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
  height:100%;
  .bg {
    background: #05346e;
  }
  .sp_num {
    color: #29deff;
    font-size: 32px;
  }

  .sp_small {
    color: #29deff;
    font-size: 20px;
  }

  .m_bt {
    color: #29deff;
    font-size: 14px;
    position: absolute;
  }
  .xzd_container {
    padding: 40px;
    box-sizing: border-box;
    width: 1700px;
    color: white;
    font-size: 14px;
    margin: 0 auto;
  }

  min-height: 1000px;
  /* // 背景图写法模板,图片插入模板 */
  // background-image: url(../src/images/西中岛/背景.png);
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  min-width: 1300px;
  box-sizing: border-box;

  .header {
    background-image: url(../src/images/sunninglogo.png);
    background-repeat: no-repeat;
    background-position:10px 5px;
    // background-size: 100% 100%;
    // background-size: cover;
    background-color:rgba(0, 21, 41, 1);

    height: 40px;
    // width: 1650px;
    position: relative;
    margin: 0 auto;

    .touxiang {
      // background-repeat: no-repeat;
      position: absolute;
      right: 5px;
      height: 26px;
      top: 7px;
      cursor: pointer;
    }

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
    cursor: pointer;
  }

  .h1-select {
    background-image: url(../src/images/西中岛/未选中@2x.png);
    background-repeat: no-repeat;
    background-position: 95% 50%;
    background-size: 16px;
  }

  .h1-on {
    background-image: url(../src/images/西中岛/选中@2x.png);
    // background-color: linear-gradient(top to bottom,#113B70,#00689f);
    // background: linear-gradient(to bottom,red,blue);
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

  .tab_cont {
    padding: 0 20px 20px 20px;
    height: calc(100% - 80px);
  }

  .box_cont {
    padding: 20px;
    padding-top: 0;
  }

  // .el-divider {
  //   // opacity: 20%;
  //   // // width: 320px;
  //   // height: 1px;
  //   // background-color: #ffffff;
  //   // margin:10,0;
  // }
}

.main_mobile {
  font-size:0.6rem;
  box-sizing: border-box;
  min-height:100%;
  background: #1a54c9;
  background-image: url("../src/images/西中岛app/背景2@2X.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0.8rem;

  table.tab {
    height:calc(100% - 2rem);
    font-size:10px;
  }
  table.tab th{

     
      height: 1.2rem;
      color: rgba(133, 149, 172, 1);
      // opacity: 60%;
      // font-weight: 500;
      background-color: rgba(247, 248, 250, 1);
      font-size: 12px;
    
  }

  .m_title {
    color:black;
    font-size: 0.7rem;
    padding-top:10px;
    padding-left:15px; 
    padding-bottom:10px;
    // text-indent: 15px;
    // f-cb f-fs07r f-p10
    position: relative;
    h3 {
      font-size:10px;
      color:rgba(48, 49, 51, 1);
      float:right;
      margin-right:15px;
    }
  }
  h1 {
    color: white;
    font-size: 1rem;
  }

  .head2 {
    display: flex;
  }
  .head2 span {
    // opacity:0.9;
    a {
      width: 100%;
      display: inline-block;
      color: white;
      border-radius: 4px;
      height: 1.6rem;
      line-height: 1.6rem;
      background: #396ddc;
    }
  }
  .head2 span.on {
    a {
      background: white;
      color: black;
    }
  }
}
</style>





<style lang="css">
/* .main_mobile {
  box-sizing: border-box;

  background: #1a54c9;
  background-image: url(/src/images/西中岛app/背景2@2X.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0.8rem;

 
} */

.el-divider--horizontal {
  margin: 10px 0;
}

.el-progress__text {
  color: #ffffff;
  font-size: 32px;
}

.el-calendar-table .el-calendar-day:hover {
  cursor: pointer;
  background-color: transparent !important;
}
.el-calendar-table td.is-selected {
  background-color: transparent !important;
}

.van-tabs__nav{
  background-color: transparent;
}

.van-tab--active {
  color:white;
}

.van-tab {
  color:white;
}

.router {
  margin: 0 auto;
    width: 300px;
    font-size: 18px;
}

.router .on a{
  color:azure;
}

.router a {
  color: #409EFF;
}
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

.el-calendar-table .el-calendar-day {
  box-sizing: border-box;
  padding: 0px;
  text-align: center;
  height: 30px;
}
.el-calendar__body {
  padding: 10px;
  padding-top: 0;
}

.el-calendar {
  background: none;
}

.el-dialog__title {
  border-left: 2px solid #01c6ac;
  text-indent: 6px;
  display: inline-block;
  line-height: 20px;
}

.el-notification__title {
  border-left: 2px solid #01c6ac;
  text-indent: 6px;
  display: inline-block;
  line-height: 16px;
}

.el-dialog__header {
  padding: 30px 20px 10px;
  font-weight: bold;
  font-size: 16px;
}

.el-button--primary.is-plain {
  background: white;
}

.el-calendar-table tr td,
.el-calendar-table tr,
.el-calendar-table tbody {
  border: none;
}

.el-calendar-table tr td:first-child {
  border-left: none;
}

.el-calendar-table tr:first-child td {
  border-top: none;
}

.el-calendar__title {
  color: white;
  display: none;
}

.el-calendar__button-group {
  display: none;
}

.el-calendar-table:not(.is-range) td.next, .el-calendar-table:not(.is-range) td.prev {
  opacity: 0;
}

.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: transparent;
  color: white;
  opacity: 0.6;
}
</style>
