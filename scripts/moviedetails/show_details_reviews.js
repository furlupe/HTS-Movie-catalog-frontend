$(document).ready(function() {
    var id = localStorage.getItem("selectedMovieID");
    localStorage.setItem("userMadeReview", "0");
    get(`https://react-midterm.kreosoft.space/api/movies/details/${id}`)
    .then(details => {
        showMovieDetails(details);

        var userId = get("https://react-midterm.kreosoft.space/api/account/profile", localStorage.getItem("userToken"))
        .then(profile => {
            userId = profile.id;
            $(".user-review-form").removeClass("d-none");
        })
        .catch(() => {
            userId = "";
        });

        showReviews(details.reviews, userId);

        if(localStorage.getItem("userMadeReview") == "1") {
            $(".user-review-form").addClass("d-none");
            return;
        }

        $(".save-review-button").click(() => {
            post(`https://react-midterm.kreosoft.space/api/movie/${localStorage.getItem("selectedMovieId")}/review/add`, {
                "reviewText": $(".user-review-form #reviewText").val(),
                "rating": parseInt($(".user-review-form #reviewRating").val()),
                "isAnonymous": $(".user-review-form #reviewAnon").is(':checked')
            })
        })
    })
    .catch(error => console.log(error));
});