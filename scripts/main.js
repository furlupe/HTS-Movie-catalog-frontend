import { showProfile } from "./userprofilepage/userprofile.js";
import { get } from "./requests.js";

$(document).ready(function () {
    get("https://react-midterm.kreosoft.space/api/account/profile", localStorage.getItem("userToken"))
    .then(profile => {
        console.log(profile);
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
        $('.content').load(addable.content, () => addable.show(page.param));
    });
});

// необходим для определения, что вставить в блок контента
const ADDABLE_HTML = {
    "userprofilepage": {
        content: "/userprofile.html",
        show: (p) => showProfile()
    }
};

// через регулярки определяем, какая у нас страница -> определяем ключевое слово контента
var getContent = (path) => {
    switch(true) {
        case /^\/profile\/$/.test(path):
            return {
                keyword: "userprofilepage",
                param: null
            };
    }
}
