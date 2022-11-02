export const URL_REGISTER = "https://react-midterm.kreosoft.space/api/account/register";
export const URL_LOGIN = "https://react-midterm.kreosoft.space/api/account/login";
export const URL_LOGOUT = "https://react-midterm.kreosoft.space/api/account/logout";
export const URL_GET_FAVORITES = "https://react-midterm.kreosoft.space/api/favorites";
export const URL_GET_USER_PROFILE = `https://react-midterm.kreosoft.space/api/account/profile`;
export const URL_EDIT_USER_PROFILE = `https://react-midterm.kreosoft.space/api/account/profile`;

export const URL_ADD_FAVORITE = (ID) => `https://react-midterm.kreosoft.space/api/favorites/${ID}/add`;
export const URL_DELETE_FAVORITE = (ID) => `https://react-midterm.kreosoft.space/api/favorites/${ID}/delete`;
export const URL_GET_PAGE = (PAGE) => `https://react-midterm.kreosoft.space/api/movies/${PAGE}`;
export const URL_GET_MOVIE_DETAILS = (ID) => `https://react-midterm.kreosoft.space/api/movies/details/${ID}`;
export const URL_ADD_REVIEW = (MOVIE_ID) => `https://react-midterm.kreosoft.space/api/movie/${MOVIE_ID}/review/add`;
export const URL_EDIT_REVIEW = (MOVIE_ID, REVIEW_ID) => `https://react-midterm.kreosoft.space/api/movie/${MOVIE_ID}/review/${REVIEW_ID}/edit`;
export const URL_DELETE_REVIEW = (MOVIE_ID, REVIEW_ID) => `https://react-midterm.kreosoft.space/api/movie/${MOVIE_ID}/review/${REVIEW_ID}/delete`;