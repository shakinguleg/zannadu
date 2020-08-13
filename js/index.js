var $login = $(".content .top a");
var $content = $(".content");
var $top_i = $(".content .top i");
var srcReg = 'url("../img/login1.jpg")';
var srcLog = 'url("../img/login.jpg")';
var tag = true;

// $login.toggle(
//     function () {
//         $(this).text("登录");
//         $content.css("background-image", srcReg);
//         $top_i.text("ZANADU 注册");
//     },
//     function () {
//         $(this).text("注册新用户");
//         $content.css("background-image", srcLog);
//         $top_i.text("ZANADU 登录");
//     }
// );

$login.click(function (e) {
    if (tag) {
        $(this).text("登录");
        $content.css("background-image", srcReg);
        $top_i.text("ZANADU 注册");
    }else {
        $(this).text("注册新用户");
        $content.css("background-image", srcLog);
        $top_i.text("ZANADU 登录");
    }
    tag = !tag;
});