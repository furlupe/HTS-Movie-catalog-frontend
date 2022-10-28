import { showDetailsPage } from "./moviedetails/show_details_reviews.js";
import { get } from "./requests.js";

$(document).ready(function () {
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
    })
    .then(() => {
        var page = getContent(location.pathname);
        var addable = ADDABLE_HTML[page.keyword];
        $('.content').load(addable.content, addable.show(page.param));
    });

});

// необходим для определения, что вставить в блок контента
const ADDABLE_HTML = {
    "catalogpage": {
        content: "/moviescatalog.html",
        show: (page) => {
            showCatalogPage(page);
        }},
    "detailspage": {
        content: "/moviedetails.html",
        show: (identificators) => {
            showDetailsPage(
                identificators.userId, 
                identificators.movieId
            );
        }}
};


// через регулярки определяем, какая у нас страница -> определяем ключевое слово контента
var getContent = (path) => {
    switch(true) {
        case /^\/movie\/.+/.test(path):
            return {
                keyword: "detailspage",
                param: {
                    userId: localStorage.getItem("userId"),
                    movieId: path.length > 1 ? path.match(/^\/movie\/(.+)/)[1] : 1
                }
            };

        case !path.length:
        case /^\/([1-9][0-9]*)*/.test(path): 
            return { // страница каталога фильмов
                keyword: "catalogpage",
                param: path.length > 1 ? path.match(/([1-9][0-9]*)/g)[0] : 1
            };
    }
}
