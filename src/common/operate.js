/**
 * @fileOverview 定义可以的操作
 * @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
 * @author <a href=”tuple@youshui.ren”>Tuple</a>
 * @version 0.1
 * 
 */

/** 
 * get 获取本地或者远程文本并写到全局变量，
 * set_text 设置控件的text属性，
 * click 点击这个按钮，
 * input OneByOne向控件输入文字，
 * swipe 滑动页面，
 * sleep 暂停，
 * refresh 下拉刷新页面，
 * back 点击Android的返回键，
 * text 获取控件的text属性值，
 * desc 获取控件的desc描述值，
 * tap 点击控件位置的屏幕，
 * enter 触发回车，
 * image 通过图片搜索控件
 *    { name: "image", mark: { base64: wbqianbao_logo }, param:{action:"tap"} },
 * 函数可以扩展
 */

var Utils = require('./utils');
var Funs = require('./funs');
var Api = require('./api');
var Env = require('../env');

var operate = {
    /**
     * 获取当前页面,OK
     * @param {*} pages 
     */
    curPage: function (pages) {
        // var result = [];
        let result = { name: '', pageid: 0 };
        // pages.forEach((item, index, arr) => {
        //     if (this.doExists(item.mark)) {
        //         result = item;
        //     }
        // })
        // console.log(JSON.stringify(pages));
        for (let k in pages) {
            if (this.doExists(pages[k].mark)) {
                // 增加优先级排序，区别有同样标志的页面
                if(!Utils.isNull(pages[k].priority) && pages[k].priority < result.priority)
                {
                    console.log('same mark and priority lower',result.name, pages[k].name);
                }else{
                    result = pages[k];
                }
            }
        }
        return result;
    },

    /**
     * 获取下一个步骤
     * @param {*} pages 
     */
    nextStep: function (pageid, pages) {
        // var result = [];
        // console.log('nextStep:',pageid,JSON.stringify(pages));
        let result = { next: 0, pageid: 0, jobs: [] };
        for (let k in pages) {
            let item = pages[k];
            if (item.pageid === pageid) {
                result = item;
            }
        }
        return result.next;
    },

    /**
     * 判断是否为指定页面,OK
     * @param {*} mark 
     */
    isPage: function (mark) {
        return this.doExists(mark);
    },

    /**
     * 
     * 根据传入的属性，构建查找到对应节点的对象,OK
     * 
     * @param {*} item 
     */
    build: function (item) {
        // let funNames = ['id','text','desc','className','depth','textStartsWith','textEndsWith'];
        let target = null;
        if (Utils.isNull(item.name)) {
            for (let k in item) {
                let v = item[k];
                if (v != "" && v != null && v != undefined) {
                    if (!!target) {
                        target = eval('target.' + k + '(v)');
                    } else {
                        target = eval(k + '(v)');
                    }
                    // console.log('build target:'+JSON.stringify(target));
                }
            }
        }
        return target;
    },
    /**
     * 支持更复杂的或者表达式，目前不启用
     * @param {*} item 
     */
    parseItem: function (item) {
        let obj = JSON.parse(JSON.stringify(item));
        let t = 1;
        for (let k in item) {
            let v = item[k];
            if (v != "" && v != null && v != undefined) {
                obj[k] = v.split('||');
                // t *= Math.pow(2,obj[k].length-1);
                t *= obj[k].length;
            }
        }
        // console.log(t);
        // console.log(JSON.stringify(obj));
        let ls = Utils.fill(t, item);

        for (let k in obj) {
            let v = obj[k];
            // console.log(k);
            // console.log(JSON.stringify(v));
            if (Array.isArray(v)) {
                // let n = t / v.length;
                // let m = v.length;
                for (let m = 0; m < v.length; m += 1) {
                    // console.log("m:"+m);
                    for (let n = 0; n < t / v.length; n += 1) {
                        // console.log("n:"+n);
                        // console.log("v[m]:"+v[m]);
                        let i = m * (t / v.length) + n;
                        ls[i][k] = v[m];
                        // console.log("ls["+i+"]["+k+"]:"+ls[i][k]);
                    }

                }
            } else {
                for (let m = 0; m < t; m += 1) {
                    ls[m][k] = v;
                }
            }
            // console.log(JSON.stringify(ls));
        }
        return ls;
    },


    /**
     * 根据传入的属性，查找对应的节点并返回,OK
     * @param {*} mark 
     * @param {*} param 
     */
    findNode: function (mark, param) {
        let target = null;
        // 有多个同样的，或者只有一个但是需要向上一级获取子节点
        if (!!param && !Utils.isNull(param.indexOf)) {
            //需要向上一级获取子节点
            if (!Utils.isNull(param.parent) && param.parent > 0) {
                target = this.build(mark).findOne();
                let pLen = param.parent;
                while (pLen > 0) {
                    target = target.parent();
                    pLen--;
                }
                target = target.children();
            } else {
                target = this.build(mark).find();
            }
            //有多个同样的，根据param.indexOf过滤节点,选择一个
            // {name:"click", mark:{id:"tv_userinfo"}, param:{indexOf:{tag:"text",try:10,get:{name:"given_weibo_title",uri:"api"}}}},
            // {name:"click", mark:{id:"tv_userinfo"}, param:{indexOf:{tag:"text",try:10,default:"测试位置"}}},
            target = this.indexOfNode(mark, param, target);
        } else {
            //只会有一个的情况
            target = this.build(mark).findOnce();
        }
        if (!target) {
            console.log('can not find ctrl', JSON.stringify(mark), JSON.stringify(param));
        }
        return target;

    },

    indexOfNode: function (mark, param, target) {
        //没有找到尝试向上滚动一下找找
        let maxTry = 1;
        if (!Utils.isNull(param.indexOf.try) && param.indexOf.try > -1) {
            maxTry = param.indexOf.try;
        }
        let tryt = maxTry;
        while (tryt > 0 && target.length <= 0) {
            // console.log('find node try down',tryt,target.length);
            this.doSwipe({}, { count: 1 });
            target = this.build(mark).find();
            tryt--;
        }
        // 找到了处理一下
        if (target.length > 0) {
            if (typeof param.indexOf === 'number') {
                //取多个里的指定个
                if (param.indexOf == -1 || param.indexOf >= target.length) {
                    target = target[target.length - 1];
                } else {
                    target = target[param.indexOf];
                }
            } else if (typeof param.indexOf === 'object'
                && !Utils.isNull(param.indexOf.tag) 
            ) {
                if (typeof param.indexOf.get === 'object') {
                    let str = this.doGet(param.indexOf.get);
                    target = eval('target.findOne(' + param.indexOf.tag + "(str))");
                } else if (!Utils.isNull(param.indexOf.default)) {
                    let str = param.indexOf.default;
                    // console.log('find node str:',str);
                    target = eval('target.findOne(' + param.indexOf.tag + "(str))");
                } else {
                    target = target[0];
                }
            } else {
                target = target[0];
            }
        } else {
            target = null;
        }
        //移动一段距离
        while (maxTry - tryt > 0) {
            // console.log('find node try up',tryt);
            this.doSwipe({}, { count: 1, isUp: true });
            tryt++;
        }
        return target;
    },
    /**
     * 调用click执行点击操作,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doClick: function (mark, param) {
        console.log('do click');
        let target = this.findNode(mark, param);
        if (!!target) {
            if (target.clickable()) {
                return target.click();
            } else {
                if (!!param && param.clickChild) {
                    return this.clickChild(target);
                } else {
                    return this.clickParent(target);
                }
            }
        } else {
            console.log('not do click');
        }
        return false;
    },
    /**
     * 调用tap点击界面,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doTap: function (mark, param) {
        console.log('do tap');
        let target = this.findNode(mark, param);
        if (!!target) {
            Tap(target.bounds().centerX(), target.bounds().centerY());
            sleep(500);
            Tap(target.bounds().centerX() + 1, target.bounds().centerY()) + 1;
            Tap(target.bounds().centerX() - 1, target.bounds().centerY()) - 1;
            Tap(target.bounds().centerX() + 2, target.bounds().centerY()) + 2;
            Tap(target.bounds().centerX() - 2, target.bounds().centerY()) - 2;
            return true;
        } else {
            console.log('not do tap');
        }
        return false;
    },
    /**
     * 输入到控件,只支持英文和字母,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doInput: function (mark, param) {
        console.log('do input');
        let target = this.findNode(mark, param);
        // console.log('do input', JSON.stringify(target));
        if (!!target) {
            Tap(target.bounds().centerX(), target.bounds().centerY());
            sleep(1000);
            let name = {name:"login_code"};
            if (!!param && !Utils.isNull(param.get)) {
                name = param.get;
            }
            let str = this.doGet(name);
            if (!!str) {
                Text(str);
                sleep(random(500,1000));
                // KeyCode('KEYCODE_ENTER');
                // KeyCode('KEYCODE_SEARCH');
                return true;
            }
        } else {
            console.log('not do input');
        }
        return false;
    },
    /**
     * 一个一个输入到控件,只支持英文和字母,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doKeycode: function (mark, param) {
        console.log('do input');
        let target = this.findNode(mark, param);
        // console.log('do input', JSON.stringify(target));
        if (!!target) {
            Tap(target.bounds().centerX(), target.bounds().centerY());
            sleep(1000);
            let name = {name:"login_code"};
            if (!!param && !Utils.isNull(param.get)) {
                name = param.get;
            }
            let str = this.doGet(name);
            if (!!str) {
                let strArray = str.split("");
                if (strArray.length > 0) {
                    // setText(strArray[0]);
                    Text(strArray[0]);
                    sleep(random(500,1000));
                }
                for (let i = 1; i < strArray.length; i++) {
                    let char = strArray[i];
                    // input(char);
                    Text(char);
                    sleep(random(500, 1000));
                }
                return true;
            }
        } else {
            console.log('not do input');
        }
        return false;
    },
    /**
     * 设置控件内容,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doSetText: function (mark, param) {
        console.log('do set text');
        let target = this.findNode(mark, param);
        if (!!target) {
            let name = { name: 'comment' };
            if (!!param && !Utils.isNull(param.get)) {
                name = param.get;
            }
            // let str = Api.postReplyMsg();
            let str = this.doGet(name);
            console.log('do set text get '+name.name+':'+str);
            if (!!str) {
                return target.setText(str);
            }
        } else {
            console.log('not do set text');
        }
        return false;
    },
    /**
     * 获取控件text内容,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doText: function (mark, param) {
        console.log('do text');
        let target = this.findNode(mark, param);
        if (!!target) {
            let name = { name: "title_content" };
            if (!!param && !Utils.isNull(param.set)) {
                name = param.set;
            }
            let str = target.text();
            this.doSet(name, { default: str });
            console.log(str.substr(0, 100));
            return str;
        } else {
            console.log('not do text');
        }
        return null;
    },
    /**
     * 获取控件desc内容,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doDesc: function (mark, param) {
        console.log('do desc');
        let target = this.findNode(mark, param);
        if (!!target) {
            Env.curTitleContent = target.desc();
            console.log(Env.curTitleContent.substr(0, 100));
            return target.desc();
        } else {
            console.log('not do desc');
        }
        return null;
    },
    /**
     * 向下滚动,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doSwipe: function (mark, param) {
        //滚动
        console.log('do swipe');
        let rx = random(200, 400);
        let rm = -1;
        if (!!param && !Utils.isNull(param.count) && param.count > -1) {
            rm = parseInt(param.count);
        }
        if (rm == -1 || rm == undefined || rm == null || rm == "") {
            rm = random(1, 3);
        }
        let isUp = false;
        if (!!param && !Utils.isNull(param.isUp)) {
            isUp = param.isUp;
        }
        while (rm > 0) {
            console.log('swipe:' + rm, isUp);
            if (isUp) {
                Swipe(rx + random(0, 25), 180 + random(0, 100), rx + random(0, 29), 580 + random(0, 158), 200 + random(0, 200));
            } else {
                Swipe(rx + random(0, 29), 580 + random(0, 158), rx + random(0, 25), 180 + random(0, 100), 200 + random(0, 200));
            }
            sleep(random(500, 1000));
            rm -= 1;
        }
        return true;
    },

    /**
     * 刷新页面,Ok
     */
    doRefresh: function (mark, param) {
        console.log('do refresh');
        //下拉刷新
        Swipe(310, 250, 310, 600);
        // Swipe(310 + random(0, 5), 400 + random(0, 15), 310 + random(0, 25), 700 + random(0, 10));
        sleep(1000 + random(0, 2000));
        return true;
    },
    /**
     * 执行回退操作,Ok
     * @param {*} mark 
     * @param {*} param 
     */
    doBack: function (mark, param) {
        console.log('do back');
        back();
        return true;
    },
    /**
     * 执行sleep,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doSleep: function (mark, param) {
        let rm = -1;
        if (!!param && !Utils.isNull(param.delay) && param.delay > -1) {
            rm = parseInt(param.delay);
        }
        if (rm == -1 || rm == undefined || rm == null || rm == "") {
            rm = random(1000, 2000);
        }
        console.log('do sleep', rm);
        sleep(rm);
        return true;
    },
    doEnter: function () {
        console.log('do enter');
        KeyCode("KEYCODE_ENTER");
    },
    /**
     * 等待控件出现
     * @param {*} mark 
     * @param {*} param 
     */
    doWait: function (mark, param) {
        console.log('do wait for');
        let target = this.build(mark);
        let msg = 'Wait For';
        if (!Utils.isNull(mark.text)) {
            msg += ':Text:' + mark.text;
        }
        if (!Utils.isNull(mark.desc)) {
            msg += ':Desc:' + mark.desc;
        }
        if (!Utils.isNull(mark.id)) {
            msg += ':Id:' + mark.id;
        }
        console.log(msg);
        toast(msg);
        return target.waitFor();
    },
    /**
     * 执行shell命令
     * @param {*} mark
     * @param {*} param
     */
    doShell: function (mark, param) {
        console.log('do shell');
        let rs = { code: -1 };
        // console.log(JSON.stringify(param));
        if (!!param && !Utils.isNull(param.cmd)) {
            let root = false;
            if (!Utils.isNull(param.root) && param.root === true) {
                root = true;
            }
            rs = shell(param.cmd, root);
            if (rs.code == 0) {
                console.log("run shell success", JSON.stringify(rs));
            } else {
                console.log("run shell failed", JSON.stringify(rs));
            }
        }
        return rs.code == 0;
    },
    /**
     * 点击指定图片
     * @param {*} mark 
     * @param {*} param 
     */
    doImage: function (mark, param) {
        console.log('do image');
        let img = null;
        try {
            if (!Utils.isNull(mark.path)) {
                // console.log('image read from path');
                if (files.isFile(mark.path))
                    img = images.read(mark.path)
            }
            if (!Utils.isNull(mark.base64)) {
                // console.log('image from base64');
                img = images.fromBase64(mark.base64);
            }
            if (!Utils.isNull(mark.url)) {
                // console.log('image load from url');
                img = images.load(mark.url);
            }
            if (img != null) {
                let p = findImage(captureScreen(), img);
                if (p) {
                    let x = p.x + img.getWidth() / 2;
                    let y = p.y + img.getHeight() / 2;
                    console.log("find image: ", p, img.getWidth(), img.getHeight(), x, y);
                    if(!!param && !Utils.isNull(param.action) && Utils.titleCase(param.action) == 'Tap'){
                        Tap(x, y);
                        sleep(1000);
                    }
                    return true;
                } else {
                    console.log("not find image");
                    return false;
                }
            }
            console.log("not find image");
            return false;
        } catch (error) {
            console.log("do image in catch", error);
            return false;
        }

    },
    /**
     * 一直返回true
     * @param {*} mark 
     * @param {*} param 
     */
    doUnknow:function(mark,param){
        return true;
    },
    /**
     * 
     * 根据传入的属性，判断对应的节点是否存在,OK
     * 
     * @param {*} mark 
     */
    doExists: function (mark, param) {
        // console.log('do exists');
        if (!Utils.isNull(mark.name)) {
            return this.doFun(mark);
            // return eval('this.do'+Utils.titleCase(mark.name)+'(mark.mark, param)');
        } else {
            let target = this.build(mark);
            // console.log(this.build(mark).exists());
            let rs = !!target ? target.exists() : false;
            console.log('do exists:',rs);
            return rs;
        }
    },
    /**
     * 换IP,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doFly: function (mark, param) {
        console.log('do fly');
        let rm = -1;
        if (!!param && !Utils.isNull(param.delay) && param.delay > -1) {
            rm = parseInt(param.delay) * 1000;
        }
        if (rm == -1 || rm == undefined || rm == null || rm == "") {
            rm = random(30000, 60000);
        }
        //开启飞行模式
        Funs.closeFly();
        sleep(rm);
        //关闭飞行模式
        Funs.openFly();
        return true;
    },
    /**
     * 点击父控件,OK
     * @param {*} target 
     */
    clickParent: function (target) {
        if (!!target) {
            let count = target.depth();
            // console.log('depth:'+count);
            while (count > 0 && target != null) {
                if (target.clickable()) {
                    target.click();
                    count = -1;
                    break;
                } else {
                    if (!!target.parent()) {
                        target = target.parent();
                        count -= 1;
                    } else {
                        count = -1;
                        break;
                    }
                }
            }
            if (count == -1) {
                return true;
            }
        } else {
            console.log('not click parent');
        }
        return false;
    },
    /**
     * 
     * 点击子控件
     * 
     * @param {*} target 
     */
    clickChild: function (target) {
        if (!!target) {
            if (target.clickable()) {
                return target.click();
            } else {
                target.children().forEach(child => {
                    if (child.clickable()) {
                        return child.click();
                    }
                });
            }
        } else {
            console.log('not click child');
        }
        return false;
    },
    /**
     * 设置全局变量
     * @param {*} mark 
     * @param {*} param 
     */
    doSet: function (mark, param) {
        console.log('do set');
        if (!!mark && !Utils.isNull(mark.name)) {
            let valName = "cur" + Utils.titleCase(mark.name);
            let value = '';
            if (!!param && !Utils.isNull(param.default)) {
                value = param.default;
            }
            return eval("Env." + valName + "=value;");
        }
        return null;
    },
    /**
     * 获取全局变量的内容或者调用指定API获取内容并设置全局变量
     * @param {*} mark 
     * @param {*} param 
     */
    doGet: function (mark, param) {
        console.log('do get');
        let result = null;
        //增加默认值,默认值写在mark里
        if (!!mark && !Utils.isNull(mark.default)){
            result = mark.default;
        }
        if (!!mark && !Utils.isNull(mark.name)) {

            let valName = "Env.cur" + Utils.titleCase(mark.name);
            if (!Utils.isNull(mark.uri)) {
                if (mark.uri == 'api') {
                    valName = Utils.titleCase(mark.uri) + "." + "get" + Utils.titleCase(mark.name) + "();";
                }
                let rs = eval(valName);
                let setName = { name: mark.name };
                if (!!param && !Utils.isNull(param.set)) {
                    setName = param.set;
                }
                this.doSet(setName, { default: rs });
                return rs;
            } else {
                return eval(valName);
            }
        }
        return result;
    },
    /**
       * 调用指定名称的函数,OK
       * @param {*} name 
       * @param {*} mark 
       * @param {*} params 
       */
    doFun: function ({ name, mark, param }) {
        let delay = 1000;
        if (!!param && param.delay > -1) {
            delay = param.delay;
        }
        sleep(delay);
        if (!!name) {
            let funName = "do" + Utils.titleCase(name);
            // 增加循环执行，解决某些标记问题
            let loops = 1;
            let result = false;
            if(!!param && !Utils.isNull(param.loops) && param.loops > 1){
                loops = param.loops;
            }
            while(loops > 0){
                result = eval("this." + funName + "(mark,param);");
                loops--;
            }
            return result;
        } else {
            console.log('not do fun:' + name);
        }
    },
    delay: function () {
        let type = arguments[0] === false ? false : true;
        let delay = typeof (arguments[0]) === "number" ? arguments[0] : 1000;
        if (type) {
            sleep(delay);
            console.log('delay', delay);
        } else {
            console.log('not delay');
        }
    }
}

module.exports = operate;


