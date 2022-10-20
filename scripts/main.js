$(document).ready(function () {
    $('head').append('<link rel="stylesheet" href="/styles/moviedetails.css">');

    $('body').append('<script src="./scripts/moviedetails/moviedetails.js"></script> \
    <script src="./scripts/moviedetails/reviews.js"></script> \
    <script src="./scripts/moviedetails/show_details_reviews.js"></script>');

    $.get("moviedetails.html", function(data) {
        $(".content").replaceWith(data);
    });
})