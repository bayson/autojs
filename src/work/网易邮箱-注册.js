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
    CLIENT: 'mail.163.com',
    package: 'com.tencent.mtt',//qq浏览器
    activity: "com.tencent.mtt.MainActivity",

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
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.UNKNOW, jobs: this.pages.UNKNOW.operates.next },
                { next: Env.STEP.RUNNING, pageid: Env.PageEnum.LOGIN, jobs: this.pages.LOGIN.operates.register },
                { next: Env.STEP.RUNNING, pageid: Env.PageEnum.REGISTER, jobs: this.pages.REGISTER.operates.input },
                { next: Env.STEP.RUNNING, pageid: Env.PageEnum.ACCOUNT_CONFIRM, jobs: this.pages.ACCOUNT_CONFIRM.operates.input },
                { next: Env.STEP.RUNNING, pageid: Env.PageEnum.ACCOUNT_SEND_CONFIRM, jobs: this.pages.ACCOUNT_SEND_CONFIRM.operates.send },
                { next: Env.STEP.RUNNING, pageid: Env.PageEnum.REGISTER_OK, jobs: this.pages.REGISTER_OK.operates.send },
                { next: Env.STEP.RUNNING, pageid: Env.PageEnum.SELECT_CLASS, jobs: this.pages.SELECT_CLASS.operates.next },
                { next: Env.STEP.RUNNING, pageid: Env.PageEnum.HOME, jobs: this.pages.HOME.operates.next },
                { next: Env.STEP.RUNNING, pageid: Env.PageEnum.HOME_SEARCH, jobs: this.pages.HOME_SEARCH.operates.next },
                { next: Env.STEP.RUNNING, pageid: Env.PageEnum.SEARCH, jobs: this.pages.SEARCH.operates.next },
                { next: Env.STEP.RUNNING, pageid: Env.PageEnum.HOME_HOT, jobs: this.pages.HOME_HOT.operates.send, exit: true },
            ],
        }
    },
    /**
     * @description Login步骤，为登陆步骤：分为必须步骤(must)和可能步骤(someone)
     */
    get login() {
        return {
            step: Env.STEP.LOGIN,
            must: [
                { pageid: Env.PageEnum.HOME, jobs: this.pages.HOME.operates.next },
                { pageid: Env.PageEnum.HOME_SEARCH, jobs: this.pages.HOME_SEARCH.operates.next },
                { pageid: Env.PageEnum.SEARCH, jobs: this.pages.SEARCH.operates.next },
            ],
            someone: [
            ],
        }

    },

    /**
 * @description Login步骤，为登陆步骤：分为必须步骤(must)和可能步骤(someone)
 */
    get running() {
        return {
            step: Env.STEP.RUNNING,
            must: [
                { pageid: Env.PageEnum.REGISTER, jobs: this.pages.REGISTER.operates.input },
                { pageid: Env.PageEnum.ACCOUNT_SEND_CONFIRM, jobs: this.pages.ACCOUNT_SEND_CONFIRM.operates.send },
                { pageid: Env.PageEnum.HOME_HOT, jobs: this.pages.HOME_HOT.operates.send, exit: true },
            ],
            someone: [
            ],
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
            mark: { name: "unknow" },
            priority:0,
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { className: "android.widget.TextView", text: "立即体验" } },
                    { name: "click", mark: { text: "先进入网页版邮箱>" } },
                    { name: "click", mark: { text: "以后再说" } },
                ]
            },
        },
        HOME: {
            desc: "浏览器首页",
            name: "浏览器首页",
            priority:0,
            pageid: Env.PageEnum.HOME,
            mark: { className: "com.tencent.mtt.browser.homepage.view.fastlink.g", text: "直播交友" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { className: "android.widget.TextView", text: "搜免费小说 影视 游戏 App" } },
                ],
                finish: [{ name: "sleep" }],
            },
        },
        HOME_SEARCH: {
            desc: "首页搜索",
            name: "首页搜索",
            priority:1,
            pageid: Env.PageEnum.HOME_SEARCH,
            mark: { desc: "智能语音" },
            next: [],
            operates: {
                next: [
                    { name: "input", mark: { className: "android.widget.TextView", text: "取消" }, param: { get: { default: "mail.163.com" }, parent: 1, indexOf: { tag: "className", default: "android.view.View" } } },
                    { name: "sleep" },
                    { name: "tap", mark: { className: "android.widget.TextView", text: "进入" } },
                ],
                finish: [{ name: "sleep" }],
            },
        },
        SEARCH: {
            desc: "搜索页",
            name: "搜索页",
            priority:2,
            pageid: Env.PageEnum.SEARCH,
            mark: { className: "android.widget.TextView", text: "进入" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { className: "android.widget.TextView", text: "进入" } },
                ],
                finish: [{ name: "sleep" }],
            },
        },
        SELECT_CLASS: {
            desc: "先进入网页版邮箱",
            name: "先进入网页版邮箱",
            priority:0,
            pageid: Env.PageEnum.SELECT_CLASS,
            mark: { className: "android.view.View", text: "先进入网页版邮箱>" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { className: "android.view.View", text: "先进入网页版邮箱>" } },
                ]
            },
        },
        LOGIN: {
            desc: "登陆页输入手机号",
            name: "登录",
            /** 
             * mark: 页面的标志控件，当页面找到匹配mark属性的控件时，我们认为它就位于这个页面 
             * mark可能的属性：id,text,desc,className,textStartsWith,textEndsWith,
             * descStartsWith,descEndsWith 具体可以参考<a href="https://hyb1996.github.io/AutoJs-Docs/#/widgetsBasedAutomation?id=uiselector">Autojs控件uiselector的函数</a>
             */
            mark: { className: "android.view.View", text: "登  录" },
            priority:0,
            pageid: Env.PageEnum.LOGIN,
            next: [],
            operates: {
                login: [
                    { name: "get", mark: { name: "login_phone", uri: "api" }, param: { set: { name: "phone" } } },
                    { name: "set_text", mark: { className: "android.widget.EditText", text: "用户名" }, param: { get: { name: "phone" } } },
                    { name: "set_text", mark: { className: "android.widget.EditText", text: "密码" }, param: { get: { name: "password" } } },
                    { name: "click", mark: { id: "dologin", text: "登 录" } },
                ],
                register: [
                    { name: "click", mark: { className: "android.view.View", text: "去注册" } },
                ]
            },
        },
        REGISTER: {
            desc: "注册页",
            name: "注册页",
            priority:0,
            pageid: Env.PageEnum.REGISTER,
            mark: { className: "android.view.View", text: "用户注册即代表同意" },
            next: [],
            operates: {
                input: [
                    { name: "get", mark: { name: "register_name", uri: "api" }, param: { set: { name: "name" } } },
                    { name: "set_text", mark: { className: "android.widget.EditText", text: "6-18位字母数字组合" }, param: { get: { name: "name" } } },
                    { name: "wait", mark: { className: "android.view.View", text: "6-16位字母数字字符组合密码" } },
                    { name: "get", mark: { name: "register_password", uri: "api" }, param: { set: { name: "password" } } },
                    { name: "set_text", mark: { className: "android.widget.EditText", text: "6-16位字母数字字符组合密码" }, param: { get: { name: "password" } } },
                    { name: "click", mark: { className: "android.widget.CheckBox" } },
                    { name: "tap", mark: { className: "android.view.View", text: "点此进行验证" } },
                    { name: "wait", mark: { className: "android.view.View", text: "验证成功" } },
                    { name: "click", mark: { className: "android.view.View", text: "下一步" } },
                ],
                finish: [{ name: "sleep" }],
            },
        },
        ACCOUNT_CONFIRM: {
            desc: "验证手机号",
            name: "验证手机号",
            priority:0,
            pageid: Env.PageEnum.ACCOUNT_CONFIRM,
            mark: { className: "android.view.View", text: "注 册" },
            next: [],
            operates: {
                input: [
                    { name: "get", mark: { name: "register_phone", uri: "api" }, param: { set: { name: "phone" } } },
                    { name: "set_text", mark: { className: "android.widget.EditText", text: "输入验证手机号" }, param: { get: { name: "phone" } } },
                    { name: "click", mark: { className: "android.view.View", text: "获取验证码" } },
                    // { name: "get", mark: { name: "register_code", uri: "api" }, param: { set: { name: "register_code" } } },
                    // { name: "set_text", mark: {  className:"android.widget.EditText", text:"输入短信验证码" }, param: { get: { name: "register_code" } } },
                    // { name: "click", mark: { className:"android.view.View", text: "注 册" } },
                ],
                finish: [{ name: "sleep" }],
            },
        },
        ACCOUNT_SEND_CONFIRM: {
            desc: "前往发送短信确认",
            name: "前往发送短信",
            priority:0,
            pageid: Env.PageEnum.ACCOUNT_SEND_CONFIRM,
            // mark: { className:"android.view.View", text: "编辑短信：注册验证" },
            mark: { className: "android.view.View", text: "前往发送短信" },
            next: [],
            operates: {
                send: [
                    { name: "get", mark: { name: "register_send_code", uri: "api" }, param: {} },
                    { name: "sleep", param: { delay: 12000 } },
                    { name: "click", mark: { className: "android.view.View", text: "我已发送短信，注册" }, param:{loops:5,delay:5000} },
                    // { name: "sleep", param:{delay:10000}},
                    // { name: "click", mark: { className:"android.view.View", text: "我已发送短信，注册" } },
                    // // 系统未收到短信，请重新发送短信验证
                ],
                finish: [{ name: "sleep" }],
            },
        },
        REGISTER_OK: {
            desc: "恭喜您，注册成功",
            name: "注册成功",
            priority:0,
            pageid: Env.PageEnum.REGISTER_OK,
            mark: { className: "android.view.View", text: "恭喜您，" },
            next: [],
            operates: {
                send: [
                ],
                finish: [{ name: "sleep" }],
            },
        },
        HOME_HOT: {
            desc: "邮箱首页",
            name: "邮箱首页",
            priority:0,
            pageid: Env.PageEnum.HOME_HOT,
            mark: { className: "android.view.View", text: "收件箱" },
            next: [],
            operates: {
                send: [
                    { name: "get", mark: { name: "register_ok", uri: "api" }},
                ],
                finish: [{ name: "sleep" }],
            },
        },


    },
};
/**
 * 初始化并获取配置
 */
function afterInit() {
    sleep(1000);
}

var __curJob = JSON.parse(JSON.stringify(Job));
//运行
Work.main(__curJob, afterInit);