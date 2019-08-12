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

var Work = require('../common/work');
var Env = require('../env');

/**
 * 注意：如果一个页面有多个特征码匹配，以最后一个为准
 */
var Job = {
    version: '9.6.3',
    CLIENT: 'weibo',
    package: 'com.sina.weibo',
    activity: "com.sina.weibo.MainTabActivity",

    /**
     * @description 默认配置，自动加载
     */
    get default() {
        return {
            /**
             * @description steps定义当前任务需要完成工作的步骤
             */
            steps: [this.login, this.nickname, this.write, this.logout],
            /**
             * @description 指定某一步骤的最大重复次数
             */
            maxTimes: [-1, -1, 3, -1],
            /**
             * @description 定义可能遇到的页面默认处理方式; next:为强制跳转，pageid:为页面ID，jobs:为具体的执行操作
             */
            someone: [
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.UNKNOW, jobs: this.pages.UNKNOW.operates.next },
                { next: Env.STEP.LOGIN, pageid: Env.PageEnum.LOGIN, jobs: this.pages.LOGIN.operates.login },
                { next: Env.STEP.LOGIN, pageid: Env.PageEnum.INPUT_CODE, jobs: this.pages.INPUT_CODE.operates.code },
                { next: Env.STEP.WRITE, pageid: Env.PageEnum.DETAIL, jobs: this.pages.DETAIL.operates.follow },
                { next: Env.STEP.WRITE, pageid: Env.PageEnum.HOME_HOT, jobs: this.pages.HOME_HOT.operates.write },
                { next: Env.STEP.WRITE, pageid: Env.PageEnum.HOME_FOLLOW, jobs: this.pages.HOME_FOLLOW.operates.write },
                { next: Env.STEP.WRITE, pageid: Env.PageEnum.MINE, jobs: this.pages.MINE.operates.nickname },
                { next: Env.STEP.WRITE, pageid: Env.PageEnum.MINE, jobs: this.pages.MINE.operates.home },
                { next: Env.STEP.WRITE, pageid: Env.PageEnum.WRITE_WEIBO, jobs: this.pages.WRITE_WEIBO.operates.write },
                { next: Env.STEP.WRITE, pageid: Env.PageEnum.EDIT_SHARE, jobs: this.pages.EDIT_SHARE.operates.comment },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.MINE, jobs: this.pages.MINE.operates.setting },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.SETTING, jobs: this.pages.SETTING.operates.accounts },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNTS, jobs: this.pages.ACCOUNTS.operates.add },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_2, jobs: this.pages.ACCOUNT_ERROR_2.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_3, jobs: this.pages.ACCOUNT_ERROR_3.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_4, jobs: this.pages.ACCOUNT_ERROR_4.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_5, jobs: this.pages.ACCOUNT_ERROR_5.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_CONFIRM, jobs: this.pages.ACCOUNT_CONFIRM.operates.finish },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR, jobs: this.pages.ACCOUNT_ERROR.operates.cancel },
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.SIGEN, jobs: this.pages.SIGEN.operates.next },
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.USER_CENTER, jobs: this.pages.USER_CENTER.operates.next },
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
                { pageid: Env.PageEnum.LOGIN, jobs: this.pages.LOGIN.operates.login },
                { pageid: Env.PageEnum.INPUT_CODE, jobs: this.pages.INPUT_CODE.operates.code },
            ],
            someone: [
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.HOME_HOT, jobs: this.pages.HOME_HOT.operates.mine },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.HOME_FOLLOW, jobs: this.pages.HOME_FOLLOW.operates.mine },
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.ACCOUNT_CONFIRM, jobs: this.pages.ACCOUNT_CONFIRM.operates.finish },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR, jobs: this.pages.ACCOUNT_ERROR.operates.cancel },
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.WELCOME_CAMEBACK, jobs: this.pages.WELCOME_CAMEBACK.operates.next },
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.SELECT_CLASS, jobs: this.pages.SELECT_CLASS.operates.next },
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.RECOMMEND, jobs: this.pages.RECOMMEND.operates.next },
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.SIGEN, jobs: this.pages.SIGEN.operates.next },
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.USER_CENTER, jobs: this.pages.USER_CENTER.operates.next },
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.WELCOME_WEIBO, jobs: this.pages.WELCOME_WEIBO.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_2, jobs: this.pages.ACCOUNT_ERROR_2.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_3, jobs: this.pages.ACCOUNT_ERROR_3.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_4, jobs: this.pages.ACCOUNT_ERROR_4.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_5, jobs: this.pages.ACCOUNT_ERROR_5.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_6, jobs: this.pages.ACCOUNT_ERROR_6.operates.next },
            ],
        }

    },
    /**
     * 写微博
     */
    get write() {
        return {
            step: Env.STEP.WRITE,
            must: [
                { isLogined: true, pageid: Env.PageEnum.HOME_FOLLOW, jobs: this.pages.HOME_FOLLOW.operates.write },
                { isLogined: true, pageid: Env.PageEnum.WRITE_WEIBO, jobs: this.pages.WRITE_WEIBO.operates.write },
                { isLogined: true, pageid: Env.PageEnum.EDIT_SHARE, jobs: this.pages.EDIT_SHARE.operates.comment },
            ],
            someone: [],
        }
    },
    /**
     * 退出登录
     */
    get logout() {
        return {
            step: Env.STEP.LOGOUT,
            must: [
                { pageid: Env.PageEnum.HOME_FOLLOW, jobs: this.pages.HOME_FOLLOW.operates.mine },
                { pageid: Env.PageEnum.MINE, jobs: this.pages.MINE.operates.setting },
                { pageid: Env.PageEnum.SETTING, jobs: this.pages.SETTING.operates.accounts },
                { pageid: Env.PageEnum.ACCOUNTS, jobs: this.pages.ACCOUNTS.operates.add },
            ],
            someone: [],
        }
    },
    /**
     * 获取登录昵称
     */
    get nickname() {
        return {
            step: Env.STEP.NICKNAME,
            must: [
                { pageid: Env.PageEnum.HOME_FOLLOW, jobs: this.pages.HOME_FOLLOW.operates.mine },
                { pageid: Env.PageEnum.MINE, jobs: this.pages.MINE.operates.nickname },
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
            mark: { name: "unknow" },
            next: [],
            operates: {
              next: [
                { name: "click", mark: { className: "android.widget.TextView", text:"以后再说" } },
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
            mark: { id: "", text: "登录注册更精彩", desc: "", className: "android.widget.TextView" },
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
                    { name: "set_text", mark: { id: "et_phone" }, param: { get: { name: "phone" } } },
                    { name: "click", mark: { id: "bnLogin", text: "获取验证码" } },
                ],
            },
        },
        INPUT_CODE: {
            desc: "验证码输入页",
            name: "请输入验证码", pageid: Env.PageEnum.INPUT_CODE, mark: { id: "tv_verification_title", text: "请输入验证码", desc: "", className: "" },
            next: [],
            operates: {
                code: [
                    { name: "input", mark: { id: "verification_code" }, param: { get: { name: "login_code", uri: "api" } } },
                ],
                finish: [{ name: "back" }],
            },
        },
        ACCOUNT_CONFIRM: {
            desc: "帐号确认",
            name: "帐号确认", pageid: Env.PageEnum.ACCOUNT_CONFIRM, mark: { id: "", text: "帐号确认", desc: "", className: "android.widget.TextView" },
            next: [],
            operates: {
                finish: [{ name: "back" }],
            },
        },
        DETAIL: {
            desc: "微博正文",
            name: "微博正文", pageid: Env.PageEnum.DETAIL,
            mark: { id: "detail_activity_header_title_text", text: "微博正文", desc: "", className: "" },
            next: [],
            operates: {
                follow: [
                    //点击微博详情的关注按钮
                    { name: "click", mark: { id: "tv_op_button", text: "关注" } },
                ],
                liked: [
                    //点击微博详情的赞按钮，两种可能
                    { name: "click", mark: { id: "liked", desc: "赞" } },
                    { name: "click", mark: { id: "tvButton", text: "赞" } },
                ],
                forward: [
                    //点击微博详情的转发按钮
                    { name: "click", mark: { id: "forward", desc: "转发" } },
                    { name: "click", mark: { id: "tvButton", text: "转发" } },
                ],
                finish: [{ name: "back" }],
            },
        },
        MINE: {
            desc: "我",
            name: "我", pageid: Env.PageEnum.MINE, mark: { id: "titleText", text: "我", desc: "", className: "" },
            next: [],
            operates: {
                nickname: [
                    //取用户昵称,保存到环境变量name
                    { name: "text", mark: { id: "tvNick" }, param: { set: "name" } },
                    //
                ],
                home: [
                    // 首页
                    { name: "click", mark: { desc: "首页" } },
                ],
                setting: [
                    // 点设置
                    { name: "click", mark: { id: "rltitleSave" } },
                ],
                finish: [{ name: "back" }],
            },
        },
        SETTING: {
            desc: "设置",
            name: "设置", pageid: Env.PageEnum.SETTING, mark: { id: "titleText", text: "设置", desc: "", className: "" },
            next: [],
            operates: {
                accounts: [
                    { name: "click", mark: { id: "accountLayout" } }
                ],
                finish: [{ name: "back" }],
            },
        },
        ACCOUNTS: {
            desc: "帐号管理",
            name: "帐号管理", pageid: Env.PageEnum.ACCOUNTS, mark: { id: "titleText", text: "帐号管理", desc: "", className: "" },
            next: [],
            operates: {
                add: [
                    { name: "click", mark: { id: "tvAccountName", text: "添加帐号" } }
                ],
                finish: [{ name: "back" }],
            },
        },
        HOME_FOLLOW: {
            desc: "首页关注",
            name: "首页关注", pageid: Env.PageEnum.HOME_FOLLOW, mark: { id: "iv_groupStateIndicator", className: "android.widget.ImageView" },
            next: [],
            operates: {
                mine: [
                    { name: "click", mark: { desc: "我" } },
                ],
                write: [
                    { name: "click", mark: { id: "rltitleSave" } },
                ],
                search: [
                    { name: "tap", mark: { id: "tv_search_keyword" } },
                ],
                find: [
                    //写完后找到刚才的文章
                    { name: "click", mark: { id: "tv_userinfo" }, param: { indexOf: { tag: "text", try: 10, get: { name: "given_weibo_title", uri: "api" } } } }
                ],
                finish: [{ name: "swipe" }],
            },
        },
        HOME_HOT: {
            desc: "首页热门",
            name: "首页热门", pageid: Env.PageEnum.HOME_HOT, mark: { id: "tv_groupName", text: "热门", desc: "", className: "" },
            next: [],
            operates: {
                mine: [
                    { name: "click", mark: { desc: "我" } },
                ],
                write: [
                    { name: "click", mark: { id: "rltitleSave" } },
                ],
                search: [
                    { name: "tap", mark: { id: "tv_search_keyword" } },
                ],
                select_item: [
                    //选择热门栏目
                    { name: "click", mark: { id: "button_more_columns" } },
                    { name: "click", mark: { id: "text_item" }, param: { indexOf: { tag: "text", get: { name: "hot_text_item", uri: "api" } } } },
                ],
                detail: [//点击列表，跳到微博详情页面
                    { name: "click", mark: { id: "contentTextView" }, param: { indexOf: -1 } }
                ],
                finish: [{ name: "swipe" }],
            },
        },
        SEARCH: {
            desc: "搜索页",
            name: "搜索页", pageid: Env.PageEnum.SEARCH, mark: { id: "btn_search_or_back", text: "", desc: "", className: "" },
            next: [],
            operates: {
                keyword: [
                    { name: "get", mark: { name: "keyword", uri: "api" }, param: { set: { name: "keyword" } } },
                    { name: "set_text", mark: { id: "tv_search_keyword" }, param: { get: { name: "keyword" } } },
                    { name: "enter" },
                ],
                finish: [{ name: "swipe" }],
            },
        },
        EDIT_SHARE: {
            desc: "转发微博",
            name: "转发微博", pageid: Env.PageEnum.EDIT_SHARE, mark: { id: "titleText", textEndsWith: "发微博" },
            next: [],
            operates: {
                comment: [
                    { name: "click", mark: { id: "checkbox" } },
                    { name: "set_text", mark: { id: "edit_view" }, param: { get: { name: "comment", uri: "api" } } },
                    { name: "click", mark: { id: "rltitleSave" } },
                ]
            },
        },
        HOME_SEARCH: {
            desc: "首页搜索",
            name: "首页搜索", pageid: Env.PageEnum.HOME_SEARCH, mark: { id: "textView_title", text: "微博热搜", desc: "", className: "android.widget.TextView" },
            next: [],
            operates: {
                search: [
                    { name: "tap", mark: { id: "tv_search_keyword" } },
                ],
                finish: [{ name: "swipe" }],
            },
        },
        ADD_FOLLOW_WITH_SHARE: {
            desc: "加关注才能转发",
            name: "加关注才能转发", pageid: Env.PageEnum.ADD_FOLLOW_WITH_SHARE, mark: { className: "android.widget.TextView", text: "由于对方的设置，你需要先关注他，才能评论。" },
            next: [],
            operates: {
                follow: [{ name: "click", mark: { className: "android.widget.TextView", text: "加关注" } }],
            },
        },
        ACCOUNT_ERROR: {
            desc: "帐号异常",
            name: "帐号异常", pageid: Env.PageEnum.ACCOUNT_ERROR, mark: { className: "android.widget.TextView", text: "帐号异常" },
            next: [],
            operates: {
                cancel: [
                    { name: "click", mark: { className: "android.widget.TextView", text: "取消" } },
                ]
            },
        },
        WELCOME_CAMEBACK: {
            desc: "好久不见，欢迎回来",
            name: "好久不见，欢迎回来", pageid: Env.PageEnum.WELCOME_CAMEBACK, mark: { id: "tv_top_title", text: "好久不见，欢迎回来" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { id: "next" } },
                    { name: "sleep" },
                    { name: "click", mark: { id: "next" } },
                ]
            },
        },
        WRITE_WEIBO: {
            desc: "首页上写微博",
            name: "首页上写微博", pageid: Env.PageEnum.WRITE_WEIBO, mark: { className: "android.widget.TextView", text: "写微博" },
            next: [],
            operates: {
                write: [
                    { name: "click", mark: { className: "android.widget.TextView", text: "写微博" } },
                ],
            },
        },
        SELECT_CLASS: {
            desc: "选择你感兴趣的分类",
            name: "选择你感兴趣的分类", pageid: Env.PageEnum.SELECT_CLASS, mark: { id: "tv_top_title", text: "选择你感兴趣的分类", desc: "", className: "" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { id: "next" } },
                ]
            },
        },
        RECOMMEND: {
            desc: "为你推荐以下博主",
            name: "为你推荐以下博主", pageid: Env.PageEnum.RECOMMEND, mark: { id: "", text: "为你推荐以下博主", desc: "", className: "" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { id: "next" } },
                ]
            },
        },
        SIGEN: {
            desc: "连续签到领取红包",
            name: "马上参与", pageid: Env.PageEnum.SIGEN, mark: { id: "iv_content" },
            next: [
            ],
            operates: {
                next: [
                    { name: "click", mark: { id: "iv_content" } }
                ],
                finish: [{ name: "back" }],
            },
        },
        USER_CENTER: {
            desc: "用户任务中心",
            name: "用户任务中心", pageid: Env.PageEnum.USER_CENTER, mark: { id: "titleText", text: "用户任务中心", desc: "", className: "" },
            next: [
            ],
            operates: {
                next: [
                    { name: "click", mark: { className: "android.view.View", desc: "连续签到有大红包奖励！做任务获补签机会，越努力越幸运！" }, param: { parent: 1, indexOf: { tag: "clickable", default: 'true' } } }
                ],
                finish: [{ name: "back" }],
            },
        },
        USER_WEIBO: {
            desc: "用户微博",
            name: "微博", pageid: Env.PageEnum.USER_WEIBO, mark: { id: "titleText", text: "微博", desc: "", className: "" },
            next: [],
            operates: {
                finish: [{ name: "back" }],
            },
        },
        HOME_MESSAGE: {
            desc: "消息",
            name: "消息", pageid: Env.PageEnum.HOME_MESSAGE, mark: { id: "tab_text_view", text: "消息", desc: "", className: "android.widget.TextView" },
            next: [],
            operates: {
                finish: [{ name: "back" }],
            },
        },
        WELCOME_WEIBO: {
            desc: "欢迎继续使用微博",
            name: "欢迎继续使用微博", pageid: Env.PageEnum.WELCOME_WEIBO, mark: { className: "android.widget.TextView", text: "欢迎继续使用微博" },
            next: [],
            operates: {
                next: [{ name: "click", mark: { id: "bt_next", text: "查看推荐" } }],
                find: [
                    { name: "click", mark: { id: "tv_userinfo" }, param: { indexOf: { tag: "text", try: 10, get: { name: "given_weibo_title", uri: "api" } } } }
                ],
                finish: [{ name: "swipe" }],
            },
        },
        ACCOUNT_ERROR_2: {
            desc: "帐号异常",
            name: "帐号异常", pageid: Env.PageEnum.ACCOUNT_ERROR_2, mark: { className: "android.widget.TextView", text: "解除异常" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { className: "android.widget.TextView", text: "取消" } },
                ],
                finish: [{ name: "back" }],
            },
        },
        ACCOUNT_ERROR_3: {
            desc: "帐号异常",
            name: "帐号异常", pageid: Env.PageEnum.ACCOUNT_ERROR_3, mark: { className: "android.widget.TextView", text: "知道了" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { className: "android.widget.TextView", text: "知道了" } },
                ],
                finish: [{ name: "back" }],
            },
        },
        ACCOUNT_ERROR_4: {
            desc: "帐号异常",
            name: "帐号异常", pageid: Env.PageEnum.ACCOUNT_ERROR_4, mark: { id: "tvContent", className: "android.widget.TextView", text: "有内容发送失败，已存入草稿箱" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { desc: "我" } },
                ],
                finish: [{ name: "back" }],
            },
        },
        ACCOUNT_ERROR_5: {
            desc: "帐号异常，请先验证身份",
            name: "帐号异常，请先验证身份", pageid: Env.PageEnum.ACCOUNT_ERROR_5, mark: { id: "titleText", className: "android.widget.TextView", text: "请先验证身份" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { id: "titleLeft" } },
                    { name: "click", mark: { id: "tv_title_bar_back" } },
                ],
                finish: [{ name: "back" }],
            },
        },
        ACCOUNT_ERROR_6: {
            desc: "清除数据",
            name: "清除数据", pageid: Env.PageEnum.ACCOUNT_ERROR_6, mark: { id: "btn_restart", text: "清除数据" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { id: "btn_restart" } },
                ],
                skip: [
                    { name: "click", mark: { id: "btn_skip" } },
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
Work.main(Job, afterInit);



