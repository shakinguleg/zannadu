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
                this.navigation.$nextEl.css('display', 'none');
            } else {
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
                nextEl: '#thumbs .swiper-button-next',
                prevEl: '#thumbs .swiper-button-prev',
            },
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
