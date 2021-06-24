const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const { Console } = require('console')
const publicPath = ''

var time = new Date();
var date = new Date(1398250549490);
Y = date.getFullYear() + '-';
M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
D = date.getDate() + ' ';
h = date.getHours() + ':';
m = date.getMinutes() + ':';
s = date.getSeconds(); 
// console.log(Y+M+D+h+m+s); 
var fileName = (time.getMonth() + 1)  + "-" +  time.getDate() + "_" + time.getHours() + "." + time.getMinutes()

console.log(process.env.NODE_ENV)  // development

module.exports = (options = {}) => ({

  entry: {
    index: './src/main.js',
    env: "./src/env.js"
  },
  output: {
    path: resolve(__dirname, `dist/` + process.env.NODE_ENV +"_" + fileName),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',

  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    },
    // 注意,这块只针对打包.
    {
      test: /\.js$/,
      use: ['babel-loader'],
      include:[/src/],
      // 排除node_modules编译
      // \\ for Windows, \/ for Mac OS and Linux
      exclude: [
        /node_modules/,
        // /node_modules[\\\/]webpack[\\\/]buildin/,
        // /src/
      ] 
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    }, 

    {

      test: /\.less$/,

      loader: "style-loader!css-loader!less-loader",

    },
    {
      test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: "images/[name].[ext]"// 输出路径
        }
      }]
    }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest',"env"]
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: resolve('src/images/assets/favicon.ico'),
    }),
    // //打包时清除页面中所有打印及debugger断点
    // new webpack.optimize.UglifyJsPlugin({
    //       compress: {
    //             warnings: false,
    //             drop_debugger: true,
    //             drop_console: true
    //       }
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        aaa: 123,
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        TYPE: JSON.stringify(process.env.NODE_ENV),
        DATE: JSON.stringify(Y+M+D+h+m+s)
      }
    }),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      '@': resolve(__dirname, 'src'),
      'src': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.json', '.css']
  },
  devServer: {
    // host: '127.0.0.1',
    port: 8011,
    disableHostCheck: true,
    public: "localhost:8011",
    host: '0.0.0.0',
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
})
