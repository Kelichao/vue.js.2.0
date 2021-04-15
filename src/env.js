var config = {
  name:"配置文件",
  // b:2,
  development:{
    token:"d7429dfae6e54a4cbd5e359b84105c6b",
    siteCode:"3004",
    url:"http://47.100.190.94:9090/cockpit/",
    imageUrl: "http://112.29.71.165:8066/city-interpolation-server/public/interpolate/api/v1.0/show-interpolation/"
  },
  // 生产环境
  production:{
    siteCode:"3004",
    url:"http://112.29.71.165:8087/",
    imageUrl: "http://112.29.71.165:8066/city-interpolation-server/public/interpolate/api/v1.0/show-interpolation/"
  }
}


// 环境变量,$$随时取用
window.$$ = config[process.env.NODE_ENV];

// 环境变量输出
console.log(config,process.env.NODE_ENV)

export default config
