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

var Job = require('./jobs/weibo');
var Work = require('./common/work');

/**
 * 初始化并获取配置
 */
function init() {
  sleep(1000);
}


function main(){
  Work.init('com.sina.weibo');
  init();
  Work.main(Job);
}

//运行
main();



