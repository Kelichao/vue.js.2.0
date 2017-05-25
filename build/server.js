// 引入自动打开浏览器模块
var openBrowser = require('child_process');

// 引入express模块
var express = require('express');
// 初始化express模块
var app = express();

// 引入静态文件目录
app.use(express.static('dist'));

app.get('/', function (req, res) {
  // 返回调用send方法进行输出
  res.send('Hello World!');
});

// 路由  /user 节点接受请求
// 地址为http://localhost:3000/user
app.get('/user', function (req, res) {
  res.send('user');
});

// 监听3000端口
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('http://localhost:3000/user');

  openBrowser.exec('start http://localhost:3000/index.html');
});

