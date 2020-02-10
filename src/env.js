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
  curUsername: '',
  curPassword: '',
  curRegisterCode: '',
  itemRegister: '47028', //网易邮箱
  curDefaultPassword:'123.youshui.Ren',
  curPHoneList:[],
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
    itemRegister: '47028',
    exceptPhone: '170.171.180.198.165.166',
    token: '01612967355ef542176c2740c0855e2a5921725c4701',
  },

  PRIORITY:{
    LEVEL_0:0, //默认级别
    LEVEL_1:1,
    LEVEL_2:2,
    LEVEL_3:3,
    LEVEL_4:4,
    LEVEL_5:5,
    LEVEL_6:6,
    LEVEL_7:7,
    LEVEL_8:8,
    LEVEL_9:9, //最高优先级
  },
  PageEnum: {
    UNKNOW:0,
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
    WRITE_WEIBO: 26,
    WELCOME_WEIBO: 27,
    ACCOUNT_ERROR_2: 28,
    ACCOUNT_ERROR_3: 29,
    ACCOUNT_ERROR_4: 30,
    HOME: 31,
    ACCOUNT_ERROR_5: 32,
    ACCOUNT_ERROR_6: 33,
    REGISTER: 35,
    ACCOUNT_SEND_CONFIRM: 36,
    REGISTER_OK: 37,
    UPDATED:38,
    INPUT_PHONE: 39,
    INPUT_PASSWORD: 40,
    FIND_PASSWORD:41,
    RED_PAGE:42,
    RED_FRIEND_PAGE:43,
    RED_BUY_PAGE:44,
    SHARE:45,
    DELETE_CONFIRM:46,
    LOGIN_CODE:47,
    LOGIN_ACCOUNT:48,
    DELETE_FRAM:49,
  },

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
    RUNNING: 8,
    BEFORE:9,
  },

}
module.exports = Env;
