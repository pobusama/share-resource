/*!
 * 控制器中间件
 * @author ydr.me
 * @create 2015-04-29 14:33
 */


'use strict';

var urlHelper = require('url');
var REG_ENDXIE = /(\/|\.[^\.\/]+)$/;
var cache = require('ydr-utils').cache;
var configs = cache.get('app.configs');
var request = require('../utils/').request;
var howdo = require('howdo');
var REG_API = /^\/api\//i;


// 严格 url
exports.strictRouting = function (req, res, next) {
    var urlParser = urlHelper.parse(req.originalUrl);
    var pathname = urlParser.pathname;
    var search = urlParser.search;

    res.set('x-frame-options', 'sameorigin');
    res.set('x-ua-compatible', 'IE=Edge,chrome=1');

    if (!REG_ENDXIE.test(pathname)) {
        return res.redirect(pathname + '/' + (search ? search : ''));
    }

    next();
};


// 读取缓存
exports.parseUA = function (req, res, next) {
    if (REG_API.test(req.url)) {
        return next();
    }

    var ua = req.headers['user-agent'];
    var isMobile = /mobile|iphone|ipad|ipod|andorid/i.test(ua);
    var isWeixin = /MicroMessenger\b/i.test(ua);
    var isDangkr = /dangkr\b/.test(ua);
    var isIOS = /iphone|ipod|ipad/i.test(ua);
    var isAOS = /android/i.test(ua);

    res.locals.$ua = req.session.$ua = {
        isMobile: isMobile,
        isWeixin: isWeixin,
        isDangkr: isDangkr,
        isIOS: isIOS,
        isAOS: isAOS
    };
    next();
};

// 读取缓存
exports.readCache = function (req, res, next) {
    res.locals.$url = urlHelper.parse(req.originalUrl, true, true);
    res.locals.$configs = configs;
    next();
};


// 检查登录
exports.checkLogin = function (req, res, next) {
    if (REG_API.test(req.url)) {
        return next();
    }

    if (req.session.$user && req.session.$user.userId) {
        res.locals.$user = req.session.$user;
        res.locals.$clubs = req.session.$clubs;
        next();
    } else {
        // 检查 cookie
        var userIdToken = req.cookies.user || '';
        var arr = userIdToken.split(/\n/);

        if (arr.length === 3) {
            howdo
                .task(function (done) {
                    request.get({
                        url: '/services/userlogin/getUserInfo.do',
                        query: {
                            userId: arr[0],
                            token: arr[1]
                        },
                        parse: true
                    }, done);
                })
                .task(function (done) {
                    request.get({
                        url: '/services/userclub/manageClubList.do',
                        query: {
                            userId: arr[0],
                            token: arr[1]
                        },
                        parse: true
                    }, done);
                })
                .together()
                .try(function (retUser, retClubs) {
                    retUser.token = arr[1];
                    retUser.isRemember = arr[2] === '1';
                    res.locals.$user = req.session.$user = retUser || {
                            userId: 0
                        };
                    res.locals.$clubs = req.session.$clubs = retClubs || [];
                    next();
                })
                .catch(next);
        } else {
            res.locals.$user = req.session.$user = {
                userId: 0
            };
            res.locals.$clubs = req.session.$clubs = [];
            next();
        }
    }
};



// 404
exports.clientError = function (req, res, next) {
    var isApi = REG_API.test(req.url);
    var isMobile = res.locals.$ua.isMobile;

    if (isApi) {
        return res.json({code: 404, message: 'page not found'});
    }

    res.send('\<h1\><center>404: page not found~</center>\<\/h1\>');


};


// 500
exports.serverError = function (err, req, res, next) {
    console.error(err);
    console.log(err.stack);

    var isApi = REG_API.test(req.url);

    if (isApi) {
        return res.json({code: err.code || 500, message: err.message || 'server error'});
    }

    res.type('html');

    if (configs.env === 'local') {
        res.send(err.stack);
    } else {
        res.send(err.message || 'server error');
    }
};
