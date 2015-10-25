/*!
 * 文件描述
 * @author reven
 * @create 2015-10-25 16:54
 */


define(function (require, exports, module) {
    /**
     * @module parent/home
     */

    'use strict';

    //var abc = require('./abc.js');
    $(document).ready(function () {

        $("#body-right").css("height", $("#body-left").css("height"));

        function makePanelFixed(example) {

            $(window).scroll(function () {

                var bodyRight = $("#body-right")
                var top = $(document).scrollTop();

                if (top > example.offset().top - 5) {

                    example.addClass("panel-fixed");
                }

                if (top < bodyRight.offset().top + 50 ) {
                    example.removeClass("panel-fixed");
                }


            });
        }

        var loginPanel = $("#login-panel");
        loginPanel.css("display", "block");
        makePanelFixed(loginPanel);

        var loginedPanel = $("#logined-panel");
        loginedPanel.css("display", "none");
        makePanelFixed(loginedPanel);

        var userLogin = $("#user-login");
        var userLogout = $("#user-log-out");
        /*登录账户点击事件*/
        userLogin.click(function () {

            loginedPanel.css("display", "block");
            loginPanel.css("display", "none");
        });
        /*退出登录点击事件*/
        userLogout.click(function () {

            loginedPanel.css("display", "none");
            loginPanel.css("display", "block");
        });

    });

    module.exports = {};
});