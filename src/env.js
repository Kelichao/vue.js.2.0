var config = {
  name:"配置文件",
  // b:2,
  development:{
   
    siteCode:"3004",
    url:"http://47.100.190.94:9090/cockpit/",
    url2:"http://hzzhhb.net:8041/",
    imageUrl: "http://112.29.71.165:8066/city-interpolation-server/public/interpolate/api/v1.0/show-interpolation/"
  },
  // 生产环境
  production:{
    siteCode:"3004",
    url:"http://47.104.111.5:8808/",
    url2:"http://47.104.111.5:8808/",
    imageUrl: "http://112.29.71.165:8066/city-interpolation-server/public/interpolate/api/v1.0/show-interpolation/"
  }
}


// 环境变量,$$随时取用
window.$$ = config[process.env.NODE_ENV];

// 环境变量输出
console.log(config,process.env.NODE_ENV)

export default config
