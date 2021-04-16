
<template>
  <!-- 简单表格开始 -->
  <table class="tab">
    <tr>
      <th v-for="item in head" :key="item">
        {{ item }}
      </th>
    </tr>
    <template v-if="value.length">
      <!-- 行 -->
      <tr v-for="(item,index) in value" :key="item.a">
        <!-- 格子 -->
        <template v-for="(ind,it) in prop" >
          <td v-if="prop[it] == 'index'" :key="it">{{index+1}}</td>
          <!-- 处理情况 -->
          <td v-else-if="prop[it] == 'disposalState' || prop[it] == 'accidentStatus'" :key="it">
            <span :class="{ green: true, red: true, orange: true }">{{
              item[prop[it]] && chuzhi[item[prop[it]]]
            }}</span>
          </td>
          <td v-else :key="it">{{ item[prop[it]]}}</td>
          
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
</template>

<script>
// 生命周期

export default {
  props: {
    head: {
      type: Array,
      default: function () {
        return [];
      },
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
  },
  data() {
    return {
      chuzhi:{
        0:"处置中",
        1:"已处置",
        2: "未处置",
      },
      type: 0,
      tableDate: [],
      data: "",
      aaa: "",
    };
  },
  mounted() {
    // console.log(this.$el);
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
    startHacking: function () {
      this.aaa = 111;

      //this.aaa = 111
    },
  },
};
</script>

<style lang="less" scoped>
.tab {
  width: 100%;
  text-align: center;
  height: 100%;
  th {
    height: 32px;
    color: white;
    opacity: 60%;
    font-weight: 500;
    background-color: #032965;
    font-size: 14px;
  }

  td {
    // height: 10%;
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
}
</style>