/**
* @fileOverview 入口文件
* @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
* 欢迎使用和提交bug反馈
* 设备要求：
* 1.需要root
* 2.安卓5.0以上
* 3.Auto.js软件版本4.0以上
*
* 使用方法：
* 1.将脚本与./dist/main.js放于同一目录下
* 2.直接启动脚本即可
* 3.暂时不支持解锁手机
*
* @author <a href=”tuple@youshui.ren”>Tuple</a>
* @version 0.1
*/


var Job = require('./jobs/mail.163.com-web');
var App = require('./app');

/**
 * 初始化并获取配置
 */
function init() {
  doHome();
  sleep(3000);
}

function doHome() {

  if (className("android.widget.TextView").text("首页").exists()
    && className("android.widget.TextView").text("我的").exists()) {
    //
    pageFirst();
    //
    pageSecond();
  }
}

function pageFirst() {
  toast("do first");
  className("android.widget.TextView").text("搜免费小说 影视 游戏 App").findOne().click();
  sleep(1000);
}

function pageSecond() {
  toast("do second");
  //通过搜索页,进入微博网页版
  // className("android.view.View").clickable(true).longClickable(true).findOne().setText("35岁检察官带人上门打70岁空巢老人");
  // className("android.view.View").clickable(true).longClickable(true).findOne().setText("微博");
  className("android.widget.TextView").text("取消").findOne().parent().children().forEach(child => {
    var target = child.findOne(className("android.view.View"));
    if (!!target) {
      toast('find search')
      Tap(target.bounds().centerX(), target.bounds().centerY());
      sleep(2000);
      var str = "mail.163.com";
      var strArray = str.split("")
      if (strArray.length > 0) {
        setText(strArray[0]);
      }
      for (var i = 1; i < strArray.length; i++) {
        var char = strArray[i];
        input(char);
        sleep(random(1000, 1500));
      }
      sleep(2000);
    }
  });
  // text("微博");
  sleep(1000);
  className("android.view.View").desc("mail.163.com").findOne().parent().click();
  sleep(2000);
}

function main(){
  App.init('com.tencent.mtt');
  init();
  App.main(Job);
}

main();