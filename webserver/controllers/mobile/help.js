/*!
 * 帮助页
 * @author ydr.me
 * @create 2015-09-24 21:54
 */


'use strict';

// 协议
exports.getAgreement = function (req, res, next) {
    res.render('mobile/help/agreement.html');
};

// 关于我们
exports.getAboutUs = function (req, res, next) {
    res.render('mobile/help/about-us.html');
};

