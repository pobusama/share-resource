/*!
 * 桌面端主
 * @author ydr.me
 * @create 2015-09-19 19:09
 */


'use strict';

var request = require('../../utils/').request;


// 主页
exports.displayMain = function (req, res, next) {
    var isMobile = req.session.$ua.isMobile;

    if (isMobile) {
        return res.redirect('/m/');
    }

    res.render('app/index.html');

};

//教学教案

exports.displayTeachingDoc = function (req, res, next) {
    var isMobile = req.session.$ua.isMobile;

    if (isMobile) {
        return res.redirect('/m/');
    }

    res.render('app/teaching/teachingdoc.html');

};

//作业提交

exports.displayHomeWork = function (req, res, next) {
    var isMobile = req.session.$ua.isMobile;

    if (isMobile) {
        return res.redirect('/m/');
    }

    res.render('app/teaching/homework.html');

};

//下载入口

exports.displayDownloadPage = function (req, res, next) {
    var isMobile = req.session.$ua.isMobile;

    if (isMobile) {
        return res.redirect('/m/');
    }

    res.render('app/source/download.html');

};

//课程主页

exports.displayCoursePage = function (req, res, next) {
    var isMobile = req.session.$ua.isMobile;

    if (isMobile) {
        return res.redirect('/m/');
    }

    res.render('app/course/Clanguage.html');

};

//教学团队

exports.displayTeamPage = function (req, res, next) {
    var isMobile = req.session.$ua.isMobile;

    if (isMobile) {
        return res.redirect('/m/');
    }

    res.render('app/teaching/team.html');

};

//在线学习

exports.displayStudyOnline = function (req, res, next) {
    var isMobile = req.session.$ua.isMobile;

    if (isMobile) {
        return res.redirect('/m/');
    }

    res.render('app/course/studyonline.html');

};


//视频学习

exports.displayVideoPage = function (req, res, next) {
    var isMobile = req.session.$ua.isMobile;

    if (isMobile) {
        return res.redirect('/m/');
    }

    res.render('app/course/videostudy.html');

};

//论坛主页

exports.displayBbsHome = function (req, res, next) {
    var isMobile = req.session.$ua.isMobile;

    if (isMobile) {
        return res.redirect('/m/');
    }

    res.render('app/bbs/home.html');

};
