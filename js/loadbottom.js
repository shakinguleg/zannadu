var content = document.querySelector(".content_wrap");
var $header = $("<div></div>");
var $bottom = $("<div></div>");

$(content).before($header);
$(content).after($bottom);
$(function () {
    $header.load("../html/header_nav.html", function (response, status, request) {
        console.log("header_nav导入成功");
    });
    $bottom.load("../html/bottom.html", function (response, status, request) {
        console.log("bottom导入成功");
    });
})


