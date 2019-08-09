# 基于AutoJs的安卓自动化测试脚本框架（AutoJson)
## 简介
本程序是一个AutoJs的脚本框架，使用本框架后可以只需要修改JSON配置文件，就能自定义操作流程。目标是让不会写代码的人都能轻松自定义自己的脚本。目前已经实现了微博自动注册，远程获取微博内容，自动发布微博的功能！
* 新浪微博（Android,V9.6.3版本）
* 网易邮箱（QQ浏览器,网页注册）
* 今日头条（TODO）
* 抖音（TODO）
* 微信（TODO）
* 天涯（TODO）

## 必备条件
1. webpack基于nodejs,电脑上必须安装nodejs.
2. 安卓上安装AutoJs的App: [https://github.com/hyb1996/Auto.js]  AutoJs帮助文档：[https://hyb1996.github.io/AutoJs-Docs/]
## 注意事项
## 编译步骤
1. git clone https://github.com/bayson/autojs.git
2. cd autojs
3. npm i
4. npm run build
5. 复制 ./dist/新浪微博.js ,  ./dist/网易邮箱.js  到你的AutoJs脚本目录
## 使用说明
* 欢迎使用和提交bug反馈
### 设备要求：
* 1.需要root
* 2.安卓5.0以上
* 3.Auto.js软件版本4.0以上

*
### 使用方法：
* 1.将脚本放于AutoJs脚本目录下
* 2.直接启动脚本即可
* 3.暂时不支持解锁手机
## 展示:
<div align=center><img height="1080" width="540" src="https://raw.githubusercontent.com/bayson/autojs/master/resources/autojs_01.png"/></div>
<br>


## 备注：
