var first = $("body").children()[0];
window.onscroll = function () {
    var top = document.body.scrollTop || document.documentElement.scrollTop;
    // 当高于第一个元素的高度时, 导航栏随窗口滚动
    if (top >= first.clientHeight) {
        $(".zhanwei").css({ "display": "block" });

        $(".nav_wrap").css({
            "position": "fixed",
            "top": "0",
            "width": "100%",
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