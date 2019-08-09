/**
* @fileOverview 微博自动化控制脚本
* @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
* @author <a href=”tuple@youshui.ren”>Tuple</a>
* @version 0.1
*/


var Env = require('./env');

/**
 * 注意：如果一个页面有多个特征码匹配，以最后一个为准
 */
var job = {
    /**
     * @description 定义各步骤的标志
     */
    STEP: {
        NOCHANGE: 0,
        LOGIN: 1,
        WRITE: 3,
        LOGOUT: 9,
        NICKNAME: 2,
        ISSTEP: 5,
        NEEDLOGOUT: 6,
        LOGINED: 7,
    },

    /**
     * @description 默认配置，自动加载
     */
    get default() {
        return {
            /**
             * @description steps定义当前任务需要完成工作的步骤
             */
            steps: [this.login],
            /**
             * @description 指定某一步骤的最大重复次数
             */
            maxTimes:[-1],
            /**
             * @description 定义可能遇到的页面默认处理方式; next:为强制跳转，pageid:为页面ID，jobs:为具体的执行操作
             */
            someone: [
                { next: this.STEP.LOGIN, pageid: Env.PageEnum.LOGIN, jobs: this.pages.LOGIN.operates.register },
                { next: this.STEP.LOGIN, pageid: Env.PageEnum.SELECT_CLASS, jobs: this.pages.SELECT_CLASS.operates.next },
                { next: this.STEP.LOGIN, pageid: Env.PageEnum.REGISTER, jobs: this.pages.REGISTER.operates.input },
                { next: this.STEP.LOGIN, pageid: Env.PageEnum.ACCOUNT_CONFIRM, jobs: this.pages.ACCOUNT_CONFIRM.operates.input },
                { next: this.STEP.LOGIN, pageid: Env.PageEnum.ACCOUNT_SEND_CONFIRM, jobs: this.pages.ACCOUNT_SEND_CONFIRM.operates.send },
            ],
        }
    },
    /**
     * @description Login步骤，为登陆步骤：分为必须步骤(must)和可能步骤(someone)
     */
    get login() {
        return {
            step: this.STEP.LOGIN,
            must: [
                { pageid: Env.PageEnum.REGISTER, jobs: this.pages.REGISTER.operates.input },
                { pageid: Env.PageEnum.ACCOUNT_SEND_CONFIRM, jobs: this.pages.ACCOUNT_SEND_CONFIRM.operates.send },
            ],
            someone: [
            ],
        }

    },
    /**
     * 写微博
     */
    get write() {
        return {
            step: this.STEP.WRITE,
            must: [
            ],
            someone: [],
        }
    },
    /**
     * 退出登录
     */
    get logout() {
        return {
            step: this.STEP.LOGOUT,
            must: [
            ],
            someone: [],
        }
    },
    /**
     * 获取登录昵称
     */
    get nickname() {
        return {
            step: this.STEP.NICKNAME,
            must: [
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
            desc: "先进入网页版邮箱",
            name: "先进入网页版邮箱", 
            pageid: Env.PageEnum.SELECT_CLASS, 
            mark: { className:"android.view.View", text: "先进入网页版邮箱>"},
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { className:"android.view.View", text: "先进入网页版邮箱>"} },
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
            pageid: Env.PageEnum.LOGIN,
            next: [],
            /**
             * 定义这个页面可以的操作：name是操作名称目前支持
             * get 获取本地或者远程文本并写到全局变量，调用operate.js中的do函数处理,
             * set_text 设置控件的text属性，调用operate.js中的do函数处理,
             * click 点击这个按钮，调用operate.js中的do函数处理,
             * input OneByOne向控件输入文字，调用operate.js中的do函数处理,
             * swipe 滑动页面，调用operate.js中的do函数处理,
             * sleep 暂停，调用operate.js中的do函数处理,
             * refresh 下拉刷新页面，调用operate.js中的do函数处理,
             * back 点击Android的返回键，调用operate.js中的do函数处理,
             * text 获取控件的text属性值，调用operate.js中的do函数处理,
             * desc 获取控件的desc描述值，调用operate.js中的do函数处理,
             * tap 点击控件位置的屏幕，调用operate.js中的do函数处理,
             * enter 触发回车，调用operate.js中的do函数处理,
             */
            operates: {
                login: [
                    { name: "get", mark: { name: "login_phone", uri: "api" }, param: { set: { name: "phone" } } },
                    { name: "set_text", mark: { className:"android.widget.EditText", text:"用户名" }, param: { get: { name: "phone" } } },
                    { name: "set_text", mark: { className:"android.widget.EditText",  text:"密码" }, param: { get: { name: "password" } } },
                    { name: "click", mark: { id: "dologin", text: "登 录" } },
                ],
                register:[
                    { name: "click", mark: { className:"android.view.View", text: "去注册" } },
                ]
            },
        },
        REGISTER: {
            desc: "注册页",
            name: "注册页", 
            pageid: Env.PageEnum.REGISTER, 
            mark: { className:"android.view.View", text: "用户注册即代表同意" },
            next: [],
            operates: {
                input: [
                    { name: "get", mark: { name: "register_name", uri: "api" }, param: { set: { name: "username" } } },
                    { name: "set_text", mark: {  className:"android.widget.EditText", text:"6-18位字母数字组合" }, param: { get: { name: "username" } } },
                    { name: "wait", mark: { className:"android.view.View", text: "6-16位字母数字字符组合密码" } },
                    { name: "get", mark: { name: "register_password", uri: "api" }, param: { set: { name: "password" } } },
                    { name: "set_text", mark: {  className:"android.widget.EditText", text:"6-16位字母数字字符组合密码" }, param: { get: { name: "password" } } },
                    { name: "click", mark: { className:"android.widget.CheckBox"} },
                    { name: "tap", mark: { className:"android.view.View", text: "点此进行验证" } },
                    { name: "wait", mark: { className:"android.view.View", text: "验证成功" } },
                    { name: "click", mark: { className:"android.view.View", text: "下一步" } },
                ],
                finish: [{ name: "sleep" }],
            },
        },
        ACCOUNT_CONFIRM: {
            desc: "验证手机号",
            name: "验证手机号", 
            pageid: Env.PageEnum.ACCOUNT_CONFIRM, 
            mark: { className:"android.view.View", text: "注 册" },
            next: [],
            operates: {
                input: [
                    { name: "get", mark: { name: "register_phone", uri: "api" }, param: { set: { name: "phone" } } },
                    { name: "set_text", mark: {  className:"android.widget.EditText", text:"输入验证手机号" }, param: { get: { name: "phone" } } },
                    { name: "click", mark: { className:"android.view.View", text: "获取验证码" } },
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
            pageid: Env.PageEnum.ACCOUNT_SEND_CONFIRM, 
            // mark: { className:"android.view.View", text: "编辑短信：注册验证" },
            mark: { className:"android.view.View", text: "前往发送短信" },
            next: [],
            operates: {
                send: [
                    { name: "get", mark: { name: "register_send_code", uri: "api" }, param: { }},
                    { name: "sleep", param:{delay:5000}},
                    { name: "click", mark: { className:"android.view.View", text: "我已发送短信，注册" } },
                    { name: "sleep", param:{delay:20000}},
                    { name: "click", mark: { className:"android.view.View", text: "我已发送短信，注册" } },
                    // 系统未收到短信，请重新发送短信验证
                ],
                finish: [{ name: "sleep" }],
            },
        },
        REGISTER_OK: {
            desc: "恭喜您，注册成功",
            name: "注册成功", 
            pageid: Env.PageEnum.REGISTER_OK, 
            // mark: { className:"android.view.View", text: "编辑短信：注册验证" },
            mark: { className:"android.view.View", text: "恭喜您，" },
            next: [],
            operates: {
                send: [
                    { name: "text", mark: { className:"android.view.View", textEndsWith: "已经注册成功！" } , param: { set: "name" } },
                    { name: "get", mark: { name: "register_ok", uri: "api" }, param: { } },
                    // 系统未收到短信，请重新发送短信验证
                ],
                finish: [{ name: "sleep" }],
            },
        },
        HOME: {
            desc: "首页",
            name: "首页", 
            pageid: Env.PageEnum.HOME, 
            // mark: { className:"android.view.View", text: "编辑短信：注册验证" },
            mark: { className:"android.widget.TextView", text: "首页" },
            next: [],
            operates: {
                send: [
                    { name: "click", mark: { className:"android.widget.TextView", text: "搜免费小说 影视 游戏 App" } },
                    { name: "get", mark: { name: "register_ok", uri: "api" }, param: { } },
                    // 系统未收到短信，请重新发送短信验证
                ],
                finish: [{ name: "sleep" }],
            },
        },
    },
};
module.exports = job;


