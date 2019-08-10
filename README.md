# 基于AutoJs的安卓自动化测试脚本框架（AutoJson)
## 简介
本程序是一个AutoJs的脚本框架，使用本框架后可以只需要修改JSON配置文件，就能自定义操作流程。目标是让不会写代码的人都能轻松自定义自己的脚本。目前已经实现了微博自动注册，远程获取微博内容，自动发布微博的功能！
### 项目地址：
【https://github.com/bayson/autojs】
### Release: 
【https://github.com/bayson/autojs-release】
### 登陆注册
* 新浪微博（Android,V9.6.3版本）
* 网易邮箱（QQ浏览器,网页注册）
* 今日头条（TODO）
* 抖音（TODO）
* 微信（TODO）
* 天涯（TODO）
### 签到（TODO）
* 百度地图签到
* 大众点评签到
* 叮咚买菜签到
* 飞猪签到里程
* 京东签到京豆
* 京东金融签到钢镚
* 联想签到延保 
* 拼多多签到
* 上海移动和你签到
* 什么值得买签到
* 苏宁易购签到
* 淘宝签到淘金币
* 腾讯wifi管家签到
* 微信读书(TODO)
* 小米商城抢购web(TODO)
* 新浪微博早起打卡(TODO)
* 云闪付签到积分
* 支付宝签到积分
* 支付宝每日花呗红包
* 支付宝体育服务早期打卡(TODO)
### 点赞、关注、收藏（TODO)
* 新浪微博（Android,V9.6.3版本）
### 评价、回复、转发 (TODO)
* 新浪微博（Android,V9.6.3版本）

## 必备条件
1. webpack基于nodejs,电脑上必须安装nodejs.
2. 安卓上安装AutoJs的App: [https://github.com/hyb1996/Auto.js]  AutoJs帮助文档：[https://hyb1996.github.io/AutoJs-Docs/]
## 注意事项
1. 
## 编译步骤
1. git clone https://github.com/bayson/autojs.git
2. cd autojs
3. npm i
4. npm run build
5. 复制 ./dist/新浪微博.js ,  ./dist/网易邮箱.js  到你的AutoJs脚本目录默认是：/sdcard/脚本/
## 使用说明
欢迎使用和提交bug反馈
* 【设备要求】：
* 1.需要root
* 2.安卓5.0以上
* 3.Auto.js软件版本4.0以上

<div align=center><img height="854" width="480" src="https://raw.githubusercontent.com/bayson/autojs/master/resources/Screenshot_20190810-222839.png"/></div>
<br>

### 网易邮箱-注册
* 1.将脚本 ./dist/网易邮箱-注册.js 复制到AutoJs脚本目录下,默认目录是：/sdcard/脚本/
* 2.启动QQ浏览器，并打开https://mail.163.com 网址， 再启动脚本"网易邮箱-注册"即可,
* 3.如果遇到不能识别的页面手动点击就可以

<div align=center><img height="854" width="480" src="https://raw.githubusercontent.com/bayson/autojs/master/resources/Screenshot_20190810-222249.png"/></div>
<br>
<div align=center><img height="854" width="480" src="https://raw.githubusercontent.com/bayson/autojs/master/resources/Screenshot_20190810-222256.png"/></div>
<br>

### 百度地图-签到
* 1.将脚本 ./dist/百度地图-签到.js 复制到AutoJs脚本目录下,默认目录是：/sdcard/脚本/
* 2.直接启动脚本"百度地图-签到"即可,
* 3.如果遇到不能识别的页面手动点击就可以

<div align=center><img height="854" width="480" src="https://raw.githubusercontent.com/bayson/autojs/master/resources/Screenshot_20190810-190455.png"/></div>
<br>
<div align=center><img height="854" width="480" src="https://raw.githubusercontent.com/bayson/autojs/master/resources/Screenshot_20190810-183903.png"/></div>
<br>

### 叮咚买菜-签到
* 1.将脚本 ./dist/叮咚买菜-签到.js 复制到AutoJs脚本目录下,默认目录是：/sdcard/脚本/
* 2.直接启动脚本"叮咚买菜-签到"即可,
* 3.如果遇到不能识别的页面手动点击就可以

<div align=center><img height="854" width="480" src="https://raw.githubusercontent.com/bayson/autojs/master/resources/Screenshot_20190810-222249.png"/></div>
<br>
<div align=center><img height="854" width="480" src="https://raw.githubusercontent.com/bayson/autojs/master/resources/Screenshot_20190810-222256.png"/></div>
<br>


## 感谢/参考：
<a href="https://github.com/hyb1996/Auto.js">hyb1996</a>
<br>
<a href="https://github.com/snailuncle/webpackBaleAutojs">snailuncle</a>
<br>
<a href="https://github.com/bjc5233/autojs">bjc5233</a>
<br>

