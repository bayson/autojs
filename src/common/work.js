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

var Env = require('../env');
var Api = require('./api');
var Utils = require('./utils');
var Operate = require('./operate');


var work = {

  _curPage: 0,
  _curConf: null,
  _pageList: [],
  _curStep: 0,
  _curJob: {},
  _needExit:false,
  
  init: function (job) {
    auto();

    var _curRa = new RootAutomator();
    events.on('exit', function () {
      _curRa.exit();
    });
    //获取截屏的权限
    requestScreenCapture();

    let package = job.package;

    if (currentPackage() != package) {
      launch(package);
      waitForPackage(package);
      sleep(5000);
    }
    let activity = job.activity;
    if(!Utils.isNull){
      toast('Wait For Activity:',activity);
      console.log('Wait For Activity:',activity);
      waitForActivity(activity);
    }
    //远程获取配置
    Api.getConfig();
    toast('获取配置成功');
    console.log('获取配置成功');
    sleep(1000);

  },

  /**
   * 主函数
   */
  main: function (jib, afterInit) {
    //初始化变量
    this._curJob = jib;

    //初始化
    this.init(this._curJob);

    //执行回调
    if (typeof afterInit === 'function') {
      afterInit(this._curJob);
    }

   
    // let items = {
    //   login: JSON.parse(JSON.stringify(this._curJob.login)),
    //   nickname: JSON.parse(JSON.stringify(this._curJob.nickname)),
    //   write: JSON.parse(JSON.stringify(this._curJob.write)),
    //   logout: JSON.parse(JSON.stringify(this._curJob.logout)),
    //   running: JSON.parse(JSON.stringify(this._curJob.running)),
    // };
    //初始化
    while (!this._needExit) {
      //判断下一步的位置
      this.nextStep();
      for( let item of this._curJob.default.steps){
          if(item.step == this._curStep){
            this.run(JSON.parse(JSON.stringify(item)));
          }
      }

      sleep(1000);
    }
    //结束
    Api.finish();

  },

  /**
   * 判断下一步执行什么
   */
  nextStep: function () {
    let conf = Operate.curPage(this._curJob.pages);
    if (this._curPage != conf.pageid) {
      if (!!conf.operates && !!conf.operates.finish && conf.operates.finish.length > 0) {
        // this._pageList.splice(0,0,conf);
        this._pageList.push(conf);
      }
      this._curPage = conf.pageid;
      this._curConf = conf;
    }
    let someone = this._curJob.default.someone;
    for (let item of this._curJob.default.steps) {
      if (item.step === this._curStep && someone.length > 0) {
        someone = item.step.someone;
        break;
      }
    }
    this._curStep = Operate.nextStep(this._curPage, someone);
    toast('find:' + conf.name, this._curStep);
    console.log('find:' + conf.name, this._curStep);

  },

  /**
   * 执行指定任务
   * @param {*} items 
   */
  run: function (items) {
    this.doPage(items, this._curConf);
    sleep(1000);
  },
  /**
   * 处理页面的操作
   * @param {*} items 
   * @param {*} conf 
   */
  doPage: function (items, conf) {
    let _job = null;
    console.log('items.length start', items.must.length, this._curStep);
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
      // console.log('in do page job 1:', JSON.stringify(_job));
      if (_job == null) {
        for (let m in this._curJob.default.someone) {
          if (conf.pageid === this._curJob.default.someone[m].pageid) {
            // toast(conf.name);
            // console.log(JSON.stringify(this._curJob.default[m].jobs));
            _job = this._curJob.default.someone[m];
            // console.log(m,this._curJob.default[m].pageid);
            break;
          }
        }
      }
      // console.log('in do page job:', JSON.stringify(_job));
      if (_job != null) {
        if (!!_job.next) {
          this._curStep = _job.next;
        }
        // console.log('in do page this._curjob.jobs:', JSON.stringify(_job.jobs));
        if (!!_job && !!_job.jobs) {
          for (let im of _job.jobs) {
            // console.log('in do page conf.mark:', JSON.stringify(conf.mark));
            if (conf.pageid !== Env.PageEnum.UNKNOW && Operate.isPage(conf.mark)) {
              // console.log('loop job:', JSON.stringify(im));
              Operate.doFun(im);
            } else {
              // console.log('not in right page:', conf.name);
              break;
            }
          }

        }
        if (!Utils.isNull(_job.exit) && _job.exit === true) {
          this._needExit = true;
        }
      }
    }
    console.log('items.must.length end', items.must.length, this._curStep);

  },

  /**
   * 通过返回操作，回到首页
   */
  reset: function () {
    while (true) {
      let conf = Operate.curPage(this._curJob.pages);
      if (Env.PageEnum.HOME != conf.pageid) {
        toast('找到：' + conf.name);
        console.log('找到：' + conf.name);
        break;
      } else {
        this.doBack();
      }
      sleep(1000);

    }
  },
  /**
   * 返回操作
   */
  doBack: function () {
    let im = { name: "back" };
    Operate.doFun(im);
  },

  /**
   * 处理页面的finish操作
   * @param {*} pageList 
   */
  finishPage: function (pageList) {
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
      sleep(1000);
    };
    if (pageList.length <= 0) {
      result = false;
    }
    console.log('finishPage:', JSON.stringify(pageList), result);
    return result;
  },
}
module.exports = work;
