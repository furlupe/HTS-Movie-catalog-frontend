import { get, post, del } from "./../requests.js";
import { URL_GET_FAVORITES, URL_ADD_FAVORITE, URL_DELETE_FAVORITE} from "../requests_consts.js";

export function initFavButton(movieId) {
    get(URL_GET_FAVORITES) // если текущий фильм лежит в списке избранного, меняем на кнопку "убрать из избранного"
    .then(json => {
        for (var movie of json.movies) {
            if (movie.id != movieId) {
                continue;   
            }
            $("#add-to-favorites").addClass("d-none");
            $("#remove-from-favorites").removeClass("d-none");
            break;
        }

        registerFavoritesEvents(movieId);
    });
}

function registerFavoritesEvents(movieId) {
    $("#add-to-favorites").click(() => {
        post(URL_ADD_FAVORITE(movieId))
        .then(() => {
            $("#add-to-favorites").addClass("d-none");
            $("#remove-from-favorites").removeClass("d-none");
        })
        .catch(e => console.log(e));
    });

    $("#remove-from-favorites").click(() => {
        del(URL_DELETE_FAVORITE(movieId))
        .then(() => {
            $("#add-to-favorites").removeClass("d-none");
            $("#remove-from-favorites").addClass("d-none");
        })
        .catch(e => console.log(e));
    });
}