/*!
 * 文件描述
 * @author reven
 * @create 2015-10-25 13:50
 */


define(function (require, exports, module) {
    /**
     * @module parent/Clanguage
     */

    'use strict';

    var common = require('../../common/common.js');

    window.onload = function () {
        /*翻转课堂点击出选择菜单*/
        var oCoursePointSelect = document.getElementById('course_point_select');//反转课堂主体
        var aCourseSourceItems = document.getElementsByClassName('course_source_items');//教学相关的各个模块
        var aTeachingArchiveSelects = aCourseSourceItems[0].getElementsByTagName('a');//教学档案的各个选项

        //教学档案-教学大纲按钮
        aTeachingArchiveSelects[0].onclick = function () {
            oTeachingProgramList.style.display = 'block';
            oTeachingProgramMian.style.display = 'block';
            common.startMove(oTeachingProgramList, {left: '0', opacity: '100'});
            common.startMove(oTeachingProgramMian, {right: '0', opacity: '100'});
        }
    };


    module.exports = {};
});