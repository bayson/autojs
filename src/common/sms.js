/**
* @fileOverview 短信指定接收，目前采用51短信平台
* @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
* @author <a href=”tuple@youshui.ren”>Tuple</a>
* @version 0.1
*/


var Env = require('../env');

var sms={
 
  _errorCode: {
    1001: '参数token不能为空',
    1002: '参数action不能为空',
    1003: '参数action错误',
    1004: 'token失效',
    1005: '用户名或密码错误',
    1006: '用户名不能为空',
    1007: '密码不能为空',
    1008: '账户余额不足',
    1009: '账户被禁用',
    1010: '参数错误',
    1011: '账户待审核',
    1012: '登录数达到上限',
    2001: '参数itemid不能为空',
    2002: '项目不存在',
    2003: '项目未启用',
    2004: '暂时没有可用的号码',
    2005: '获取号码数量已达到上限',
    2006: '参数mobile不能为空',
    2007: '号码已被释放',
    2008: '号码已离线',
    2009: '发送内容不能为空',
    2010: '号码正在使用中',
    3001: '尚未收到短信',
    3002: '等待发送',
    3003: '正在发送',
    3004: '发送失败',
    3005: '订单不存在',
    3006: '专属通道不存在',
    3007: '专属通道未启用',
    3008: '专属通道密码与项目不匹配',
    9001: '系统错误',
    9002: '系统异常',
    9003: '系统繁忙'
  },

  getPhone:function(itemid) {

      var baseUrl = 'http://api.fxhyd.cn/UserInterface.aspx?action=getmobile&token=' + Env.token + '&itemid=' + itemid + '&excludeno=' + Env.exceptPhone + '&timestamp=' + new Date().getTime() //
      var r = http.get(baseUrl);
      console.log("从平台获取手机号码code = " + r.statusCode);
      var result = r.body.string()
      console.log("从平台获取手机号码html = " + result);
      if (result.indexOf('success') != -1) {
        result = result.split('|');
        var phone = result[1]
        console.log('手机号码=', phone)
        return phone
      } else {
        console.log(this._errorCode[result])
        console.log('从平台获取手机号码异常,请检查网络或者token是否失效,脚本停止')
        return null;
      }
    },

    getSMS:function(phone, itemid) {
      var count = 50;
      var r = null;
      var result = null;
      var baseUrl = 'http://api.fxhyd.cn/UserInterface.aspx?action=getsms&token=' + Env.token + '&itemid=' + itemid + '&mobile=' + phone + '&release=1&timestamp=' + new Date().getTime();
      while (count > 0) {
        r = http.get(baseUrl);
        console.log("从平台获取手机验证码code = " + r.statusCode);
        result = r.body.string();
        console.log("从平台获取手机验证码html = " + result);
        toast(result);
        if (result != 3001) {
          break;
        }
        count -= 1;
        sleep(3000);
      }
      if (!!result && result.indexOf('success') != -1) {
        result = result.split('|');
        var code = result[1].match(/\d{6}/g).join("");
        console.log('验证码=', code)
        return code
      } else {

        console.log(this._errorCode[result])
        console.log('从平台获取手机验证码异常,请检查网络或者token是否失效')
        return null
      }
    },

    sendSMS:function(phone, itemid, msg) {

      var baseUrl = 'http://api.fxhyd.cn/UserInterface.aspx?action=sendsms&token=' + Env.token + '&itemid=' + itemid + '&mobile=' + phone + '&sms=' + msg + '&timestamp=' + new Date().getTime();
      var r = http.get(baseUrl);
      console.log("从手机号码发送code = " + r.statusCode);
      var result = r.body.string();
      toast(result);
      console.log("从平台发送手机号码html = " + result);
      if (result.indexOf('success') != -1) {
        return result
      } else {
        console.log(this._errorCode[result])
        console.log('从平台发送短信异常,请检查网络或者Env.是否失效,脚本停止')
        return null
      }
    },

    addPhoneBack:function(phone, itemid) {
      var baseUrl = 'http://api.fxhyd.cn/UserInterface.aspx?action=addignore&token=' + Env.token + '&itemid=' + itemid + '&mobile=' + phone + '&timestamp=' + new Date().getTime() //
      var r = http.get(baseUrl);
      console.log("拉黑手机号码code = " + r.statusCode);
      var result = r.body.string()
      console.log("拉黑手机号码html = " + result);
      if (result.indexOf('success') != -1) {
        console.log('手机号码拉黑成功=', phone)
      } else {
        console.log(this._errorCode[result])
        console.log('拉黑手机号码异常,请检查网络或者token是否失效,脚本停止')
        return null;
      }
    }
}
module.exports=sms
