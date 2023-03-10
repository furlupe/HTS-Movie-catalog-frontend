import {post, put} from "./../requests.js"
import { URL_ADD_REVIEW, URL_EDIT_REVIEW} from "../requests_consts.js";

export function registerReviewFormEvents(movieId, id) {

    $(".save-review-button").click(() => {
        post(URL_ADD_REVIEW(movieId), {
            "reviewText": $(".user-review-form #reviewText").val(),
            "rating": checkRating(parseInt($(".user-review-form #reviewRating").val())),
            "isAnonymous": $(".user-review-form #reviewAnon").is(':checked')
        })
        .then(() => location.reload());
    })

    $(".edit-review-button").click(() => {
        let rating = parseInt($(".user-review-form #reviewRating").val())
        put(URL_EDIT_REVIEW(movieId, id), {
            "reviewText": $(".user-review-form #reviewText").val(),
            "rating": checkRating(parseInt($(".user-review-form #reviewRating").val())),
            "isAnonymous": $(".user-review-form #reviewAnon").is(':checked')
        })
        .then(() => {
            location.reload()
        });
    })

    $(".cancel-edit-review-button").click(() => {
        location.reload();
    })
}

function checkRating(rating) {
    return rating = rating < 10 ? 
    (rating > 0 ? rating : 0) : 10;
}