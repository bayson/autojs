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
  version: '4.68.0',
  CLIENT: '拼多多-签到',
  package: 'com.xunmeng.pinduoduo',
  activity: "com.xunmeng.pinduoduo.ui.activity.HomeActivity",
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
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.UNKNOW, jobs: this.pages.UNKNOW.operates.next },
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.HOME, jobs: this.pages.HOME.operates.next },
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.MINE, jobs: this.pages.MINE.operates.next },
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.SIGEN, jobs: this.pages.SIGEN.operates.next },
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.HOME_MESSAGE, jobs: this.pages.HOME_MESSAGE.operates.next, exit: true },
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.RED_PAGE, jobs: this.pages.RED_PAGE.operates.next },
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.RED_BUY_PAGE, jobs: this.pages.RED_BUY_PAGE.operates.next },
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.RED_FRIEND_PAGE, jobs: this.pages.RED_FRIEND_PAGE.operates.next, exit: true },
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
        { pageid: Env.PageEnum.HOME, jobs: this.pages.HOME.operates.next },
        { pageid: Env.PageEnum.SIGEN, jobs: this.pages.SIGEN.operates.next },
        { pageid: Env.PageEnum.HOME_MESSAGE, jobs: this.pages.HOME_MESSAGE.operates.next, exit: true },
        { pageid: Env.PageEnum.RED_PAGE, jobs: this.pages.RED_PAGE.operates.next },
        { pageid: Env.PageEnum.RED_BUY_PAGE, jobs: this.pages.RED_BUY_PAGE.operates.next },
        { pageid: Env.PageEnum.RED_FRIEND_PAGE, jobs: this.pages.RED_FRIEND_PAGE.operates.next, exit: true },
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
    UNKNOW: {
      desc: "未知页面",
      name: "未知页面",
      pageid: Env.PageEnum.UNKNOW,
      mark: { id: "tv_title" },
      next: [],
      operates: {
        next: [
          { name: "click", mark: { id: "h_" } },
          { name: "click", mark: { id: "i_" } },
          { name: "click", mark: { id: "ii_" } },
          { name: "click", mark: { id: "is" } },
        ]
      },
    },


    MINE: {
      desc: "个人中心",
      name: "个人中心",
      pageid: Env.PageEnum.MINE,
      // mark: { className:"android.view.View", text: "编辑短信：注册验证" },
      mark: { id: "azs", className: "android.widget.ImageView", },
      next: [],
      operates: {
        next: [
          // { name: "click", mark: { id: "user_head_portrait_icon" } },
          // { name: "sleep"},
          { name: "click", mark: { className: "android.widget.TextView", text: "首页" } },
          { name: "sleep" },
        ],
        finish: [{ name: "back" }],
      },
    },


    HOME: {
      desc: "首页",
      name: "首页",
      pageid: Env.PageEnum.HOME,
      mark: { text: "现金签到" },
      next: [],
      operates: {
        next: [
          { name: "click", mark: { text: "现金签到" } },
          { name: "sleep" },
        ],
        finish: [{ name: "back" }],
      },
    },

    SIGEN: {
      desc: "签到领现金",
      name: "签到领现金",
      pageid: Env.PageEnum.SIGEN,
      // mark: { className:"android.view.View", text: "编辑短信：注册验证" },
      mark: { id: "tv_title", text: "签到领现金" },
      next: [],
      operates: {
        next: [
          { name: "click", mark: { className: "android.view.View", text: "签到领现金" } },
          { name: "sleep" },
          { name: "back" },
        ],
      },
    },

    RED_PAGE: {
      desc: "定时领红包",
      name: "定时领红包",
      pageid: Env.PageEnum.RED_PAGE,
      // mark: { className:"android.view.View", text: "编辑短信：注册验证" },
      mark: { id: "tv_title", text: "定时领红包" },
      next: [],
      operates: {
        next: [
          { name: "click", mark: { className: "android.widget.Image", text: "daily_bonus_mid_limited_reward_btn" } },
          { name: "sleep" },
          { name: "click", mark: { className: "android.view.View", text: "选我" } },
          { name: "sleep" },
        ],
        finish: [
          { name: "back" },
          { name: "back" },
        ],
      },
    },

    RED_FRIEND_PAGE: {
      desc: "好友红包",
      name: "好友红包",
      pageid: Env.PageEnum.RED_FRIEND_PAGE,
      // mark: { className:"android.view.View", text: "编辑短信：注册验证" },
      mark: { id: "tv_title", text: "好友红包" },
      next: [],
      operates: {
        next: [
          { name: "click", mark: { className: "android.view.View", text: "官方账号" }, param: { parent: 1, indexOf: { tag: "clickable", default: "true" } } },
          { name: "sleep" },
          { name: "click", mark: { className: "android.view.View", text: "拼多多签到" }, param: { parent: 1, indexOf: { tag: "clickable", default: "true" } } },
          { name: "sleep" },
        ],
        finish: [
          { name: "back" },
          { name: "back" },
        ],
      },
    },


    RED_BUY_PAGE: {
      desc: "拼单返现",
      name: "拼单返现",
      pageid: Env.PageEnum.RED_BUY_PAGE,
      // mark: { className:"android.view.View", text: "编辑短信：注册验证" },
      mark: { id: "tv_title", text: "拼单返现" },
      next: [],
      operates: {
        next: [
          { name: "swipe", param: { count: 20 } },
          { name: "back" },
          { name: "click", mark: { className: "android.view.View", text: "不赚钱,离开" } },
          { name: "sleep" },
        ],
        finish: [
          { name: "back" },
          { name: "back" },
        ],
      },
    },

    HOME_MESSAGE: {
      desc: "今日已签到，请明天再来",
      name: "今日已签到，请明天再来",
      pageid: Env.PageEnum.HOME_MESSAGE,
      // mark: { className:"android.view.View", text: "编辑短信：注册验证" },
      mark: { className: "android.view.View", text: "今日已签到，请明天再来" },
      next: [],
      operates: {
        next: [
          { name: "click", mark: { className: "android.view.View", text: "定时领红包" } },
          { name: "sleep" },
          { name: "click", mark: { className: "android.view.View", text: "抢红包" } },
          { name: "sleep" },
          { name: "back" },
          { name: "click", mark: { className: "android.view.View", text: "逛街领红包" } },
          { name: "sleep" },
          { name: "back" },

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