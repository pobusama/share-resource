/*!
 * 路由
 * @author ydr.me
 * @create 2015-04-29 14:32
 */


'use strict';

var express = require('express');
var configs = require('../configs.js');

// 更为详尽配置的静态服务器
var staticOptions = {
    dotfiles: 'ignore',
    etag: true,
    extensions: ['html'],
    index: false,
    maxAge: '30d',
    redirect: true
};

module.exports = function (next, app) {
    var controllers = require('./controllers/');

    app.use(controllers.middleware.strictRouting);
    app.use(controllers.middleware.parseUA);
    app.use(controllers.middleware.readCache);
    app.use(controllers.middleware.checkLogin);

    //desktop页面配置
    //主页
    app.get('/', controllers.desktop.main.displayMain);
    //用户登陆页面
    app.get('/user/login/', controllers.desktop.user.displayLogin);
    //用户注册页面
    app.get('/user/register/', controllers.desktop.user.displayRegister);
    //后台登陆页面
    app.get('/backstage/login/', controllers.desktop.user.displayRegister);
    //教学教案
    app.get('/teaching/teachingdoc/',controllers.desktop.main.displayTeachingDoc);
    //作业提交
    app.get('/teaching/homework/',controllers.desktop.main.displayHomeWork);
    //竞赛报名
    app.get('/competition/register/',controllers.desktop.user.displayCompetitionRegister);
    //下载入口
    app.get('/source/download/',controllers.desktop.main.displayDownloadPage);

    //课程主页
    app.get('/course/Clanguage/',controllers.desktop.main.displayCoursePage);
    //教学团队
    app.get('/teaching/team/',controllers.desktop.main.displayTeamPage);
    //在线学习
    app.get('/course/studyonline/',controllers.desktop.main.displayStudyOnline);
    //视频学习
    app.get('/course/videostudy/',controllers.desktop.main.displayVideoPage);
    //BBS主页
    app.get('/bbs/home/',controllers.desktop.main.displayBbsHome);


    // 程序路由优先，最后静态路由
    app.use('/', express.static(configs.webroot, staticOptions));



    // 路由终点
    app.use(controllers.middleware.clientError);
    app.use(controllers.middleware.serverError);


    next(null, app);
};
