$(document).ready(function () {
    $('head').append("<link rel='stylesheet' href='/styles/moviespagestyle.css'>");
    $('body').append("<script src='./scripts/moviescatalog/moviescatalog.js'></script>");
    $.get("moviescatalog.html", function(data) {
        $(".content").replaceWith(data);
    });
});