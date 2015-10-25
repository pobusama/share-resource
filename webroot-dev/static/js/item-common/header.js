/*!
 * 文件描述
 * @author reven
 * @create 2015-10-25 08:47
 */


define(function (require, exports, module) {
    /**
     * @module parent/header.js
     */

    'use strict';
    var common = require('../common/common.js');
    //导航JS
    var oSearchBtn = document.getElementById('search_btn');
    var iSearchIndex = 0;

    var oSearchBox = document.getElementById('search_box');
    var oSearchInput = document.getElementById('search_input');

    module.exports = function () {
        //导航搜索按钮
        oSearchBtn.onmousemove = function () {
            oSearchBtn.style.height = 10 + 'px';
            oSearchBtn.style.background = '#01c675';
            oSearchBtn.style.borderBottom = '4px #00a05e solid';
            oSearchBtn.getElementsByTagName('span')[0].className = 'active';

        };
        oSearchBtn.onmouseout = function () {
            oSearchBtn.style.height = 14 + 'px';
            oSearchBtn.style.background = '#fff';
            oSearchBtn.style.borderBottom = 'none';
            oSearchBtn.getElementsByTagName('span')[0].className = '';
        };
        oSearchBtn.onclick = function () {
            if (iSearchIndex % 2 == 0) {
                oSearchBox.style.display = 'block';
                common.startMove(oSearchBox, {opacity: 100});
            }

            else {
                common.startMove(oSearchBox, {opacity: 0}, function () {
                    oSearchBox.style.display = 'none';
                });
            }

            iSearchIndex++;

        };

        //搜索输入框提示js
        oSearchInput.onfocus = function () {
            if (this.value == this.defaultValue) {

                this.value = '';
                this.style.color = '#a1a1a1'
            }

        };
        oSearchInput.onblur = function () {
            if (!this.value) {
                this.value = this.defaultValue;
                this.style.color = '#ccc';
            }
        };
    };
});