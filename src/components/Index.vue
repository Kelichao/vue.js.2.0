<template>
  <div class="login-screen">
        <div class="view" id="loginView">
            <div data-page="loginPage" class="page">
                <!-- page-content has additional login-screen content -->
                <div class="page-content login-screen-content overflow-hidden" id="loginFormBox">
                    <div class="login-page ">
                        <div class="bg-top"></div>
                        <div class="bg-center"></div>

                        <div class="login-page-content">
                            <!-- 登录界面head开始 -->
                            <div class="login-top pos-relative">
                                <div class="login-tab" sw-role="cell">
                                    <ul class="login-tab-item">
                                        <li><a href="">首页</a></li>
                                        <li><a href="">客户案例</a></li>
                                        <li><a href="">行业新闻</a></li>
                                        <li><a href="">帮助文档</a></li>
                                    </ul>
                                </div>
                                <div class="login-tel" sw-role="cell">
                                    <span class="login-tel-icon"></span>
                                    <span class="login-tel-number">4000-0571-11</span>
                                </div>
                            </div>
                            <!-- 登录界面head结束 -->

                            <!-- 中间内容体 -->
                            <div class="login-center clearfix pos-relative">
                                <!-- <div class="login-screen-title">My App</div> -->
                                <!-- Login form -->
                                <div class="clearfix">
                                    <form id="loginForm" class="loginForm">
                                        <div sw-role="cell" sw-align="center" class="loginForm-title">iME Portal管理系统</div>
                                        <div class="login-input">
                                            <ul>
                                                <li class="item-content">
                                                    <div class="item-inner">
                                                        <div class="item-input">
                                                            <input id="loginName" type="text" name="loginName" placeholder="用户名：">
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="item-content">
                                                    <div class="item-inner">
                                                        <div class="item-input">
                                                            <input id="loginPsw"  type="password" name="loginPsw" placeholder="密&nbsp;&nbsp;&nbsp;码：">
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="item-content">
                                                    <div class="item-inner">
                                                        <div class="item-input">
                                                            <div class=" checkNum">
                                                                <input type="text" name="checkNum" placeholder="验证码：" id="loginIdentify">
                                                                <img title="验证码" src="">
                                                                <a href="javascript:;" title="点击刷新验证码" class="checkNum-refresh"></a>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div sw-role="cell" class="loginBtn-cont">
                                            <button type="submit" sw-role="cell" sw-layout="fit" sw-align="center" sw-valign="middle" class="loginBtn button button-fill h36 " id="loginBtn" title="登录系统">登录</button>
                                        </div>
                                        <div class="password-operate" sw-role="cell" sw-valign="middle" sw-align="center">
                                            <a href="javascript:;" class="u-forget">忘记密码？</a>
                                            <a href="javascript:;" class="u-reset">重置</a>
                                        </div>
                                    </form>
                                    <!-- 登录表单结束 -->
                                </div>

                                <div class="login-detail">
                                    <ul sw-role="cell" sw-align="center">
                                        <li>
                                            <div class="detial-title" sw-role="cell" sw-layout="fit" sw-align="center" sw-valign="middle">
                                                <span>MT</span>
                                            </div>
                                            <p class="detial-cont">参考布局仿真、在线生产仿真等云计算技术之上，全面虚实结合为客户量...<a href="">[详情]</a></p>
                                        </li>
                                        <li>
                                            <div class="detial-title" sw-role="cell" sw-layout="fit" sw-align="center" sw-valign="middle">
                                                <span>ME</span>
                                            </div>
                                            <p class="detial-cont">面向车间执行层的生产管理系统。帮助企业实现更加精益化生产管理、降低...<a href="">[详情]</a></p>
                                        </li>
                                        <li>
                                            <div class="detial-title" sw-role="cell" sw-layout="fit" sw-align="center" sw-valign="middle">
                                                <span>MI</span>
                                            </div>
                                            <p class="detial-cont">面向制造企业车间级信息化管控系统，工厂物联网以及环境感知应用的智能...<a href="">[详情]</a></p>
                                        </li>
                                        <li>
                                            <div class="detial-title" sw-role="cell" sw-layout="fit" sw-align="center" sw-valign="middle">
                                                <span>QNS</span>
                                            </div>
                                            <p class="detial-cont">主要指企业完整质量管理解决方案。从研发质量、采购质量、制造质量、市场质...<a href="">[详情]</a></p>
                                        </li>
                                        <li>
                                            <div class="detial-title" sw-role="cell" sw-layout="fit" sw-align="center" sw-valign="middle">
                                                <span>Platform</span>
                                            </div>
                                            <p class="detial-cont">基于‘构件化、配置化、流程化’思想研发的软件平，在此基础上孵化出各个...<a href="">[详情]</a></p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- 中间内容体结束 -->
                        </div>

                        <!-- 页脚 -->
                        <div class="bg-footer" sw-role="cell" sw-align="center">
                            <span>
                            <a href="">法律声明</a>|<a href="">版权声明</a>|<a href="">联系我们 </a>
                            <b>© 2015 杭州吉利易云科技有限公司 版权所有</b>
                            </span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: 'hello world'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
html {
  min-height: 720px;
}
.on{
  .login-page{
    display: block;
  }
  .init-page{
    display: none;
  }
}

.init-page,.login-page{
  min-height: 100%;
  height: 100%;
  width:100%;
  position: absolute;
  left: 0;
  top:0;
}

.bg-top {
  background-color: #137cc0;
  height: 50px;
  position: absolute;
  width: 100%;
  z-index:2;
  opacity:0.95;
}

