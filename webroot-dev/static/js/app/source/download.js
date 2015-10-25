/*!
 * 俱乐部查询
 * @author reven
 * @create 15/10/25
 */

define(function(require,exports,module){
    'use strict';
    var header = require('../../item-common/header.js');
    header();

    window.onload=function(){

        var oFileAreaContent=document.getElementsByClassName('file_area_content')[0];
        var oCheckAll=document.getElementById('checkAll');//全选按钮
        var oCancelAllCheck=document.getElementById('cancelAllCheck');//全不选按钮
        var oSelectOthers=document.getElementById('select_others');//反选按钮
        var oDownLoadIt=document.getElementById('downloadit');//下载按钮

        var aFileCheckBoxLis=oFileAreaContent.getElementsByTagName('li');//所有下载文件所属的LI
        var aFileCheckBoxs=[];//所有下载文件的复选框集合
        //全选、不选、反选JS
        for(var i=0; i<aFileCheckBoxLis.length;i++)//赋值
        {
            aFileCheckBoxs[i]=aFileCheckBoxLis[i].getElementsByTagName('input')[0];

        }
        for(var i=0; i<aFileCheckBoxs.length;i++)
        {
            aFileCheckBoxs[i].checked=false;
        }

        for(var i=0; i<aFileCheckBoxs.length;i++)//给每个复选框赋点击事件
        {
            aFileCheckBoxs[i].onclick=function()
            {
                if(this.checked==false)
                {
                    this.checked=true;
                }
                else
                {
                    this.checked=false;
                }
            }
        }


        for(var i=0; i<aFileCheckBoxLis.length;i++)//给每个LI赋与复选框相同的点击事件
        {
            aFileCheckBoxLis[i].index=i;
            aFileCheckBoxLis[i].onclick=function()
            {

                if(aFileCheckBoxs[this.index].checked==false)
                {
                    aFileCheckBoxs[this.index].checked=true;
                }
                else
                {
                    aFileCheckBoxs[this.index].checked=false;
                }
            }
        }

        oCheckAll.onclick=function()//全选
        {


            for(var i=0; i<aFileCheckBoxs.length;i++)
            {
                aFileCheckBoxs[i].checked=true;
            }


        }
        oCancelAllCheck.onclick=function()
        {
            for(var i=0; i<aFileCheckBoxs.length;i++)
            {
                aFileCheckBoxs[i].checked=false;
            }

        }
        oSelectOthers.onclick=function()//反选
        {
            for(var i=0; i<aFileCheckBoxs.length;i++)
            {

                if(aFileCheckBoxs[i].checked==true)
                {
                    aFileCheckBoxs[i].checked=false;
                }
                else
                {
                    aFileCheckBoxs[i].checked=true;
                }
            }
        }
    }


});