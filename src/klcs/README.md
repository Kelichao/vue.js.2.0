# klcs方法库

![image](https://cloud.githubusercontent.com/assets/18028533/21641415/a0801094-d2b6-11e6-9cfd-3069b4195042.png)

> 方法:借鉴底线库的工具框架，包含一些常用方法，在兼容AMD模式的同时，兼顾了CMD [(链接地址)](http://kelichao.github.io/)

```bash

# 下载依赖
$ npm install klcs --save


```

> 博客日期2016-10-18

# kit.js 

<table>

<thead>
<tr>
        <td>序号</td>
	<td>方法名称</td>
	<td>使用方法</td>
</tr>
</thead>
<tbody>
<tr>
        <td>1</td>
	<td>kit.Model/kit.Controller/kit.View</td> 
	<td>mvc架构，使用详情见<a href="https://github.com/Kelichao/kit.js/issues/3">使用demo</a></td>
</tr>
<tr>
        <td>2</td>
	<td >kit.tabToggle(elements, _class, fn)</td> 
	<td>elements为绑定事件的对象，节点属性需要设置为tab-data, _class为点击后添加的类名， fn为回调<a href="https://github.com/Kelichao/kit.js/issues/8">使用demo</a></td>
</tr>
<tr>
        <td>3</td>
	<td >kit.method(obj)</td> 
	<td>为对象上挂载的函数体排序生成数组名，除去变量值,返回一个新数组</td>
</tr>
<tr>
        <td>4</td>
	<td>kit.extend</td> 
	<td>通过浅复制，继承当前对象的方法，内部方法，多个对象属性继承用kit.mixin</td>
</tr>
<tr>
        <td>5</td>
	<td>kit.CLIENT_USERID</td> 
	<td>客户端用户id,在浏览器中不存在,这个属性应该是由客户端设置</td>
</tr>
<tr>
        <td>6</td>
	<td>kit.CLIENT_VERSION</td> 
	<td>客户端版本号，在浏览器中不存在,这个属性应该是由客户端设置</td>
</tr>
<tr>
        <td>7</td>
	<td>kit.isArray(totle) </td> <td>判断是否为数组</td>
</tr>
<tr>
        <td>8</td>
	<td>kit.isBoolean(totle)</td> <td>判断是否为布尔值</td>
</tr>
<tr>
        <td>9</td>
	<td>kit.isFunction(totle)</td> <td>判断是否为函数</td>
</tr>
<tr>
        <td>10</td>
	<td>kit.isString(totle)</td> <td>判断是否为字符串</td>
</tr>
<tr>
        <td>11</td>
	<td>kit.isDate(totle)</td> <td>判断是否为日期</td>
</tr>
<tr>
        <td>12</td>
	<td>kit.isNull(totle)</td> <td>判断是否为null(typeof null === "object")</td>
</tr>
<tr>
        <td>13</td>
	<td>kit.isRegExp(totle)</td> <td>判断是否为正则</td>
</tr>
<tr>
        <td>14</td>
	<td>kit.isNumber(totle)</td> <td>判断是否为数字</td>
</tr>
<tr>
        <td>15</td>
	<td>kit.isUndefined(totle)</td> <td>判断是否是undefined</td>
</tr>
<tr>
        <td>16</td>
	<td>kit.isError(totle)</td> <td>判断是否是Error</td>
</tr>
<tr>
        <td>17</td>
	<td>kit.some(object/array, fn)</td>
	 <td>迭代方法，如果有一个回调函数返回false，则返回fanse</td>
</tr>
<tr>
        <td>18</td>
	<td>kit.forEach(object/array, fn)/kit.each(object/array, fn)</td>
	 <td>负责用来遍历对象/数组属性,按照ES5标准，与jq参数位置不同</td>
</tr>
<tr>
        <td>19</td>
	<td>kit.trim(string)</td>
	 <td>去除字符串两边的空格，如果有第二个参数，则把所有空格删除</td>
</tr>
<tr>
        <td>20</td>
	<td>kit.locaSearch(key[, string])</td> 
	<td>例子："?getdate=2016-12-08&type=2"。第一个参数为需要取得的键值，
	第二个为需要解析成对象的地址串，
	如果不传为location.search</td>
</tr>
<tr>
        <td>21</td>
	<td>kit.cookie(key[, string])</td> 
	<td>例子："aaa=123;bbb=456;ccc=678"。第一个参数为需要取得的键值
	（如果传入的是"" 或者null，则会打出整个键值对对象），
	第二个为需要解析成对象的地址串，如果不传为document.cookie，已经把末尾的分号“;”去除</td>
</tr>
<tr>
        <td>22</td>
	<td>kit.clone</td> 
	<td>第一个参数为克隆对象，如果第二个参数是true则使用递归深度复制,<a href="https://github.com/Kelichao/kit.js/issues/7">使用demo</a></td>
</tr>
<tr>
        <td>23</td>
	<td>kit.query(selector)</td> 
	<td>封装了document.querySelector</td>
</tr>
<tr>
        <td>24</td>
	<td>kit.querys(selector)</td> 
	<td>封装了docuemnt.querySelectorAll</td>
</tr>
<tr>
        <td>25</td>
	<td>kit.ta(value[, type])</td> 
	<td>埋点快捷方式，
	传入对象{"ibyf130_3242": ".class1","iby2345_fre4": ".class2"} 进行dom绑定，
	如果传入数组，则是载入页面调用。如果有第二个参数,则可以自行设定触发方式 <a href="https://github.com/Kelichao/kit.js/issues/11">使用demo</a></td>
</tr>
<tr>
        <td>26</td>
	<td>kit.clientDown(name, url[, type])</td> 
	<td>快速调用客户端下载弹窗1：下载文件取名，2：文件下载地址(相对路径)，3：文件类型,需要加（.）。	type可选，如果url能够取到地址串，则不会被type覆盖，
	 如果地址串后面的url没有解析出类型，则会被type覆盖。例子： kit.clientDown("abc", "/thsft/Istrategy/abc.pdf", ".xls")。
	 注：适用于动态文件的下载，此类文件如果调用客户端方法会导致意外多出现一个白屏</td>
</tr>
<tr>
        <td>27</td>
	<td>kit.splitSpace(string)</td> 
	<td>按照空格分割字符串</td>
</tr>
<tr>
        <td>28</td>
	<td>kit.once(fn)</td> 
	<td>执行一次函数包装器，返回一个新函数体</td>
</tr>
<tr>
        <td>29</td>
	<td>kit.mixin( [deep ], target, object1 [, objectN ] )</td> 
	<td>拷贝属性的方法，第一个参数如果填布尔值则是深度复制，后面跟需要拷贝的对象，
	方法属性都会挂载到第一个对象target上面	</td>
</tr>
<tr>
        <td>30</td>
	<td>kit.sort(["asc"/"desc", ]arr)</td> 
	<td>第一个参数如果是"asc"则是正序从小到大(默认), 如果是"desc",则倒叙，
	如果只传一个数组参数则进行正序排序,arr为需要排序的数组</td>
</tr>
<tr>
        <td>31</td>
	<td>kit.route(callback[, arr])</td> 
	<td>使用方法为传入一个函数参数，路由发生变化时就触发回调
	kit.route(fucntion(hash){console.log(hash)})。
	回调的第一个参数即hash值。注：hash值会改变浏览器历史记录,如果不传arr则所有hash值都有效，都会触发回调，如果传了arr则只会根据范围内的hash变化而触发回调</td>
</tr>
<tr>
        <td>32</td>
	<td>kit.addScript(url[, callback])</td> 
	<td>动态加载脚本，兼顾了IE 6-8浏览器，第一个参数是地址，第二个参数可选，
	为脚本加载完毕后触发的回调</td>
</tr>
<tr>
        <td>序号</td>
	<td>kit.underToMustache()</td> 
	<td>启用Mustache.js类型模板语法，使用{{= }} 这样的语法</td>
</tr>
<tr>
        <td>33</td>
	<td>kit.bind(total, fn)</td> 
	<td>返回一个绑定this后的函数体，仿原生bind</td>
</tr>
<tr>
        <td>34</td>
	<td>kit.error(fn)</td> 
	<td>window.onerror触发之后的执行函数</td>
</tr>
<tr>
        <td>35</td>
	<td>kit.timeHandle(inputTime, value[, symbol])</td> 
	<td>inputTime目标时间，value是改变天数，负整数是向前，symbol为分割符号。用于设定未来，或者以前的时间，并格式化输出。没传分割符号默认是“-”</td>
</tr>
<tr>
        <td>36</td>
	<td>kit.tempRender(template, total, data[, type])</td> 
	<td>total可以是dom对象，也可以是jQuery对象或zepto对象。kit.tempRender("234234234{{=a}}", document.body,{a:"aaa"}),type是添加方式，默认是html方法全部替换，如需append，type就可以是"append" </td>
</tr>
<tr>
        <td>37</td>
	<td>kit.chartRender(option, total)</td> 
	<td>渲染图表 echarts2版本插件</td>
</tr>
<tr>
        <td>38</td>
	<td>kit.isEmpty(total)</td> 
	<td>判断对象或者数组是否为空，由于空对象在布尔判断时始终是true值，所以需要使用这个方法判断里面是否没有键值对，如果是空则返回true,如果是以上两个类型以外的类型，则一律返回true</td>
</tr>
<tr>
        <td>39</td>
	<td>kit.ajaxInit(total)</td> 
	<td>total为对象组成，total{before:fn1,complete:fn2} fn1与fn2都必须要为函数</td>
</tr>
<tr>
        <td>40</td>
	<td>kit.triggerSuccess(receive)</td> 
	<td>ajax请求成功后<a href="https://github.com/Kelichao/Ajax/issues/6">(ajax请求返回格式标准)</a> 传入一个对象 obj = {response: resp,// 数据源  haveData: fn1,// 存在数据,存在数据要分两种情况// 部分无数据与全部有数据 noData:fn2// 不存在数据}    在内部按照事先定好的请求数据格式进行函数的调用</td>
</tr>
<tr>
        <td>41</td>
	<td>kit.timeFinal(total, fn)</td> 
	<td>把该运行代码放到队列底部执行，total为this指向,fn为回调函数</td>
</tr>
<tr>
        <td>42</td>
	<td>kit.Promise()</td> 
	<td>延迟执行的函数队列，<a href="https://github.com/Kelichao/kit.js/issues/5">使用方法</a></td>
</tr>
<tr>
        <td>43</td>
	<td>kit.binarySearch(arr, total)</td> 
	<td>使用二分法查找数组中的指定的项,查找到返回一个对象如：Object {index: 5, total: 7}，如果该项不存在，则返回字符串"no this item"</td>
</tr>
<tr>
        <td>44</td>
	<td>kit.countDown(time, fn)</td> 
	<td>倒计时函数，time为计时数值，fn为每次变化后的回调，返回一个重置计时的函数体var reset = kit.countDown(time, fn)</td>
</tr>
<tr>
        <td>45</td>
	<td>kit.toggle(object)</td> 
	<td>在同一个元素上触发事件的轮回方式，传入对象ibject<a href="https://github.com/Kelichao/kit.js/issues/6">使用dome</a></td>
</tr>
<tr>
        <td>46</td>
	<td>kit.propertyNumber(total[, flag])</td> 
	<td>判断对象属性数量,total为要计算属性数量的对象，flag为true则除去原型链上的属性</td>
</tr>
<tr>
        <td>47</td>
	<td>kit.ajaxConstant({beforeSend:fn1, complete:fn2})</td> 
	<td>ajax重复步骤的静态化，可以重复调用<a href="https://github.com/Kelichao/kit.js/issues/9">使用demo</a></td>
</tr>
<tr>
        <td>48</td>
	<td>kit.ta_m(type, para)</td> 
	<td>移动端埋点<a href="https://github.com/Kelichao/kit.js/issues/10">使用demo</a></td>
</tr>
<tr>
        <td>49</td>
	<td>kit.encryptName(name)</td> 
	<td>客户端匿名机制函数,返回 name_as***sj形式的字符串</td>
</tr>
<tr>
        <td>50</td>
	<td>kit.initFontSize([size])</td> 
	<td>调整客户端网页字体大小，不填则初始化为1，可填0,1,2,3调整字号</td>
</tr>
<tr>
        <td>51</td>
	<td>kit.signState([flag])</td> 
	<td>返回用户名var userName = kit.signState();。kit.signState(true)// 验证是否登录，登录则不执行代码，还没登录则弹登录框;</td>
</tr>
<tr>
        <td>52</td>
	<td>kit.template(str, value[, symbol])</td> 
	<td>需要传入一个数组,str是模板字符串, value是渲染数据的【数组】,symbol是无数据展示的内容<a href="https://github.com/Kelichao/kit.js/issues/12">使用demo</a></td>
</tr>
<tr>
        <td>53</td>
	<td>kit.mobileType()</td> 
	<td>判断手机平台iphone(ipad)或gphone</td>
</tr>
<tr>
        <td>54</td>
	<td>kit.serizeArrForm(arr)</td> 
	<td>序列化jq生成的表单数组，通过$("#Form").serializeArray()方法生成的数组</td>
</tr>
<tr>
        <td>55</td>
	<td>kit.triggerSuccessEvun(receive)</td> 
	<td>ajax请求成功后<a href="https://github.com/Kelichao/Ajax/issues/7">(ajax请求返回格式标准)</a> 传入一个对象 obj = {response: resp,// 数据源  haveData: fn1,// 存在数据,存在数据要分两种情况// 部分无数据与全部有数据 noData:fn2// 不存在数据}    在内部按照事先定好的请求数据格式进行函数的调用</td>
</tr>
<tr>
        <td>56</td>
	<td>kit.getSingle(fn)</td> 
	<td>test = kit.getSingle(function(){alert(1); return true});不断触发test只触发一次，注意点是需要return一个true回去</td>
</tr>
<tr>
        <td>57</td>
	<td>kit.throttle(callback, time)</td> 
	<td>函数节流（代理模式）需要一定间隔才能再次出发函数 x = kit.throttle(function(a) {console.log(a);}, 2000)</td>
</tr>
<tr>
        <td>58</td>
	<td>kit.setViewport(width)</td> 
	<td>改变移动端的屏幕缩放比，使不同分辨率的屏幕有相同的显示效果</td>
</tr>
</tbody>
</table>

