var first = $("body").children()[0];
var hidden = $(first).attr("myhidden");
if (!hidden) {
    window.onscroll = function () {
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        // 当高于第一个元素的高度时, 导航栏随窗口滚动
        if (top >= first.clientHeight) {
            $(".zhanwei").css({ "display": "block" });

            $(".nav_wrap").css({
                "position": "fixed",
                "top": "0",
                "width": "100%",
                "z-index": "999"
            });


            $(".nav").addClass("switch");
        } else {
            $(".zhanwei").css("display", "none");
            $(".nav_wrap").css({
                "position": "relative",
            });

            $(".nav").removeClass("switch");
        }
    }
}

var _login = document.querySelector(".login");
var _login_ul = document.querySelector(".login ul");
var _login_a = document.querySelector(".login ul .fff a");
var _login_user = document.querySelector(".login .user_tou");

testLogin();
var dom = null;
function testLogin() {

    if (getCookie("photo")) {
        $(_login).append(dom);
        dom = $(_login_ul).detach();
    } else if (!getCookie("photo")) {
        $(_login).append(dom);
        dom = $(_login_user).detach();
    }
}

function getCookie(key) {
    var arr1 = document.cookie.split('; ');
    for (var i = 0, len = arr1.length; i < len; i++) {
        var arr2 = arr1[i].split('=');
        if (arr2[0] === key) {
            return unescape(arr2[1]);
        }
    }
    return null;
}

_login_user.onclick = function () {
    removeCookie("photo");
}

function removeCookie(key) {
    setCookie({
        key: key,
        val: '1234',
        days: -5
    });
    _login_a.click();
}