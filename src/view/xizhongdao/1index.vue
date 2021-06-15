<template>
  <div class="container f-df f-fdc">
    <div class=" f-df">
      <div class="f-f1 f-jcfs f-aic f-df f-fs16">执法记录管理</div>
      <div class="f-f1 f-jcfe f-aic f-df">
        <el-button size="mini" type="primary" @click="fpiExport">导出</el-button
        ><el-button type="danger" size="mini" @click="deles"
          >删除所选</el-button
        >
      </div>
    </div>

    <div>
      <el-divider></el-divider>
    </div>

    <!-- 表格组件开始 -->
    <tabs
      ref="tab"
      :total="item.total"
      :table-data="item.tableData"
      :table-item="item.tableItem"
      :form-item="item.formItem"
      v-on:selectionChange="selectionChange"
      :callback="callback"
    >
      <!-- 表单插槽 -->
      <template slot="form" slot-scope="scope">
        <el-input
          size="mini"
          v-if="scope.data.type == 1"
          style="width: 200px"
          v-model="scope.data.value"
        ></el-input>
      </template>

      <!-- 表格体插槽 -->
      <template slot="table" slot-scope="scope">
        <!-- type为插槽类型 -->
        <u-table-column label="操作" v-if="scope.data.type == 2">
          <template slot-scope="scope">
            <span
              style="padding: 0 5px; background: rgba(255, 153, 2, 1);color: white;"
              >{{ scope.row.statusStr }}</span
            >
          </template>
        </u-table-column>

        <u-table-column label="操作" v-if="scope.data.type == 3">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="dele(scope.row.id)"
              >删除</el-button
            >
          </template>
        </u-table-column>
      </template>
    </tabs>
    <!-- 表格组件结束 -->

    <el-dialog
      title="执法内容编辑"
      :visible.sync="dialogVisible"
      width="1000px"
      :before-close="handleClose"
    >
      <div>
        <div class="head-line">检查记录</div>
        <el-form ref="form" :model="form" label-width="140px">
          <el-row :gutter="270">
            <el-col :span="12">
              <el-form-item label="执法人员">
                <el-select v-model="form.userId">
                  <el-option
                    :key="index"
                    v-for="(item, index) in userData"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="同行执法人员">
                <el-select v-model="form.userIdPeerArr" multiple>
                  <el-option
                    :key="index"
                    v-for="(item, index) in userData"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="270">
            <el-col :span="12">
              <el-form-item label="企业名称">
                <el-input v-model="form.companyName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查时间">
                <el-date-picker
                  v-model="form.checkTime"
                  value-format="timestamp"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <span :key="index" v-for="(list, index) in form.list">
            <el-form-item label="需整改内容">
              <el-input type="textarea" v-model="list.content"></el-input>
            </el-form-item>

            <el-row :gutter="270">
              <el-col :span="12">
                <el-form-item label="隐患类型">
                  <el-select v-model="list.typeId" disabled>
                    <el-option
                      :key="item.id"
                      v-for="item in item.formItem[2].options"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="复查日期">
                  <el-date-picker
                    v-model="list.reviewDate"
                    type="datetime"
                    value-format="timestamp"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="上传照片">
                <el-upload
                  :action="$$.ip + 'file-base-server/api/v1/sys/upload'"
                  list-type="picture-card"
                  :file-list="list.pictureArr"
                  :on-change="
                    (file, fileList) => {
                      return handleChange(file, fileList, index);
                    }
                  "
                  :on-remove="
                    (file, fileList) => {
                      return handleRemove(file, fileList, index);
                    }
                  "
                >
                  <i slot="default" class="el-icon-plus"></i>
                </el-upload>
                <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog> -->
              </el-form-item>
            </el-row>
          </span>

          <el-form-item class="f-tac">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>

        <div class="head-line">复查记录</div>
        <el-form ref="form2Arr" label-width="140px">
          <div v-for="(form2,index) in form2Arr" :key="index">
            <span>{{moment(form2.checkTime).format("YYYY-MM-DD HH:MM")}}</span>
            <el-row :gutter="270">
              <el-col :span="12">
                <el-form-item label="执法人员">
                  <el-select v-model="form2.userId">
                    <el-option
                      :key="index"
                      v-for="(item, index) in userData"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="同行执法人员">
                  <el-select v-model="form2.userIdPeerArr" multiple>
                    <el-option
                      :key="index"
                      v-for="(item, index) in userData"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="270">
              <!-- <el-col :span="12">
                <el-form-item label="企业名称">
                  <el-input v-model="form2.companyName"></el-input>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :span="12">
                <el-form-item label="检查时间">
                  <el-date-picker
                    v-model="form2.checkTime"
                    value-format="timestamp"
                    type="datetime"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col> -->
            </el-row>

            <span :key="index" v-for="(list, index) in form2.list">
              <el-form-item label="整改情况">
                <el-input type="textarea" v-model="list.content"></el-input>
              </el-form-item>

              <el-row :gutter="270">
                <el-col :span="12">
                  <el-form-item label="隐患类型">
                    <el-select v-model="list.typeId" disabled>
                      <el-option
                        :key="item.id"
                        v-for="item in item.formItem[2].options"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="复查日期">
                    <el-date-picker
                      v-model="list.reviewDate"
                      type="datetime"
                      value-format="timestamp"
                      placeholder="选择日期时间"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="上传照片">
                  <el-upload
                    :action="$$.ip + 'file-base-server/api/v1/sys/upload'"
                    list-type="picture-card"
                    :file-list="list.pictureArr"
                    :on-change="
                      (file, fileList) => {
                        return handleChange(file, fileList, index);
                      }
                    "
                    :on-remove="
                      (file, fileList) => {
                        return handleRemove(file, fileList, index);
                      }
                    "
                  >
                    <i slot="default" class="el-icon-plus"></i>
                  </el-upload>
                  <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog> -->
                </el-form-item>
              </el-row>
            </span>
          </div>

          <el-form-item class="f-tac">
            <el-button type="primary" @click="onSubmit2">提交</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import tabs from "@/components/tabs/index";
  import { Message } from "element-ui";

  var defaults = {
    checkTime: "",
    companyCode: "",
    companyName: "",
    userIdPeerArr: [],
    // 下面一整个部分的数组  隐患类型,复查日期,上传照片
    list: [{},{},{}
      // {id: "79", recordId: 40, typeId: "warn", typeName: "安全警示标语", content: "需要整改内容", picture: "12,13"},
      //             {id: "79", recordId: 40, typeId: "warn", typeName: "安全警示标语", content: "需要整改内容", picture: "12,13"}
    ],
    processStatus: 1,
    recordId: null,
    status: "0",
    userId: "",
    userIdPeer: "",
    userName: "",
    userNamePeer: ""
  };

  // 生命周期
  export default {
    data() {
      return {
        fileList: [
          // {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ],
        value1: "",
        value2: "",
        value3: "",
        dialogImageUrl: "",
        dialogVisible: false,
        disabled: false,
        ids: [],
        dialogVisible: false,
        userData: [],
        form: {
          ...defaults
        },
        // form2: {
        //   ...defaults
        // },
        form2Arr: [{...defaults},{...defaults},],
        item: {
          total: 0,

          // 表单配置项
          formItem: [
            {
              type: "pick",
              timeType: "datetimerange", // week, day month
              placeholder: "年份",
              // format: "timestamp",
              valueFormat: "timestamp",
              value: "",
              key: ["beginTime", "endTime"]
            },
            {
              type: "select",
              value: "",
              placeholder: "全部企业",
              key: "companyCode",
              options: []
            },
            {
              type: "select",
              value: "",
              key: "typeId",
              placeholder: "全部隐患类型",
              options: []
            },
            {
              type: "select",
              value: "",
              key: "userId",
              placeholder: "全部执法人员",
              options: []
            },
            {
              type: "select",
              key: "status",
              value: "",
              placeholder: "全部状态",
              options: [
                {
                  value: "0",
                  label: "待复查"
                },
                {
                  value: "1",
                  label: "完成"
                }
              ]
            }
          ],
          tableItem: [
            { prop: "companyName", label: "企业名称" },
            { prop: "checkTime", label: "检查时间" },
            { prop: "troubleTypeName", label: "隐患类型" },
            { prop: "userName", label: "执法人员" },
            { prop: "statusStr", label: "状态", type: 2 },
            { prop: "", label: "操作", type: 3 }
          ],
          tableData: []
        }
      };
    },
    mounted() {
      // console.log(this.$refs.tab.searchObj)
      this.defaultGetData();

      util.ajax({
        url: "/api/v1/law-enforce/pc/company/list",
        success: resp => {
          this.item.formItem[1].options = resp.data.map(value => {
            return {
              value: value.id,
              label: value.name
            };
          });
        }
      });

      util.ajax({
        url: "/api/v1/law-enforce/hidden-trouble/list",
        success: resp => {
          this.item.formItem[2].options = resp.data.map(value => {
            return {
              value: value.id,
              label: value.name
            };
          });
        }
      });

      util.ajax({
        url: "/api/v1/law-enforce/pc/user/list",
        success: resp => {
          this.item.formItem[3].options = resp.data.map(value => {
            return {
              value: value.id,
              label: value.name
            };
          });
        }
      });

      util
        .ajax({
          url: "/api/v1/law-enforce/pc/user/list"
        })
        .then(resp => {
          this.userData = resp.data;
        });
    },
    components: { tabs },
    watch: {
      //     "form.userIdPeerArr": {
      //   handler(newVal, oldV) {
      //     console.log(this.form);
      //     this.form.userIdPeer = newVal
      //   }
      // }
    },
    methods: {
      handleChange(file, fileList, index) {
        console.log(fileList);
        this.form.list[index].pictureArr = fileList;
        // console.log(this.form.list[index])
        // this.fileList = fileList.slice(-3);
      },
      handleRemove(file, fileList, index) {
        console.log(file, fileList);
        this.form.list[index].pictureArr = fileList;
      },
      onSubmit() {
        // 数据处理
        this.form.userIdPeer = this.form.userIdPeerArr.join(",");
        this.form.list.forEach(value => {
          var arr = value.pictureArr.map(value => {
            var total;
            // 如果是上传返回的
            total = value.response[0].ID;
            return total;
          });
          value.picture = arr.join(",");
        });

        util.ajax({
          url: "/api/v1/law-enforce/pc/main/update",
          type: "post",
          processData: false,
          contentType: "application/json;charset=UTF-8",
          data: JSON.stringify({
            ...this.form
          }),
          success: resp => {
            if (resp.message == "成功！") {
              this.$message({ message: "保存成功", type: "success" });
              this.dialogVisible = false;
            }
          }
        });
      },
      onSubmit2() {
        // 数据处理
        this.form2Arr.forEach((form2) => {
          form2.userIdPeer = form2.userIdPeerArr.join(",");
          form2.list.forEach(value => {
            var arr = value.pictureArr.map(value => {
              var total;
              // 如果是上传返回的
              total = value.response[0].ID;
              return total;
            });
            value.picture = arr.join(",");
          });
        })
        

        util.ajax({
          url: "/api/v1/law-enforce/pc/review/update",
          type: "post",
          processData: false,
          contentType: "application/json;charset=UTF-8",
          data: JSON.stringify(this.form2Arr),
          success: resp => {
            if (resp.message == "成功！") {
              this.$message({ message: "保存成功", type: "success" });
              this.dialogVisible = false;
            }
          }
        });
      },
      handleClose(done) {
        done();
      },
      selectionChange(val) {
        console.log(val);
        var ids = kit._.pluck(val, "id");
        this.ids = ids;
        // this.deles(ids)
      },
      callback(page, pageSize, searchObj) {
        // 触发请求
        this.$getData({
          ...searchObj,
          // beginTime// 时间戳开始
          // endTime// 时间戳
          offset: page - 1,
          limit: pageSize
        });
      },
      defaultGetData() {
        // console.log(this.$refs.tab.page)
        this.callback(
          this.$refs.tab.nowPage,
          this.$refs.tab.pageSize,
          this.$refs.tab.searchObj
        );
      },

      deles(ids) {
        if (!this.ids.length) {
          return;
        }
        // console.log(data.id);
        util.ajax({
          url: "/api/v1/law-enforce/pc/delete",
          type: "post",
          contentType: "application/json;charset=UTF-8",
          processData: false,
          data: JSON.stringify(this.ids),
          success: () => {
            this.defaultGetData();
            Message({
              message: "删除成功",
              type: "success"
            });
          }
        });
      },
      // ids = 12, ids= "1,23,45"
      dele(id) {
        // console.log(data.id);
        util.ajax({
          url: "/api/v1/law-enforce/pc/delete",
          type: "post",
          contentType: "application/json;charset=UTF-8",
          processData: false,
          data: JSON.stringify(id.split(",")),
          success: () => {
            this.defaultGetData();
            Message({
              message: "删除成功",
              type: "success"
            });
          }
        });
      },

      fpiExport: function(arr, fileName, tHeader) {
        // kit.fpiExport(this.item.tableData,"执法记录管理",);

        kit.fpiExport(this.item.tableData, "执法记录管理", this.item.tableItem);
      },

      edit(data) {
       
   
        this.form = { ...defaults };

        util
          .ajax({
            url: "/api/v1/law-enforce/info/" + data.id
          })
          .then(resp => {
             this.dialogVisible = true;
             
            // 检查记录数据处理
            $.extend(this.form, resp.data.main);
            this.form.typeId = kit._.pluck(this.form.list, "typeId");
            this.form.userIdPeerArr =
              (this.form.userIdPeer && this.form.userIdPeer.split(",")) || [];
            this.form.list.forEach(value => {
              var arr = (value.picture.length && value.picture.split(",")) || [];

              value.pictureArr =
                arr.map(value => {
                  // 442bde3a3a7546f5b5a57a5800908c97
                  return {
                    url: $$.ip + "file-base-server/api/v1/sys/download/" + value, // 用于显示远程图片
                    response: [{ ID: value }] // 为了与后台保持一致,记录ID,方便提交.
                  };
                }) || [];
            });

            // 复查记录数据处理
            // $.extend(true,this.form2Arr, resp.data.review);
            resp.data.review.forEach((value,index) => {
              $.extend(this.form2Arr[index],value)
            })
            // this.form2Arr.push();
            this.form2Arr.forEach(form2 => {
              form2.typeId = kit._.pluck(form2.list, "typeId");
              form2.userIdPeerArr =
                (form2.userIdPeer && form2.userIdPeer.split(",")) || [];
              form2.list.forEach(value => {
                var arr =
                  (value.picture && value.picture.length && value.picture.split(",")) || [];

                value.pictureArr =
                  arr.map(value => {
                    // 442bde3a3a7546f5b5a57a5800908c97
                    return {
                      url:
                        $$.ip + "file-base-server/api/v1/sys/download/" + value, // 用于显示远程图片
                      response: [{ ID: value }] // 为了与后台保持一致,记录ID,方便提交.
                    };
                  }) || [];
              });
            });
          });
      },
      $getData(searchObj) {
        util.ajax({
          url: "api/v1/law-enforce/pc/list",
          data: {
            ...searchObj
          },
          success: resp => {
            this.item.tableData = resp.data.entries;
            this.item.total = resp.data.total;
          }
        });
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

  .head-line {
    background-color: #409eff;
    width: 100px;
    height: 30px;
    border-radius: 30px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    margin-bottom: 16px;
    // margin-left: -40px;
    position: relative;
  }

  .head-line:after {
    content: "";
    position: absolute;
    top: 13px;
    left: 100px;
    background: #409eff;
    width: 850px;
    height: 2px;
  }
</style>
