/*!
 /*!
 * main
 * @author ydr.me
 * @create 2015-04-29 15:13
 */


'use strict';
var howdo = require('howdo');
var request = require('../../utils/').request;
var cookie = require('../../utils/').cookie;
var random = require('ydr-utils').random;
var number = require('ydr-utils').number;
var cache = require('ydr-utils').cache;
var configs = cache.get('app.configs');

//注册
exports.postRegister = function (req, res, next) {
    var isMobile = req.session.$ua.isMobile;
    req.body.appId = isMobile ? 6 : 5;

    howdo
        // 注册
        .task(function (next) {
            request.post({
                url: '/services/account/register.do',
                body: req.body,
                parse: true
            }, next);

            //{
            //    "userId": 264773471,
            //    "userCode": 111164,
            //    "clubId": null,
            //    "userName": "",
            //    "phone": "13148439673",
            //    "userAvatar": "",
            //    "status": 0,
            //    "nickname": "小号",
            //    "createTime": 1444788467703,
            //    "name": "",
            //    "age": 0,
            //    "sex": 0,
            //    "postCode": "",
            //    "province": "",
            //    "city": "",
            //    "area": "",
            //    "email": "",
            //    "address": "",
            //    "hobby": "",
            //    "mobile": "13148439673",
            //    "birthday": 762020479660,
            //    "job": "",
            //    "signature": "",
            //    "emergencyName": "",
            //    "emergencyPhone": "",
            //    "sina": "",
            //    "qq": null,
            //    "weixin": "",
            //    "douban": "",
            //    "memo": "",
            //    "updateTime": 1444788467717,
            //    "cardType": "",
            //    "idCard": "",
            //    "userIdentity": "",
            //    "refererSite": 0,
            //    "refererHost": "",
            //    "refererPath": "",
            //    "referer": 0,
            //    "promoter": 0,
            //    "clientIp": "",
            //    "clientLocation": "",
            //    "clientProvince": "",
            //    "clientCity": "",
            //    "loginTime": 1444788467703,
            //    "loginIp": "",
            //    "loginPlatform": 0,
            //    "loginDeviceId": "",
            //    "latitude": 0,
            //    "longitude": 0,
            //    "geohash": "",
            //    "userType": 0,
            //    "userTypeName": "",
            //    "sexFlag": "E",
            //    "inviteCode": "gilooh",
            //    "inviteeCode": null,
            //    "inviteesFlag": false
            //}
        })
        // 自动登录
        .task(function (next, retUser) {
            request.post({
                url: '/services/userlogin/username.do',
                body: {
                    userName: retUser.phone,
                    password: req.body.password
                },
                parse: true
            }, next);
        })
        .follow()
        .try(function (retUser) {
            cookie.login(req, res, retUser);
            res.locals.$clubs = req.session.$clubs = [];
            res.json({
                code: 200
            });
        })
        .catch(next);
};

//第三方绑定手机号
exports.postBind = function (req, res, next) {

    var $user = req.session.$user;
    req.body.userId = $user.userId;

    request.post({
        url: '/services/account/bindPhone.do',
        body: req.body
    }, function (err, body) {
        if (err) {
            return next(err);
        }

        $user.phone = req.body.phoneNum;

        res.type('json');
        res.send(body);
    });
};


//申请
exports.postApply = function (req, res, next) {
    var $user = req.session.$user;

    if (!$user.userId) {
        return next(new Error('请登录之后再申请俱乐部'));
    }

    howdo
        .task(function (next) {
            req.body.mobile = $user.phone;
            req.body.userId = $user.userId;
            // 注册
            request.post({
                url: '/services/clubregister/register.do',
                body: req.body,
                parse: true
            }, next);
        })
        .task(function (next, retClub) {
            request.get({
                url: '/services/userclub/manageClubList.do',
                query: {
                    userId: req.session.$user.userId,
                    token: req.session.$user.token
                },
                parse: true
            }, next);
        })
        .follow()
        .try(function (retClubs) {
            res.locals.$clubs = req.session.$clubs = retClubs || [];
            res.json({
                code: 200
            });
        })
        .catch(next);
};


