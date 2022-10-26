import { showDetailsPage } from "./moviedetails/show_details_reviews.js";
import { get } from "./requests.js";

$(document).ready(function () {
    var addable = ADDABLE_HTML["detailspage"];

    $('.content').load(addable, showDetailsPage());

    get("https://react-midterm.kreosoft.space/api/account/profile")
    .then(profile => {
        $("#navbar").removeClass("user-unauthorized");
        $("#navbar").addClass("user-logged-in");

        $("#navbar").find("#nickname").text(profile.nickName);

        localStorage.setItem("userId", profile.id);
    })
    .catch(() => {
        $("#navbar").removeClass("user-logged-in");
        $("#navbar").addClass("user-unauthorized");

        $("#navbar").find("#nickname").text("");

        localStorage.setItem("userId", "");
    });
});

// необходим для определения, что вставить в блок контента
const ADDABLE_HTML = {
    "catalogpage": "moviescatalog.html",
    "detailspage": "moviedetails.html"
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
