$(document).ready(function() {
    loadNavbar();
});

function showDetails() {
    var id = localStorage.getItem("selectedMovieID");
    get(`https://react-midterm.kreosoft.space/api/movies/details/${id}`)
    .then(res => {
        $("#movie-info").empty()
        $template = $("#detail-template");
        
    })
    .catch(error => console.log(error));
}