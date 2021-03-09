export default  {
    javaAjax(url,data,callback) {
        return $.ajax({
          type:"post",
          data: {userId:1,...data},
          url: "http://dev.oa.zcabc.com/api/v1/boot/" + url
        })  
          .then((resp) => {
            
            if (resp.meta.code === 200) {
                callback(resp.data)
            }
          })
          .catch((e) => {
            Message({ message: '请求出错', type: "error" });
            console.error(e)
          });
      },
}