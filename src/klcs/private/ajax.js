/*!
 * @description: ajax功能配置项,完整配置表
 * @author: kelichao
 * date: 2021-03-11
 */


function ajax(options) {

  if (!options) {
    options= {
      type:"",// post还是get等
      data:{},// 参数
      timeout:"",// 超时时间
      url:"",// 链接地址相对路径
      wholeUrl:"",// 全地址,用于解决特殊情况,如果有相对路径,该参数无效
      success: function(){},
      error:function(){},
      complete:function() {}
    }
  }

  return $.ajax({
    type: options.type || "get",// 默认为get,
    headers:{
      token: $$.token, // 默认参数,每个请求需要夹带
    },
    data: Object.assign(
      {token: $$.token}, // 默认参数,每个请求需要夹带
      options.data
    )
    ,
    timeout: options.timeout || 40000,
    url: options.url ? ($$.url + options.url) : options.wholeUrl,
    success: function(resp) {
      options.success && options.success(resp)
    },
    error: function(e) {
      options.error && options.error(resp)
      // console.error({
      //   code: e.status,
      //   message: e.statusText,
      //   detail: e
      // });
    },
    complete:function (info){
      options.complete && options.complete(info)
      // console.info("请求完成")
      // console.log(info)
    
    },
  })
    .then(function(resp) { })
    .catch(function(e) { })

}

export default ajax