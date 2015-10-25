/*!
 * 文件描述
 * @author reven
 * @create 2015-10-25 09:54
 */


define(function (require, exports, module) {
    /**
     * @module parent/register
     */

    'use strict';

    var header = require('../../item-common/header.js');


    var oStudentsName=document.getElementById('studentsname');
    var oClassNumber=document.getElementById('classnumber');
    var oTelNumber=document.getElementById('telnumber');
    header();

    //输入框限制

    oStudentsName.onkeyup=function()
    {
        this.value=this.value.replace(/[^\a-zA-Z\u4E00-\u9FA5]/g,'');
    };
    oStudentsName.onbeforepast=function()
    {
        this.clipboardData.setData('text',this.clipboardData.getData('text').replace(/[^\a-zA-Z\u4E00-\u9FA5]/g,''));
    };
    oClassNumber.onkeyup=function()
    {
        this.value=this.value.replace(/[^\d]/g,'')
    };
    oClassNumber.onbeforepaste=function()
    {
        this.clipboardData.setData('text',this.clipboardData.getData('text').replace(/[^\d]/g,'')) ;

    };
    oTelNumber.onkeyup=function()
    {
        this.value=this.value.replace(/[^\d]/g,'') ;
    };
    oTelNumber.onbeforepaste=function()
    {
        this.clipboardData.setData('text',this.clipboardData.getData('text').replace(/[^\d]/g,''))	;
    }


});