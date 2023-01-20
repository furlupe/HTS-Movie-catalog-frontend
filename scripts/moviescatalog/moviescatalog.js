import {get} from "./../requests.js"
import { countAvgRating } from "./../general_purpose_funcs.js";
import { URL_GET_PAGE } from "../requests_consts.js";

export function fillCatalog(page){
    get(URL_GET_PAGE(page))
    .then(res => {
        $("#movies").empty()
        var $template = $(".movie-template");
        for (var movie of res.movies) {
            var $movieCard = $template.clone(true, true);
            $movieCard.removeClass("d-none");
            $movieCard.attr("movie-id", movie.id);
            $movieCard.find(".movie-poster").attr("src", movie.poster)
            $movieCard.find(".movie-name").text(movie.name);
            $movieCard.find(".movie-year").text(movie.year);
            $movieCard.find(".movie-extinfo").text(
                `${movie.country} • ${movie.genres.map((item) => { return item.name }).join(", ")}`
            ) // из json'а выдернуть все названия жанров и соединить их через ,

            $movieCard.find(".movie-rating").text(`Средняя оценка: ${countAvgRating(movie)}`)
            $("#movies").append($movieCard);
        }

        registerPressMovieEvents();
    }).catch(error => console.log(error));

}

function registerPressMovieEvents() {
    $(".movie-template").click(function() {
        location.replace(`/movie/${$(this).attr("movie-id")}`); // переходим на страницу
    })
}