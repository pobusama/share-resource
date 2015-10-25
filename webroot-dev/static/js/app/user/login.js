/*!
 * 俱乐部查询
 * @author reven
 * @create 15/10/25
 */
define(function(require,exports,module){
    var header = require('../../item-common/header.js');
    header();
    window.onload=function()
    {
        var oUserName = document.getElementById('username');
        //用户名输入框限制
        oUserName.onkeyup=function()
        {
            this.value=this.value.replace(/[^\w\.\/]/ig,'');
        };

    }
});