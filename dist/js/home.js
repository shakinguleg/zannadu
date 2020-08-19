var featured_ul = document.querySelector(".content_wrap .featured_1 .goods ul")


// 获取品介优选 Featured Products数据
function getFeatured() {
    $.ajax({
        type: "get",
        url: "http://localhost:3001/home/featured",
        dataType: "jsonp",
        jsonp: "getFeatured",
        success: function (response) {
            var attr = Object.keys(response);
            console.log('attr: ', attr);
            var arr = Object.values(response);
            console.log('arr: ', arr);
            for (var i = 0; i < 5; i++) {
                var str;
                if (i == 3) {
                    str = `
                    <li class="special" attr=${attr[3]}>
                        <a href="../html/goods_detail.html">
                            <img src="${arr[3].photo}" alt="">
                            <div class="detail">${arr[3].detail}</div>
                            <div class="text_wrap">
                                <span>${arr[3].text}</span>
                                <div class="go">
                                    <em class="go_1"><i></i></em>
                                    <em class="go_2"></em>
                                </div>
                            </div>
                        </a>
                    </li>
                    `
                    featured_ul.innerHTML += str;
                    continue;
                }
                str = `
                <li attr=${attr[i]}>
                    <a href="../html/goods_detail.html">
                        <img src="${arr[i].photo}" alt="">
                        <div class="detail">${arr[i].detail}</div>
                        <div class="text_wrap">
                            <span>${arr[i].text}</span>
                            <div class="go">
                                <em class="go_1"><i></i></em>
                                <em class="go_2"></em>
                            </div>
                        </div>
                    </a>
                </li>`

                featured_ul.innerHTML += str;
            }

            
            for (var i = 5; i < arr.length; i++) {
                var str;
                str = `
                <li attr=${attr[i]}>
                    <a href="../html/goods_detail.html">
                        <img src="${arr[i].photo}" alt="">
                        <div class="detail">${arr[i].detail}</div>
                        <div class="text_wrap">
                            <span>${arr[i].text}</span>
                            <div class="go">
                                <em class="go_1"><i></i></em>
                                <em class="go_2"></em>
                            </div>
                        </div>
                    </a>
                </li>`
                domestic_ul.innerHTML += str;
            }
        }
    });
}
getFeatured();

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

$(featured_ul).on("click", "li", function () {
    console.log("fff");
    var attr = $(this).attr("attr");
    setCookie({
        key: "item",
        val: attr
    })

});

var domestic_ul = document.querySelector(".domestic .goods ul")


$(domestic_ul).on("click", "li", function () {
    console.log("fff");
    // var img = $(this).find("img")[0].src;
    // var detail = $(this).find(".detail").text();
    // var text = $(this).find(".text_wrap").text();
    var attr = $(this).attr("attr");
    setCookie({
        key: "item",
        val: attr
    })

});

var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    effect: 'fade',
})

mySwiper.params.pagination.clickable = true;
//此外还需要重新初始化pagination
mySwiper.pagination.destroy()
mySwiper.pagination.init()
mySwiper.pagination.bullets.eq(0).addClass('swiper-pagination-bullet-active');