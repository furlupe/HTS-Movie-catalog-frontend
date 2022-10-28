import { showRegistartion } from "./registration/registration.js";
import { get } from "./requests.js";

$(document).ready(function () {
    get("https://react-midterm.kreosoft.space/api/account/profile", localStorage.getItem("userToken"))
    .then(profile => {
        $("#navbar").removeClass("user-unauthorized");
        $("#navbar").addClass("user-logged-in");

        $("#navbar").find("#nickname").text(profile.nickName);
    })
    .catch(() => {
        $("#navbar").removeClass("user-logged-in");
        $("#navbar").addClass("user-unauthorized");
    })
    .then(() => {
        var page = getContent(location.pathname);
        var addable = ADDABLE_HTML[page.keyword];
        $(".content").load(addable.content, () => addable.show(page.param));
    });
});

// необходим для определения, что вставить в блок контента
const ADDABLE_HTML = {
    "catalogpage": "moviescatalog.html",
    "registrationpage": {
        content: "/registrationform.html",
        show: (p) => showRegistartion()
    }
};

// через регулярки определяем, какая у нас страница -> определяем ключевое слово контента
var getContent = (path) => {
    switch(true) {
        case /^\/registration\/$/.test(path):
            return { 
                keyword: "registrationpage",
                param: null
            };
        case !path.length:
        case /[1-9][0-9]*/.test(path): 
            return "catalogpage"; // страница каталога фильмов
    }
}
