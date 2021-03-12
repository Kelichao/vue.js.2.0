/*!
 * @description: ajax功能配置项,完整配置表
 * @author: kelichao
 * date: 2021-03-11
 */


function ajax(
  options = {
    url: "http://dev.oa.zcabc.com/api/v1/boot/",// 地址,不包含ip端口等
    wholeUrl: "",// 全地址,用于解决特殊情况
    type: "post",// 默认为post,
    data: {},// 参数
    success() { },
    complete() {},
  }
) {

  return $.ajax({
    type: options.type,
    data: {
      ...{},  // 默认参数,每个请求需要夹带
      ...options.data,
    },
    url: options.url || options.wholeUrl,
    complete: ((info) => {
      console.info("请求完成")
    })
  })
    .then((resp) => {

      if (resp.meta.code === 200) {
        options.success(resp.data)
      }
    })
    .catch((e) => {

      console.error({
        code: e.status,
        message: e.statusText,
        detail: e
      });
    })
    
}

export default ajax