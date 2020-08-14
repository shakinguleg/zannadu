var $login = $(".content .top a");
var $content = $(".content");
var $top_i = $(".content .top i");
var $loginBtn = $(".loginBtn");
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
        $loginBtn.text("注册");
    } else {
        $(this).text("注册新用户");
        $content.css("background-image", srcLog);
        $top_i.text("ZANADU 登录");
        $loginBtn.text("登录");
    }
    tag = !tag;
});

// 登录
var $phone = $(".phone input");
var $pass = $(".code input");

$loginBtn.click(function (e) {
    var phone = $phone.val();
    var pass = $pass.val();
    var option = $loginBtn.text();

    if (option === "登录") {
        console.log("daf");
        if (phone.trim() != "" || pass.trim() != "") {
            phone = phone.trim();
            pass = pass.trim();

            // php启动的服务
            $.ajax({
                url: 'http://localhost/mytest/zanadu.php',
                type: 'get',
                data: {
                    "type": 'query',
                    "phone": phone,
                    "pass": pass
                },
                dataType: 'jsonp',
                jsonp: 'cb',
                success: function (json) {
                    console.log(json);
                }
            });

            $loginBtn.attr("href","../html/home.html");

        } else {
            $loginBtn.attr("href","#loginBtn");
            alert("请正确输入手机号与密码")
        }
    }
}); 