//域名检测 postDomainTest
exports.postDomainTest = function (req, res, next) {
    request.post({
        url: '/services/clubregister/checkDomainCanRegister.do',
        body: req.body
    }, function (err, body) {
        if (err) {
            return err;
        }

        res.type('json');
        res.send(body);
    });
};

//用户管理的俱乐部
exports.getClubs = function (req, res, next) {
    var $user = req.session.$user;

    if (!$user.userId) {
        return res.json({
            code: 200,
            result: []
        });
    }

    request.get({
        url: '/services/userclub/manageClubList.do',
        query: {
            userId: $user.userId,
            token: $user.token
        }
    }, function (err, body) {
        if (err) {
            return err;
        }

        res.type('json');
        res.send(body);
    });
};

//发送邮箱找回密码邮件
exports.postEmailAccount = function (req, res, next) {
    req.body.sessionId = req.sessionID;
    request.post({
        url: '/services/email/sendFindPwdEmail.do',
        body: req.body
    }, function (err, body) {
        if (err) {
            return err;
        }

        res.type('json');
        res.send(body);
    });
};

//发送手机账号找回密码
exports.postMobileAccount = function (req, res, next) {
    req.body.sessionId = req.sessionID;
    request.post({
        url: '/services/sms/checkResetpwdCaptcha.do',
        body: req.body
    }, function (err, body) {
        if (err) {
            return err;
        }

        res.type('json');
        res.send(body);
    });
};

//手机账号找回密码－发送验证码
exports.postMobileMsg = function (req, res, next) {
    req.body.sessionId = req.sessionID;
    request.post({
        url: '/services/sms/resetpwdCode.do',
        body: req.body
    }, function (err, body) {
        if (err) {
            return err;
        }

        res.type('json');
        res.send(body);
    });
};

//手机账号找回密码－获取签名
exports.postMobileSign = function (req, res, next) {
    req.body.sessionId = req.sessionID;
    request.post({
        url: '/services/account/getRestPwdSignByPhone.do',
        body: req.body
    }, function (err, body) {
        if (err) {
            return err;
        }

        res.type('json');
        res.send(body);
    });
};

//手机账号找回密码－重置成功
exports.postSetPwd = function (req, res, next) {
    request.post({
        url: '/services/account/resetPwdByPhoneOREmail.do',
        body: req.body
    }, function (err, body) {
        if (err) {
            return err;
        }

        res.type('json');
        res.send(body);
    });
};

//移动端找回密码－重置密码
exports.postMobileSetPwd = function (req, res, next) {
    request.post({
        url: '/services/account/resetPwdByPhone.do',
        body: req.body
    }, function (err, body) {
        if (err) {
            return err;
        }

        res.type('json');
        res.send(body);
    });
};

//手机验证码  注册
exports.getMsgCode = function (req, res, next) {
    req.query.sessionId = req.sessionID;
    request.get({
        url: '/services/sms/registCode.do',
        query: req.query
    }, function (err, body) {
        if (err) {
            return next(err);
        }

        res.type('json');
        res.send(body);
    });
};

//手机验证码  绑定手机号
exports.getBindMsgCode = function (req, res, next) {

    howdo
        //判断手机号码是否注册
        .task(function (next) {
            request.get({
                url: '/services/account/phoneExist.do',
                query: {
                    phoneNum: req.query.phoneNum
                },
                parse: true
            }, function (err, ret) {
                if (err) {
                    return next(err);
                }

                if (ret.exist) {
                    return next(new Error('手机号已经注册，请直接登录'));
                }

                next();
            });
        })
        //获取手机验证码
        .task(function (next) {
            req.query.sessionId = req.sessionID;
            request.get({
                url: '/services/sms/getBindPhoneCaptcha.do',
                query: req.query
            }, next);
        })
        .follow(function (err, body) {
            if (err) {
                return next(err);
            }

            res.type('json');
            res.send(body);
        });
};

