import { formatMoney } from "./../general_purpose_funcs.js";

export function showMovieDetails(details) {
    $("#movie-poster").attr("src", getDetail(details.poster, "/assets/images/no_poster.png"));
    $("#movie-name").text(getDetail(details.name));
    $("#movie-descr").text(getDetail(details.description));
    $("#prod-year").text(getDetail(details.year));
    $("#prod-country").text(getDetail(details.country));

    $("#prod-genre").text(
        `${details.genres.map((item) => { return item.name }).join(", ")}`
    );

    $("#prod-length").text(`${details.time} мин.`);
    $("#prod-tagline").text(getDetail(details.tagline));
    $("#prod-director").text(getDetail(details.director))

    $("#prod-budget").text(formatMoney(details.budget));
    $("#prod-fees").text(formatMoney(details.fees));

    $("#prod-agelimit").text(`${details.ageLimit}+`);

}

var getDetail = (detail, showIfNull = "Неизвестно") => {
    return detail ? detail : showIfNull;
}