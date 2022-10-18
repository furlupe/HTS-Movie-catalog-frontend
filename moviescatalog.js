$(document).ready(function() {
    /*post("https://react-midterm.kreosoft.space/api/account/login", {
        username: "furlupe",
        password: "strong"
    })
    .then(token => {
        localStorage.setItem("userToken", token);
        loadNavbar();
        show();
    })*/
    loadNavbar();
    show();
});

function show(){
    var page = window.localStorage.getItem("currentMoviesListPage");
    page = page ? page : 1

    get(`https://react-midterm.kreosoft.space/api/movies/${page}`)
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

        $(".pagination").empty();
        $template = $(".page-template");
        for (var i = 1; i <= res.pageInfo.pageCount; i++) {
            $page = $template.clone();
            $page.removeClass('d-none');
            $page.attr("id", `page-${i}`);
            $page.find('.page-link').text(`${i}`);

            if (i == page) $page.addClass("active");

            $(".pagination").append($page);
        }

        registerPressMovieEvents();
        registerPaginationEvents();
    }).catch(error => console.log(error));
}

function registerPressMovieEvents() {
    $(".movie-template").click(function() {
        localStorage.setItem("selectedMovieID", $(this).attr("id").replace("movie-", "")); // сохраняем выбранный фильм для другой страницы
        location.replace("/moviedetails.html"); // переходим на страницу
    })
}

// доделать, не работает перезагрузка
function registerPaginationEvents() { 
    $(".page-template").click(function () { 
        var id = $(this).attr('id').replace("page-", "");

        //window.history.replaceState("a", "Page", `/${id}`);
        window.localStorage.setItem("currentMoviesListPage", parseInt(id));
        show();
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
