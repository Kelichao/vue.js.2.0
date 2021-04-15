/*!
 * @description: 较为常用的工具集合
 * @author: kelichao
 * @update: 2016-11-19
 * @update: 2016-12-28 / 增加了埋点文件以及调用客户端接口文件的方法
 * @update: 2017-01-04 / 增加了MVC架构
 * @update: 2017-02-25 / 开始增加移动端函数
 * @update: 2020-09-01 / 增加Fpi的函数
 * @https://github.com/Kelichao/kit.js
 */

// 防止undefined被改写
;(function(undefined) {
	// root 的值, 客户端为window, 服务端(node) 中为 exports
	var root = this || window || {} ;
	var host = document.location.host,
		// 判断对象类型
		kind = Object.prototype.toString;

	// 方法简写
	// 缓存变量, 便于压缩代码
  	// 此处「压缩」指的是压缩到 min.js 版本
  	// 而不是 gzip 压缩
  	// 同时可减少在原型链中的查找次数(提高代码效率
	var ArrayProto = Array.prototype, 
		ObjProto = Object.prototype, 
		FuncProto = Function.prototype;

	var push = ArrayProto.push,
		pop = ArrayProto.pop,
		href = window.location.href,
    	slice = ArrayProto.slice;

	// 安全构造函数法
	var kit = function(obj) {

		// 如果传入了参数，且参数是A的实例对象，直接返回该参数对象
		// 否则就把obj当参数使用了
		if (obj instanceof kit) {
		    return obj;
		}

		// 如果忘记了实例化，this的prototype就没有保存着A的prototype地址
		if(!(this instanceof kit)) {
			return new kit(obj);
		}

		// 如果obj并不是kit的实例
		// 且这里已经处于正常实例化阶段
		// 用于OOP方式调用，将传入的对象赋值给内部对象
		// wrapped仅仅用来保存对象
		this._wrapped = obj;

		/*
		 * 在new状态下，return返回的都是当前的this ->
		 * 且this指向的地方都是新开辟的堆空间地址
		 * 默认就是这种模式，可以不写
		 */
		// return this;
	};

	//原型对象挂载简写
	var fn = kit.fn = kit.prototype;

	// 兼容node模块
	// node中有exports/module.exports模块用于导出某个js文件
	// node中可以用CMD模式调用此文件：var MATH = require("./MATH") 
	// 直接检验exports 是兼顾老版本nodeAPI
	if (typeof exports !== "undefined") {

		// 在正常node环境中
		// module以及module.exports都存在
	  	if (typeof module !== "undefined" && module.exports) {

	  	// exports 原本挂载的是module.exports对象地址，
	  	// 如果重写module.exports为kit对象则需要顺带
	  	// 将exports地址指向kit，重写后他们两者会丢失联系
	    exports = module.exports = kit;
	  	}

	exports.kit = kit;

	} else {
		// 把整体绑定在全局变量
		// 其实就是global.kit
	    root.kit = kit;
	}

	// defined这个方法是用于判断变量是否被定义
	// 如果还没有定义 Uncaught ReferenceError: * is not defined(…) -> 0
	// 未定义的变量，建议直接typeof
	kit.isUndefined = function(variable) {
		if (typeof variable === "undefined") {
			return true;
		}
		return false;
	};

	// 类型映射,目前是11种
	var typeMap = {
		"isObject":		"[object Object]",
		"isArray":      "[object Array]",
		"isBoolean":    "[object Boolean]",
		"isFunction":   "[object Function]",
		"isString":     "[object String]",
		"isMath":       "[object Math]",
		"isDate":       "[object Date]",
		"isNull":       "[object Null]",
		"isRegExp":     "[object RegExp]",
		"isNumber":     "[object Number]",
		"isError":      "[object Error]",
		"isWindow":     "[object Window]"// win对象比较特别
	};

	// 内部生成对象判断函数
	var _creatrTypeFunction = function(object) {
		
		// 这里没有加var导致在ie中报错
		for(var item in object) {

			// 将方法挂载到对象上,每个item一个闭包空间来去除闭包影响
			// underscore用forEach生产，原理跟这个一样,后期可以调整
			kit[item] = (function(val) {
				return function(total) {
					return kind.call(total) === object[val];
				};
			})(item);
		}
	};

	_creatrTypeFunction(typeMap);

	// forEach负责用来遍历对象/数组属性
	kit.each = kit.forEach = function(total, fn) {
		var isObj = kit.isObject(total);
		var isFun = kit.isFunction(total);
		var isWin = kit.isWindow(total);
		var isArr = kit.isArray(total);

		if (isObj || isFun || isWin) {
			for(var i in total) {
				fn(total[i], i, total);
			}
		} else if (isArr) {
			var j = 0;
			for (; j < total.length; j++) {
				fn(total[j], j,  total);
			}
		}
	};

	// 判断对象或者数组是否为空
	kit.isEmpty = function(total) {
		var flag = true;
		if (kit.isObject(total)) {
			kit.some(total, function() {
				flag = false;
				return false;
			});
		} else if (kit.isArray(total)) {
			if (total.length > 0) {
				flag = false;
			}
		} 

		return flag;
	};

	// some如果有一项返回false则返回false
	kit.some = function(total, fn) {
		var flag = "";
		if (kit.isObject(total)) {
			for (var i in total) {
				flag = fn(total[i], i);
				if (flag === false) {
					return false;
				}
			}
		} else if (kit.isArray(total)) {
			for (var j=0; j < total.length; j++) {
				flag = fn(total[j], j);
				if (flag === false) {
					return false;
				}
			}
		}

		// 没有返回false的项目
		return true;
	};

	// 拆分一个字符串中间有间隔的字符串
	// 如："aaa    bbb cc    ddd"
	kit.splitSpace = function(str) {
		return str.split(/\s+/g);
	};

	// 去除字符串两边的空格
	// 如果有第二个参数，则把所有空格删除
	// kit.trim("  dsfdsa=- 234.;df  ");
	kit.trim = function(str,state) {
		var totalStr = "";

		if (state === true) {
			totalStr = str.replace(/\s/g, "");
			return totalStr;

		}
		
		if (kit.isString(str) === true) {
			// 成功kit.trim("  fsdf f     ");
			totalStr = str.replace(/((^\s*)|(\s*$))/g, "");
		} else {
			throw Error("需要解析的并不是字符串");
		}

		// 失败：如果末尾有两个以上的空格就读取失败了
		// str.replace(/^\s+((\S|\s)*)\s+$/g, "$1");
		// jq写法   str.replace(/^\s+|((?:^|[^\\\\])(?:\\\\.)*)\s+$/g, "$1");
		return totalStr;
	};

	// 拆分规律字符串函数
	// key键值， string输入的串，type分割类型，flag是否除去首个问号字符
	var _strToObject = function(key, string, type ,flag) {
	    var str = string,
	        arr = [],
	        obj = {},
	        first = null,
	        final = null,
	        cont = "";

	    if (typeof str === "string" && str.length !== 0) {

	    	// 注意，window.location.search 截取的串都是带问号的
			// 如果有问号则去除问号
			if (flag) {
				str = str.search(/^\?/g) !== -1 ? str.substring(1) : str;
			}

	        arr = str.split(type);
	        kit.forEach(arr,function(value) {
	        	cont = value.split("=");
	            first = kit.trim(cont[0]);
				final = kit.trim(cont[1]);
	            obj[first] = final;
	        });
	    }

	    if (!!key) {
	    	obj = obj[key];
	    }

	    return obj;
	};

	/**
	 * 将参数字符串转化成JSON对象。
	 * @param {*} key 为需要取得的键值
	 * @param {*} address 地址串，不填则为location.search
	 * exp: kit.locaSearch("fsd","?sfsd=3423&we=234&fsd=324");  =   324
	 *      kit.locaSearch("","?sfsd=3423&we=234&fsd=324");     =  {sfsd:3423,we:234,fsd:324}
	 */
	kit.locaSearch = function(key, address){

		address = address || location.search;
		var total = _strToObject(key, address, "&", true);
		
		
		return total;
	};
	
	/*
	* 获取路由的参数，比较奇特
	* 2020.9.1添加
	*/
	kit.getQueryString = function(name) {
		var href = decodeURI(window.location.href)
		var v1 = []
		var v2 = []
		v1 = href.split(name + "=")
		if (v1.length > 1) {
		  v2 = v1[1].split("&")
		  if (v2.length > 1) {
			return v2[0]
		  } else {
			return v1[1]
		  }
		} else {
		  return ""
		}
	  };

	/**
	 * 把cookie字符串转化为对象获取函数
	 * @param {*} key 
	 * @param {*} string 
	 * aaa=123;bbb=456;ccc=678  
	 * =  {
	 *   a:123,
	 *   bbb:456,
	 *   ccc=678
	 * }
	 */
	kit.cookie = function(key,string) {

		var cookie = string || window.document.cookie,
			total = "";
		
		// 如果传入的字符串结尾带了分号(;)，则进行删除    
		if (cookie.slice(-1) === ";") {
			cookie = cookie.slice(0, -1);
		}

		total = _strToObject(key, cookie, ";", false);
		// 测试用例kit.cookie("bbb","aaa=123;bbb=789");
		return total;
	};


	/**
	 * description：用递归方法拷贝深层次对象,得到全新对象
	 * @param {*} context 
	 * @param {*} res 
	 * 
	 * // 对象要求：属性中有对象，且该内部对象有简单类型。
		var person = {
			name: "Bob",
			sing:{
				"name":"发如雪"
			}
		};
		var x =kit.mixin(person);
		person.sing.name = "";
		console.log(x);
	 */
	var _recursive = function(context, res) {

		//这里增加了数组处理，暂时还不清楚函数体如何进行复制。
		var arg = arguments.callee,
			object = (context instanceof Array) ? [] : {};

		// 继承原先的对象键值对
		kit.forEach(res, function(value, key) {
			object[key] = res[key];
		});

		// 遍历中间值的键值对
		kit.forEach(context, function(value, key) {
			// 如果键值对的属性是一个引用对象
			if (kit.isObject(context[key]) || kit.isArray(context[key])) {
				object[key] = arg(context[key], res[key]);

			// 如果是一个简单对象，则直接赋值
			} else {
				object[key] = context[key];
			}
		});
		return object;
	};

	// 糅合属性方法
	kit.mixin = function() {

		var total,
			flag,
			result,
			i = 0,
			temporary = {},
			length = arguments.length;

		// 如果第一个是状态码，把total换到arg[1];
		if (typeof arguments[i] === "boolean") {
		 	flag = arguments[i];
		 	i++;
		}

		// 这里增加了数组处理，暂时还不清楚函数体如何进行复制。
		// total = arguments[i];
		result = arguments[i];

		// i 当前参数下标
		// length参数长度
		for (; i < length; i++) {

			// 当前被拷贝的对象
			total = arguments[i];

			// 深度克隆
			if (flag === true) {

				temporary = _recursive(total, result);

				// 得到temporary后进行浅复制
				kit.forEach(temporary, function(value, key) {
					result[key] = value;
				});

			// 浅复制
			} else {

				kit.forEach(total, function(value, key) {
					result[key] = value;
				});
			}
		}
		return result;
	};

	kit.query = function(id) {
		return document.querySelector(id);
	};

	kit.querys = function(class1) {
		return document.querySelectorAll(class1);
	};

	/**
	 * 1.对象键值对的改写，赋值
	 * data = {
			object: {
				title:123,
				title1:456
			},
			in: ["title","title1"],
			out: ["name","name1"]
		}
		=》 {title: 123, title1: 456, name: 123, name1: 456}
		
		2.数组模式
		data = {
			context: [{
				title:123,
				title1:456
			},{
				title:777,
				title1:456 
			}],
			in: ["title","title1"],
			out: ["name","name1"]
		}
		=》
		[{title: 123, title1: 456, name: 123, name1: 456},
		{title: 777, title1: 456, name: 777, name1: 456}]
	 * @param {*} data 
	 */
	function changeKeyNames(data) {
        if (!data.context.length) {
            data.in.forEach(function(value,key) {                
                data.context[data.out[key]] = data.context[value];
            })
        } else {
            data.context.forEach(function(item) {
                data.in.forEach(function(value,key) {                
                item[data.out[key]] = item[value];
            })
            })
            
        }
		return data.context
	}

	// 判断是否在小程序端
    kit.inWxWebView = function()  {
        var flag = !!(navigator.userAgent.match(/micromessenger/i) && navigator.userAgent.match(/miniprogram/i) || window.__wxjs_environment === 'miniprogram');

        return flag;
    };

	/**
	 * 判断手机平台
	 * iphone(ipad)
	 * gphone
	 * wechat
	 * @这个准备停止维护
	 * @后续使用kit.platformType函数
	 */
    kit.mobileType = function () {
        var type;
        //获取语言
        var language = (navigator.browserLanguage || navigator.language).toLowerCase();
        // 区分函数
        var _dist = function() {
            // 获取版本号主要字段
            var methods = navigator.userAgent;
            
            // navigator.appVersion
            return {
                iPhone: methods.indexOf("iPhone") != -1 || methods.indexOf("Mac") != -1,
                iPad: methods.indexOf("iPad") != -1,
                wechat: kit.inWxWebView(),
            }
        };

        if  (_dist().wechat){
            type = "wechat";
        }else if (_dist().iPhone || _dist().iPad) {
            type = "iphone";
        } else {
            type = "gphone";
        }

        return type;
    };

	// tab切换逻辑块
	kit.tabToggle = function(elements, _class, fn, state) {
		$(document).on("click", elements, function() {
			var $this = $(this);
			var index = $(this).index();
			var data = $this.attr("tab-data");
			var flag = $this.hasClass(_class);

			if (state === true && flag === true) {
				return;
			}
			$(elements).removeClass(_class);
			$this.addClass(_class);
			fn(data, index);

		});
	};

	// 客户端用户id
	var CLIENT_USERID;
	kit.CLIENT_USERID = CLIENT_USERID = kit.cookie("userid");

	// 客户端版本号
	kit.CLIENT_VERSION = kit.cookie("version") ? kit.cookie("version").split(".").slice(-1)[0] : "";


	// px客户端埋点快捷方法
	kit.ta = function(param, type) {

		type = type || "mousedown";
		// 内部实现ta的方法
		function _ta(param) {
			if (kit.isObject(param)) {
				if (typeof $ === "function") {
					kit.forEach(param, function(value, key) {

						// 优化了dom对象是空数组或者是""的时候事件委托会在document触发
						if (value !== "" && value !== []) {
							$(document).on(type, value, function() {
								// 触发埋点方式
								TA.log({"id": key,"ld": "client","client_userid": CLIENT_USERID,"send_time": ""});
							});
						}

					});
				}
			} else if (kit.isArray(param)) {
				kit.forEach(param, function(value) {
					// 触发埋点方式
					TA.log({"id": value,"ld": "client","client_userid": CLIENT_USERID,"send_time": ""});
				});
			}
		}

		// 如果没有该脚本
		if (typeof TA === "undefined") {
			console.warn("未引入TA.js,正在动态加载标签");
			// 这个地址是固定的
			kit.addScript("/thsft/js/ta.min.js",function() {
				_ta(param);
			});
			return;
		}

		_ta(param);
	};

	// 手机端埋点
	// 移动端分为4种埋点
	// 页面显示埋点: hxmPageStat(id)
	// 非跳转点击埋点: hxmClickStat(id)
	// 跳转手炒网页: hxmJumpPageStat(id1, id2)
	// 跳转手炒客户端页: hxmJumpNativeStat(id1, id2)
	// 
	kit.ta_m = function(total) {

		var _doTa = function(fn) {
			// 如果是数组
			if (kit.isArray(total.para) === true) {
				kit.forEach(total.para, function(value) {
					fn(value);
				});
			// 如果是对象
			} else {
				kit.forEach(total.para, function(value, key) {
					if (key !== "" && key !== []) {
						$(document).on("click", key, function() {
							if (kit.isArray(value)) {
								fn(value[0], value[1]);
							} else {
								fn(value);
							}
						});
					}
				});
			}
		};

		switch (total.type) {
			case 1:
				// 1模式是页面显示埋点
				// 模式一如果传额外参数仍然只能传一个参数，无法扩展
				kit.forEach(total.para, function(value) {
					hxmPageStat(value);
				});
				break;

			case 2:
				// 2模式是非跳转点击埋点
				// 对象模式{".class": "id1"}
				// 模式2用于触发页面位置的埋点
				_doTa(function(value) {
					hxmClickStat(value, total.ext);
				});
				break;

			case 3:
				// 3模式是跳转手抄网页
				// 由于跳转可能会导致没触发，跳转，
				// 所以该事件委托要放在最先执行
				// {".class": ["id1", "id2"]}
				_doTa(function() {
					hxmJumpPageStat(arguments[0], arguments[1], total.ext);
				});
				break;

			case 4:
				// 模式4是跳转手炒客户端
				// 做法与3类同
				_doTa(function() {
					hxmJumpPageStat(arguments[0], arguments[1], total.ext);
				});
		}
	};

	// 单例模式，once的改进版
	kit.getSingle = function(fn) {
		var result;// 为了存储变量
		return function(){
			// 改变this指向
			// 通过arguments可以将未知的参数按照原样传入
			return result || (result = fn.apply(this, arguments));
		};
	};


	// 客户端匿名机制函数
	// 用户名加星号
	kit.encryptName = function(nameparam){
	     var name = nameparam.toString();
	     var length = name.length;
	     var retName = "";
	     switch(length){
	         case 1:
	             retName = name;
	             break;
	         case 2:
	             var nameArr = name.split("");
	             retName = nameArr[0]+'*';
	             break;
	         case 3:
	             var nameArr = name.split("");
	             retName = nameArr[0]+'*'+nameArr[length-1];
	             break;
	         case 4:
	             var nameArr = name.split("");
	             retName = nameArr[0]+'**'+nameArr[length-1];
	             break;
	         case 5:
	             var nameArr = name.split("");
	             retName = nameArr[0]+'***'+nameArr[length-1];
	             break;
	         default:
	             var nameArr = name.split("");
	             retName = name.substr(0,length-4)+'***'+nameArr[length-1];
	             break;
	     }

	    return retName;
	 };

	// 动态创建dom元素
	kit.addScript = function(url, callback) {
		// 创建dom元素
		var script = document.createElement("script");

		// 设置属性
		script.type = "text/javascript";
		script.src = url;

		// 此处参考seaJS中加载代码时所用的
		// ie8中这个就是false ，chrome中为true
		var supportOnload = "onload" in script;

		if (supportOnload) {
			script.onload = function() {

				// success code
				callback();
			};
		} else {
			script.onreadystatechange = function() {

				// IE8中这两个属性值会有两个阶段  1.loading   2.loaded 某些情况下是complete
				if(script.readyState === "loaded"|| script.readyState === "complete") {

					// success code
					callback();
				}
			};
		}

		document.body.appendChild(script);
	};

	// 克隆
	kit.clone = function (total) {
		var res = null;
		var flag = function() {
			return typeof(total) != "object" || total === null;
		};

		// 是不是简单类型
		if (flag(total)) {
			return total;
		}

		// 引用类型区分对象/数组
		if (total instanceof Object) {
			res = {};
			for (var i in total) {
				if (flag(total[i])) {
					return arguments.callee(total[i]);
				} else {
					res[i] = total[i];
				}
			}
		} else if (total instanceof Array) {
			res = [];
			for (var j = 0; j < total.length; j++) {
				if (flag(total[j])) {
					return arguments.callee(total[j]);
				} else {
					res[j] = total[j];
				}
			}
		}
		return res;
	}

	// 指定bind对象，原生bind
	kit.bind = function (context, fn) {

		var final = null;
		// 闭包保留内存context与fn
		if (kit.isFunction(fn)) {
			final = function() {
				return fn.apply(context, arguments);
			};
		} else {
			// 如果不是回调函数，直接返回fn
			final = fn;
		}

		return final;
	};

	// 数据模型，比如总参数，总配置，分段参数等
    // 如new一个
    // opts = new kit.Model({a:1,b:2});
	kit.Model = function(total) {
		if (this instanceof kit.Model) {
			this._options = total;
			// this._changeFunction = changeFunction;

		} else {
			return new kit.Model(total);
		}
	};

	// 模型的原型链方法
	kit.Model.prototype = {
		constructor: kit.Model,
		//有些情况下直接取值
		// 最原始的取值法
		self: function() {
			return this._options;
		},
		// 只有数据模型才具有的set,get方法
		get: function(key) {
			return this._options[key];
		},
		// 设置模型的值
		set: function(value) {

			var temporary = this._isChanged(this._options, value),
				final = kit.mixin(true, this._options, value);

			if (temporary === false) {
				this.change(final);
			}
			return final;
		},
		// 触发变动
		change: function(final) {
			// console.log("mode发生了变动");
			// console.log(final);
		},
		// 判断参数(obj/arr)覆盖原值后原值是否改变
		_isChanged: function (total, add) {
			return kit(add).some(function(value, key) {
				return value == total[key];
			});
		}
	};

	// 控制器
	// 将this强制绑定到控制器本身，用于this调用
	// 暂时只用于单纯的放下业务逻辑
	kit.Controller = function(fn) {
		if (this instanceof kit.Controller) {

			// 控制器遍历将this指向变更
			var controlEach = kit.bind(this, function(value, key) {

				// 将绑定到dom的this指向改变
				this[key] = kit.bind(this, value);

				// 不改变dom的this指向
				// this[key] = value;
			});

			kit.forEach(fn, controlEach);
			// this.fn = fn;
		} else {
			return new kit.Controller(fn);
		}
	};

	kit.Controller.prototype = {
		constructor: kit.Controller,
		// 回调队列
		// 回调列队使用方法
		subscribe: function(parameter) {
			var callback = parameter.callback,
				queue = parameter.queue,
				callbackArray = [],
				bindFn = kit.bind(this,function(value) {
					if (kit.isFunction(this[value])) {
						callbackArray.push(this[value]);
					} else {
						this.myLog(value);
					}
				});

			// 集成callback
			kit.forEach(callback, bindFn);

			// 触发列队
			this.deliver(callbackArray, queue);
		},
		myLog: function(value) {
			console.info("callback:" + value + " is not a function");
		},
		// 触发列队
		deliver: function(callArr, queue) {

			var bindFn = kit.bind(this, function(value, key) {
				if (kit.isFunction(this[key])) {
					this[key].apply(null, value);
				} else {
					this.myLog(key);
				}
			});

			// 触发普通列队
			kit.forEach(callArr, function(fn) {
				fn();
			});

			// 触发带参数的列队
			// 集成queueArray
			kit.forEach(queue, bindFn);
		}
	};

	// 通过视图绑定页面事件,是Model与Controller的载体
	// kit.View({
	// 	current: document,
	//  control: control,
	// 	events:{
	// 		"div": "click fn1", // 当心"aa bb "这种情况trim去除
	// 		".bbb": "change fn2",
	//		"#ccc": "fn3"
	// 	}
	// });
	kit.View = function(total) {

		if (this instanceof kit.View) {

			// 事件代理总对象
			this._current = total.current || document;

			// 控制器函数指向，control用于内部调用
			// this._Controller = this.control = total.control;

			// 事件绑定函数
			this._eventsFunction = total.eventsFunction;

			// 触发事件绑定
			this.bindEvent(total.events);

			// 触发初始化事件
			total.initialize();
		} else {
			return new kit.View(total);
		}
	};

	// 视图原型方法
	kit.View.prototype = {
		constructor: kit.View,
		bindEvent: function(events) {
			// var _this = this;
			var callback = function(value, key) {

				// 去除两边空格，并拆分
				var eventType = "",
					fn = null,
					arr = kit.splitSpace(kit.trim(value));

				if (arr.length === 1) {
					eventType = "click";
					fn = arr[0];
				} else if (arr.length >= 2) {
					eventType = arr[0];
					fn = arr[1];
				}

				// 处理事件函数不存在的情况，jq给的提示不明显
				if (this._eventsFunction[fn] === undefined) {
					throw Error(fn + "函数不存在");
				}

				$(this._current).on(eventType, key, this._eventsFunction[fn]);
			};

			callback = kit.bind(this, callback);
			kit.each(events, callback);
		}
	};

	// 全局路由值存放
	var _route;
	
	// 监听路由变化
	kit.route = function(callback, array) {

		var flag = kit.isFunction(callback);
		var flagArr = kit.isArray(array);

		// 如果参数是函数，则进行绑定
		if (flag) {
			root.onhashchange = function() {

				// hash值其实有没有#都一样，没有的话自动会补
				var hash = root.location.hash.substring(1);

				// 如果有第二个参数且为数组
				if (array !== undefined && flagArr) {
					if (array.indexOf(hash) !== -1) {

						_route = hash;

						// 防止一样的hash触发事件
						if (_route === hash) {
							return;
						}

						callback(hash);
					}
				} else {
					callback(hash);
				}
			};
		}
	};

	// // 初始化ajax步骤
	// // total{before:fn1,complete:fn2}
	// kit.ajaxInit = function(total) {

	// 	// 初始化aiax步骤
	// 	$.ajaxSetup({
	// 		dataType: "json",
	// 		beforeSend: function() {
	// 			if (kit.isFunction(total.before)) {
	// 				total.before();
	// 			}
	// 		},
	// 		type: "GET",
	// 		complete: function() {
	// 			if (kit.isFunction(total.complete)) {
	// 				total.complete();
	// 			}
	// 		},
	// 		error: function(xhr) {
	// 			console.warn("请求错误：errno=" + xhr.status + 
	// 						 ";statusText=" + xhr.statusText);
	// 		}
	// 	});
	// };

	// // 针对zepto中无ajaxSetup这个方法
	// // 添加一个已写的代码包装器ajax常量
	// // val = {beforeSend:fn1, complete:fn2};
	// kit.ajaxConstant = function(val) {

	// 	// var setupArray = ["beforeSend", "complete"];
	// 	var obj = {
	// 		dataType: "json",
	// 		type: "GET",
	// 		error: function(xhr) {
	// 			console.warn("请求错误：errno=" + xhr.status + 
	// 					";statusText=" + xhr.statusText);
	// 		}
	// 	};

	// 	if (kit.isObject(val) === false) {
	// 		val = {};
	// 	}
	// 	// kit.forEach(["beforeSend", "complete"], function(value, key) {
	// 	// 	if (key) {

	// 	// 	}
	// 	// });
	// 	kit.mixin(true, obj, val);

	// 	return function(add) {
	// 		var temp = kit.clone(obj);
	// 		kit.mixin(true, temp, add);
	// 		// 触发
	// 		$.ajax(temp);
	// 	};
	// };

	// 出现错误的时候执行的全局操作
	kit.error = function(fn) {
		window.onerror = function() {
			fn();
		};
	};

	// 渲染图表 echarts2
	kit.chartRender = function(total,option) {
		var proChart = null;
		
		if((typeof jQuery !=="undefined" && total instanceof jQuery) || 
			(typeof Zepto !=="undefined" && total instanceof Zepto) || 
			(typeof $ !=="undefined" && total instanceof $)) {
			total = total.get(0);
		}

		// this.barChart.dispose();
		// console.log(total,111)
		if (!total) {
			return;
		}
		// 这里需要原生dom节点
		proChart = echarts.init(total);
		
		// 没有这个重新渲染,没反应.
		proChart.dispose();
		proChart = echarts.init(total);
		//传入参数
		proChart.setOption(option, true);

		return proChart
	};

	// 判断对象属性数量// flag为true则除去原型链上的属性
	kit.propertyNumber = function(total, flag) {
		var number = 0;

			kit.forEach(total, function(value, key) {
				if (flag === true) {
					if (total.hasOwnProperty(key) === false){
						// no code
					} else {
						number++;
					}
				} else {
					number++;
				}
			});
		return number;
	};

	// 切换数据源，类似于虚拟dom

	kit.toggle = function(object) {
		var items = object.items;
		var el = object.el;
		var fn = object.fn;
		var _arr = [];
		var index = 0;// 当前下标
		var flag = object.isOwnProperty || false;
		var length = kit.propertyNumber(items, flag);
		var type = object.type || "click";


		kit.forEach(items, function(value, key) {
			_arr.push(key);
		});
		$(document).on(type, el, function(event) {
			fn(items[_arr[index++]], event);
			if (index === length) {
				index = 0;
			}
		});

	};

	// setTimeout(fn,0)// 可以排到队列的最后面，可以防止与route的改变冲突
	kit.timeFinal = function(total, fn) {
		var _setTimeout = kit.bind(total, fn);
		// 把该运行代码放到底部执行
		setTimeout(_setTimeout, 0);
	};

	// 是否满足请求返回格式的状态函数记得补0
	// 传入对象
	// var obj = {
	// 	   response: resp,// 数据源
	// 	   haveData: fn1,// 存在数据,存在数据要分两种情况
	//     // 部分无数据与全部有数据
	// 	   noData:fn2// 不存在数据
	// }
	kit.triggerSuccess = function(receive) {
		var respText = "",
			resp = receive.response,
			noData = receive.noData,
			haveData = receive.haveData;

		// 第一步，确定返回格式是对象，防止返回是乱码的情况
		if (kit.isObject(resp)) {
			respText = "response is object;";

			// 第二步，判断是否存在数据
			if (resp.errno === 0) {

				// 存在数据
				respText += "existence data;";
				console.info(respText);
				haveData(resp.data);

			// 如果存在errno(防止resp是个空对象)，且错误码不为0
			} else if (resp.errno && resp.errno !== 0) {

				// 不存在数据
				respText += "no data;";
				console.info(respText);
				noData();
			}
		} else {

			// 返回不为对象,可能是乱码
			respText = "response is'not object;";
			console.warn(respText);
		}
	};

	kit.triggerSuccessEvun = function(receive) {
		var respText = "",
			resp = receive.response,
			noData = receive.noData,
			haveData = receive.haveData;

		// 第一步，确定返回格式是对象，防止返回是乱码的情况
		if (kit.isObject(resp)) {
			respText = "response is object;";

			// 第二步，判断是否存在数据
			if (resp.returnCode === "0") {

				// 存在数据
				respText += "existence data;";
				console.info(respText);
				haveData(resp.data);

			// 如果存在returnCode(防止resp是个空对象)，且错误码不为0
			} else if (("returnCode" in resp) && resp.returnCode !== "0") {

				// 不存在数据
				respText += "no data;";
				console.info(respText);
				noData();
			}
		} else {

			// 返回不为对象,可能是乱码
			respText = "response is'not object;";
			console.warn(respText);
		}
	};

	// 是否登录var flag = kit.signState();// 返回用户名
	// kit.signState(true)// 验证是否登录，登录则不执行代码，还没登录则弹登录框;
	kit.signState = function(flag) {

		// account的值为 0 或者 一个用户名
		var account = getAccount();

		// 如果有true 且 没有用户名
		if (flag && account === 0) {
			// 注意：这个协议要指定为http://
			// 弹登录框
			window.location.href = "http://eqhexin/changeUser";
		} else {
			// 如果没有flag则返回用户名
			return account;
		}
	};

	// 节流
	kit.throttle = function(callback, time) {
		var fn = callback;

		return function() {
			if (fn) {
				// 保持this指向与参数的正常传递
				fn.apply(this, arguments);

				// 清空回调
				fn = null;

				setTimeout(function () {
					fn = callback;
				}, time || 1000);
			}
		};
	};

	// 绑定一个倒计时
	// time为秒数
	kit.countDown = function(time, fn) {
		var _time = time;
		setInterval(function() {
			time--;
			var nowTime = time;
			fn(nowTime, time);
		}, 1000);

		return function() {
			time = _time;
		};
	};

	// 加减日期函数
	// 没传分割符号默认是“-”
	kit.timeHandle = function(inputTime, value, symbol) {
		var year = "",
			month = "",
			day = "",
			totalTime = null;

		symbol = (symbol === undefined ? "-" : symbol);
		// 格式化输入日期
		inputTime = new Date(inputTime);
		
		// 得到目标日期
		totalTime = (inputTime).setDate(inputTime.getDate() + value);
		totalTime = new Date(totalTime);

		// 为月与日补0，凑成两位
		year = totalTime.getFullYear();// getYear已经不推荐使用了
		month = totalTime.getMonth() + 1;// getMonth是从0月开始计数的
		day = totalTime.getDate();

		// 给日月补0
		if (month < 10) {
			month = "0" + month; 
		}
		if (day < 10) {
			day = "0" + day;
		}

		// 拼接日期，我这边只做了年月日处理
		totalTime = year + symbol +
					month + symbol + 
					day;

		return totalTime;
	};

	// 客户端跳转OnClientCmd接口，动态引入api.js
	// 在65上加载貌似是55ms还是比较快的
	kit.clientCmd = function(toClient) {
		if (root.API === undefined) {
			kit.addScript("/thsft/js/api/api.js",function() {
				root.API.OnClientCmd(toClient);
			});
			return;
		} else {
			root.API.OnClientCmd(toClient);
		}
	};

	// 简单的promise包装器
	kit.Promise = function() {

		if (!(this instanceof kit.Promise)) {
			return new kit.Promise();
		}
		//订阅列表
		this.subscribeList = [];

	};

	kit.Promise.prototype = {
		constructor: kit.Promise,
		// 订阅
		subscribe: function(fn) {
			this.subscribeList.push(fn);
			return this;
		},
		// 等待执行的函数
		when: function(fn) {
			// 加定时器可以放在队列尾部
			kit.timeFinal(this, fn);
			
			return this;
		},
		// 触发事件执行
		deliver: function() {
			// this都指向Promise实例
			var _forEach = kit.bind(this, function(value) {
				value();
			});

			kit.forEach(this.subscribeList, _forEach);
		}
	};

	// 简易模板
	kit.template = function(str, value, symbol) {
		
		// 总模板数据
		var html = "";

		// 内部循环渲染对象属性方法
		var _each = function(value, temp) {
			// 循环对象数据
			kit.forEach(value, function(value, key){
				var reg = new RegExp("{{" + key + "}}", 'ig');
				if (!value) {
					value = symbol || "";
				}
				temp = temp.replace(reg, value);
			});
			return temp;
		};

		if (kit.isObject(value) === true) {
			html += _each(value, str);
		} else if (kit.isArray(value) === true) {
			// 循环数组
			kit.forEach(value, function(value) {
				var temp = str;
				html += _each(value, temp);
			})
		} else {
			console.info("please input array or object");
		}
		return html;
	};

	// 初始化客户端字体 kit.initFontSize
	kit.initFontSize = function(size) {

		// 判断手机型号iphone或gphone
		var model = getPlatform();
		var def = size || 1;

		// 此命令只需要安卓起作用
		if (model == "gphone") {
			callNativeHandler(
			    'webViewFontController',

			    // 1为默认字体，小字体设0
			    '{"fontsize":"' + def + '", "switch":"0"}',
			    function(data) {
			    	// somecode
			    }
			);
		}
	};

	// 启用underscore 启用Mustache.js类型模板
	kit.underToMustache = function() {

		// 设置Mustache.js类型的模板语法
		// 这句话需要写在_.template()方法之前
		_.templateSettings = {
		  interpolate: /\{\{=([\s\S]+?)\}\}/g,
		  evaluate: /\{\{([\s\S]+?)\}\}/g,
		  escape: /\{\{-([\s\S]+?)\}\}/g
		};
	};

	// 通过undescore模板渲染页面
	// kit.tempRender("<a>234234234<%=a%></a>", document.body,{a:"aaa"})
	kit.tempRender = function(template, total, data, type) {

		template = _.template(template);

		var compiled = template(data);
		if (total instanceof jQuery || total instanceof Zepto) {
			total[type || "html"](compiled);
		} else {
			total.innerHTML = compiled;
		}
	};

	// 冒泡排序法对数组进行排序
	// 第一个参数如果是"asc"则是正序从小到大(默认)
	// 如果是"desc",则倒叙，从大到小
	//arr = [85, 24, 63, 45, 17, 31, 96, 50];
	kit.sort = function() {

		// 冒泡排序法排序
		var temp,
			flag = false,// 是否交换过
			state = false,// 是否需要倒序
			argue = arguments[0],
			arr,
			length;// 7
			// 因为排序次数只要比数组长度少一次
			// 外层循环只要排长度 - 1即可，

		if (typeof argue === "string") {

			// switch用的是严格等
			switch (argue) {
				case "asc":
					state = false;
					break;
				case "desc":
					state = true;
					break;
				default:
					throw "请传入正确的排序方式'asc'或'desc'";
			}

			arr = arguments[1];
		} else {
			arr = argue;
		}

		length = arr.length - 1;

		// 每一次排序都会在数组的顶部出现一个符合要求的数组成员
		for (var i = 0; i < length ; i++) {
			
			// 内层循环
			// 最上面的元素可以通过i除去排序
			// 也就是说已经排好的不需要再排了
			for(var j = 0; j < length - i; j++) {
				if (arr[j] > arr[j + 1]) {
					temp = arr[j + 1];
					arr[j + 1] = arr[j];
					arr[j] = temp;

					// 如果该论循环已经发生了交换
					flag = true;
				}
			}

			// 如果当前排序已经没有变化，则直接退出循环
			if(flag === false) {
				break;
			}
		}

		if(state === true) {
			arr = arr.reverse();
		}

		return arr;
	};

	// 使用二分法查找数组中的指定的项
	kit.binarySearch = function(arr, total) {

	    var index = 0;

	    function _wrap(arr, total) {
	        var length = arr.length;
	        var midIndex = Math.floor(length/2);

	        if (length <= 1) {
	            if (arr[0] == total) {
	                return {
	                    index: index,
	                    total: total
	                };
	            }
	            return "no this item";

	        } else {
	            if (arr[midIndex] > total) {

	                return arguments.callee(arr.slice(0, midIndex), total);
	            } else if (arr[midIndex] < total){
	                index +=midIndex;
	                return arguments.callee(arr.slice(midIndex), total);
	            } else {
	                index += midIndex;
	                return {
	                    index: index,
	                    total: total
	                };
	            }
	        }
	    }

	    return _wrap(arr, total);
	};

	// 内部对挂载的方法按名称进行排序
	kit.method = function(fn) {

		var names = [];
		kit.forEach(fn, function(fn, name) {
			if(kit.isFunction(fn)) {
				names.push(name);
			}
		});

		return names.sort();
	};

	// 调用客户端下载框 kit.clientDown("abc", "/thsft/Istrategy/abc.pdf", ".xls");
	// type可选，如果url能够取到地址串，则不会被type覆盖，
	// 如果地址串后面的url没有解析出类型，则会被type覆盖
	kit.clientDown = function(name, url, type) {

		// replace不适合截取
		var typeArray = url.match(/\.(\w{2,4})?$/g);
		
		type = typeArray ? typeArray[0] : null || type;

		// 注意这里一定要有type,不然导致整个页面链接改变
		var href = "ifind://!command=down&valuectrl=1&filename=" + name + type + 
				   "&url=http://" + host + url;

		root.location.href = href;
	};

	// 序列化jq生成的表单数组
	kit.serizeArrForm = function(arr) {
	    var total = {};

	    kit.forEach(arr, function(value, key) {
	        total[arr[key].name] = arr[key].value;
	    });
	    return total;
	};

	// 执行一次的函数包装器
	kit.once = function(fn) {
		var totalFn = fn;
		if (kit.isFunction(totalFn) === false) {
			throw "请传入函数方法";
		}
		return function() {
			if (kit.isFunction(totalFn)) {
				totalFn();
				totalFn = null;
			}
		};
	};

	// 数组拆分函数
	kit.arrayGroup = function (arr,number) {
		var oldArray = arr;
		var newArray = [];
		
		var level = (arr.length / number);
		for (var i=0; i < level; i++) {
			newArray.push(oldArray.slice(i * number, (i + 1) * number));
		}
	
		return newArray;
	};

	// 将对象转成请求参数字符串
	kit.objToSearch = function(obj) {
		var str = "?";
		kit.forEach(obj, function(value, key) {
			str += (key + "=" + value + "&");
		});

		return str.slice(0, -1);
	}
	
	/**
	 * 判断平台是PC还是移动端
	 * pc
	 * mobile
	 * @这个准备停止维护
	 * @后续使用kit.platformType函数
	 */
	 kit.platformType = function () {
        var type;
        //获取语言

        //平台、设备和操作系统
        // var system = [
        //     {name :"pc",  verify:false},
        //     {name :"mobild",  verify:false},
        // ];


		// var p = navigator.userAgent;
            
        //     // navigator.appVersion
		// 	var pc = 
        //         	(
		// 				//
		// 				navigator.userAgent.indexOf("Win") !== -1 || 
		// 				// "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
		// 				navigator.userAgent.indexOf("Mac") !== -1 || 
		// 				navigator.userAgent.indexOf("X11") !== -1 
		// 				// navigator.userAgent.indexOf("Linux") !== -1 
		// 			);

		var ua = navigator.userAgent.toLowerCase();
		if (/mobi/i.test(ua)) {
			

			// 手机浏览器
			type="mobile"
		} else {
			// 非手机浏览器
			type="pc"
		}
       
		// var output = kit._.find(system, function(num) {
		// 	return num.pc = true;
		// })
		
		// if (pc) {
		// 	type="pc"
		// } else {
		// 	type="mobile"
		// }
		

        return type;
    };

	







/************************************************************************************************

********                  分割线   后面为继承  方法添加写在上方        ********************************

************************************************************************************************/ 








	// 为了能使用OOP形式的调用，将kit的所有方法挂载到原型
	// 去除不是function类型的。
	// 用于添加自定义方法，此方法放到最后执行
	/*
		// 用法
		kit.extend({
			"kelichao":function() {
				console.log("name");
			}
		})
	*/
	// kit.extend( [deep ], target, object1 [, objectN ] )...
	kit.extend = kit.fn.extend = function() {

		var length = arguments.length,
			i = 1,
			target = arguments[0] || {},
			// 参考了underscore
			// 得到排序后的所有方法名数组
			sortFuncName = kit.method(target);

		// 如果第一个参数是布尔状态,就把对象切到第二个参数
		if (typeof target === "boolean") {
			target = arguments[1] || {};
			i++;
		}

		// 如果目标对象不是对象或者函数，则返回空对象
		if (!(kit.isObject(target) === true || kit.isFunction(target) === true)) {
			target = {};
		}

		if (length === 1) {
			kit.forEach(sortFuncName, function(value) {

				// 1.挂载到对象名下
				// 2.挂载到原型链上
				// 3.先保存下当前函数地址(后面用于wrapped)
				var func = kit[value] = target[value];

				// 如果这个方法是之前绑定在原型上的，
				// 那么不做覆盖处理,例如kit.fn.extend
				if (kit.isUndefined(fn[value]) === false) {
					return ;
				}

				// OOP调用,对方法内部传入参数进行修改
				// 否则一般写法为 fn[value] = func;
				fn[value] = function() {

					// 第一个参数
					// 由于这里调用点是kit的实例对象
					// this是当前的kit实例对象
					var args = [this._wrapped];

					// arguments 为 name 方法需要的其他参数
					// 用arguments拿参数的好处是不需要制定形参名
					// 通过apply调用可以一次性传入多个数组
					// 不管有几个参数，我都可以拿到。
					// 执行后args组成一个新数组，包含agruments
					// 把第一个参数改为实例对象
					// 这个push方式相比传统的push，可以一次性传入多个数组值
					push.apply(args, arguments);

					// 将this指向kit ,传入改造后的参数组
					return func.apply(kit, args);
				}
			});
		} else {
			// 暂无处理
		}

	};

	kit.extend(kit);

	// 兼容 AMD 规范
	if (typeof define === 'function' && define.amd) {

		// 要求是define包裹，然后返回整个key对象即可
	    define('kit', [], function() {
	        return kit;
	    });
	}

	// 兼容CMD规范
	// 需要在文件底部注册CMD规范，以underscore为例
	if(typeof define === "function" && define.cmd) {
	  define(function() {
	    return kit;
	  });
	}
	
	window.proKit = kit;
}.call(this));


// kit.Module 的getter,setter方法

// 滑动到底部触发的事件，滑动到某个元素的高度触发事件
