
<template>
  <div class="cont">
  <!-- 简单表格开始 -->
  <table class="tab">
    <tr>
      <th :style="{width: (item == '序号' ||  item == '处理情况')?'30px':''}" class="f-ell" v-for="item in head" :key="item">
        {{ item }}
      </th>
    </tr>
    <template v-if="value.length">
      <!-- 行 -->
      <tr  v-for="(item,index) in value" :key="index">
        <!-- 格子 -->
        <template v-if="item" v-for="(ind,it) in prop" >
          <td  class="f-ell f-o08" v-if="prop[it] == 'index'" :key="it">{{index+1}}</td>

           <td  class="f-ell f-o08" v-else-if="prop[it] == 'STATE'" :key="it" >
             
            <span :class="item[prop[it]] == 0?'gray':''">{{STATE[item[prop[it]]]}}</span>
             </td>
          
          <!-- 处理情况 -->
          <td  class="f-ell f-o08" v-else-if="prop[it] == 'disposalState' || prop[it] == 'accidentStatus' || prop[it] =='handlestate'  || prop[it] =='eventStatusName' || prop[it] =='alarmDealDesc'" :key="it">
            <span :class="{ green: color[item[prop[it]]] =='green', red: color[item[prop[it]]] =='red', orange: color[item[prop[it]]]=='orange' }">{{
              //item[prop[it]] && chuzhi[item[prop[it]]]
              (item[prop[it]] ==0 || item[prop[it]] ==1|| item[prop[it]] ==2) ?status[item[prop[it]]] : item[prop[it]]
            }}</span>
          </td>

          <td :title="item[prop[it]] || '--'" class="f-ell f-o08" v-else :key="it">{{ item[prop[it]] || "--"}}</td>
          
        </template>
      </tr>
      
    </template>
    <template v-else>
      <tr class="f-tac">
        <td :colspan="head.length">暂无数据</td>
        </tr>
    </template>
  </table>
  <!-- 表格结束 -->
  <el-pagination
        v-if="page"
        
        background
        small
        :page-size="5"
        @current-change=currentChange
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
  </div>
</template>

<script>
// 生命周期

export default {
  props: {
    total: {
      type:Number,
      default: function() {
        return 0;
      }
    },
    head: {
      type: Array,
      default: function () {
        return [];
      },
    },
    page: {
      type:Boolean,
      default: function() {
        return false
      }
    },
    value: {
      type: Array,
      default: function () {
        return [];
      },
    },
     prop: {
      type: Array,
      default: function () {
        return [];
      },
    },
    length: {
      type:Number,
      default: function() {
        return 0;
      }
    },
    callback:{
      type:Function,
      default: function() {
        return 
      }
    }
  },
  data() {
    return {
      color:{
          0:"orange",
          1:"green",
          2: "red",
          "处置中":"orange",
          "已处置":"green",
          "结案":"green",
          "未处理": "red",
          "未处置":'red',
          "待处置": "red",
          "待分派": "red",
          "处理中":"orange",
          "已处理":"green",
          "已解决":"green",
          "处置完成":"green",
          "待复核":"orange",
          "待回访":"orange",
          "待分派":"red",
          "未解决":"red"
      },
      status: {
        0:"处置中",
        1:"已处置",
        2: "未处置",
      },
      chuzhi:{
        0:"处置中",
        1:"已处置",
        2: "未处置",
        "处置中":"处置中",
        "已处置":"已处置",
        "未处理": "未处理",
        "待处置": "待处置",
        "待分派": "待分派",
      },
      STATE: {
        0: "离线",
        1: "在线"
      },
      type: 0,
      data: "",
      aaa: "",
    };
  },
  mounted() {
    // console.log(this.$el);
    // this.value.length = 5
    // if (this.length) {
    //   this.value.length = 5// this.length;
    // }
  },
  beforeMount() {
    // console.log(this.$el);
  },
  components: {},

  watch: {
    aaa: {
      handler() {
        console.log(1111);
      },
      immediate: false,
    },
  },
  methods: {
    
    currentChange(page) {
      console.log(page,111)
      this.$emit("callback",page)
    },
    startHacking: function () {
      this.aaa = 111;

      //this.aaa = 111
    },
  },
};
</script>

<style lang="less" scoped>
.cont {
      width: 100%;
  text-align: right;
  height: 100%;
}
.tab {
  width: 100%;
  text-align: center;
  height: 100%;
  // table-layout: fixed; 
  th {
    height: 32px;
    color: white;
    opacity: 0.6;
    font-weight: 500;
    background-color: #032F70;
    font-size: 14px;
  }

  td {
    // height: 10%;
    padding-right:7px;
    padding-left:7px;
  }
  tr {
    //
  }

  span {
    width: 45px;
    border-radius: 4px;
    height: 22px;
  }

  .green {
    background: rgba(0, 190, 99, 1);
  }

  .red {
    background: rgba(255, 86, 85, 1);
  }

  .orange {
    background: rgba(255, 153, 2, 1);
  }

   .gray {
    background: gray;
  }
}
</style>