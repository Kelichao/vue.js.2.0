// 表单配置项
var formItem = [
    {
      type: "input",
      value: "",
      key:"name"
    },
    {
      type: "pick",
      value: "",
      key:"date"
    },
    {
      type: 1,
      value: 22222,
      key:"dates"
    },
    {
      type: "select",
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
    },
  ];


  
  // 表格配置项
  var tableItem = [
    { prop: "date", label: "日期" },
    { prop: "name", label: "姓名" },
    { prop: "name1", label: "姓名3" },
    { prop: "name2", label: "姓名4" },
    { prop: "name3", label: "姓名4" },
    { prop: "name4", label: "姓名4" },
    { prop: "address", label: "地址11" },
    {
      label: "功能按钮",
      type: "button",
      callback(res) {
        alert(123);
      },
    },
    { prop: "", label: "", type: 2 /**这个标志用于判断模板 */ },
  ];

  var tableConfig = {
    height: "400",
  }

  var pageConfig = {
    total:555,
    callback: function (page, pageSize) {
      alert("go---" + page + "|" + pageSize);
      console.log(this.total = 666)
    }
  }

  module.exports = {
    formItem,
    tableItem,
    tableConfig,
    pageConfig
  }