/**
* @fileOverview 工具函数类
* @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
* @author <a href=”tuple@youshui.ren”>Tuple</a>
* @version 0.1
*/

var Utils = {
    /**
     * 首字母大写
     * @param {*} str 
     */
    titleCase: function (str) {
        var a = str.toLowerCase().split('_');
        var b = a.map(function (val) { return val.replace(val.charAt(0), val.charAt(0).toUpperCase()) })
        return b.join('');
    },
    fill: function (len, item) {
        var l = [];
        for (var i = 0; i < len; i += 1) {
            l.push(JSON.parse(JSON.stringify(item)));
        }
        return l;
    },
    get: function (arr, name, value) {
        return arr.find(function (obj) { if (eval("obj." + name + " == value")) { return obj; } });
    },
    isNull: function (str) {
        //为空判断函数
        return !str && str !== 0 && typeof str !== "boolean" ? true : false;
    }

}
module.exports = Utils;