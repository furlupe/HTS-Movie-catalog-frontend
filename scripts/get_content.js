import { URL_REXEP, CONTENT_REGEXP } from "./pages_constants.js";

// через регулярки определяем, какая у нас страница -> определяем ключевое слово контента
// keyword - самое кл. слово, через которое мы получаем контент в словаре ADDABLE_HTML и функцию показа оного
// param - доп. параметры для функции показа
// auth - отображает требование быть залогиненным. Если установлено true - значит на данную страницу может пройти ТОЛЬКО залогиненный пользователь,
// false - ТОЛЬКО разлогиненный, null - не имеет значения
export function getContent(path) {
    switch(true) {
        case URL_REXEP.PROFILE.test(path):
            $("#navbar").find("#profile").addClass("text-white");
            return {
                keyword: "userprofilepage",
                param: null,
                auth: true
            }
            
        case URL_REXEP.FAVORITES.test(path):
            $("#navbar").find("#favorites").addClass("text-white");
            return {
                keyword: "favoritespage",
                param: null,
                auth: true
            }

        case URL_REXEP.REGISTRATION.test(path):
            $("#navbar").find("#signup").addClass("text-white");
            return { 
                keyword: "registrationpage",
                param: null,
                auth: false
            };

        case URL_REXEP.LOGIN.test(path):
            $("#navbar").find("#login").addClass("text-white");
            return {
                keyword: "loginpage",
                param: null,
                auth: false
            }

        case URL_REXEP.MOVIE.test(path):
            return {
                keyword: "detailspage",
                param: {
                    userId: localStorage.getItem("userId"),
                    movieId: path.length > 1 ? path.match(CONTENT_REGEXP.MOVIE_ID)[1] : 1
                },
                auth: null
            };

        case !path.length:
        case URL_REXEP.MOVIE_PAGE.test(path): 
            $("#navbar").find("#films").addClass("text-white");
            return { // страница каталога фильмов
                keyword: "catalogpage",
                param: path.length > 1 ? path.match(CONTENT_REGEXP.PAGE_NUMBER)[0] : 1,
                auth: null
            };
    }
}