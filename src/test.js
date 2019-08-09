/**
* @fileOverview 测试文件
* @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
* @author <a href=”tuple@youshui.ren”>Tuple</a>
* @version 0.1
*/

var Env = require('./env');
var Api = require('./api');
var Utils = require('./utils');
var Operate = require('./operate');
var Job = require('./jobs/weibo');


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
      ],
      finish: [{ name: "click", mark: { id: "tv_userinfo" }, param: { indexOf: { tag: "text", try: 10, get: { name: "given_weibo_title", uri: "api" } } } }],
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



