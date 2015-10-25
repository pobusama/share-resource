/*!
 * main
 * @author ydr.me
 * @create 2015-04-29 15:13
 */


'use strict';
//申请俱乐部
exports.getRegister = function (req, res, next) {
    res.render('mobile/user/register.html', {});
};

//登录
exports.getLogin = function (req, res, next) {
    res.render('mobile/user/login.html', {});
};

//申请俱乐部
exports.getApply = function (req, res, next) {
    var $user = req.session.$user;
    var $clubs = req.session.$clubs;

    if (!$user.userId) {
        return res.redirect('/m/user/login/');
    }

    if (!$user.phone) {
        return res.redirect('/m/user/bind/');
    }

    if (!req.query.go && ($clubs.length > 0)) {
        return res.redirect('/m/user/apply/list/');
    }

    res.render('mobile/user/apply.html', {});
};

//申请俱乐部成功
exports.getApplySuccess = function (req, res, next) {
    //return res.json(res.locals);

    res.render('mobile/user/apply-success.html', {});
};

//已开通俱乐部列表
exports.getApplyList = function (req, res, next) {
    res.render('mobile/user/apply-list.html', {});
};

//第三方绑定手机
exports.getBind = function (req, res, next) {
    var $user = req.session.$user;
    if ($user.phone) {
        return res.redirect('/m/user/apply/');
    }
    res.render('mobile/user/bind.html', {});
};

//找回密码
exports.getPassword = function (req, res, next) {
    res.render('mobile/user/password.html', {});
};






