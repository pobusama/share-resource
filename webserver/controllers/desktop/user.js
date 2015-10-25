/*!
 * main
 * @author ydr.me
 * @create 2015-04-29 15:13
 */


'use strict';

var configs = require('../../../configs.js');
var request = require('../../utils/').request;
var number = require('ydr-utils').number;
var qs = require('querystring');




// 用户登陆
exports.displayLogin = function (req, res, next) {

    res.render('app/user/login.html');

};

// 用户注册
exports.displayRegister = function (req, res, next) {

    res.render('app/user/register.html');

};

// 后台登陆页面
exports.displayRegister = function (req, res, next) {

    res.render('app/backstage/login.html');

};

// 竞赛注册
exports.displayCompetitionRegister = function (req, res, next) {

    res.render('app/competition/register.html');

};

