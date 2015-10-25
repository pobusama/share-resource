/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-09-24 21:36
 */


'use strict';


var request = require('../../utils/').request;


//获取省市  返回数据处理
var wrapArea = function (item) {
    return {
        text: item.districtName,
        value: item.districtId
    };
};

// 获取省
exports.getProvince = function (req, res, next) {

    request.get({
        url: '/services/district/getChinaProvinceList.do',
        parse: true
    }, function (err, ret) {
        if (err) {
            return next(err);
        }
        res.json({
            code: 200,
            result: ret.map(wrapArea)
        });
    });
};

// 获取市
exports.getCity = function (req, res, next) {
    request.get({
        req: req,
        url: '/services/district/getCityList.do',
        query: {
            districtId: req.query.parent
        },
        parse: true
    }, function (err, ret) {
        if (err) {
            return next(err);
        }

        res.json({
            code: 200,
            result: ret.map(wrapArea)
        });
    });
};
