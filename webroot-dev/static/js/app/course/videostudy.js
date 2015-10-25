/*!
 * 文件描述
 * @author reven
 * @create 2015-10-25 16:26
 */


define(function (require, exports, module) {
    /**
     * @module parent/videostudy
     */

    'use strict';
    var common = require('../../common/common.js');
    window.onload=function()
    {
        var oPre_btn=document.getElementsByClassName('pre')[0];
        var oNext_btn=document.getElementsByClassName('next')[0];
        var oPreviewContainer=document.getElementsByClassName('preview_container')[0];
        var aPieviewLis=oPreviewContainer.getElementsByTagName('li');
        oPreviewContainer.style.width=aPieviewLis.length*200+'px';

        oNext_btn.onclick=function()//视频预览菜单下一页
        {
            var left1=oPreviewContainer.offsetLeft;
            var width1=aPieviewLis.length*200;
            //var maxLength= aPieviewLis.length;
            var maxLeft=width1-800;


            if(left1!=-maxLeft&&left1%200==0)
            {
                left1-=200;

                common.startMove(oPreviewContainer,{left:left1});
            }



        };
        oPre_btn.onclick=function()//视频预览菜单上一页
        {
            var left1=oPreviewContainer.offsetLeft;
            var width1=oPreviewContainer.offsetWidth;
            if(left1!=0&&left1%200==0)
            {
                left1+=200;

                common.startMove(oPreviewContainer,{left:left1});
            }
        }
    };

    module.exports = {};
});