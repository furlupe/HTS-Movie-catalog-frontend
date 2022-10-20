$(document).ready(function() {
    var id = localStorage.getItem("selectedMovieID");
    get(`https://react-midterm.kreosoft.space/api/movies/details/${id}`)
    .then(details => {
        showMovieDetails(details);
        showReviews(details.reviews);
    })
    .catch(error => console.log(error));
});