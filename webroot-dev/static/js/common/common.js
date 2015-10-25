define(function (require, exports, module) {
    exports.getByClass = function (oParent, sClass) {
        var aEle = oParent.getElementsByTagName('*');
        var aResult = [];
        //乱码
        for (var i = 0; i < aEle.length; i++) {
            if (aEle[i].className == sClass) {
                aResult.push(aEle[i]);
            }
        }
        return aResult;
    }


    getStyle = function (obj, name) {
        if (obj.currentStyle) {
            return obj.currentStyle[name];
        }
        else {
            return getComputedStyle(obj, false)[name];
        }
    }

    /*运动框架*/
    exports.startMove = function (obj, json, fnEnd) {

        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var bStop = true;
            for (var attr in json) {
                var cur = 0;
                if (attr == 'opacity') {
                    cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
                }
                else {
                    cur = parseInt(getStyle(obj, attr));
                }

                var speed = (json[attr] - cur) / 5;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (cur != json[attr]) {
                    bStop = false;
                }

                if (attr == 'opacity') {
                    obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                    obj.style.opacity = (cur + speed) / 100;
                }
                else {
                    obj.style[attr] = cur + speed + 'px';
                }
            }

            if (bStop) {
                clearInterval(obj.timer);

                if (fnEnd)
                    fnEnd();
            }

        }, 30)

    }


});