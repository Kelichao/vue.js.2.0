var config = {
  name:"配置文件",
  // b:2,
  development:{
    url:"http://10.191.20.23:9090/cockpit",
    imageUrl: "http://112.29.71.165:8066/city-interpolation-server/public/interpolate/api/v1.0/show-interpolation/"
  },
  // 生产环境
  production:{
    url:"http://112.29.71.165:8087/",
    imageUrl: "http://112.29.71.165:8066/city-interpolation-server/public/interpolate/api/v1.0/show-interpolation/"
  }
}


// 环境变量,$$随时取用
window.$$ = config[process.env.NODE_ENV];

// 环境变量输出
console.log(config,process.env.NODE_ENV)

export default config
