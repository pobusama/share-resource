/*!
 * 文件描述
 * @author reven
 * @create 2015-10-25 15:55
 */
define(function(require,exports,module){
    'use strict'
    window.onload=function()
    {
        var oList1=document.getElementById('list_1');
        var aList1Lis=oList1.getElementsByTagName('li');//定义课程列表

        var aList1LiHoverPages=new Array();//定义课程列表所包含的鼠标悬浮框

        for(var i=0;i<aList1Lis.length;i++)
        {
            aList1LiHoverPages[i]=aList1Lis[i].getElementsByClassName('hover_div')[0];
        }

        for(var i=0;i<aList1Lis.length;i++)
        {
            aList1LiHoverPages[i].style.display='none';
            aList1Lis[i].index=i;
            aList1Lis[i].onmouseover=function()
            {
                aList1LiHoverPages[this.index].style.display='block';
            }
            aList1Lis[i].onmouseout=function()
            {
                aList1LiHoverPages[this.index].style.display='none';
            }
        }


    }
});