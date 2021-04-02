
<template>
  <!-- 简单表格开始 -->
  <table class="tab">
    <tr>
      <th v-for="item in head" :key="item">
        {{ item }}
      </th>
    </tr>
    <template v-if="value.length">
      <tr v-for="item in value" :key="item.a">
        <td>{{ item.a }}</td>
        <td>{{ item.a }}</td>
        <td>{{ item.a }}</td>
        <td>{{ item.a }}</td>
        <td>
          <span :class="{ green: true, red: true, orange: true }">{{
            item.a
          }}</span>
        </td>
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
  },
  data() {
    return {
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
    height: 18px;
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