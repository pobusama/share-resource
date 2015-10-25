/*!
 * 俱乐部查询
 * @author reven
 * @create 15/10/24
 */
define(function (require, exports, module) {

    var header = require('../item-common/header.js');
    header();
    $(function () {
        function loginState(state) {
            var loginPanel = $("#login-panel");
            var loginedPanel = $("#logined-panel");
            if (state === "logout") {
                loginPanel.css("display", "block  ");
                loginedPanel.css("display", "none");
            }
            else if (state === "logined") {
                loginPanel.css("display", "none");
                loginedPanel.css("display", "block");
            }

        }

        loginState("logout");

        var loginBtn = $("#user-login");
        var logoutBtn = $("#user-logout");
        loginBtn.click(function () {
            loginState("logined");
        });

        logoutBtn.click(function () {
            loginState("logout");
        });
    });
});