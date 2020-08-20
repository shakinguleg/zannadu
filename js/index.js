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

var _yanzheng = document.querySelector(".yanzhegnhuakuai")
var _mask = document.querySelector(".yanzhegnhuakuai .mask")
var _block = document.querySelector(".yanzhegnhuakuai .block")
var _block_img = document.querySelector(".yanzhegnhuakuai .block img")


$(_block).on("mousedown", _block, function (e) {
    // 阻止图片点击事件
    e.preventDefault();
    document.body.onmousemove = function (ev) {
        var e = ev || window.event;
        var left = e.clientX - offset(_mask, true).left;
        if (left < 24) {
            left = 24;
        } else if (left > 252) {
            left = 252;
        }
        _mask.style.width = left + "px";

        if (parseInt(_mask.style.width) >= 246) {
            _block.onmouseup = null;
            _yanzheng.onmouseleave = null;
            document.body.onmousemove = null;
            animate(_mask, { width: 252 });

            var phone = $phone.val();
            var pass = $pass.val();
            var option = $loginBtn.text();

            if (option === "登录") {
                if (phone.trim() != "" || pass.trim() != "") {
                    phone = phone.trim();
                    pass = pass.trim();

                    // php启动的服务
                    $.ajax({
                        url: 'http://10.20.158.12/mytest/zanadu.php',
                        type: 'get',
                        data: {
                            "type": 'query',
                            "phone": phone,
                            "pass": pass
                        },
                        dataType: 'jsonp',
                        jsonp: 'cb',
                        success: function (json) {
                            if (json.err == "0") {
                                animate(_mask, { width: 24 });
                                alert("账号密码错误");
                                return;
                            }
                            $loginBtn.attr("href", "../html/home.html");
                            _block_img.src = "../img/√.png";

                            setTimeout(() => {
                                animate(_mask, { width: 24 });
                                _block_img.src = "../img/双箭头-右.png";
                                alert("验证成功,请登陆");
                                setCookie({
                                    key: "photo",
                                    val: phone
                                })
                            }, 500);


                        },
                        error: function () {
                            $loginBtn.attr("href", "#loginBtn");
                            alert("无法连接服务器!!!");
                        }
                    });

                } else {
                    $loginBtn.attr("href", "#loginBtn");
                    setTimeout(() => {
                        animate(_mask, { width: 24 });
                        alert("请正确输入手机号与密码");
                    }, 500)

                }
            }
            if (option === "注册") {
                console.log("daf");
                if (phone.trim() != "" || pass.trim() != "") {
                    phone = phone.trim();
                    pass = pass.trim();

                    // php启动的服务
                    $.ajax({
                        url: 'http://10.20.158.12/mytest/zanadu.php',
                        type: 'get',
                        data: {
                            "type": 'insert',
                            "phone": phone,
                            "pass": pass
                        },
                        dataType: 'jsonp',
                        jsonp: 'cb',
                        success: function (json) {
                            if (json.err == "0") {
                                alert("注册失败");
                            }
                            if (json.err == "1") {
                                $loginBtn.attr("href", "../html/home.html");
                                _block_img.src = "../img/√.png";
                                setTimeout(() => {
                                    animate(_mask, { width: 24 });
                                    _block_img.src = "../img/双箭头-右.png";
                                    $login[0].click();
                                    alert("注册成功,请登陆");
                                }, 500);
                            }
                        },
                        error: function () {
                            alert("无法连接服务器!!!");
                        }
                    });

                } else {
                    $loginBtn.attr("href", "#loginBtn");
                    setTimeout(() => {
                        animate(_mask, { width: 24 });
                        alert("请正确输入手机号与密码");
                    }, 500)
                }
            }
        } else {
            _block.onmouseup = function () {
                document.body.onmousemove = null;
                animate(_mask, { width: 24 });
            }
            _yanzheng.onmouseleave = function () {
                document.body.onmousemove = null;
                animate(_mask, { width: 24 });
            }
        }

    }
});


function setCookie(options) {
    if (!options.key || !options.val) {
        throw new Error('设置失败，缺少必要参数！');
    }
    options.days = options.days || 0;
    options.domain = options.domain || '';
    options.path = options.path || '';
    if (options.days === 0) {
        //编码是为了防止字符串中出现特殊符号扰乱
        document.cookie = options.key + '=' + escape(options.val) + '; domain=' + options.domain + '; path=' + options.path;
    } else {
        var d = new Date();
        d.setDate(d.getDate() + options.days);
        document.cookie = options.key + '=' + escape(options.val) + '; domain=' + options.domain + '; path=' + options.path + '; expires=' + d;
    }
}







function offset(dom, bool) {
    var l = 0, t = 0;
    var bdleft = dom.clientLeft;//初始元素的左边框
    var bdtop = dom.clientTop;//初始元素的上边框
    while (dom) {
        l = l + dom.offsetLeft + dom.clientLeft;
        t = t + dom.offsetTop + dom.clientTop;
        dom = dom.offsetParent;
    }
    if (bool) {
        // 元素边框外侧到body的距离
        return { left: l - bdleft, top: t - bdtop };
    } else {
        // 元素内容外侧到body的距离
        return { left: l, top: t };
    }

}

function animate(dom, attr_obj, callback) {
    for (var attr in attr_obj) {
        // 获取当前值和目标值
        if (attr === 'opacity') {
            var current = parseInt(getComputedStyle(dom, null)[attr] * 100);
            var target = attr_obj[attr] * 100;
        } else if (attr.indexOf('scroll') !== -1) {
            var current = dom[attr];
            var target = attr_obj[attr];
        } else {
            var current = parseInt(getComputedStyle(dom, null)[attr]);
            var target = attr_obj[attr];
        }
        attr_obj[attr] = {
            'current': current,
            'target': target
        }
    }

    clearInterval(dom.timer);
    dom.timer = setInterval(function () {
        var lenght = 0;
        for (var attr in attr_obj) {
            var current = attr_obj[attr].current;
            var target = attr_obj[attr].target;
            // 不断变化的速度
            var speed = (target - current) / 10;
            // 小数计算有误差，容易造成数据丢失 => 取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            // 判断到达目的地：剩余运动量 <= 每次的运动量

            if (Math.abs(target - current) <= Math.abs(speed)) {
                if (attr === 'opacity') {
                    dom.style[attr] = target / 100;
                } else if (attr.indexOf('scroll') !== -1) {
                    dom[attr] = target;
                } else {
                    dom.style[attr] = target + 'px';
                }
                // 从attr_obj对象中删除已完成运动的属性
                delete attr_obj[attr];


                // 如果对象中还有其他属性，此时不应该终止计时器
                for (var key in attr_obj) {
                    lenght++;
                    console.log('lenght: ', lenght);
                }

                if (!lenght) {
                    console.log("f")
                    clearInterval(dom.timer);//终止计时器
                }

                typeof callback === 'function' ? callback() : '';
            } else {
                attr_obj[attr].current += speed;
                if (attr === 'opacity') {
                    dom.style[attr] = attr_obj[attr].current / 100;
                } else if (attr.indexOf('scroll') !== -1) {
                    dom[attr] = attr_obj[attr].current;
                } else {
                    dom.style[attr] = attr_obj[attr].current + 'px';
                }
            }

        }
    }, 20);
}