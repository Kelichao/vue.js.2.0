import {kit} from "./kit"
import jquery from "./part/jquery"
// var jquery = require("@/part/jquery")
// import jquery from "jquery"
var content= require("./part/underscore")

// console.log(_,1111)

console.log(kit)


window.kit = kit;
window.kit._ = content._;
window._ = content._;
window.kit.$ = window.jQuery;
window.$ = window.jQuery;
