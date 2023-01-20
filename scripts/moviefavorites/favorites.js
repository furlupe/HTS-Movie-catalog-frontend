import { del, get } from "./../requests.js"
import { countAvgRating } from "./../general_purpose_funcs.js";
import { URL_GET_FAVORITES, URL_DELETE_FAVORITE } from "../requests_consts.js";

export function showFavorites() {
    get(URL_GET_FAVORITES)
    .then(res => {
        $("#favoritemovies").empty();

        if(res.movies.length < 1) {
            console.log("no")
            $(".no-favorites").removeClass("d-none");
        }

        var $template = $(".favorite-template");
        for(var fav of res.movies) {
            var $f = $template.clone();

            $f.removeClass("d-none");

            $f.find(".movie-poster").attr("src", fav.poster);
            $f.find(".movie-name").text(fav.name);
            $f.find(".movie-year").text(fav.year);
            $f.find(".movie-extinfo").text(
                `${fav.country} • ${fav.genres.map((item) => { return item.name }).join(", ")}`
            );

            $f.find(".movie-rating").text(`Средняя оценка: ${countAvgRating(fav)}`)
            $f.find(".remove-from-favorites").data("movie", fav.id);

            $("#favoritemovies").append($f);
        }

        registerDeleteButtonEvents();
    });
}

function registerDeleteButtonEvents () {
    $(".remove-from-favorites").click(function() {
        del(URL_DELETE_FAVORITE($(this).data("movie")))
        .then(() => {
            showFavorites();
        });
    });
}