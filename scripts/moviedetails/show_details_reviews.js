import { showMovieDetails } from "./moviedetails.js";
import { showReviews } from "./reviews.js";
import { initFavButton } from "./to_favorite_button.js";
import { get, post, del } from "./../requests.js";
import { registerReviewFormEvents } from "./review_form.js";
import { URL_GET_MOVIE_DETAILS, URL_GET_USER_PROFILE } from "../requests_consts.js";

export function showDetailsPage(userId, movieId) {
    get(URL_GET_MOVIE_DETAILS(movieId))
    .then(details => {

        showMovieDetails(details); 
        initFavButton(details.id);
        showReviews(details.id, userId, details.reviews)
        .then(res => {
            registerReviewFormEvents(details.id, res);
            if ( !res ) $(".user-review-form").removeClass("d-none");
        });
        
        // т.е., если пользователь не залогинен, то никакой ему формы отзыва и избранного
        get(URL_GET_USER_PROFILE)
        .catch(() => {
            $(".user-review-form").addClass("d-none");
            $("#add-to-favorites").addClass("d-none");
            $("#remove-from-favorites").addClass("d-none");
        })
    })
    .catch(error => console.log(error));
}