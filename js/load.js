var content = document.querySelector(".content_wrap");
var $header = $("<div></div>");
var $bottom = $("<div></div>");
var $nav = $("<div></div>");


$(content).before($nav);
$($nav).before($header);
$(content).after($bottom);
$(function () {
    $header.load("../html/header.html", function (response, status, request) {
        console.log("header导入成功");
    });
    $bottom.load("../html/bottom.html", function (response, status, request) {
        console.log("bottom导入成功");
    });
    $nav.load("../html/nav.html", function (response, status, request) {
        console.log("nav");
    });
})


