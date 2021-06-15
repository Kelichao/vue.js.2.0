<template>
  <div class="container f-df f-fdc mypage">
    <div class=" f-df">
      <div class="f-f1 f-jcfs f-aic f-df f-fs16">统计分析</div>
    </div>

    <div>
      <el-divider></el-divider>
    </div>
    <tabs ref="tab" :form-item="formItem" :callback="callback"></tabs>
    <div style="height:280px;">
      <div class="f-h100p f-w100p f-df">
        <div class="f-f1 f-jcc f-aic f-df cont">
          <div class="f-h100p f-w100p f-df f-fdc ">
            <div class="   f-df title">执法检查</div>
            <div
              class="f-f1 f-jcc f-aic f-df"
              style="padding-left:30px;padding-right:140px;"
              id="paint1"
            ></div>
          </div>
        </div>
        <div class="f-f1 f-jcc f-aic f-df  cont">
          <div class="f-h100p f-w100p f-df f-fdc">
            <div class="  f-df title">隐患类型</div>
            <div
              class="f-f1 f-jcc f-aic f-df"
              style="padding-left:30px;padding-right:140px;"
              id="paint2"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div>
        <div class="f-h100p f-w100p f-df">
          <div class=" f-jcc f-aic f-df">
            <div class="title">隐患类型总数统计</div>
          </div>
          <div class="f-f1 f-aic f-ml15 f-df">
            <el-radio-group size="mini" v-model="tabPosition" @change="change">
              <el-radio-button label="qytj">企业统计</el-radio-button>
              <el-radio-button label="zfzdtj">执法中队统计</el-radio-button>
            </el-radio-group>
          </div>
          <div
            class=" f-jcc f-aic f-df f-mr10"
            style="color:rgba(144, 147, 153, 1);font-size:14px;"
          >
            单位：个
          </div>
        </div>
        <tabs
          ref="tab"
          :table-item="tableItem"
          :callback="callback"
          :table-data="tableData"
        ></tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import tabs from "@/components/tabs/index";

  // 生命周期
  export default {
    data() {
      return {
        searchObj: {},
        type: 0,
        tabPosition: "qytj",
        tableData: [],
        data: "",
        aaa: "",
        typeList: [
          // {id: "warn",
          // name: "安全警示标语"
          // }
        ],
        tableItem: [
          { prop: "companyName", label: "企业名称" },
          { prop: "allNum", label: "执法检查总数" },
          { prop: "passNum", label: "复查通过数量" }
          // { prop: "userName", label: "执法人员" },
          // { prop: "statusStr", label: "状态", type: 2 },
          // { prop: "", label: "操作", type: 3 }
        ],
        formItem: [
          {
            type: "pick",
            timeType: "datetimerange", // week, day month
            placeholder: "年份",
            // format: "timestamp",
            valueFormat: "timestamp",
            value: "",
            key: ["startTime", "endTime"]
          }
        ]
      };
    },
    computed: {
      // text() {
      //   return this.currentRate.toFixed(0) + '%';
      // },
    },
    mounted() {
      
      
      // console.log(this.$el);

      this.getTypeList()
        .then(() => {
          this.change();
          this.getPie();
        });
    },

    components: {
      tabs
    },

    watch: {
      aaa: {
        handler() {
          console.log(1111);
        },
        immediate: false
      }
    },
    methods: {
      change() {
        console.log(111);
        if (this.tabPosition == "qytj") {
          util.ajax({
            url: "/api/v1/law-enforce/pc/trouble/by-company",
            data: {
              startTime: this.searchObj.startTime,
              endTime: this.searchObj.endTime
            },
            success: resp => {
              this.tableData = resp.data.entries;
            }
          });
        } else {
          util.ajax({
            url: "/api/v1/law-enforce/pc/trouble/by-org",
            data: {
              startTime: this.searchObj.startTime,
              endTime: this.searchObj.endTime
            },
            success: resp => {
              this.tableData = resp.data.entries;
            }
          });
        }
      },
      getTypeList() {
        return util.ajax({
          url: "/api/v1/law-enforce/hidden-trouble/list",
          data: {},
          success: resp => {
            this.typeList = resp.data;
            this.typeList.forEach(value => {
              value.prop = value.id;
              value.label = value.name + "隐患量";
            });

            this.tableItem = [...this.tableItem, ...this.typeList];
          }
        });
      },
      getPie() {
        // console.log(this.formItem[0])

        util.ajax({
          url: "/api/v1/law-enforce/pc/trouble/num",
          data: {
            startTime: this.searchObj.startTime,
            endTime: this.searchObj.endTime
          },
          success: resp => {
            var data = resp.data;

            var data = [
              { value: data.noPassNum, name: "复查未通过" },
              { value: data.noReviewNum, name: "未复查" },
              { value: data.passNum, name: "复查通过" }
            ];

            kit.chartRender(
              $("#paint1"),
              util.paintPie({
                color: [
                  "rgba(245, 108, 108, 1)",
                  "rgba(230, 162, 60, 1)",
                  "rgba(103, 194, 58, 1)"
                ],
                legend: {
                  formatter: name => {
                    var sum = _.reduce(
                      _.pluck(data, "value"),
                      function(memo, num) {
                        return memo + num;
                      },
                      0
                    );
                    var total = _.findWhere(data, { name: name });
                    return `{c| ${name}} {b| ${total.value}个} `;
                  }
                },
                graphic: [
                  {
                    type: "rect",
                    left: "22%",
                    top: "45%",
                    style: {
                      text: resp.data.allNum + "个",
                      textAlign: "center",
                      textFill: "black",
                      fontSize: 20,
                      fontWeight: 700
                    }
                  },
                  {
                    type: "rect",
                    left: "22%",
                    top: "55%",
                    style: {
                      text: "执法检查总数",
                      textAlign: "center",
                      textFill: "black",
                      fontSize: 12,
                      fontWeight: 700
                    }
                  }
                ],
                data: data
              })
            );

            var data2 = resp.data.list;
            data2.forEach((value) => {
              value.value = value.num;
              value.name = _.findWhere(this.typeList,{id: value.id}).name;
            })
            console.log(data2)

            kit.chartRender(
              $("#paint2"),
              util.paintPie({
                legend: {
                  formatter: name => {
                    var sum = _.reduce(
                      _.pluck(data2, "value"),
                      function(memo, num) {
                        return memo + num;
                      },
                      0
                    );
                    var total = _.findWhere(data2, { name: name });
                    return `{c| ${name}}  {b| ${kit.percent(
                      total.value / sum,
                      1
                    )}%}`;
                  }
                },

                data: data2
              })
            );
          }
        });
      },
      callback(page, pageSize, searchObj) {
        // console.log(param,111)
        // console.log(this.$refs.tab.searchObj)
        this.searchObj = searchObj;
        this.getPie(searchObj);
        this.change(searchObj);
      },
      startHacking: function() {
        this.aaa = 111;

        //this.aaa = 111
      }
    }
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 15px;
    box-sizing: border-box;
  }
  .el-input {
    width: 200px;
  }

  .title {
    font-size: 14px;
    color: #303133;
    text-align: left;
    font-family: PingFang SC;
    font-weight: 500;
  }

  .cont {
    border: 1px solid #ebeef5;
    padding: 10px;
    margin: 10px;
  }
  .form {
    margin-top: 1px;
    margin-bottom: 1px;
  }
</style>
<style>
  .mypage .el-pagination {
    display: none;
  }
</style>