/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-09-21 14:02
 */


'use strict';
var configs = require('../../configs.js');


/**
 * 登录
 * @param req
 * @param res
 * @param ret
 */
exports.login = function (req, res, ret) {
    var remember = req.body.remember || [];
    var isRemember = remember.length > 0;

    ret.userAvatar = ret.userAvatar || 'http://st.lv-guanjia.com/res/img/default_avatar.png';
    ret.isRemember = isRemember;
    req.session.$user = res.locals.$user = ret;

    var signArr = [ret.userId, ret.token, isRemember ? 1 : 0];

    if (isRemember) {
        res.cookie('user', signArr.join('\n'), {
            maxAge: configs.cookie.expires,
            httpOnly: true,
            path: '/'
        });
        res.clearCookie(configs.cookie.userLoginTryTimesKey, {
            path: '/'
        });
    }
};


/**
 * 登出
 * @param req
 * @param res
 */
exports.logout = function (req, res) {
    req.session.$user = res.locals.$user = {
        userId: 0
    };
    res.clearCookie('user', {
        path: '/'
    });
};

