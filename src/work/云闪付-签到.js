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
  CLIENT: '云闪付-签到',
  package: 'com.unionpay',
  activity: "com.unionpay.activity.UPActivityMain",
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
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.SELECT_CLASS, jobs: this.pages.SELECT_CLASS.operates.next },
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.HOME, jobs: this.pages.HOME.operates.next },
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.LOGIN, jobs: this.pages.LOGIN.operates.next },
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
        { pageid: Env.PageEnum.SELECT_CLASS, jobs: this.pages.SELECT_CLASS.operates.next },
        { pageid: Env.PageEnum.HOME, jobs: this.pages.HOME.operates.next },
        { pageid: Env.PageEnum.LOGIN, jobs: this.pages.LOGIN.operates.next },
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
    SELECT_CLASS: {
      desc: "关闭更新弹窗",
      name: "关闭更新弹窗",
      pageid: Env.PageEnum.SELECT_CLASS,
      mark: { id: "btn_cancel" },
      next: [],
      operates: {
        next: [
          { name: "click", mark: { id: "btn_cancel" } },
        ]
      },
    },
    LOGIN: {
      desc: "进入签到页按钮",
      name: "进入签到页按钮",
      /** 
       * mark: 页面的标志控件，当页面找到匹配mark属性的控件时，我们认为它就位于这个页面 
       * mark可能的属性：id,text,desc,className,textStartsWith,textEndsWith,
       * descStartsWith,descEndsWith 具体可以参考<a href="https://hyb1996.github.io/AutoJs-Docs/#/widgetsBasedAutomation?id=uiselector">Autojs控件uiselector的函数</a>
       */
      mark: { id: "frog_float_gif" },
      pageid: Env.PageEnum.LOGIN,
      next: [],
      operates: {
        next: [
          { name: "click", mark: { id: "frog_float_gif" } },
        ],
      },
    },

    HOME: {
      desc: "签到",
      name: "签到",
      pageid: Env.PageEnum.HOME,
      // mark: { className:"android.view.View", text: "编辑短信：注册验证" },
      mark: { id: "签到" },
      next: [],
      operates: {
        next: [
          { name: "click", mark: { id: "签到" } },
        ],
        finish: [{ name: "sleep" }],
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