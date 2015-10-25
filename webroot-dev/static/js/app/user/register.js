/*!
 * 文件描述
 * @author reven
 * @create 2015-10-25 05:51
 */


define(function (require, exports, module) {


    'use strict';

    var header = require('../../item-common/header.js');
    header();
    window.onload = function () {
        //输入框限制
        var oStudentsName = document.getElementById('studentsname');
        var oClassNumber = document.getElementById('classnumber');
        var oTelNumber = document.getElementById('telnumber');

        oStudentsName.onkeyup = function () {
            this.value = this.value.replace(/[^\a-zA-Z\u4E00-\u9FA5]/g, '');
        };
        oStudentsName.onbeforepast = function () {
            this.clipboardData.setData('text', this.clipboardData.getData('text').replace(/[^\a-zA-Z\u4E00-\u9FA5]/g, ''));
        };
        oClassNumber.onkeyup = function () {
            this.value = this.value.replace(/[^\d]/g, '')
        };
        oClassNumber.onbeforepaste = function () {
            this.clipboardData.setData('text', this.clipboardData.getData('text').replace(/[^\d]/g, ''));

        }
        oTelNumber.onkeyup = function () {
            this.value = this.value.replace(/[^\d]/g, '');
        }
        oTelNumber.onbeforepaste = function () {
            this.clipboardData.setData('text', this.clipboardData.getData('text').replace(/[^\d]/g, ''));
        }


    }
});