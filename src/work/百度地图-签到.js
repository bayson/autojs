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


var Work = require("../common/work");
var Env = require('../env');

/**
 * 注意：如果一个页面有多个特征码匹配，以最后一个为准
 */
var Job = {
  version: '10.17.4.928',
  CLIENT: '百度地图-签到',
  package: 'com.baidu.BaiduMap',
  activity: "com.baidu.baidumaps.MapsActivity",
  /**
   * @description 默认配置，自动加载
   */
  get default() {
    return {
      /**
       * @description steps定义当前任务需要完成工作的步骤
       */
      steps: [this.running],
      /**
       * @description 指定某一步骤的最大重复次数
       */
      maxTimes: [-1],
      /**
       * @description 定义可能遇到的页面默认处理方式; next:为强制跳转，pageid:为页面ID，jobs:为具体的执行操作
       */
      someone: [
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.UPDATED, jobs: this.pages.UPDATED.operates.next },
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.HOME, jobs: this.pages.HOME.operates.next},
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.MINE, jobs: this.pages.MINE.operates.next},
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.SIGEN, jobs: this.pages.SIGEN.operates.next},
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.HOME_MESSAGE, jobs: this.pages.HOME_MESSAGE.operates.next, exit:true},
      ],
    }
  },
  /**
   * @description Running步骤，为登陆步骤：分为必须步骤(must)和可能步骤(someone)
   */
  get running() {
    return {
      step: Env.STEP.RUNNING,
      must: [
        { pageid: Env.PageEnum.UPDATED, jobs: this.pages.UPDATED.operates.next },
        { pageid: Env.PageEnum.HOME, jobs: this.pages.HOME.operates.next },
        { pageid: Env.PageEnum.MINE, jobs: this.pages.MINE.operates.next },
        { pageid: Env.PageEnum.SIGEN, jobs: this.pages.SIGEN.operates.next },
        { pageid: Env.PageEnum.HOME_MESSAGE, jobs: this.pages.HOME_MESSAGE.operates.next, exit:true },
      ],
      someone: [],
    }
  },

  /**
   * ... 还可以定义更多的步骤
   */
  /**
   * 定义页面的识别标志及具体的各操作
   */
  pages: {
    UPDATED: {
      desc: "关闭更新弹窗",
      name: "关闭更新弹窗",
      pageid: Env.PageEnum.UPDATED,
      mark: { id: "cancel_update" },
      next: [],
      operates: {
        next: [
          { name: "click", mark: { id: "cancel_update" } },
        ]
      },
    },


    MINE: {
      desc: "个人中心",
      name: "个人中心",
      pageid: Env.PageEnum.MINE,
      // mark: { className:"android.view.View", text: "编辑短信：注册验证" },
      mark: { id: "user_info_user_head_icon" },
      next: [],
      operates: {
        next: [
          // { name: "click", mark: { id: "user_head_portrait_icon" } },
          // { name: "sleep"},
          { name: "click", mark: { id: "ll_lv_signin" } },
          { name: "sleep"},
          { name: "click", mark: { text: "不选择地点" } },
          { name: "sleep"},
        ],
        finish: [{ name: "back" }],
      },
    },


    HOME: {
      desc: "首页",
      name: "首页",
      pageid: Env.PageEnum.HOME,
      // mark: { className:"android.view.View", text: "编辑短信：注册验证" },
      mark: { id: "user_head_portrait_icon" },
      next: [],
      operates: {
        next: [
          { name: "click", mark: { id: "user_head_portrait_icon" } },
          { name: "sleep"},
        ],
        finish: [{ name: "back" }],
      },
    },

    SIGEN: {
      desc: "我在这里",
      name: "我在这里",
      pageid: Env.PageEnum.SIGEN,
      // mark: { className:"android.view.View", text: "编辑短信：注册验证" },
      mark: { id:"tv_title_text", text: "我在这里" },
      next: [],
      operates: {
        next: [
          { name: "click", mark: { text: "不选择地点" } },
          { name: "sleep"},
          { name: "click", mark: { id: "sign_name" } },
          { name: "sleep"},
        ],
      },
    },

    HOME_MESSAGE: {
      desc: "聊天页面",
      name: "聊天页面",
      pageid: Env.PageEnum.HOME_MESSAGE,
      // mark: { className:"android.view.View", text: "编辑短信：注册验证" },
      mark: { id:"user_sys_question_btn"},
      next: [],
      operates: {
        next: [
          { name: "click", mark: { id: "iv_left_btn" } },
          { name: "sleep"},
        ],
        finish: [{ name: "back" }],
      },
    },
  },
};

/**
 * 初始化后执行
 */
function afterInit() {
  sleep(1000);
}

var __curJob = JSON.parse(JSON.stringify(Job));
//运行
Work.main(__curJob, afterInit);