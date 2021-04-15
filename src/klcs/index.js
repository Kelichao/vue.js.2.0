import './private/common.css';
import {kit} from "./private/kit"
import {_} from "./public/underscore"
import ajax from "./private/ajax"
import $   from "./public/jquery"
// var a = require ("./public/jquery")
// var jquery = require("@/public/jquery")
// import jquery from "jquery"
// require("./public/underscore")

// console.log($)
// console.log(a)

kit._ = _;
kit.$ = $;
kit.ajax = ajax;

export default kit