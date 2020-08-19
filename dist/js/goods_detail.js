var user_photos = new Swiper('#user_photos', {
    direction: 'horizontal', // 垂直切换选项
    loop: false, // 循环模式选项


    // 如果需要前进后退按钮
    navigation: {
        nextEl: '#user_photos .swiper-button-next',
        prevEl: '#user_photos .swiper-button-prev',
    },

    // 当到首尾页隐藏按钮
    on: {
        slideChangeTransitionEnd: function () {
            if (this.isEnd) {
                console.log("1");
                this.navigation.$nextEl.css('display', 'none');
            } else {
                console.log("2");
                this.navigation.$nextEl.css('display', 'block');
            }
        },
        slideChange: function () {
            // console.log(this.activeIndex);
        },
    },

    // initialSlide: 2,  //好像和上面的on使用冲突
})

user_photos.slideTo(1, 0, false);
user_photos.on('slideChangeTransitionEnd', function () {
    console.log("索引值：" + user_photos.activeIndex);
});
console.log('user_photos.activeIndex: ', user_photos.activeIndex);

var gallerySwiper = new Swiper('#gallery', {
    spaceBetween: 10,
    thumbs: {
        swiper: {
            el: '#thumbs',
            slidesPerView: 6,
            watchSlidesVisibility: true,
            navigation: {
                nextEl: '.goods_show .swiper-button-next',
                prevEl: '.goods_show .swiper-button-prev',
            },
            on: {
                slideChangeTransitionEnd: function () {
                    if (this.isEnd) {
                        this.navigation.$nextEl.css('display', 'none');
                    } else {
                        this.navigation.$nextEl.css('display', 'block');
                    }
                },
            }
        },
    },
    on: {

        click: function () {
            console.log('this.clickedIndex: ', this.clickedIndex);
        }
    },
    effect: 'slide',
})


// 隐藏滚动条(!!!!!!!)
// var mask = document.querySelector(".mask");
// var body = document.querySelector("body")
// mask.onmouseenter = function(){
//     body.style.overflow = "hidden"
// }
// mask.onmouseleave = function(){
//     body.style.overflow = "auto"
// }

// var block = document.querySelector(".block");
// var index = 0;

// function fadedToNext() {
//     //清除之前样式
//     clearFadedBannerStyle();
//     index++;
//     if (index >= faded_banner_imgs.length) {
//         index = 0;
//     }
//     setFadedBannerStyle();
// }
// function fadedToPrev() {
//     //清除之前样式
//     clearFadedBannerStyle();
//     index--;
//     if (index < 0) {
//         index = faded_banner_imgs.length - 1;
//     }
//     setFadedBannerStyle();
// }

// function clearFadedBannerStyle() {
//     clearInterval(faded_banner_timer);
//     clearInterval(faded_banner_imgs[index].timer)
//     faded_banner_spans[index].style.backgroundColor = "rgba(255,255,255,.4)"
//     faded_banner_imgs[index].classList.remove("show")
//     faded_banner_imgs[index].style.opacity = ".02"
// }

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

// // 删除cookie
function removeCookie(key) {
    setCookie({
        key: key,
        val: '1234',
        days: -5
    });
}

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

// 根据在cookie中的键获取值
var cook;
var detail;
var text;
var introduce;
var sell_point;
var say, price, introduce
if (cook = getCookie("item")) {
    $.ajax({
        type: "get",
        url: "http://localhost:3001/home/featured",
        dataType: "jsonp",
        jsonp: "getFeatured",
        success: function (response) {
            var attr = Object.keys(response)
            attr.forEach(function (item, index) {
                if (cook == item) {
                    var str = "";
                    var local_info = "";

                    // 获取数据
                    detail = response[cook].detail;
                    text = response[cook].text;
                    introduce = response[cook].introduce;
                    sell_point = response[cook].sell_point;
                    say = response[cook].say;
                    price = response[cook].price;
                    introduce = response[cook].introduce;


                    // 渲染数据
                    _text.innerText = text;
                    _detail.innerText = detail;
                    if (sell_point != null) {
                        sell_point = Object.values(sell_point);
                        sell_point.forEach(function (item) {
                            str += `<li>
                           ${item}
                        </li>`
                        })
                        _sell_point_ul.innerHTML = str;
                        _info_detail_ul.innerHTML = str;
                    }
                    if (say != null) {
                        _say_span.innerHTML = say;
                    }
                    if (price != null) {
                        _price.innerHTML = price;
                    }
                    if (introduce != null) {
                        var h3s = Object.keys(introduce);
                        h3s.forEach(function (item) {
                            local_info += `
                            <h3>${item}</h3>`
                            var spans = introduce[item];
                            spans = Object.values(spans)
                            spans.forEach(function (value) {
                                local_info += `<span>${value}</span>`
                            })
                        })
                        _local_info.innerHTML = local_info;



                    }

                }

            })
        }
    });
}
console.log('cook: ', cook);

var _text = document.querySelector(".content_wrap .text_wrap .text");
var _detail = document.querySelector(".content_wrap .text_wrap .detail");

var _sell_point_ul = document.querySelector(".goods_show .right .sell_point .point_height ul");

var _say_span = document.querySelector(".goods_show .right .say span");
var _price = document.querySelector(".text_wrap .price span");
var _info_detail_ul = document.querySelector(".info_detail .sail ul");
var _local_info = document.querySelector(".info_detail .local_info");

// 控制滚动条行为
var _scroll = document.querySelector(".goods_show .right .sell_point .point_height");

_scroll.onmouseenter = function () {
    // console.log("ffff");
    // _scroll.onmousewheel = function (ev) {
    //     var e = ev || window.event;
    //     console.log(e.wheelDelta);

    //     e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
    // }
    preventScroll("ph_scroll");
}

function preventScroll(id) {
    var _this = document.getElementById(id);
    if (navigator.userAgent.indexOf("Firefox") > 0) {
        _this.addEventListener('DOMMouseScroll', function (e) {
            _this.scrollTop += e.detail > 0 ? 60 : -60;
            e.preventDefault();
        }, false);
    } else {
        _this.onmousewheel = function (e) {
            e = e || window.event;
            _this.scrollTop += e.wheelDelta > 0 ? -60 : 60;
            return false;
        };
    }
    return this;
}

// 箭头控制滚动条
var scroll = document.getElementById("ph_scroll");
var _top = document.querySelector(".goods_show .right .sell_point .control .top");
var _bottom = document.querySelector(".goods_show .right .sell_point .control .bottom");
var scrollTime;

_top.onmouseenter = function () {
    scrollTime = setInterval(scrollUp, 20)
}
_top.onmouseleave = function () {
    clearInterval(scrollTime)
}

_bottom.onmouseenter = function () {
    scrollTime = setInterval(scrollDown, 20)
}
_bottom.onmouseleave = function () {
    clearInterval(scrollTime)
}
function scrollUp() {
    scroll.scrollTop -= 1;
}
function scrollDown() {
    scroll.scrollTop += 1;
}
