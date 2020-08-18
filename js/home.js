function connected() {
    $.ajax({
        type: "get",
        url: "http://localhost:3001/home/featured",
        data: "data",
        dataType: "jsonp",
        jsonp: "getFeatured",
        success: function (response) {
            console.log(response[1].detail);
        }
    });
}
connected();

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