.login-tab {
  height:50px;
  /*margin-left: 15%;*/
}

.login-tab-item {
  background: url(../assets/login_icon.png) no-repeat left center;
  background-position-y: -108px;
  width:480px;
  padding-left:60px;
  display: inline-block;
  li{
    display: inline-block;
    line-height: 50px;
    width: 80px;
    text-align: center;
    a {
      display: block;
      color:#ffffff;
      font-size:14px;
      font-family:宋体;
    }
    a:hover {
      background:#0c5d92;
      text-decoration: none;
    }
    a:active {
      color:#e0e0e0;
    }
  }
}

.login-tel-number {
  line-height: 50px;
  font-size: 16px;
  font-family: 微軟雅黑;
  color: white;
  text-indent: 40px;
  background: url(../assets/login_icon.png) no-repeat left center;
  background-position-y: -2px;
}
.login-tel {
  position: absolute;
  right: 0;
  height: 50px;
  top: 0px;
}
.login-page{
  display: none;
  min-width:980px;
  width: 100%;
  height: 100%;
  position: relative;
  top: 0px;
  bottom: 0px;
}

.login-page-content {
  width: 970px;
  height: 100%;
  margin: auto;
  position: relative;
  z-index: 10;
}

.loginForm {
  width: 330px;
  background: white;
  float: right;
  right: 0;
  height: 340px;
  margin-top: 55px;
  border: 1px solid #d2cbce;
  transition: all 0.70s ease-in-out;
  &:hover {
    transition: all 0.70s ease-in-out;
    box-shadow: 0 0 15px 1px #ffffee;
    -webkit-box-shadow: 0 0 15px 1px #ffffee;
    -moz-box-shadow: 0 0 15px 1px #ffffee;
  }
  [name="loginName"] {
    background: url(../assets/login_icon.png) no-repeat right;
    background-position: 240px -63px;
  }
  [name="loginPsw"] {
    background: url(../assets/login_icon.png) no-repeat right;
    background-position: 240px -173px;
  }
  [name="checkNum"] {
    width:165px;
    display: inline-block;
  }
}

.loginForm-title {
  padding: 28px;
  font-size: 16px;
  font-family: SourceHanSansCN;
  font-weight: bold;
  color: #333333;
}

.login-center {

  /* overflow: auto; */
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  height: 640px;
}

.bg-center {
  background: url(../assets/login_bg.jpg) no-repeat center top;
  background-size: cover;
  position: absolute;
  width: 100%;
  top: 0px;
  bottom: 0px;
}

.bg-footer {
  height:50px;
  width:100%;
  background:white;
  position:absolute;
  z-index: 100;
  bottom:0;
}

.login-input{
  input,.checkNum {
    width: 280px;
    height: 40px;
    margin: 0 auto;
    display: block;
    border: 1px solid #bdc3cd;
    padding:0 10px 0 10px;
    border-radius:2px;
    margin-bottom:20px;
    transition: all 0.50s ease-in-out;
    &::-webkit-input-placeholder {
        color: #bcc3cd;
    }
    &:focus {
      transition: all 0.50s ease-in-out;
      -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(127,198,246, 0.6);
      -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(127,198,246, 0.6);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(127,198,246, 0.6s);
    }
  }
  .checkNum {
    border:none;
    padding:0;
    img {
      width: 80px;
      height: 39px;
      vertical-align: middle;
      margin-left: 4px;
    }
    .checkNum-refresh {
      &:hover {
        transition:all 0.30s ease-in-out;;
        transform:rotate(180deg);
        -ms-transform:rotate(180deg);   /* IE 9 */
        -moz-transform:rotate(180deg);  /* Firefox */
        -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
        -o-transform:rotate(180deg);  /* Opera */
      }
      display: inline-block;
      height: 40px;
      width: 20px;
      background: url(../assets/login_icon.png) no-repeat center top;
      background-position-y: -226px;
      background-position-x: -17px;
      vertical-align: middle;
      cursor:pointer;
      margin-left: 4px;
    }
  }

}
.loginBtn-cont {
  padding: 0 21px 0 21px;
}

.login-detail ul>li{
  width: 194px;
  height: 190px;
  border: 1px solid #f5f5f5;
  background-color: white;
  margin-left: 5px;
  margin-top:30px;
}
.detial-title {
  height:90px;
  span{
    width:120px;
    height:40px;
    background:#49a5e1;
    line-height: 40px;
    border-radius:3px;
    font-size:18px;
    font-weight:bold;
    color:#fff;
    -moz-box-shadow:0px 6px 12px 3px #f2f2f2;;
    -webkit-box-shadow:0px 6px 12px 3px #f2f2f2;;
    box-shadow:0px 6px 12px 3px #f2f2f2;
    -webkit-text-shadow:-1px 6px 20px rgba(0, 0, 0, 0.44);
    text-shadow:-1px 6px 20px rgba(0, 0, 0, 0.44);
  }
}
.password-operate {
  width: 259px;
  height: 34px;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  margin: 0 auto;
  a {
    color:#6e7a86;
  }
}

.detial-cont{
  padding:8px;
  font-family: 宋体;
  font-size:12px;
  text-align: left;
  color:#666666;
  a {
    color:#fb7d75;
  }
}

.bg-footer {
  line-height: 50px;
  a {
    color:#666666;
  }
  b{
    font-weight: normal;
    color:#666666;
    margin-left:15px;
  }
}
</style>
