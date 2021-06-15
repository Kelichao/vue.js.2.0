// 表单配置项
var item = {
  total: 0,
  // 表单配置项
  formItem: [
    {
      type: "pick",
      timeType: "datetimerange", // week, day month
      placeholder: "年份",
      // format: "yyyy",
      value: "",
      key: "year"
    },
     {
        type: "pick",
        timeType: "datetimerange", // week, day month
        placeholder: "年份跨度",
        // format: "timestamp",
        valueFormat: "timestamp",
        value: "",
        key: ["beginTime", "endTime"]
      },
    {
      type: "select",
      value: "",
      key: "company",
      placeholder: "全部企业",
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
    },
    {
      type: "select",
      value: "",
      key: "typeId",
      placeholder: "全部隐患类型",
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
    },
    {
      type: "select",
      value: "",
      key: "userId",
      placeholder: "全部执法人员",
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
  // 表格配置项
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

  module.exports = {
    item

  }