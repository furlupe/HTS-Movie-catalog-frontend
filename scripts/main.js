import { showProfile } from "./userprofilepage/userprofile.js";
import { showFavorites } from "./moviefavorites/favorites.js";
import { showLogin } from "./login/login.js"
import { showDetailsPage } from "./moviedetails/show_details_reviews.js";
import { showCatalogPage } from "./moviescatalog/showcatalog.js";
import { showRegistartion } from "./registration/registration.js";
import { get, post } from "./requests.js";
import { getContent } from "./get_content.js";
import {URL_GET_USER_PROFILE, URL_LOGOUT} from "./requests_consts.js";

$(document).ready(function () {
    var userLoggedIn = false;
    get(URL_GET_USER_PROFILE)
    .then(profile => {
        $("#navbar").removeClass("user-unauthorized");
        $("#navbar").addClass("user-logged-in");

        $("#navbar").find("#nickname").text(profile.nickName);

        $("#signout").click(() => {
            post(URL_LOGOUT)
            .then(() => {
                localStorage.setItem("userToken", "");
                location.reload()
            });
        })

        localStorage.setItem("userId", profile.id);
        userLoggedIn = true;
    })
    .catch(() => {
        $("#navbar").removeClass("user-logged-in");
        $("#navbar").addClass("user-unauthorized");

        $("#navbar").find("#nickname").text("");

        localStorage.setItem("userId", "");
    })
    .then(() => {
        var page = getContent(location.pathname);

        if (page.auth && !userLoggedIn) location.replace("/login/");
        if (page.auth === false && userLoggedIn) location.replace("/");

        var addable = ADDABLE_HTML[page.keyword];
        $('.content').load(addable.content, () => addable.show(page.param));
    });

});

// необходим для определения, что вставить в блок контента
const ADDABLE_HTML = {
    "userprofilepage": {
        content: "/userprofile.html",
        show: (p) => showProfile()
    },

    "catalogpage": {
        content: "/moviescatalog.html",
        show: (page) => showCatalogPage(page)
    },

    "detailspage": {
        content: "/moviedetails.html",
        show: (identificators) => {
            showDetailsPage(
                identificators.userId, 
                identificators.movieId
            );
        }},

    "loginpage": {
        content: "/login.html",
        show: (id) => showLogin(id)
    },

    "registrationpage": {
        content: "/registrationform.html",
        show: (p) => showRegistartion()
    },

    "favoritespage": {
        content: "/favorites.html",
        show: (p) => showFavorites()
    }
};