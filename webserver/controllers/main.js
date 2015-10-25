/*!
 * main
 * @author ydr.me
 * @create 2015-04-29 15:13
 */


'use strict';

var pkg = require('../../package.json');


// mobile主页
exports.getMobileIndex = function (req, res, next) {
    res.render('mobile/index.html', {

    });
    //res.send(pkg.name + '@' + pkg.version);
};

