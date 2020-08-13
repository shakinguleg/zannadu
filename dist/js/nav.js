window.onscroll = function () {
    var top = document.body.scrollTop || document.documentElement.scrollTop;
    if (top >= 120) {
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