// 获取图片验证码
exports.getImgCode = function (req, res, next) {
    request.get({
        url: '/services/captcha/getCaptcha.do',
        query: {
            sessionId: req.sessionID
        },
        callbackStream: true
    }, function (err, stream) {
        if (err) {
            return next(err);
        }
        stream.pipe(res).on('error', function (err) {
            return next(err);
        });
    });
};

// 校验图片验证码
exports.getValidateImgCode = function (req, res, next) {
    req.query.sessionId = req.sessionID;
    request.get({
        url: '/services/captcha/validateCaptcha.do',
        query: req.query
    }, function (err, body) {
        if (err) {
            return next(err);
        }
        res.type('json');
        res.send(body);
    });
};


// 登录
exports.postLogin = function (req, res, next) {
    var tryTimes = req.cookies[configs.cookie.userLoginTryTimesKey];
    var maxTryTimes = configs.cookie.userLoginTryMaxTimes;
    var body = {
        userName: req.body.userName,
        password: req.body.password
    };

    tryTimes = number.parseInt(tryTimes, 0);

    if (tryTimes > maxTryTimes) {
        body.captcha = req.body.captcha;
        body.sessionId = req.sessionID;
    }

    howdo
        .task(function (next) {
            request.post({
                url: '/services/userlogin/username.do',
                body: body,
                parse: true
            }, next);
        })
        .task(function (next, retUser) {
            request.get({
                url: '/services/userclub/manageClubList.do',
                query: {
                    userId: retUser.userId,
                    token: retUser.token
                },
                parse: true
            }, function (err, retClubs) {
                next(err, retUser, retClubs);
            });
        })
        .follow()
        .try(function (retUser, retClubs) {
            cookie.login(req, res, retUser);
            res.locals.$clubs = req.session.$clubs = retClubs;
            res.json({
                code: 200
            });
        })
        .catch(next);
};


// 登出
exports.postLogout = function (req, res, next) {
    cookie.logout(req, res);
    res.json({
        code: 200
    });
};


// 授权登录
exports.postAuth = function (req, res, next) {
    var state = req.body.state;
    var code = req.body.code;
    var authType = req.body.authType;
    var url = {
        qq: '/services/userlogin/qq.do',
        weixin: '/services/userlogin/wechat.do',
        weibo: '/services/userlogin/weibo.do'
    }[authType];
    var appId = req.session.$ua.isMobile ? 6 : 5;

    if (state !== req.sessionID) {
        return res.json({
            code: 500,
            message: '非法操作，请重新授权登录'
        });
    }

    if (!url) {
        return res.json({
            code: 500,
            message: '该登录渠道不存在'
        });
    }

    howdo
        .task(function (next) {
            request.post({
                url: url,
                body: {
                    code: code,
                    appId: appId
                },
                parse: true
            }, next);
        })

        //birthday: 760166332635
        //cardType: ""
        //city: ""
        //emergencyName: ""
        //emergencyPhone: ""
        //hobby: ""
        //idCard: ""
        //inviteCode: "ghyfof"
        //inviteeCode: ""
        //inviteesFlag: false
        //name: "#云淡然"
        //nickname: "#云淡然"
        //phone: ""
        //province: ""
        //sex: 1
        //sexFlag: "U"
        //signature: ""
        //token: "kssu3oZF2z2MrNxA5j/OFUkI72GLBVepYadmH1eRwbE="
        //userAvatar: "http://qzapp.qlogo.cn/qzapp/101112545/1197CDEB61672CBB4EADD8711C8A08FA/100"
        //userCode: 110817
        //userId: 264796508
        //userName: ""
        //userType: 0


        .task(function (next, ret) {
            request.get({
                url: '/services/userclub/manageClubList.do',
                query: {
                    userId: ret.userId,
                    token: ret.token
                },
                parse: true
            }, function (err, retClubs) {
                next(err, ret, retClubs);
            });
        })
        .follow()
        .try(function (ret, retClubs) {
            cookie.login(req, res, ret);
            res.locals.$clubs = req.session.$clubs = retClubs;
            res.json({
                code: 200
            });
        })
        .catch(next);
};

