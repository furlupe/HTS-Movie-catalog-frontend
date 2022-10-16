$(document).ready(function() {
    showMovies();
});

function showMovies(){
    get("https://react-midterm.kreosoft.space/api/movies/1")
    .then(res => {
        $("#movies").empty()
        $template = $(".movie-template");
        for (var movie of res.movies) {
            $movieCard = $template.clone(true, true);
            $movieCard.removeClass("d-none");
            $movieCard.attr("id", `movie-${movie.id}`);
            $movieCard.find(".movie-poster").attr("src", movie.poster)
            $movieCard.find(".movie-name").text(movie.name);
            $movieCard.find(".movie-year").text(movie.year);
            $movieCard.find(".movie-extinfo").text(
                `${movie.country} • ${movie.genres.map((item) => { return item.name }).join(", ")}`
            ) // из json'а выдернуть все названия жанров, объединить в список и соединить через ,
            $movieCard.find(".movie-rating").text(`Средняя оценка: ${countAvgRating(movie)}`)
            $("#movies").append($movieCard);
        }

        registerPressMovieEvents();
    }).catch(error => console.log(error));
}

// шаблон для функции перехода на страницу фильма
function registerPressMovieEvents() {
    $(".movie-template").click(function() {
        console.log($(this).find(".movie-name").text())
    })
}

function countAvgRating(movie) {
    return ((movie.reviews.length < 1) ? 0 : // если рецензий нет, вернуть 0 как среднюю оценку
    movie.reviews.map((review) => { 
        return review.rating 
    })
    .reduce((a, b) => {
        return a + b
    }, 0) / movie.reviews.length).toFixed(1);
}
