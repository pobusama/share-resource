/*!
 * 控制器出口
 * @author ydr.me
 * @create 2015-04-29 14:41
 */


'use strict';


module.exports = {
    main: require('./main.js'),
    desktop: require('./desktop/index.js'),
    mobile: require('./mobile/index.js'),
    api: require('./api/index.js'),
    common: require('./common/index.js'),
    middleware: require('./middleware.js')
};
