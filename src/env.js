/**
* @fileOverview 全局变量
* @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
* @author <a href=”tuple@youshui.ren”>Tuple</a>
* @version 0.1
*/


var Env = {

  VERSION: "3.0",
  CLIENT: 'weibo',

  STATUS_NEED_ACTIVE: 1,
  STATUS_NEED_LOGIN: 2,

  log: '',
  curAct: '',
  curTitleContent: '',//详情页的标题
  curComment: '键(shui)盘(jun)侠你们清楚自己在干嘛吗？',
  curName: '',
  deviceIMEI: '',
  nickname: '', //登陆的账号
  curGroupId: 0, //
  curTitle: '', //列表页的标题
  canReply: false,
  mainActName: 'com.sina.weibo.MainTabActivity',
  isLogined: true,
  needExit: false,
  maxReplyCount: 2,
  curReplyCount: 0, //一次可以回复的最大次数
  lastReplyTime: 0,
  curMinReplyIntv: 1800, //30分钟才能回复第二条
  curLoop: false,
  isComment: 1, //0评论，1转发
  curKeyword: null,
  curKeywords: ['十年沧桑谁解'],
  // login
  itemLogin: '11698',
  itemJihuo: '1507',
  token: '01612967355ef542176c2740c0855e2a5921725c4701',
  exceptPhone: '170.171.180.198.165.166',
  curPhone: '', //当前使用的手机号
  curLoginCode: '',
  curHotTextItem: '',
  // console.show(),
  config: {
    debug: false,
    disabled: false,
    canReply: false,
    canReplyDisabled: false,
    exit: false,
    model: 0, //0为趁热点，1为通过搜索指定关键字回复
    groupId: 0,
    topOfGroup: 10,
    groupDelay: 2000,
    subGroupId: -1,
    groupItems: ['推荐', '榜单', '社会', '搞笑', '情感', '时尚', '校园', '摄影', '艺术', '明星', '美女', 'NBA'],
    keywords: ['十年沧桑谁解'],
    addFollowRate: 30,
    showDetialRate: 5,
    maxReplyCount: 2,
    minReplyIntv: 1800,
    loop: false, //循环
    isComment: 1,
    itemLogin: '11698',
    itemJihuo: '1507',
    exceptPhone: '170.171.180.198.165.166',
    token: '01612967355ef542176c2740c0855e2a5921725c4701',
  },


  PageEnum: {
    LOGIN: 1,
    INPUT_CODE: 2,
    ACCOUNT_CONFIRM: 3,
    SELECT_CLASS: 4,
    RECOMMEND: 5,
    SIGEN: 6,
    USER_CENTER: 7,
    DETAIL: 8,
    HOME_HOT: 9,
    MINE: 10,
    SETTING: 11,
    ACCOUNTS: 12,
    HOME_FOLLOW: 13,
    HOME_SEARCH: 14,
    SEARCH: 15,
    SEARCH_HOT: 16,
    SEARCH_TALK: 17,
    SEARCH_TOP: 18,
    SEARCH_SUPTALK: 19,
    HOME_MESSAGE: 20,
    USER_WEIBO: 21,
    EDIT_SHARE: 22,
    ADD_FOLLOW_WITH_SHARE: 23,
    ACCOUNT_ERROR: 24,
    WELCOME_CAMEBACK: 25,
    WRITE_WEIBO:26,
    WELCOME_WEIBO: 27,
    ACCOUNT_ERROR_2:28,
    ACCOUNT_ERROR_3:29,
    ACCOUNT_ERROR_4:30,
    HOME:31,
    ACCOUNT_ERROR_5:30,

  },

  /**
   * 页面的特征码，注意：如果一个页面有多个特征码匹配，以最后一个为准
   */
  get PageMarks() {
    return [
      {
        name: "首页", pageid: this.PageEnum.HOME, mark: { id: "iv_groupStateIndicator", className: "android.widget.ImageView" },
        operates: {
          back:[{name:"back"}],
          finish: [{ name: "swipe" }],
        },
      },
      {
        name: "登录", pageid: this.PageEnum.LOGIN, mark: { id: "", text: "登录注册更精彩", desc: "", className: "android.widget.TextView" },
        operates: {
          config: { loop: 1, },
          init: [
          ],
          jobs: [
            { name: "get", mark: { name: "login_phone", uri: "api" }, param: { set: { name: "phone" } } },
            { name: "set_text", mark: { id: "et_phone" }, param: { get: { name: "phone" } } },
            { name: "click", mark: { id: "bnLogin", text: "获取验证码" } },
          ],
          finish: [],
        },
      },
      {
        name: "请输入验证码", pageid: this.PageEnum.INPUT_CODE, mark: { id: "tv_verification_title", text: "请输入验证码", desc: "", className: "" },
        operates: {
          config: { loop: 10, },
          init: [
          ],
          jobs: [
            { name: "input", mark: { id: "verification_code" }, param: { get: { name: "login_code", uri: "api" } } },
          ],
          finish: [],
        },
      },
      {
        name: "帐号确认", pageid: this.PageEnum.ACCOUNT_CONFIRM, mark: { id: "", text: "帐号确认", desc: "", className: "android.widget.TextView" },
        operates: {
          config: { loop: 1, },
          init: [
          ],
          jobs: [
            // {name:"click",mark:{id:"new_account"},param:{}},
            {name:"click",mark:{id:"login"},param:{}},
          ],
          finish: [],
        },
      },
      {
        name: "选择你感兴趣的分类", pageid: this.PageEnum.SELECT_CLASS, mark: { id: "tv_top_title", text: "选择你感兴趣的分类", desc: "", className: "" },
        operates: {
          config: { loop: 1, },
          init: [
            // {name:"click",mark:{desc:"我"},param:{}},
          ],
          jobs: [
          ],
          finish: [],
        },
      },
      {
        name: "为你推荐以下博主", pageid: this.PageEnum.RECOMMEND, mark: { id: "", text: "为你推荐以下博主", desc: "", className: "" },
        operates: {
          config: { loop: 1, },
          init: [
            // {name:"click",mark:{desc:"我"},param:{}},
          ],
          jobs: [
          ],
          finish: [],
        },
      },
      {
        name: "马上签到", pageid: this.PageEnum.SIGEN, mark: { id: "iv_content", text: "", desc: "", className: "" },
        operates: {
          config: { loop: 1, },
          init: [
            // {name:"click",mark:{desc:"我"},param:{}},
          ],
          jobs: [
          ],
          finish: [{ name: "back" }],
        },
      },
      {
        name: "用户任务中心", pageid: this.PageEnum.USER_CENTER, mark: { id: "titleText", text: "用户任务中心", desc: "", className: "" },
        operates: {
          config: { loop: 1, },
          init: [
            // {name:"click",mark:{desc:"我"},param:{}},
          ],
          jobs: [
          ],
          finish: [{ name: "back" }],
        },
      },
      {
        name: "微博正文", pageid: this.PageEnum.DETAIL,
        mark: { id: "detail_activity_header_title_text", text: "微博正文", desc: "", className: "" },
        operates: {
          config: {},
          init: [
          ],
          jobs: [
            //点击微博详情的关注按钮
            { name: "click", mark: { id: "tv_op_button", text: "关注" } },
            //点击微博详情的赞按钮，两种可能
            { name: "click", mark: { id: "liked", desc: "赞" } },
            { name: "click", mark: { id: "tvButton", text: "赞" } },
            //点击微博详情的转发按钮
            { name: "click", mark: { id: "forward", desc: "转发" } },
            { name: "click", mark: { id: "tvButton", text: "转发" } },
            //点击微博详情的评论按钮
            // {name:"click",mark:{id:"comment",desc:"评论"}},
            // {name:"click",mark:{id:"tvButton",text:"评论"}},
          ],
          finish: [{ name: "back" }],
        }
      },
      {
        name: "我", pageid: this.PageEnum.MINE, mark: { id: "titleText", text: "我", desc: "", className: "" },
        operates: {
          init: [
          ],
          jobs: [
            //取用户昵称,保存到环境变量name
            { name: "text", mark: { id: "tvNick" }, param: { set: "name" } },
            // { name: "click", mark: { id: "rltitleSave" } },
            { name: "click", mark: { desc: "首页" } },
          ],
          finish: [{ name: "back" }],
        },
      },
      {
        name: "设置", pageid: this.PageEnum.SETTING, mark: { id: "titleText", text: "设置", desc: "", className: "" },
        operates: {
          config: { loop: 1, },
          init: [
          ],
          jobs: [
            { name: "click", mark: { id: "accountLayout" } }
          ],
          finish: [],
        },
      },
      {
        name: "帐号管理", pageid: this.PageEnum.ACCOUNTS, mark: { id: "titleText", text: "帐号管理", desc: "", className: "" },
        operates: {
          init: [
          ],
          jobs: [
            { name: "click", mark: { id: "tvAccountName", text: "添加账号" } }
          ],
          finish: [],
        },
      },
      {
        name: "首页热门", pageid: this.PageEnum.HOME_HOT, mark: { id: "tv_groupName", text: "热门", desc: "", className: "" },
        operates: {
          config: { loop: 3, },
          init: [
            // //选择热门栏目
            // { name: "click", mark: { id: "button_more_columns" } },
            // { name: "click", mark: { id: "text_item" }, param: { indexOf: { tag: "text", get: { name: "hot_text_item", uri: "api" } } } },
            // //点击列表，跳到微博详情页面
            // { name: "click", mark: { id: "contentTextView" }, param: { indexOf: -1 } }
          ],
          jobs: [
          ],
          finish: [{ name: "swipe" }],
        },
      },
      {
        name: "首页关注", pageid: this.PageEnum.HOME_FOLLOW, mark: { id: "iv_groupStateIndicator", className: "android.widget.ImageView" },
        operates: {
          config: { loop: 3, },
          init: [
       
          ],
          jobs: [
            // //点击列表，跳到微博详情页面
            // { name: "click", mark: { id: "contentTextView" }, param: { indexOf: -1 } }
            {name:"click", mark:{id:"rltitleSave"}},
            // {name:"exists", mark:{className:"android.widget.TextView",text:"写微博"}},
          ],
          finish: [{ name: "swipe" }],
        },
      },
      // {name: "热点", pageid: this.PageEnum.SEARCH_HOT, mark: {id: "item_text", text:"热点", desc:"", className:"android.widget.TextView"}},
      // {name: "话题", pageid: this.PageEnum.SEARCH_TALK, mark: {id: "item_text", text:"话题", desc:"", className:"android.widget.TextView"}},
      // {name: "榜单", pageid: this.PageEnum.SEARCH_TOP, mark: {id: "item_text", text:"榜单", desc:"", className:"android.widget.TextView"}},
      // {name: "超话", pageid: this.PageEnum.SEARCH_SUPTALK, mark: {id: "item_text", text:"超话", desc:"", className:"android.widget.TextView"}},
      // {name: "首页搜索", pageid: this.PageEnum.HOME_SEARCH, mark: {id: "tv_search_keyword", text:"", desc:"", className:"android.widget.EditText"}},
      {
        name: "首页搜索", pageid: this.PageEnum.HOME_SEARCH, mark: { id: "textView_title", text: "微博热搜", desc: "", className: "android.widget.TextView" },
        operates: {
          config: { loop: 1, },
          init: [
          ],
          jobs: [
            { name: "tap", mark: { id: "tv_search_keyword" } },
          ],
          finish: [{ name: "swipe" }],
        },
      },
      {
        name: "搜索页", pageid: this.PageEnum.SEARCH, mark: { id: "btn_search_or_back", text: "", desc: "", className: "" },
        operates: {
          config: { loop: 1, },
          init: [
          ],
          jobs: [
            { name: "get", mark: { name: "keyword", uri: "api" }, param: { set: { name: "keyword" } } },
            { name: "set_text", mark: { id: "tv_search_keyword" }, param: { get: { name: "keyword" } } },
            { name: "enter" },
          ],
          finish: [{ name: "swipe" }],
        },
      },
      {
        name: "消息", pageid: this.PageEnum.HOME_MESSAGE, mark: { id: "tab_text_view", text: "消息", desc: "", className: "android.widget.TextView" },
        operates: {
          config: { loop: 1, },
          init: [
            // {name:"click",mark:{desc:"我"},param:{}},
          ],
          jobs: [
          ],
          finish: [],
        },
      },
      {
        name: "微博", pageid: this.PageEnum.USER_WEIBO, mark: { id: "titleText", text: "微博", desc: "", className: "" },
        operates: {
          config: { loop: 1, },
          init: [
            // {name:"click",mark:{desc:"我"},param:{}},
          ],
          jobs: [
          ],
          finish: [],
        },
      },
      {
        name: "转发微博", pageid: this.PageEnum.EDIT_SHARE, mark: { id: "titleText", textEndsWith: "发微博" },
        operates: {
          config: { loop: 1, },
          init: [
          ],
          jobs: [
        //勾选同时评论
        { name: "click", mark: { id: "checkbox" } },
        { name: "set_text", mark: { id: "edit_view" }, param: { get: { name: "comment", uri: "api" } } },
        { name: "click", mark: { id: "rltitleSave" } },
          ],
          finish: [],
        },
      },
      {
        name: "加关注才能转发", pageid: this.PageEnum.ADD_FOLLOW_WITH_SHARE, mark: { className: "android.widget.TextView", text: "由于对方的设置，你需要先关注他，才能评论。" },
        operates: {
          jobs: [{ name: "click", mark: { className: "android.widget.TextView", text: "加关注" } }],
        }
      },
      {
        name: "帐号异常", pageid: this.PageEnum.ACCOUNT_ERROR, mark: { className: "android.widget.TextView", text: "帐号异常" },
        operates: {
          jobs: [
            { name: "click", mark: { className: "android.widget.TextView", text: "取消" } },
            // { name: "click", mark: { className: "android.widget.TextView", text: "解除异常" } },
          ],
        }
      },
      {
        name: "好久不见，欢迎回来", pageid: this.PageEnum.WELCOME_CAMEBACK, mark: { id: "tv_top_title", text: "好久不见，欢迎回来" },
        operates: {
          init: [
          ],
          jobs: [
            { name: "click", mark: { id: "next" } },
            { name: "sleep" },
            { name: "click", mark: { id: "next" } },
          ],
          finish: [],
        },
      },
      {
        name: "首页上写微博", pageid: this.PageEnum.WRITE_WEIBO, mark: {className:"android.widget.TextView",text:"写微博"},
        operates: {
          init: [
          ],
          jobs: [
            {name:"click", mark:{className:"android.widget.TextView",text:"写微博"}},
          ],
          finish: [
            //写完后找到刚才的文章
            {name:"click", mark:{id:"tv_userinfo"}, param:{indexOf:{tag:"text",try:10,get:{name:"given_weibo_title",uri:"api"}}}}
          ],
        },
      },
      {
        name: "欢迎继续使用微博", pageid: this.PageEnum.WELCOME_WEIBO, mark: {className:"android.widget.TextView",text:"欢迎继续使用微博"},
        operates: {
          init: [
            
          ],
          jobs: [
            {name:"click", mark:{id:"bt_next",text:"查看推荐"}},
          ],
          finish: [
            //写完后找到刚才的文章
            {name:"click", mark:{id:"tv_userinfo"}, param:{indexOf:{tag:"text",try:10,get:{name:"given_weibo_title",uri:"api"}}}}
          ],
        },
      },
      {
        name: "帐号异常", pageid: this.PageEnum.ACCOUNT_ERROR_2, mark: { className: "android.widget.TextView", text: "解除异常" },
        operates: {
          jobs: [
            { name: "click", mark: { className: "android.widget.TextView", text: "取消" } },
            // { name: "click", mark: { className: "android.widget.TextView", text: "解除异常" } },
          ],
        }
      },
      {
        name: "帐号异常", pageid: this.PageEnum.ACCOUNT_ERROR_3, mark: { className: "android.widget.TextView", text: "知道了" },
        operates: {
          jobs: [
            { name: "click", mark: { className: "android.widget.TextView", text: "知道了" } },
            // { name: "click", mark: { className: "android.widget.TextView", text: "解除异常" } },
          ],
        }
      },
      {
        name: "帐号异常", pageid: this.PageEnum.ACCOUNT_ERROR_4, mark: { id:"tvContent", className: "android.widget.TextView", text: "有内容发送失败，已存入草稿箱" },
        operates: {
          jobs: [
            { name: "click", mark: { desc: "我" } },
            // { name: "click", mark: { className: "android.widget.TextView", text: "解除异常" } },
          ],
        }
      },
      {
        name: "帐号异常，请先验证身份", pageid: this.PageEnum.ACCOUNT_ERROR_5, mark: { id:"titleText", className: "android.widget.TextView", text: "请先验证身份" },
        operates: {
          jobs: [
            { name: "click", mark: { id: "titleLeft" } },
            { name: "click", mark: { id: "tv_title_bar_back" } },
          ],
          finish:[
             {name:"back"}
          ]
        }
      },
    ];
  },
}
module.exports = Env;
