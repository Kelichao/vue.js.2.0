function longlat(rule, value, callback) {
    try {
        if(!value || value.length === 0) callback(new Error('经纬度必填！'))
        for(let index = 0; index < value.length; index++){
            let element = value[index]
            if(element === '' || !element){
                callback(new Error('经纬度必填！'))
            }
            //数字格式
            //纬度-180～180 /^-?((([1-9]\d?|1[0-7]\d)(\.\d{1,5})?)|180)$/
            //经度-90～90  ^-?(([0-8]\d?(\.\d{1,5})?)|90)$
            //最多可输入5位小数
            //度分秒格式 经度时：时[0,180],分秒[0.60) 纬度时：时[0,90],分秒[0.60)
            //经度 ^[EW]?(((1[0-7])?|[1-9])?[0-9]°)($|(([1-5]?[0-9]')($|(([1-5]?[0-9]")$))))|(^180°$)
            //纬度 ^[NS]?(((1[0-7])?|[1-9])?[0-9]°)($|(([1-5]?[0-9]')($|(([1-5]?[0-9]")$))))|(^90°$)
        }
        if(/^-?((([1-9]\d?|1[0-7]\d)(\.\d{1,5})?)|180)$/.test(value[0])){
            //callback()
            if(!/^-?(([0-8]\d?(\.\d{1,5})?)|90)$/.test(value[1])){
                callback( new Error(`纬度请输入-90～90的数字类型！`))
            } 
        } else {
            callback( new Error(`经度请输入-180～180的数字类型！`))
        } 
    } catch(err) {
        callback(new Error('请输入有效的经纬度！'))
    }
    callback()
}
module.exports = {
    longlat
}