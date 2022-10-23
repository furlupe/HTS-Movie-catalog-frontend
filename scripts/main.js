$(document).ready(function () {
    var addable = ADDABLE_HTML["detailspage"];

    $('body').append(addable.body);
    $('.content').load(addable.content);

    get("https://react-midterm.kreosoft.space/api/account/profile")
    .then(profile => {
        $("#navbar").removeClass("user-unauthorized");
        $("#navbar").addClass("user-logged-in");

        $("#navbar").find("#nickname").text(profile.nickName);
    })
    .catch(() => {
        $("#navbar").removeClass("user-logged-in");
        $("#navbar").addClass("user-unauthorized");
    });
});

// необходим для определения, что вставить в блок контента
const ADDABLE_HTML = {
    "catalogpage": {
        "body": "<script src='./scripts/moviescatalog/moviescatalog.js'></script>",
        "content": "moviescatalog.html"
    },
    "detailspage": {
        "body": '<script src="./scripts/moviedetails/moviedetails.js"></script> \
        <script src="./scripts/moviedetails/reviews.js"></script> \
        <script src="./scripts/moviedetails/show_details_reviews.js"></script>',
        "content": "moviedetails.html"
    }
};

// через регулярки определяем, какая у нас страница -> определяем ключевое слово контента
var getContentKeyWord = (path) => {
    switch(true) {
        case !path.length:
        case /^[1-9][0-9]*$/.test(path): 
            return "catalogpage"; // страница каталога фильмов
        case /^movie\/.+$/.test(path):
            return "detailspage";
    }
}
