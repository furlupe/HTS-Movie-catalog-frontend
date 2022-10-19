$(document).ready(function() {
    loadNavbar();
    var id = localStorage.getItem("selectedMovieID");
    get(`https://react-midterm.kreosoft.space/api/movies/details/${id}`)
    .then(details => {
        showMovieDetails(details);
        console.log(details.reviews);
        showReviews(details.reviews);
    })
    .catch(error => console.log(error));
});