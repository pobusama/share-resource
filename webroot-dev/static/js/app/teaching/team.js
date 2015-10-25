/*!
 * 文件描述
 * @author reven
 * @create 2015-10-25 14:44
 */


define(function (require, exports, module) {
    /**
     * @module parent/team
     */

    'use strict';

    $(document).ready(function(){
        $(window).scroll(function(){
            var top = $(document).scrollTop();
            var menu = $("#menu");
            var cards = $("#content").find(".info_card");

            var currentId = "";
            cards.each(function(){
                var ths = $(this);
                if(ths.offset().top-200 < top)
                {
                    currentId = "#"+ths.attr("id");
                }
                else
                    return false;

            });
            //console.log(currentId);
            var currentLink = menu.find(".selected");
            if(currentId&&currentId != currentLink.attr("href"))
            {
                currentLink.removeClass();
                menu.find("[href="+currentId+"]").addClass("selected");
            }


        });
        //师资队伍卡片->个人详情
        var cards = $(".teacher_card");
        var info_mores = cards.find("a");
        var detailCard=$("#teachers_detail_wrap");
        var back = detailCard.find("#back");

        info_mores.each(function(){
            var teacher_id = $(this).parent().attr("id");
            $(this).click(function(){

                alert(teacher_id);//对应卡片的id
                detailCard.css({"display":"block"});//点击个人详情出现悬浮卡片

            });
        });




        back.click(function(){

            detailCard.css({"display":"none"});//点击返回移除卡片

        });
    });

    module.exports = {};
});