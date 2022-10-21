$(document).ready(function() {
    var id = localStorage.getItem("selectedMovieID");
    localStorage.setItem("userMadeReview", "0");
    get(`https://react-midterm.kreosoft.space/api/movies/details/${id}`)
    .then(details => {
        showMovieDetails(details);

        get("https://react-midterm.kreosoft.space/api/account/profile", localStorage.getItem("userToken"))
        .then(profile => {
            localStorage.setItem("userId", profile.id);
        })
        .catch(e => {
            localStorage.setItem("userId", "");
            $(".user-review-form").addClass("d-none");
        });

        showReviews(details.reviews);

        if(localStorage.getItem("userMadeReview") == "0" && localStorage.getItem("userId") != "") {
            $(".user-review-form").removeClass("d-none");
        }

        $(".save-review-button").click(() => {
            post(`https://react-midterm.kreosoft.space/api/movie/${localStorage.getItem("selectedMovieId")}/review/add`, {
                "reviewText": $(".user-review-form #reviewText").val(),
                "rating": parseInt($(".user-review-form #reviewRating").val()),
                "isAnonymous": $(".user-review-form #reviewAnon").is(':checked')
            })
            .then(() => location.reload());
        })

        $(".edit-review-button").click(() => {
            console.log("asd");
            put(`https://react-midterm.kreosoft.space/api/movie/${localStorage.getItem("selectedMovieId")}/review/add`, {
                "reviewText": $(".user-review-form #reviewText").val(),
                "rating": parseInt($(".user-review-form #reviewRating").val()),
                "isAnonymous": $(".user-review-form #reviewAnon").is(':checked')
            })
            .then(() => location.reload());
        })

        $(".reset-edit-review-button").click(() => {
            $("#reviews .user-review-form-redacting").addClass("d-none");
        })
    })
    .catch(error => console.log(error));
});