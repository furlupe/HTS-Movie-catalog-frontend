const HOST = "https://react-midterm.kreosoft.space";

export const URL_REGISTER = `${HOST}/api/account/register`;
export const URL_LOGIN = `${HOST}/api/account/login`;
export const URL_LOGOUT = `${HOST}/api/account/logout`;
export const URL_GET_FAVORITES = `${HOST}/api/favorites`;
export const URL_GET_USER_PROFILE = `${HOST}/api/account/profile`;
export const URL_EDIT_USER_PROFILE = `${HOST}/api/account/profile`;

export const URL_ADD_FAVORITE = (ID) => `${HOST}/api/favorites/${ID}/add`;
export const URL_DELETE_FAVORITE = (ID) => `${HOST}/api/favorites/${ID}/delete`;
export const URL_GET_PAGE = (PAGE) => `${HOST}/api/movies/${PAGE}`;
export const URL_GET_MOVIE_DETAILS = (ID) => `${HOST}/api/movies/details/${ID}`;
export const URL_ADD_REVIEW = (MOVIE_ID) => `${HOST}/api/movie/${MOVIE_ID}/review/add`;
export const URL_EDIT_REVIEW = (MOVIE_ID, REVIEW_ID) => `${HOST}/api/movie/${MOVIE_ID}/review/${REVIEW_ID}/edit`;
export const URL_DELETE_REVIEW = (MOVIE_ID, REVIEW_ID) => `${HOST}/api/movie/${MOVIE_ID}/review/${REVIEW_ID}/delete`;