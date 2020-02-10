/**
* @fileOverview 测试文件
* @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
* @author <a href=”tuple@youshui.ren”>Tuple</a>
* @version 0.1
*/

var Env = require('../env');
var Api = require('../common/api');
var Utils = require('../common/utils');
var Operate = require('../common/operate');
const weiboqianbao_hong = "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";
const zhaoqidaka = "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";

var _curRa = new RootAutomator();
    events.on('exit', function () {
      _curRa.exit();
    });
 //获取截屏的权限
 requestScreenCapture();


function test() {
  // var item = {id: "mmmm||kkkkkkkk", text: "微博||我们一起||smmkkksss", desc: "555555555", className: "444444||mm5888885" };
  let item = {
    name: "微博正文", pageid: Env.PageEnum.DETAIL,
    mark: { id: "detail_activity_header_title_text", text: "微博正文", desc: "", className: "" },
    operates: {
      config: { loop: 1 },
      init: [],
      jobs: [
        //点击微博详情的关注按钮
        // { name: "click", mark: { id: "tv_op_button", text: "关注" } },
        //点击微博详情的赞按钮，两种可能
        // { name: "click", mark: { id: "liked", desc: "赞" } },
        // { name: "click", mark: { id: "tvButton", text: "赞" } },
        //点击微博详情的转发按钮
        // { name: "click", mark: { id: "forward", desc: "转发" } },
        // { name: "click", mark: { id: "tvButton", text: "转发" } },
        //点击微博详情的评论按钮
        // {name:"click",mark:{id:"comment",desc:"评论"}},
        // {name:"click",mark:{id:"tvButton",text:"评论"}},
        // {name:"swipe"},
        // {name:"swipe",param:{count:-1}},
        // {name:"swipe",param:{count:0}},
        // {name:"swipe",param:{count:5}},
        // {name:"swipe",param:{count:"1"}},
        // {name:"refresh"},
        // {name:"sleep"},
        // {name:"sleep",param:{delay:-1}},
        // {name:"sleep",param:{delay:0}},
        // {name:"sleep",param:{delay:500}},
        // {name:"sleep",param:{delay:""}},
        // {name:"desc",mark:{id:"contentTextView"}},
        // {name:"text",mark:{id:"tv_groupName"}},
        // {name:"text",mark:{id:"tvNick"},param:{set:"name"}},
        // {name:"set",mark:{name:"name"},param:{default:"surpaimb"}},
        // {name:"set",mark:{name:"title_content"},param:{default:"title is ok"}},
        // {name:"get",mark:{name:"title_content"}},
        // {name:"get",mark:{name:"name"}},
        // {name:"get",mark:{name:"keyword",uri:"api"},param:{set:{name:"keyword"}}},
        // {name:"get",mark:{name:"keyword",uri:"api"}},
        // {name: "set_text", mark:{id:"tv_search_keyword"},param:{get:{name:"keyword"}}},
        // {name:"enter"},
        // {name:"desc",mark:{className:"android.view.ViewGroup",desc:"我"}},
        // {name:"tap",mark:{className:"android.view.ViewGroup",desc:"我"}},
        // {name:"input",mark:{id:"edit_view"},param:{type:"reply"}}, //type:reply|code
        // {name:"get",mark:{name:"login_phone",uri:"api"},param:{set:{name:"phone"}}},
        // {name:"set_text",mark:{id:"et_phone"},param:{get:{name:"phone"}}},
        // {name:"click", mark:{id:"bnLogin",text:"获取验证码"}},
        // // {name:"get",mark:{name:"login_code",uri:"api"},param:{set:{name:"login_code"}}},
        // {name:"input",mark:{id:"verification_code"},param:{get:{name:"login_code",uri:"api"}}},
        // { name: "click", mark: { id: "next" } },
        // { name: "sleep" },
        // { name: "click", mark: { id: "next" } },
        // { name: "click", mark: { id: "contentTextView" }, param: { indexOf: -1 } },

        // {name:"click", mark:{id:"button_more_columns"}},
        // {name:"click", mark:{id:"text_item"}, param:{indexOf:{tag:"text",get:{name:"hot_text_item",uri:"api"}}}},

        // {name:"click", mark:{id:"rltitleSave"}},
        // {name:"exists", mark:{id:"iv_groupStateIndicator"}},
        // {name:"exists", mark:{id:"tv_groupName"}},
        // {name:"exists", mark:{className:"android.widget.TextView",text:"写微博"}},
        // {name:"click", mark:{className:"android.widget.TextView",text:"写微博"}},
        // {name:"exists", mark:{desc:"写微博"}},

        // { name: "click", mark: { id: "checkbox" } },
        // { name: "set_text", mark: { id: "edit_view" }, param: { get: { name: "comment", uri: "api" } } },
        // { name: "click", mark: { id: "rltitleSave" } },

        // {name:"click", mark:{id:"tv_content1"}, param:{indexOf:{tag:"text",try:10,get:{name:"given_weibo_title",uri:"api"}}}},
        //寻找指定的文章
        // {name:"click", mark:{id:"tv_userinfo"}, param:{indexOf:{tag:"text",try:10,get:{name:"given_weibo_title",uri:"api"}}}},
        // failed {name:"click", mark:{id:"tv_content1"}, param:{indexOf:{tag:"textContains", try:10,get:{name:"given_weibo_title",uri:"api"}}}},
        // 进入自己发布的文件列表
        // { name: "back"},
        // {name:"swipe"},
        // { name: "image", mark: { base64: weiboqianbao_hong }}
        // { name: "input", mark:{ className:"android.widget.TextView", text: "取消"  },param:{get:{default:"mail.163.com"},parent:1,indexOf:{tag:"className", default:"android.view.View"}}},
        // { name: "sleep"},
        // { name: "tap", mark:{ className:"android.widget.TextView", text: "进入"}},
        // { name :"exists", mark:{className:"com.tencent.mtt.browser.homepage.view.fastlink.g", text: "直播交友"}},
        // { name :"exists", mark:{text: "进入"}},
        { name: "exists", mark: { className:"android.widget.Button", desc:"关注" } }, //喜欢
        { name: "exists", mark: { className:"android.widget.ImageView", descStartsWith:"未选中，" } }, //喜欢
        { name: "tap", mark: { className:"android.widget.ImageView", descStartsWith:"未选中，" } }, //喜欢
        { name: "click", mark: { className:"android.widget.ImageView", descStartsWith:"未选中，" } }, //喜欢
        { name: "swipe"},
      ],
      // finish: [{ name: "click", mark: { id: "tv_userinfo" }, param: { indexOf: { tag: "text", try: 10, get: { name: "given_weibo_title", uri: "api" } } } }],
    }
  };

  //循环执行run
  if (!!item && !!item.operates && !!item.operates.jobs) {
    let loops = 1;
    if (!!item.operates.config.loop && item.operates.config.loop > -1) {
      loops = item.operates.config.loop;
    }
    while (loops > 0) {
      loops -= 1;
      for (let im of item.operates.jobs) {
        console.log('loop job:', loops, JSON.stringify(im));
        // if (Operate.isPage(item.mark)) {
        if (true) {
          let rs = Operate.doFun(im);
          toast(rs);
          console.log('do fun return', rs);
        } else {
          console.log('not in right page:', item.name);
          break;
        }
      }
      sleep(500);
    }
  }

  console.log('curName:', Env.curName);
  console.log('curTitleContent:', Env.curTitleContent);
  console.log('curKeyword:', Env.curKeyword);
  console.log('curHotTextItem:', Env.curHotTextItem);

  // var ls = Operate.parseItem(item);
  // console.log("length:"+ls.length+":"+JSON.stringify(ls));
}


test();



