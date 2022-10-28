import { showCatalogPage } from "./moviescatalog/showcatalog.js";
import { get } from "./requests.js"

$(document).ready(function () {
    var page = getContent(window.location.pathname);
    var addable = ADDABLE_HTML[page.keyword];

    $('.content').load(addable.content, addable.show(page.param));

    get("https://react-midterm.kreosoft.space/api/account/profile", localStorage.getItem("userToken"))
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
        content: "moviescatalog.html",
        show: (page) => {
            showCatalogPage(page);
        }
    }
};

// через регулярки определяем, какая у нас страница -> определяем ключевое слово контента и необходимые доп. параметры для него
var getContent = (path) => {
    switch(true) {
        case !path.length:
        case /\/([1-9][0-9]*)*/.test(path): 
            return { // страница каталога фильмов
                keyword: "catalogpage",
                param: path.length > 1 ? path.match(/([1-9][0-9]*)/g)[0] : 1
            };
    }
}
