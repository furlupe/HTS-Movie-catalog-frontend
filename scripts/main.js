import { showCatalogPage } from "./moviescatalog/showcatalog.js";
import { get } from "./requests.js"

$(document).ready(function () {
    var url = window.location.pathname
    var addable = ADDABLE_HTML[getContentKeyWord(url)];
    console.log

    $('.content').load(addable.content, addable.show(url));

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
        show: (url) => {
            showCatalogPage(
                url.length > 1 ?
                url.match(/([1-9][0-9]*)/g)[0] : 1
            );
        }
    }
};

// через регулярки определяем, какая у нас страница -> определяем ключевое слово контента
var getContentKeyWord = (path) => {
    switch(true) {
        case !path.length:
        case /\/([1-9][0-9]*)*/.test(path): 
            return "catalogpage"; // страница каталога фильмов
    }
}
