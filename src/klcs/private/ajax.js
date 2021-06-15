
/** 
 * @description: ajax功能配置项,完整配置表
 * @author: kelichao
 * @care 注意,这个工具函数不要用es6写法,是用来打进npm包的代码.
 * date: 2021-03-11
 */
function ajax(options) {

  var Default = {
    type: "get",// 默认为get
    data:{},// 参数
    contentType:'',//  请求头
    dataType:"json",
    processData: true,
    timeout:"",// 超时时间
    headers:{},// 头部参数
    url:"",// 链接地址相对路径
    wholeUrl:"",// 全地址,用于解决特殊情况,如果有相对路径,该参数无效
    success: function(){},
    error:function(){},
    complete:function() {}
  };

  options = Object.assign(Default,options);

  // var reg=new RegExp(/(http)|(https)/);
  // var flag = reg.test(options.url);

  // // 全路径
  // if (flag) {

  // } else {
  //   ($$.url + options.url)
  // }
  

  return $.ajax({
    type: options.type ,
    dataType:options.dataType,
    headers:options.headers,
    contentType: options.contentType ,//  请求头
    processData:options.processData,
    data: Object.assign(
      // {token: $$.token}, // 默认参数,每个请求需要夹带
      options.data
    )
    ,
    timeout: options.timeout || 40000,
    url: options.url ? ($$.url + options.url) : options.wholeUrl,
    success: function(resp) {
      options.success(resp)
    },
    error: function(e) {
       options.error(resp)
      // console.error({
      //   code: e.status,
      //   message: e.statusText,
      //   detail: e
      // });
    },
    complete:function (info){
      options.complete(info)
      // console.info("请求完成")
      // console.log(info)
    
    },
  })
    // .then(function(resp) { })
    // .catch(function(e) { })

}

export default ajax