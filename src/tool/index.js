import './private/common.css';
import {kit} from "./private/kit"
import ajax from "./private/ajax"
import jquery from "./public/jquery"
// var jquery = require("@/public/jquery")
// import jquery from "jquery"
var content= require("./public/underscore")

// console.log(_,1111)
// console.log(kit)

kit._ = content._;
kit.$ = window.jQuery;
kit.ajax = ajax;
window.kit = kit;
window._ = content._;
window.$ = window.jQuery;
