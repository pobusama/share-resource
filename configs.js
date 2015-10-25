/*!
 * 配置文件
 * @author ydr.me
 * @create 2015-07-09 10:57
 */


'use strict';

var path = require('path');
// dev/test/pro
var env = process.env.ENVIRONMENT || 'local';
var webroot = env === 'local' ? 'dev' : 'pro';

module.exports = {
    port: 2015,
    env: env,
    api: {
        lvguanjiaBusinessServer: {
            //local: 'http://192.168.2.167:8080',
            //dev: 'http://192.168.2.167:8080',

            local: 'http://121.41.119.151:10050',
            dev:   'http://121.41.119.151:10050',
            test:  'http://127.0.0.1:10050',
            pro:   'http://service.dangkr.com'
        }[env]
    },
    webroot: path.join(__dirname, './webroot-' + webroot),
    //webroot: path.join(__dirname, './webroot-pro'),
    cookie: {
        secret: 'xiaomaolv',
        // 30d
        expires: 30 * 24 * 60 * 60 * 1000,
        // 用户登录重试次数
        userLoginTryTimesKey: 'user-login-try-times',
        // 0 表示不限制
        userLoginTryMaxTimes: 3
    },
    // 1MB
    maxLength: 1024 * 1024,
    weixin: {
        appid: '',
        secret: ''
    }
};


