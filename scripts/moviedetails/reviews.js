import { put, del } from "./../requests.js";

export function showReviews(reviews) {
    var $template = $(".review-template")
    for(var review of reviews) {
        var $r = $template.clone();
        $r.removeClass("d-none");

        var avatar = review.author.avatar;
        var color = (review.rating > 5) ? "success" : "danger";

        $r.addClass(`border-${color}`);

        $r.find(".user-avatar").attr("src", (review.isAnonymous) ? 
            "" : (avatar ? avatar : "" ));

        $r.find(".user-name").text((review.isAnonymous) ? "Аноним" : review.author.nickName);
        $r.find(".review-date").text((new Date(review.createDateTime)).toLocaleDateString());

        $r.find(".review-rating").text(review.rating)
        .addClass(`bg-${color}`);

        $r.find(".review-text").text(review.reviewText)
        .addClass(`text-${color}`);
        
        if (localStorage.getItem("userId") != review.author.userId) {
            $(".reviews-container").append($r);
            continue;
        }

        $r.find(".card-footer").removeClass( "d-none");

        localStorage.setItem("userReviewId", review.id)
        localStorage.setItem("userMadeReview", "1");
        $('.reviews-container').prepend($r);
    }
    registerReviewEvent();

}

function registerReviewEvent() {
    var movieId = localStorage.getItem("selectedMovieId");
    var id = localStorage.getItem("userReviewId")

    $(".modify-user-review").click(() => {
        $("#reviews .user-review-form-redacting").removeClass("d-none");
    });

    $(".edit-review-button").click(() => {
        put(`https://react-midterm.kreosoft.space/api/movie/${movieId}/review/${id}/edit`, {
            "reviewText": $(".user-review-form-redacting #reviewText").val(),
            "rating": parseInt($(".user-review-form-redacting #reviewRating").val()),
            "isAnonymous": $(".user-review-form-redacting #reviewAnon").is(':checked')
        })
        .then(() => location.reload());
    })

    $(".reset-edit-review-button").click(() => {
        $("#reviews .user-review-form-redacting").addClass("d-none");
    })

    $(".delete-user-review").click(() => {
        del(`https://react-midterm.kreosoft.space/api/movie/${movieId}/review/${id}/delete`);
        console.log("removed");
        location.reload();
    });
}
