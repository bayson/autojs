/**
* @fileOverview API接口文件
* @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
* @author <a href=”tuple@youshui.ren”>Tuple</a>
* @version 0.1
*/

var Env = require('../env')
var Sms = require('./sms')
var Utils = require('./utils')

var api={
  
  /**
   * 获取一个全局的配置文件
   */
  getConfig:function() {
    try {
        // toast('开始获取配置');
        let c = Env.curName;
        let r = http.get("http://api.tfjym.com/ai/chat/config?f="+Env.CLIENT+"&n=" + encodeURIComponent(c) + "&t=" + new Date().getTime() + "&d=" + device.getIMEI() + "&v=" + Env.VERSION);
        let body = r.body.string();
        // toast('get config ok');
        if (!!body) {
            let conf = JSON.parse(body);
            if (conf) {
                if (!conf.disabled) {
                  Env.config = conf;
                }
                Env.token = !!Env.config.token ? Env.config.token : Env.token;
                Env.itemJihuo = !!Env.config.itemJihuo ? Env.config.itemJihuo : Env.itemJihuo;
                Env.itemLogin = !!Env.config.itemLogin ? Env.config.itemLogin : Env.itemLogin;
                Env.itemRegister = !!Env.config.itemRegister ? Env.config.itemRegister : Env.itemRegister;
                Env.exceptPhone = !!Env.config.exceptPhone ? Env.config.exceptPhone : Env.exceptPhone;          
                Env.canReply = Env.config.canReplyDisabled ? Env.canReply : Env.config.canReply;
                Env.config.debug ? console.show() : console.hide();
            }
        }
        return body;
    } catch (e) {
        // console.log(JSON.stringify(e));
    }
  },

  /**
  * 获取关键字
  */
 getKeyword:function () {
    // console.log('get reply msg');
    try {
        let r = http.get("http://api.tfjym.com/ai/chat/keyword?f="+Env.CLIENT+"&n=" + encodeURIComponent(Env.curName) + "&t=" + new Date().getTime() + "&d=" + device.getIMEI() + "&v=" + Env.VERSION);
        let body = r.body.string();
        // console.log('reply msg:' + body);
        if (!!body) {
            // let conf = JSON.parse(body);
            // if (conf) {
            //     Env.curKeywords = conf;
            // }
            Env.curKeyword = body;
        }
        return body;
    } catch (e) {
        Env.curKeyword = null;
    }

  },

  /**
  * 获取评论内容
  * @param {*} msg 
  */
 getReplyMsg:function(msg) {
    // console.log('get reply msg');
    try {
        let c = !!msg ? msg : Env.curTitleContent.substr(0, 255);
        let r = http.get("http://api.tfjym.com/ai/chat/reply?f="+Env.CLIENT+"&c=" + encodeURIComponent(c) + "&t=" + new Date().getTime() + "&d=" + device.getIMEI() + "&v=" + Env.VERSION);
        let body = r.body.string();
        // console.log('reply msg:' + body);
        Env.curComment = body;
        return body;
    } catch (e) {
        Env.curComment = null;
    }

  },

  getComment:function(){
      return this.postReplyMsg();
  },

  getLoginPhone:function(){
      return Sms.getPhone(Env.itemLogin);
  },


  getActivePhone:function(){
    return Sms.getPhone(Env.itemJihuo);
  },


  getLoginCode:function(){
    return Sms.getSMS(Env.curPhone,Env.itemLogin);
  },

  getHotTextItem:function(){
    let groupItems = ['推荐', '榜单', '社会', '搞笑', '情感', '时尚', '校园', '摄影', '艺术', '明星', '美女', 'NBA'];
    if (Env.config && Env.config.groupItems && Env.config.groupItems.length > 0) {
        groupItems = Env.config.groupItems;
        // toast('use Env.config group items');
    }

    Env.curGroupId = 0;
    let subGroup = random(0, groupItems.length - 1);
    if (Env.config && Env.config.subGroupId > -1) {
        subGroup = Env.config.subGroupId;
    }
    Env.curHotTextItem = groupItems[subGroup];
    // console.log('get hot text item api:',Env.curHotTextItem);
    return groupItems[subGroup];
    // return "国学";
  },

  getGivenWeiboTitle:function(){
    // return "35岁检察官带人上门打70岁空巢老人 相关部门否认寻衅滋事？ 官官相护";
    return "青凌巴山越岭";
  },

  /**
  * 获取评论内容
  * @param {*} msg 
  */
 postReplyMsg:function(msg) {
    let url = "http://api.tfjym.com/ai/chat/reply";
    r = http.postJson(url, {
        n: Env.curName,
        c: !!msg ? msg : Env.curTitleContent,
        d: device.getIMEI(),
        t: new Date().getTime(),
        v: Env.VERSION,
        f: Env.CLIENT,
    });
    let body = r.body.string();
    // toast(body);
    Env.curComment = body;
    return body;
  },

  /**
  * 获取评论内容
  * @param {*} msg 
  */
 postUpdateStatus:function(status) {
    let url = "http://api.tfjym.com/ai/chat/status";
    r = http.postJson(url, {
        n: Env.curName,
        s: status,
        d: device.getIMEI(),
        t: new Date().getTime(),
        v: Env.VERSION,
        f: Env.CLIENT,
    });
    let body = r.body.string();
    // toast(body);
    Env.curComment = body;
    return body;
  },

  getTuling:function(msg) {
    let url = "http://www.tuling123.com/openapi/api";
    r = http.postJson(url, {
        key: "65458a5df537443b89b31f1c03202a80",
        info: "你好啊",
        userid: "1",
    });
    let body = r.body.string();
    toast(body);
    Env.curComment = body;
    return body;
  },

  loginOk:function(phone, name, type,msg) {
    try {
      let c = name;
      let r = http.get("http://api.tfjym.com/ai/chat/loginok?f="+Env.CLIENT+"&n=" + encodeURIComponent(c) +"&msg=" + encodeURIComponent(msg)
      + "&t=" + new Date().getTime() + "&d=" + device.getIMEI() + "&p=" + phone + "&tp=" + type);
      let body = r.body.string();
      // toast(body);
      // config = body;
      // console.log('login ok back:' + body);
      return body;
    } catch (e) {

    }
  },
  /**
   * 获取手机号的激活码
   */
  getCode:function(phone){
    try {
      phone = !!phone ? phone : Env.curPhone
      let c = name;
      let r = http.get("http://api.tfjym.com/ai/chat/phone/code?f="+Env.CLIENT+"&n=" + encodeURIComponent(c) + "&t=" + new Date().getTime() + "&d=" + device.getIMEI() + "&p=" + phone );
      let body = r.body.string();
      return body;
    } catch (e) {

    }
  },

  getRegisterPhone: function () {
    return Sms.getPhone(Env.itemRegister);
  },

  getRegisterCode: function () {
    return Sms.getSMS(Env.curPhone, Env.itemRegister);
  },

  getRegisterSendCode: function () {
    return Sms.sendSMS(Env.curPhone, Env.itemRegister, '注册验证');
  },

  getRegisterName: function () {
    try {
      let c = Env.curName;
      let r = http.get("http://api.tfjym.com/ai/chat/username?f="+Env.CLIENT+"&n=" + encodeURIComponent(c) 
      + "&t=" + new Date().getTime() + "&d=" + device.getIMEI() + "&p=" + Env.curPhone );
      let body = r.body.string();
      Env.curUsername = body;
      Env.curName = body;
      return body;
    } catch (e) {

    }
  },

  getRegisterPassword: function () {
    try {
      let c = Env.curName;
      let r = http.get("http://api.tfjym.com/ai/chat/password?f="+Env.CLIENT+"&n=" + encodeURIComponent(c) 
      + "&t=" + new Date().getTime() + "&d=" + device.getIMEI() + "&p=" + Env.curPhone );
      let body = r.body.string();
      return Utils.isNull(body) ? Env.curDefaultPassword : body;
    } catch (e) {

    }
  },

  getRegisterOk: function (){
    let msg = {username:Env.curUsername,name:Env.curName,phone:Env.curPhone,item:Env.itemRegister,client:Env.CLIENT};
    console.log('register ok:',msg)
    return this.loginOk(Env.curPhone,Env.curName,'register',JSON.stringify(msg));
  },

  getLoginName: function(){
      let phones = Env.curPHoneList;      
      return random(0, phones.length - 1);
  },

  getLoginPassword: function(){
     return '123456';
  },

  finish: function (){
    let msg = {username:Env.curUsername,name:Env.curName,phone:Env.curPhone,item:Env.itemRegister,client:Env.CLIENT};
    console.log('register ok:',msg)
    return this.loginOk(Env.curPhone,Env.curName,'register',JSON.stringify(msg));
  },

  getWeiboAccount: function () {
    try {
      let c = Env.curName;
      let r = http.get("http://api.tfjym.com/ai/weibo/account?f="+Env.CLIENT+"&n=" + encodeURIComponent(c) 
      + "&t=" + new Date().getTime() + "&d=" + device.getIMEI() + "&s=0" );
      let body = r.body.string();
      Env.curUsername = body;
      Env.curName = body;
      console.log('getWeiboAccount:', Env.curUsername);
      return body;
    } catch (e) {

    }
  },

  getWeiboPassword: function () {
    try {
      let c = Env.curName;
      let r = http.get("http://api.tfjym.com/ai/weibo/password?f="+Env.CLIENT+"&n=" + encodeURIComponent(c) 
      + "&t=" + new Date().getTime() + "&d=" + device.getIMEI() + "&p=" + Env.curPhone );
      let body = r.body.string();
      console.log('getWeiboPassword phone:', Env.curPhone, ' pwd:', body);
      return Utils.isNull(body) ? Env.curDefaultPassword : body;
    } catch (e) {

    }
  },
  
}
module.exports=api
