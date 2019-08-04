/**
* @fileOverview 入口文件
* @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
* @author <a href=”tuple@youshui.ren”>Tuple</a>
* @version 0.1
*/

var Env = require('./env');
var Api = require('./api');
var Utils = require('./utils');
var Operate = require('./operate');
var Job = require('./job');



let curPage = 0;
let curConf = null;
let pageList = [];
let curStep = 0;

/**
 * 主函数
 */
function main() {
  let items = {
    login:JSON.parse(JSON.stringify(Job.login)),
    nickname:JSON.parse(JSON.stringify(Job.nickname)),
    write:JSON.parse(JSON.stringify(Job.write)),
    logout:JSON.parse(JSON.stringify(Job.logout)),
  };
  //初始化
  init();
  while (true) {
    //判断下一步的位置
    nextStep();
    //执行操作
    switch (curStep) {
      case Job.STEP.LOGIN:
        console.log('login');
        run(items['login']);
        break;
      case Job.STEP.NICKNAME:
        console.log('nickname');
        run(items['nickname']);
        break;
      case Job.STEP.WRITE:
        console.log('write');
        run(items['write']);
        break;
      case Job.STEP.NEEDLOGOUT:
        console.log('logout');
        run(items['logout']);
        break;
      default:
        break;
    }
    sleep(3000);
  }


}

/**
 * 判断下一步执行什么
 */
function nextStep() {
  let conf = Operate.curPage(Job.pages);
  if (curPage != conf.pageid) {
    if (!!conf.operates && !!conf.operates.finish && conf.operates.finish.length > 0) {
      // pageList.splice(0,0,conf);
      pageList.push(conf);
    }
    curPage = conf.pageid;
    curConf = conf;
  }
  let someone = Job.default.someone;
  for (let item of Job.default.steps) {
    if (item.step === curStep && someone.length > 0) {
      someone = item.step.someone;
      break;
    }
  }
  curStep = Operate.nextStep(curPage, someone);
  toast('找到：' + conf.name, curStep);
  console.log('找到：' + conf.name, curStep);

}

/**
 * 执行指定任务
 * @param {*} items 
 */
function run(items) {
  doPage(items, curConf);
  sleep(2000);
}
/**
 * 处理页面的操作
 * @param {*} items 
 * @param {*} conf 
 */
function doPage(items, conf) {
  let _job = null;
  console.log('items.length start', items.must.length, curStep);
  if (!!conf && !!conf.pageid && items.must.length > 0) {
    for (let m in items.must) {
      if (conf.pageid === items.must[m].pageid) {
        // toast(conf.name);
        // console.log(JSON.stringify(items[m].jobs));
        _job = items.must[m];
        // console.log(m,items[m].pageid);
        items.must.splice(m, 1);
        break;
      }
    }
    console.log('in do page job 1:',JSON.stringify(_job));
    if (_job == null) {
      for (let m in Job.default.someone) {
        if (conf.pageid === Job.default.someone[m].pageid) {
          // toast(conf.name);
          // console.log(JSON.stringify(Job.default[m].jobs));
          _job = Job.default.someone[m];
          // console.log(m,Job.default[m].pageid);
          break;
        }
      }
    }
    console.log('in do page job:',JSON.stringify(_job));
    if (_job != null) {
      if (!!_job.next) {
        curStep = _job.next;
      }
      console.log('in do page job.jobs:', JSON.stringify(_job.jobs));
      if (!!_job && !!_job.jobs) {
        for (let im of _job.jobs) {
          console.log('in do page conf.mark:', JSON.stringify(conf.mark));
          if (Operate.isPage(conf.mark)) {
            console.log('loop job:', JSON.stringify(im));
            Operate.doFun(im);
          } else {
            console.log('not in right page:', conf.name);
            break;
          }
        }

      }
    }
  }
  console.log('items.must.length end', items.must.length, curStep);

}

/**
 * 初始化并获取配置
 */
function init() {

  auto();


  var ra = new RootAutomator();
  events.on('exit', function () {
    ra.exit();
  });

  if (currentPackage() != 'com.sina.weibo') {
    launch("com.sina.weibo");
    waitForPackage("com.sina.weibo");
    sleep(5000);
  }
  //远程获取配置
  Api.getConfig();
  toast('获取配置成功');
  console.log('获取配置：' + JSON.stringify(Env.config));
  sleep(1000);

}

/**
 * 通过返回操作，回到首页
 */
function reset() {
  while (true) {
    let conf = Operate.curPage(Job.pages);
    if (Env.PageEnum.HOME != conf.pageid) {
      toast('找到：' + conf.name);
      console.log('找到：' + conf.name);
      break;
    } else {
      doBack();
    }
    sleep(2000);

  }
}
/**
 * 返回操作
 */
function doBack() {
  let im = { name: "back" };
  Operate.doFun(im);
}

/**
 * 处理页面的finish操作
 * @param {*} pageList 
 */
function finishPage(pageList) {
  result = false;
  for (let k = pageList.length - 1; k >= 0; k--) {
    let item = pageList[k];
    //执行finish
    if (!!item.operates && !!item.operates.finish) {
      if (Operate.isPage(item.mark)) {
        for (let im of item.operates.finish) {
          Operate.doFun(im);
        }
        pageList.splice(k, 1);
        console.log('delete finish page:', item.name);
      } else {
        console.log('finish, but not in right page:', item.name);
      }
    }
    sleep(2000);
  };
  if (pageList.length <= 0) {
    result = false;
  }
  console.log('finishPage:', JSON.stringify(pageList), result);
  return result;
}

//运行
main();



