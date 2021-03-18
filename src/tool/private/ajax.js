/*!
 * @description: ajax功能配置项,完整配置表
 * @author: kelichao
 * date: 2021-03-11
 */


function ajax(options = {}) {

  return $.ajax({
    type: options.type || "post",// 默认为post,
    data: {
      // ...{},  // 默认参数,每个请求需要夹带
      // ...options.data,
    },
    timeout: options.timeout || 30000,// 请求超时
    url: $$.url + options.url || options.wholeUrl,// 全地址,用于解决特殊情况
    success(resp) {

      if (resp.meta.code === 200) {
        options.success(resp.data)
      }
    },
    error(e) {
      // console.error({
      //   code: e.status,
      //   message: e.statusText,
      //   detail: e
      // });
    },
    complete: ((info) => {
      console.info("请求完成")
    }),
  })
    .then((resp) => { })
    .catch((e) => { })

}

export default ajax