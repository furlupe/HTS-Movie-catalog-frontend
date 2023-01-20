const URL_REXEP = {
    PROFILE: /^\/profile\/$/,
    FAVORITES: /^\/favorites\/$/,
    REGISTRATION: /^\/registration\/$/,
    LOGIN: /^\/login\/$/,
    MOVIE: /^\/movie\/.+/,
    MOVIE_PAGE: /^\/([1-9][0-9]*)*/
}

const CONTENT_REGEXP = {
    MOVIE_ID: /^\/movie\/(.+)/,
    PAGE_NUMBER: /([1-9][0-9]*)/g
}

export const URL_DETERMINATOR = {
    profile: {
        regexp: URL_REXEP.PROFILE,
        data: () => {
            return {
                keyword: "userprofilepage",
                param: null,
                auth: true
            }
        }
    },

    favorites: {
        regexp: URL_REXEP.FAVORITES,
        data: () => {
            return {
                keyword: "favoritespage",
                param: null,
                auth: true
            }
        }
    },

    registration: {
        regexp: URL_REXEP.REGISTRATION,
        data: () => {
            return {
                keyword: "registrationpage",
                param: null,
                auth: false
            }
        }
    },

    login: {
        regexp: URL_REXEP.LOGIN,
        data: () => {
            return {
                keyword: "loginpage",
                param: null,
                auth: false
            }
        }
    },

    movie: {
        regexp: URL_REXEP.MOVIE,
        data: (path) => {
            return {
                keyword: "detailspage",
                param: {
                    userId: localStorage.getItem("userId"),
                    movieId: path.length > 1 ? path.match(CONTENT_REGEXP.MOVIE_ID)[1] : 1
                },
                auth: null
            }
        }
    },

    movie_page: {
        regexp: URL_REXEP.MOVIE_PAGE,
        data: (path) => {
            return { // страница каталога фильмов
                keyword: "catalogpage",
                param: path.length > 1 ? 
                    path.match(CONTENT_REGEXP.PAGE_NUMBER)[0] : 
                    1,
                auth: null
            };
        }
    }
}